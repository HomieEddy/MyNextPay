import { createDb } from "../src/server/db/client";
import { loadSampleData } from "../src/server/sample/load-sample-data";

const path = process.env.DATABASE_PATH ?? "./data/nextpay.db";
loadSampleData(createDb(path));
console.log(`Sample data loaded into ${path}`);
