// Hash
import bcrypt from "bcryptjs";

// Constants
import {
  JWT_SECRET_KEY_VARIABLE,
  LOGIN_COOKIE_NAME_VARIABLE,
  LOGIN_EXPIRATION_MINUTES_VARIABLE,
  LOGIN_EXPIRATION_STRING_VARIABLE,
} from "../constants";

// Next
import { cookies } from "next/headers";

// Jose JWT
import { SignJWT, jwtVerify } from "jose";

// Next
import { redirect } from "next/navigation";

// From Lib/Jose
const jwtSecretKeyEncoded = new TextEncoder().encode(JWT_SECRET_KEY_VARIABLE);

// CREATE PASS HASH
export async function hashPassword(password: string) {
  const hash = await bcrypt.hash(password, 10); // Created hash of pass.
  const base64 = Buffer.from(hash).toString("base64"); // Wrapper hash pass in base64.
  return base64 as string;
}

// CHECK PASS HASH
export async function checkPassword(password: string, base64Hash: string) {
  const hash = Buffer.from(base64Hash, "base64").toString("utf-8"); // Unpack hash pass to check compare.
  return bcrypt.compare(password, hash);
}

// CREATE COOKIE
export async function createLoginSession(username: string) {
  const expiresAt = new Date(Date.now() + LOGIN_EXPIRATION_MINUTES_VARIABLE);

  // TODO: Set JWT here.
  const loginSession = await signJWT({ username, expiresAt });

  const cookieStore = await cookies(); // Create cookie here.

  // Set config cookie.
  cookieStore.set(LOGIN_COOKIE_NAME_VARIABLE, loginSession, {
    httpOnly: true, // Only read into server and not in browser.
    secure: true, // Only read https.
    sameSite: "strict", // TODO: add comment about semeSite.
    expires: expiresAt, // Time expires of cookie.
  });
}

// DELETE COOKIE
export async function deleteLoginSession() {
  const cookieStore = await cookies(); // Create cookie here.

  cookieStore.set(LOGIN_COOKIE_NAME_VARIABLE, "", { expires: new Date(0) }); // Config cookie from set expirate date now berfore remove cookie (prevent).
  cookieStore.delete(LOGIN_COOKIE_NAME_VARIABLE); // Removing cookie.
}

// CHECK LOGIN SESSION
export async function getLoginSession() {
  const cookieStore = await cookies();

  const jwt = cookieStore.get(LOGIN_COOKIE_NAME_VARIABLE)?.value;

  if (!jwt) return;

  return checkJWT(jwt);
}

// CHECK USER NAME
export async function checkLoginSession() {
  const JWTPayload = await getLoginSession();

  if (!JWTPayload) return false;

  return JWTPayload?.username;
}

// CHECK USER LOGGED
export async function requireLoginSessionOrRedirect() {
  const hasAuth = await getLoginSession();

  if (!hasAuth) {
    redirect("/admin/login");
  }
}

// SIGN JWT
type JWTPayloadProps = {
  username: string;
  expiresAt: Date;
};

export async function signJWT(JWTPayload: JWTPayloadProps) {
  return new SignJWT(JWTPayload)
    .setProtectedHeader({
      alg: "HS256",
      typ: "JWT",
    })
    .setIssuedAt()
    .setExpirationTime(LOGIN_EXPIRATION_STRING_VARIABLE)
    .sign(jwtSecretKeyEncoded);
}

// VERIFY JWT
export async function checkJWT(payloadJWT?: string) {
  if (!payloadJWT) {
    return (payloadJWT = "");
  }

  try {
    const { payload } = await jwtVerify(payloadJWT, jwtSecretKeyEncoded, {
      algorithms: ["HS256"],
    });

    return payload;
  } catch {
    console.log("Token pe inválido.");
  }
}
