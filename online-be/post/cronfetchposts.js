//TECHNOLOGY NEWS

const AWS = require("aws-sdk");
const https = require("https");
const dynamodb = new AWS.DynamoDB();
const s3Bucket = new AWS.S3();
const uuid = require("uuid");

const api = "https://newsdata.io/api/1/news";
const api_key = "pub_140888f82804297aefb0dc55784b085daa3d8";
const language = "en";
const category = "technology";
const page = "1";

const url = `${api}?apikey=${api_key}&language=${language}&category=${category}&page=${page}`;

const fetchNews = () => {
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      let rawData = "";
      res.on("data", (chunk) => {
        rawData += chunk;
      });

      res.on("end", () => {
        try {
          resolve(JSON.parse(rawData));
        } catch (err) {
          reject(new Error(err));
        }
      });
    });
    req.on("error", (err) => {
      reject(new Error(err));
    });
  });
};

const fetchImage = (imageUrl) => {
  return new Promise((resolve, reject) => {
    const req = https.get(imageUrl, (res) => {
      let rawData = [];
      res.on("data", (chunk) => {
        rawData.push(chunk);
      });

      res.on("end", () => {
        try {
          let buffer = Buffer.concat(rawData);
          resolve(buffer);
        } catch (err) {
          reject(new Error(err));
        }
      });
    });
    req.on("error", (err) => {
      reject(new Error(err));
    });
  });
};

module.exports.handler = async () => {
  const array = await fetchNews();

  for (let i = 0; i < array.results.length; i++) {
    let post = array.results[i];
    const id = uuid.v1();

    if (post.image_url) {
      let image = await fetchImage(post.image_url);
      const data = {
        Key: id,
        Bucket: "imagebucket-alimansour",
        Body: image,
        ContentType: "image/png",
        ContentEncoding: "base64",
      };

      const selectedTags = [category];
      const readTime = "0";
      const date = new Date(post.pubDate);
      const dateInMiliseconds = date.getTime().toString();

      const params = {
        Item: {
          type: { S: "posts" },
          url: { S: post.link },
          title: { S: post.title },
          id: { S: id },
          image: { S: `https://imagebucket-alimansour.s3.amazonaws.com/${id}` },
          uploadDate: { N: dateInMiliseconds },
          upVotes: { N: "0" },
          tags: { SS: selectedTags },
          readTime: { S: readTime },
          recommended: { N: "0" },
          description: { S: post.description },
        },
        TableName: "postsTable1",
        ConditionExpression: "attribute_not_exists(#url)",
        ExpressionAttributeNames: { "#url": post.link },
      };

      const s3Data = await s3Bucket.putObject(data).promise();
      const dynamoData = await dynamodb.putItem(params).promise();
    }
  }
};
