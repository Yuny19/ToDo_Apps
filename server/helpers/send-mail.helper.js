const nodemailer = require("nodemailer");

async function main(to, subject, text) {

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
      user: process.env.EMAIL, 
      pass: process.env.PASS, 
    },
  });


  let info = await transporter.sendMail({
    from: `"Todo List App 👻" ${process.env.EMAIL}`,  
    to: `${to}`,  
    subject: `${subject}`,  
    html: `${text}`
  });

  console.log("Message sent: %s", info.messageId);
}

module.exports= main;