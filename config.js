export const EMAIL = "aviartest2021@gmail.com";
export const PASSWORD = "aviar123@123";

import dotenv from "dotenv";
dotenv.config({ silent: true });
const {
  PORT,
  AWS_KEY_ID,
  AWS_SECRET_KEY_ACCESS,
  AWS_BUCKET,
  AWS_REGION,
  SESSION_TOKEN,
  REFRESH_TOKEN,
} = process.env;

// AWS Settings
export const awsRegion = AWS_REGION || "ap-south-1";
export const awsAccessKeyId = AWS_KEY_ID;
export const awsSecretAccessKey = AWS_SECRET_KEY_ACCESS;
export const awsBucketName = AWS_BUCKET;

//port
export const port = PORT;

//Session Token
export const TOKEN_KEY = SESSION_TOKEN;

//Refresh Session Token
export const SESSION_REFRESH_TOKEN = REFRESH_TOKEN;
