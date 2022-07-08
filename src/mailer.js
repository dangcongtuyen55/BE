const nodeMailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const bcrypt = require("bcryptjs");
const { google } = require("googleapis");
const path = require("path");
const mailHost = "smtp.gmail.com";
const mailPort = 587;
const dotenv = require("dotenv");
const Order = require("./app/models/Order");
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

const sendMail = (user, subject, orders) => {
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
  console.log(orders);

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

  const listItems = orders.orderItems.map((item) => {
    return {
      name: item.name,
      price: item.price,
      product_url: item.product_url,
      quantity: item.quantity,
      product_id: item.product,
      id: item._id,
    };
  });
  // console.log(listItems);
  const newDataList = {};
  for (i = 0; i < orders.orderItems.length; i++) {
    newDataList[i] = orders.orderItems[i];
  }
  console.log("TCL: sendMail -> newDataList", newDataList);
  // const htmlHead =
  //   '<table style="width:50%">' +
  //   '<tr style="border: 1px solid black;"><th style="border: 1px solid black;">Tên Sản Phẩm</th><th style="border: 1px solid black;">Hình Ảnh</th><th style="border: 1px solid black;">Giá</th><th style="border: 1px solid black;">Số Lượng</th><th style="border: 1px solid black;">Thành Tiền</th>';

  // let htmlContent = "";

  // for (let i = 0; i < orders.orderItems.length; i++) {
  //   htmlContent +=
  //     "<tr>" +
  //     '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">' +
  //     orders.orderItems[i].name +
  //     "</td>" +
  //     '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;"><img src="' +
  //     orders.orderItems[i].product_url +
  //     '" width="80" height="80"></td>' +
  //     '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">' +
  //     orders.orderItems[i].price +
  //     "$</td>" +
  //     '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">' +
  //     orders.orderItems[i].quantity +
  //     "</td>" +
  //     '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">' +
  //     parseInt(orders.orderItems[i].price) *
  //       parseInt(orders.orderItems[i].quantity) +
  //     "$</td><tr>";
  // }
  // console.log(orders.orderItems);
  const options = {
    from: "tuyendev55@gmail.com",
    to: user.email,
    subject: subject,
    template: "email",
    context: {
      orderStatus: orders.orderStatus,
      itemsPrice: orders.itemsPrice,
      shippingInfo: orders.shippingInfo,
      list: newDataList,
      itemProduct: orders.orderItems.length,
    },

    // html: htmlContent,
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
