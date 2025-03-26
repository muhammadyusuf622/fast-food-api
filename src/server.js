import app from "./app.js";
import { APP_PORT } from "./config/app.config.js";
import connectDB from "./config/mongo.config.js";

await connectDB();

app.listen(APP_PORT, (err) => {
  if(err) console.log(err.message);
  console.log(`http://localhost:${APP_PORT}`);
})