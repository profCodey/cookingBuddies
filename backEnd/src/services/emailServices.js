import nodemailer from "nodemailer";

function email(email, title, html) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  console.log(process.env.PORT);

  var mailOptions = {
    from: `${process.env.ORG_NAME} <${process.env.ORG_EMAIL}>`,
    to: email,
    subject: title,
    html: html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent successfully to ", info.envelope.to[0]);
  });
}

export { email as sendEmail };
