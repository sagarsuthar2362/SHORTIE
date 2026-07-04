import dotenv from "dotenv";
dotenv.config();

const requiredEnvVars = ["MONGO_URI", "PORT"];

const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error(`MISSING ENVIRONMENT VARIABLES: ${missingEnvVars.join(", ")}`);
}

const config = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT || 5000,
};

export default config;
