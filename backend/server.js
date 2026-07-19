import app from "./src/app.js";
import config from "./src/config/config.js";
import connectDB from "./src/config/database.js";

await connectDB();

app.listen(config.PORT, () => {
  console.log(`server running on port: ${config.PORT}`);
});
