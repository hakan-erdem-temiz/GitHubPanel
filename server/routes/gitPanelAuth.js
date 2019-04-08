const express = require("express");
const router = express.Router();
const request = require("request");
const { User } = require("../models/user");

// config to define app settings
// use environment variables [ process.env ] for sensitive data like api keys and secrets
var config = {
  client_id: process.env.github_client_id,
  client_secret: process.env.github_client_secret,
  redirect_url: "http://localhost:3900/api/github/callback",
  authorize_url: "https://github.com/login/oauth/authorize",
  token_url: "https://github.com/login/oauth/access_token",
  user_url: "https://api.github.com/user",
  scope: "user"
};

// app.get("/auth", function(req, res) {
//   // redirect the user to github authorization url
//   return res.redirect(
//     `${config.authorize_url}?scope=user:TestUser001info&client_id=${
//       config.client_id
//     }`
//   );
// });

router.get("/callback", function(req, res) {
  // extract authorize code
  console.log("callback!!");
  var code = req.query.code;

  // configure request params
  options = {
    method: "POST",
    uri: config.token_url,
    formData: {
      client_id: config.client_id,
      client_secret: config.client_secret,
      code: code
    },
    headers: {
      accept: "application/json"
    }
  };

  // make a request for auth_token using above options
  request(options, function(e, r, b) {
    // process the body
    if (b) {
      jb = JSON.parse(b);

      // configure request to fetch user information
      options_user = {
        method: "GET",
        url: config.user_url + "?access_token=" + jb.access_token,
        headers: {
          accept: "application/json",
          "User-Agent": "custom"
        }
      };
      request(options_user, function(ee, rr, bb) {
        // process the body
        if (bb) {
          var bo = JSON.parse(bb);
          var resp = {
            name: bo.login,
            id: bo.id,
            company: bo.company,
            location: bo.location,
            email: bo.email,
            bio: bo.bio,
            following: bo.following,
            followers: bo.followers
          };

          save(resp);

          return res.redirect("http://localhost:3000/profile");
        } else {
          console.log(er);
          return res.json(er);
        }
      });
    }
  });
});

async function save(resp) {
  const user = await User.findOne({ name: resp.name });
  console.log(user);
  if (user) {
    const newuser = await User.findByIdAndUpdate(
      user._id,
      {
        github: resp
      },
      { new: true }
    );

    console.log(newuser);
  }
}

module.exports = router;
