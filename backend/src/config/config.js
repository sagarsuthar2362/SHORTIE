import dotenv from "dotenv";
dotenv.config();

const requiredEnvVars = ["MONGO_URI"];

const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error(`MISSING ENVIRONMENT VARIABLES: ${missingEnvVars.join(", ")}`);
}

const config = {
  MONGO_URI: process.env.MONGO_URI,
};

export default config;
