// pages/api/submitForm.ts
import { PrismaClient } from "@prisma/client";
// import { PrismaClient } from "./prisma/generated/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const {
        model,
        date,
        licenseLevel,
        quantity: quantityString,
        comment,
      } = req.body;

      // Convert quantity to an integer
      const quantity = parseInt(quantityString, 10);
      // Generate machines with random serial numbers
      const machines = Array.from({ length: quantity }).map(() => ({
        model: model,
        date: date,
        serialNumber: Math.random().toString(36).substring(7),
        licenseLevel: licenseLevel,
      }));

      // Create a new batch in the database
      const batch = await prisma.batch.create({
        data: {
          quantity,
          comment,
          machines: {
            create: machines,
          },
        },
        include: {
          machines: true,
        },
      });

      res.status(201).json({ success: true, batch });
    } catch (error) {
      console.error("Error submitting form:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ success: false, error: "Method Not Allowed" });
  }
}
