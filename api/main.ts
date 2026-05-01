import express from "express";
import { prisma } from "./adapters/prisma_adapter";
import { PrismaClient } from "./generated/prisma/client";
import { adapter } from "./adapters/prisma_adapter";

const app = express();
const prisma = new PrismaClient({ adapter });

app.get("/map", async (req, res) => {
  const sector = await prisma.sectors.findMany();

  console.log(sector);
});

app.listen(5000, () => {
  console.log("App running");
});
