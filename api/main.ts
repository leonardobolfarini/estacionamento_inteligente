import express from "express";
import { Response, Request } from "express";
import { prisma } from "./adapters/prisma_adapter";

const app = express();

app.get("/map", async (req: Request, res: Response) => {
  const sectors = await prisma.sectors.findMany();

  console.log(sectors);
  res.json({
    sectors: {
      sectors,
    },
  });
});

app.listen(5000, () => {
  console.log("App running");
});
