// Incorrect import in @repo/db/src/index.ts

// or
// Correct import in @repo/db/src/index.ts
import { PrismaClient } from '../src/generated/prisma';

// If you need other generated types or functions, import them specifically:
// import { User } from '../generated/prisma';

export const prismaClient = new PrismaClient()