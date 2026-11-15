export interface Project {
  id: string;
  category: "frontend" | "pm" | "uiux";
  badge: string;
  subBadge: string;
  year: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  documentUrl?: string;
  jiraUrl?: string;
  features?: string[];
  metrics?: string;
  responsibilities?: string[];
  timeline?: string;
  outcome?: string;
  toolsUsed?: string[];
  designProcess?: string[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string;
}
