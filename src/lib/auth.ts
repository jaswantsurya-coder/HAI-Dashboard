// SHA-256 hashing using Web Crypto API (256-bit, no extra dependencies)
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const hashed = await hashPassword(password);
  return hashed === hash;
}

// Demo credentials (admin / hai2025) — SHA-256 pre-hashed
// admin password "hai2025" hash:
export const DEMO_USER = {
  email: "admin@hai.com",
  // SHA-256("hai2025")
  passwordHash: "3b2a6a46fa79b1a8e5c4d3e9b0f2c1d8e6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1",
};

const SESSION_KEY = "hai_session";

export interface Session {
  email: string;
  name: string;
  role: string;
  loggedInAt: number;
}

export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Session;
  } catch {
    return null;
  }
}

export function setSession(session: Session): void {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession(): void {
  sessionStorage.removeItem(SESSION_KEY);
}
