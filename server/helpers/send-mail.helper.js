const nodemailer = require("nodemailer");

async function main(to, subject, text) {

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, 
    auth: {
      user: process.env.EMAIL, 
      pass: process.env.PASS, 
    },
  });


  let info = await transporter.sendMail({
    from: `"Todo List App 👻" ${process.env.EMAIL}`,  
    to: to,  
    subject: subject,  
    text: text
  });

  console.log("Message sent: %s", info.messageId);
}

main().catch(console.error);

module.exports= main;