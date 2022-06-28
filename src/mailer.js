const nodeMailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const bcrypt = require("bcryptjs");
const { google } = require("googleapis");
const path = require("path");
const mailHost = "smtp.gmail.com";
const mailPort = 587;
const dotenv = require("dotenv");
dotenv.config();

const OAuth2 = google.auth.OAuth2;

const OAuth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

OAuth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

const accessToken = new Promise((resovle, reject) => {
  OAuth2Client.getAccessToken((err, token) => {
    if (err) reject(err);
    resovle(token);
  });
});

const sendMail = (subject, orders) => {
  console.log("TCL: sendMail -> orders", orders);
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    host: mailHost,
    port: mailPort,
    secure: false,
    auth: {
      type: "OAuth2",
      user: "tuyendev55@gmail.com",
      clientId: process.env.CLIENT_ID,
      accessToken,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
    },
  });

  const handlebarOptions = {
    viewEngine: {
      extName: ".html",
      partialsDir: path.resolve("./src/views"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./src/views"),
    extName: ".handlebars",
  };

  transporter.use("compile", hbs(handlebarOptions));

  const options = {
    from: "tuyendev55@gmail.com",
    to: "ctuyenhddt@gmail.com",
    subject: subject,
    template: "email",
    context: {
      orderStatus: orders.orderStatus,
      itemsPrice: orders.itemsPrice,
    },
  };

  return transporter.sendMail(options, function (err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log(res);
    }
  });
};

module.exports = {
  sendMail: sendMail,
};
