import 'dotenv/config';

export const MONGODB_URI = process.env.MONGODB_URI ?? '';
export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET ?? '';
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET ?? '';
export const PORT = process.env.PORT ?? '3000';
