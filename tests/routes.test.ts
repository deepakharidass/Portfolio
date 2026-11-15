import { describe, expect, it } from "vitest";

const baseUrl = process.env.TEST_BASE_URL ?? "http://localhost:3100";

describe("development SPA route fallback", () => {
  for (const route of ["/", "/projects", "/education", "/contact", "/domains/frontend"]) {
    it(`serves the transformed app entry for ${route}`, async () => {
      const response = await fetch(new URL(route, baseUrl));
      const html = await response.text();

      expect(response.status).toBe(200);
      expect(response.headers.get("content-type")).toContain("text/html");
      expect(html).toContain("/@vite/client");
      expect(html).toContain("/src/main.tsx");
    });
  }

  it("does not turn unknown API paths into the SPA entry", async () => {
    const response = await fetch(new URL("/api/not-a-route", baseUrl));

    expect(response.status).toBe(404);
    expect(response.headers.get("content-type")).toContain("application/json");
  });
});
