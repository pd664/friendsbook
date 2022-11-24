const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = process.env.PORT || 4000;
// const CredentialsSchema = require('./schema/credentilasSchema')
// const mindSchema = require('./schema/postSchema')
const db1 = process.env.MONGO_URL;
const bcrypt = require("bcryptjs");
const utils = require("./utils");
const AWS = require("aws-sdk");

app.use(cors());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

mongoose
  .connect(db1, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`connection successfull`);
  })
  .catch((err) => console.log(err));

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION,
});

const s3 = new AWS.S3();
async function upload(imageName, base64Image, type) {
  const params = {
    Bucket: "friendsbookimages",
    Key: imageName,
    Body: new Buffer.from(
      base64Image.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    ),
    ContentType: type,
  };

  let data;

  try {
    data = await promiseUpload(params);
  } catch (err) {
    console.error(err);
    return "";
  }
  return data.Location;
}

function promiseUpload(params) {
  return new Promise(function (resolve, reject) {
    s3.upload(params, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

const postSchema = mongoose.Schema({
  postId: { type: String, required: true },
  username: { type: String, required: true },
  mind: { type: String },
  likes: { type: Number, required: true },
});

app.post("/api/file/upload", async (req, res, next) => {
  const base64Image = req.body.image;
  const imageName = req.body.imageName;
  const type = req.body.type;
  const mind = req.body.mind;
  const username = req.body.username;

  const Mind = mongoose.model("mind", postSchema);
  const post = new Mind({
    postId: imageName,
    username: username,
    mind: mind,
    likes: 0,
  });
  let response;
  try {
    response = await upload(imageName, base64Image);
    const mongoupload = await post.save();
  } catch (err) {
    console.error(`Error uploading image: ${err.message}`);
    return next(new Error(`Error uploading image: ${imageName}`));
  }

  res.send({ link: response });
});

var arr = [];
let obj = {};
app.get("/api/file/get", async (req, res) => {
  arr = [];

  const paramsG = {
    Bucket: "friendsbookimages",
  };

  const Mind = mongoose.model("mind", postSchema);

  let promise = await new Promise(function (resolve, reject) {
    s3.listObjects(paramsG, function (err, data) {
      if (err) {
        console.log(err);
        return reject(err);
      } else {
        return resolve(data.Contents);
      }
    });
  });

  for (const type of promise) {
    let obj = {};
    let key = type.Key;

    const pars = {
      Bucket: "friendsbookimages",
      Key: `${key}`,
    };

    try {
      let promise = await s3.getSignedUrlPromise("getObject", pars);

      Mind.find({ postId: key }, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          obj["src"] = promise;
          obj["key"] = key;
          obj["username"] = data[0]["username"];
          obj["quote"] = data[0]["mind"];
          obj["likes"] = data[0]["likes"];
          arr.push(obj);
        }
      });
    } catch (e) {
      console.log(e);
    }
    // arr.push(obj)
  }

  res.send(arr);
  res.end();
});

const credentilasSchema = mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

app.post("/updatelikes", async (req, res) => {
  const postId = req.body.key;
  const likes = req.body.likes;

  const Mind = mongoose.model("mind", postSchema);
  const filter = { postId: postId };

  let update = { likes: likes };
  let doc = await Mind.findOneAndUpdate(filter, update);
  return res.status(200).json({
    error: false,
    message: "done",
  });
});

app.get("/userposts", (req, res) => {
  const username = req.body.username;
});

app.post("/signup", (req, res) => {
  const name = req.body.name;
  const user = req.body.username;
  const pwd = req.body.password;

  if (!name || !user || !pwd) {
    return res.status(400).json({
      error: true,
      message: "Please enter all details",
    });
  }

  const Credentials = mongoose.model("credentials", credentilasSchema);

  const signup = new Credentials({
    name: name,
    username: user,
    password: pwd,
  });

  Credentials.find({ username: user }, (err, data) => {
    if (err) {
      return res.status(400).json({
        error: true,
        message: err,
      });
    } else if (data) {
      signup.save();

      return res.status(200).json({
        error: false,
        message: "Account created successfully",
      });
    } else if (!data) {
      return res.status(400).json({
        error: true,
        message: "Username already taken",
      });
    }
  });
});

app.post("/signin", (req, res) => {
  let user = req.body.username;
  let pwd = req.body.password;

  const Credentials = mongoose.model("credentials", credentilasSchema);

  if (!user || !pwd) {
    return res.status(400).json({
      error: true,
      message: "Username or Password is required.",
    });
  }

  Credentials.find({ username: user }, (err, data) => {
    if (err) {
      return res.status(400).json({
        error: true,
        message: err,
      });
    } else if (data) {
      data.map((row) => {
        let a = bcrypt.compareSync(pwd, row.password);

        if (a === true) {
          const token = utils.generateToken(row);
          const userObj = utils.userDetails(row);

          return res.status(200).json({ user: userObj, token });
        } else {
          return res.status(401).json({
            error: true,
            message: "Username or Password is Wrong.",
          });
        }
      });
    } else {
      return res.status(401).json({
        error: true,
        message: "No user found.",
      });
    }
  });
});

app.listen(port, () => {
  console.log("Server started on: " + port);
});
