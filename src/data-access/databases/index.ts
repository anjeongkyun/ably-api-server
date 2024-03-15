import { DB_URL } from "@/api/config";

export const dbConnection = {
  url: DB_URL,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
};
