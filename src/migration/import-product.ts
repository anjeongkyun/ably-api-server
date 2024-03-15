import fs from "fs";
import csvParser from "csv-parser";
import mongoose from "mongoose";
import { Product } from "@/domain-model/entities/product";
import { productDataModel } from "@/data-access/models/product.model";

const dbConnectionUrl: mongoose.Connection = mongoose.createConnection(
  "mongodb://localhost:27017/test"
);

export const getDatabase = () =>
  new Promise<typeof dbConnectionUrl.db>((resolve, reject) => {
    dbConnectionUrl.on(
      "error",
      console.error.bind(console, "connection error!")
    );
    dbConnectionUrl.once("open", function () {
      resolve(dbConnectionUrl.db);
    });
  });

fs.createReadStream("src/migration/dummy_product.csv")
  .pipe(csvParser())
  .on("data", async (data: Product) => {
    (await Promise.resolve(getDatabase())).collection("products").insertOne({
      name: data.name,
      thumbnail: data.thumbnail,
      price: data.price,
    });
  })
  .on("end", () => {
    console.info(
      "success import product dummy csv data To products_collection"
    );
  });
