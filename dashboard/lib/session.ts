import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "tv_session";
const SESSION_DURATION = 60 * 60 * 24 * 7; // 7 أيام بالثواني

function getSecretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("متغير البيئة SESSION_SECRET غير معرّف. أضفه في ملف .env");
  }
  return new TextEncoder().encode(secret);
}

export interface SessionPayload {
  userId: string;
  username: string;
  discriminator: string;
  avatar: string | null;
  accessToken: string;
  refreshToken: string;
}

/** إنشاء توكن جلسة موقّع وتخزينه في كوكي HttpOnly */
export async function createSession(payload: SessionPayload) {
  const token = await new SignJWT(payload as any)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION}s`)
    .sign(getSecretKey());

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_DURATION,
    path: "/",
  });
}

/** قراءة وفحص جلسة المستخدم الحالية من الكوكي */
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export { SESSION_COOKIE_NAME };
