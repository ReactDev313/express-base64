const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

const port = 3000;

function convert2Base64Data(srcPath, result) {
  fs.readFile(srcPath, (err, data) => {
    //error handle
    if (err) res.status(500).send(err);

    //get  file extension name
    let extensionName = path.extname(srcPath);

    //convert  file to base64-encoded string
    let base64Data = new Buffer(data, "binary").toString("base64");

    //combine all strings
    let srcString = `data:image/${extensionName
      .split(".")
      .pop()};base64,${base64Data}`;
    result(srcString, base64Data, extensionName);
  });
}

function generateFileFromBase64(base64_img, outPath, ext) {
  var ReadableData = require("stream").Readable;
  const fileBufferData = Buffer.from(base64_img, "base64");
  var streamObj = new ReadableData();
  streamObj.push(fileBufferData);
  streamObj.push(null);
  streamObj.pipe(fs.createWriteStream(outPath + ext));
  console.log("file generated!");
}

convert2Base64Data("./testdata/test.mp4", (result, base64Data, ext) => {
  // console.log(result);
  generateFileFromBase64(base64Data, "test", ext);
});
