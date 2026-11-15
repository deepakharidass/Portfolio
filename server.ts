import express from "express";
import type { Request, Response } from "express";
import { createServer } from "http";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { z } from "zod";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT ?? 3000);
const isProduction =
  process.env.NODE_ENV === "production" || process.argv.includes("--production");
const server = createServer(app);

if (!Number.isInteger(PORT) || PORT < 1 || PORT > 65535) {
  throw new Error(`Invalid PORT "${process.env.PORT}". Set PORT to a valid port number.`);
}

app.use(express.json());

// Load chatbot knowledge base
const chatbotDataPath = path.resolve(process.cwd(), "src/data/chatbotData.json");
const loadChatbotData = () => JSON.parse(fs.readFileSync(chatbotDataPath, "utf-8"));

// In-memory IP rate limiter for contact & chat
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string, maxRequests: number, windowMs: number): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count += 1;
  return true;
}

// Contact form validation schema
const ContactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(100),
  subject: z.string().trim().min(2).max(150),
  message: z.string().trim().min(10).max(2500),
  honeypot: z.string().optional(),
});

const ContactEmailConfigSchema = z.object({
  apiKey: z.string().min(1),
  to: z.string().email(),
  from: z.string().trim().min(1),
});

// API: Contact endpoint
app.post("/api/contact", async (req: Request, res: Response): Promise<void> => {
  res.set("Cache-Control", "no-store");
  const clientIp = (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "anonymous";

  if (!checkRateLimit(`contact:${clientIp}`, 5, 10 * 60 * 1000)) {
    res.status(429).json({ error: "You’ve sent several messages recently. Please wait a little and try again." });
    return;
  }

  try {
    const parsed = ContactSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Please check your details and make sure all fields are filled in correctly.", details: parsed.error.format() });
      return;
    }

    const { name, email, subject, message, honeypot } = parsed.data;

    // Honeypot spam filtering
    if (honeypot) {
      res.status(200).json({ success: true, message: "Transmission received." });
      return;
    }

    const configResult = ContactEmailConfigSchema.safeParse({
      apiKey: process.env.RESEND_API_KEY,
      to: process.env.CONTACT_TO_EMAIL,
      from: process.env.CONTACT_FROM_EMAIL,
    });
    if (!configResult.success) {
      const missingOrInvalid = configResult.error.issues.map((issue) => issue.path[0]);
      console.error("Contact email configuration is missing or invalid:", missingOrInvalid);
      res.status(503).json({
        error: "Email delivery is not configured. Set RESEND_API_KEY, CONTACT_TO_EMAIL, and CONTACT_FROM_EMAIL in the server environment, then restart the server.",
      });
      return;
    }

    const { apiKey, to, from } = configResult.data;
    const sentAt = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZoneName: "short",
    }).format(new Date());
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: email,
        subject: `[Portfolio Inquiry] ${subject} — ${name}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Subject: ${subject}`,
          `Data/Time : ${sentAt}`,
          "",
          "Message:",
          message,
        ].join("\n"),
      }),
    });
    if (!emailResponse.ok) {
      const providerErrorBody = await emailResponse.text();
      let providerErrorMessage = providerErrorBody || emailResponse.statusText || "No error message provided";
      try {
        const providerError = JSON.parse(providerErrorBody) as { message?: unknown };
        if (typeof providerError.message === "string") {
          providerErrorMessage = providerError.message;
        }
      } catch {
        // Keep the response text when Resend does not return JSON.
      }
      providerErrorMessage = providerErrorMessage.split(apiKey).join("[REDACTED]");
      console.error("Resend delivery failed:", {
        status: emailResponse.status,
        message: providerErrorMessage,
      });
      res.status(502).json({ error: "Your message could not be sent. Please try again in a moment or email me directly." });
      return;
    }

    const providerResult = await emailResponse.json() as { id?: string };
    console.info("Contact email accepted by Resend:", providerResult.id ?? "message ID unavailable");
    res.status(200).json({
      success: true,
      message: "Thanks for reaching out! Your message has been sent, and I’ll get back to you soon.",
    });
  } catch (err) {
    console.error("Error processing contact form:", err);
    res.status(500).json({ error: "Something went wrong while sending your message. Please try again." });
  }
});

// API: AI Chatbot endpoint
app.post("/api/chat", async (req: Request, res: Response): Promise<void> => {
  res.set("Cache-Control", "no-store");

  const clientIp = (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "anonymous";

  if (!checkRateLimit(`chat:${clientIp}`, 20, 5 * 60 * 1000)) {
    res.status(429).json({ error: "Query rate threshold exceeded. Please pause before subsequent queries." });
    return;
  }

  const { message } = req.body;
  if (!message || typeof message !== "string" || message.length > 500) {
    res.status(400).json({ error: "Invalid query payload." });
    return;
  }

  let chatbotData: ReturnType<typeof loadChatbotData>;
  try {
    chatbotData = loadChatbotData();
  } catch (error) {
    console.error("Unable to load chatbot knowledge base:", error);
    res.status(500).json({ error: "The portfolio knowledge base could not be loaded." });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = `${chatbotData.systemIdentity}
Here is the complete factual context about Deepak H:
${JSON.stringify(chatbotData, null, 2)}`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          { role: "user", parts: [{ text: `${systemInstruction}\n\nUser Question: ${message}` }] },
        ],
      });

      const replyText = response.text || "That information isn't available in Deepak H's portfolio.";
      res.json({ reply: replyText });
      return;
    } catch (aiErr) {
      console.error("Gemini API call failed, using fallback:", aiErr);
    }
  }

  // Grounded local fallback logic
  const query = message.toLowerCase();
  for (const item of chatbotData.faq) {
    if (
      query.includes(item.q.toLowerCase().replace("?", "").slice(0, 15)) ||
      (query.includes("skill") && item.q.toLowerCase().includes("skill")) ||
      (query.includes("frontend project") && item.q.toLowerCase().includes("frontend")) ||
      (query.includes("management tool") && item.q.toLowerCase().includes("management"))
    ) {
      res.json({ reply: item.a });
      return;
    }
  }

  if (query.includes("education") || query.includes("college") || query.includes("cgpa")) {
    res.json({ reply: chatbotData.profile.education });
    return;
  }

  if (query.includes("frontend") || query.includes("react")) {
    res.json({
      reply: `Deepak H's frontend stack includes ${chatbotData.skillsSummary.frontend} Flagship projects: 'Aether Financial Analytics Core' and 'Broadsheet: Text Composition Studio'.`,
    });
    return;
  }

  if (query.includes("project management") || query.includes("scrum") || query.includes("agile")) {
    res.json({
      reply: `Deepak is a Certified Scrum Master (CSM 2023). PM competencies: ${chatbotData.skillsSummary.projectManagement} Key projects: 'Orchestrate Agile Sprint Engine' and 'Vanguard SRE Incident Matrix'.`,
    });
    return;
  }

  if (query.includes("ui") || query.includes("ux") || query.includes("figma")) {
    res.json({
      reply: `Deepak H's UI/UX skillset includes ${chatbotData.skillsSummary.uiux} Key projects: 'Kinesis Minimalist Token Library' and 'Apex Micro-Investment Gateway'.`,
    });
    return;
  }

  if (query.includes("contact") || query.includes("email") || query.includes("hire") || query.includes("phone")) {
    res.json({ reply: `${chatbotData.profile.contact} ${chatbotData.profile.availability}` });
    return;
  }

  res.json({
    reply: `Deepak H is a Computer Science Engineering graduate (Anna University, 8.86 CGPA). He specializes in Frontend Development, Agile Project Management, and UI/UX Design. Ask about his skills, education, or 6 flagship projects!`,
  });
});

app.use("/api", (_req, res) => {
  res.status(404).json({ error: "API route not found." });
});

// Mount Vite or serve static assets
async function startServer() {
  const distPath = path.resolve(process.cwd(), "dist");
  let closeVite: (() => Promise<void>) | undefined;

  if (isProduction) {
    if (!fs.existsSync(path.join(distPath, "index.html"))) {
      throw new Error("Production build not found. Run `npm run build` before `npm start`.");
    }

    app.use(express.static(distPath, {
      setHeaders(res, filePath) {
        if (path.resolve(filePath) === path.join(distPath, "index.html")) {
          res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        }
      },
    }));
    app.get("*", (_req, res, next) => {
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      res.sendFile(path.join(distPath, "index.html"), (error) => {
        if (error) next(error);
      });
    });
  } else {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      base: "/",
      server: {
        middlewareMode: true,
        host: "0.0.0.0",
        ws: process.env.DISABLE_HMR === "true"
          ? false
          : { server },
      },
      appType: "custom",
    });
    closeVite = () => vite.close();
    app.use(vite.middlewares);
    app.get("*", async (req, res, next) => {
      try {
        const indexPath = path.join(__dirname, "index.html");
        const template = await fs.promises.readFile(indexPath, "utf-8");
        const html = await vite.transformIndexHtml(req.originalUrl, template);
        res.status(200).setHeader("Content-Type", "text/html").end(html);
      } catch (error) {
        next(error);
      }
    });
  }

  try {
    await new Promise<void>((resolve, reject) => {
      const handleError = (error: NodeJS.ErrnoException) => {
        server.off("listening", handleListening);
        if (error.code === "EADDRINUSE") {
          reject(
            new Error(
              `Port ${PORT} is already in use. Stop the other process or run with PORT=<available-port>.`
            )
          );
          return;
        }
        reject(error);
      };
      const handleListening = () => {
        server.off("error", handleError);
        resolve();
      };

      server.once("error", handleError);
      server.once("listening", handleListening);
      server.listen(PORT, "0.0.0.0");
    });
  } catch (error) {
    await closeVite?.();
    throw error;
  }

  console.log(`Deepak H Portfolio server active on http://0.0.0.0:${PORT}`);

  let isShuttingDown = false;
  const shutdown = (signal: NodeJS.Signals) => {
    if (isShuttingDown) return;
    isShuttingDown = true;
    console.log(`${signal} received; shutting down portfolio servers.`);
    void Promise.all([
      new Promise<void>((resolve, reject) => {
        server.close((error) => (error ? reject(error) : resolve()));
      }),
      closeVite?.(),
    ]).catch((error: unknown) => {
      console.error("Error shutting down portfolio server:", error);
      process.exitCode = 1;
    });
  };

  process.once("SIGINT", shutdown);
  process.once("SIGTERM", shutdown);
}

startServer().catch((error: unknown) => {
  console.error("Unable to start portfolio server:", error);
  process.exitCode = 1;
});
