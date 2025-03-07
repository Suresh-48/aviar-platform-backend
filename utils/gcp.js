import { Storage } from "@google-cloud/storage";
import { resolve } from "path";
import util from "util";

const { format } = util;

export function uploadBase64FileToGcp(base64, newPath, callback) {
  //const buffer = Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), "base64");

  const buffer = Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), "base64");

  let projectId = "aviartechnologyservices"; // Get this from Google Cloud
  let keyFilename = "utils/googlekey.json";

  // Get this from Google Cloud -> Credentials -> Service Accounts
  const storage = new Storage({
    projectId,
    keyFilename,
  });

  const bucket = storage.bucket("kharphi-image"); // Get this from Google Cloud -> Storage

  const blob = bucket.file(newPath);
  const blobStream = blob.createWriteStream();

  let baseUrl = blob.storage.apiEndpoint;
  const publicUrl = `${baseUrl}/kharphi-image/${blob.name}`;

  // const blobStream = blob.createWriteStream();

  blobStream
    .on("finish", (res) => {
      const publicUrl = format(`${blob.storage.apiEndpoint}/${blob.name}`);
      resolve(publicUrl);
    })
    .on("error", (err) => {
      console.log("err local", err);
      // reject(`Unable to upload image, something went wrong`);
    })
    .end(buffer);

  blobStream.on("finish", () => {
    // res.status(200).send("Success");
    // console.log("Success");
  });
  return callback(null, publicUrl);
}
