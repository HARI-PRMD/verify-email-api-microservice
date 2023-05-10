import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { randomUUID } from "crypto";
import nodemailer from "nodemailer";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const emailId = process.env.EMAIL_ID;
const password = process.env.EMAIL_PASSWORD;

app.get("/", (req: Request, res: Response) => {
  res.send({ purpose: "Email Verification Service API" });
});

app.get("/health", (req: Request, res: Response) => {
  res.send({ status: "running" });
});

app.get("/verify", (req: Request, res: Response) => {
  const { email, name, purpose } = req.headers;
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: emailId,
      pass: password,
    },
  });

  const verificationCode = randomUUID().toString();
  const body = `Hello ${name}, \n\nYour Verification Code for ${purpose} is:\n${verificationCode}`;
  const mailOptions = {
    from: "sender@gmail.com", // Sender address
    to: email, // List of recipients
    subject: `${purpose} Verification Code`, // Subject line
    text: body, // Plain text body
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.json({ status: false, message: error.message });
    } else {
      res.json({
        status: true,
        messageId: info.messageId,
        verificationCode,
      });
    }
  });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
