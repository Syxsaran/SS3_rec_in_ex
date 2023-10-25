import { PrismaClient } from "@prisma/client"; // นำเข้า

const globalForPrisma = global as unknown as { prisma: PrismaClient }; // สร้าง globalForPrisma เป็น global object ที่เป็น PrismaClient

export const prisma = globalForPrisma.prisma || new PrismaClient(); // สร้าง globalForPrisma.prisma ถ้ามีหรือสร้าง PrismaClient ใหม่ถ้ายังไม่มีการกำหนดการเชื่อมต่อ

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma; // ถ้าไม่ใช่ทำงานในโหมด "production" ให้กำหนด globalForPrisma.prisma เป็น prisma

export default prisma; // ส่งออก PrismaClient
