import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "bacon-love-secret-key-change-in-production"
);
async function verifyPassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}
async function createToken(payload) {
  const token = await new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("7d").sign(JWT_SECRET);
  return token;
}
async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (error) {
    return null;
  }
}

export { verifyToken as a, createToken as c, verifyPassword as v };
