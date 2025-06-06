import nodemailer from "nodemailer";

export const sendEmail = async(to,subject,text)=>{
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_SMTP_HOST,
            port: process.env.MAILTRAP_SMTP_PORT,
            secure: false, // true for 465, false for other ports //TODO: remove this later in deployment
            auth: {
              user: process.env.MAILTRAP_SMTP_USER,
              pass: process.env.MAILTRAP_SMTP_PASS,
            },
        });

        const info = await transporter.sendMail({
          from: '"Inngest Transport Mail Service"' ,
          to,
          subject,
          text,
        //   html: "<b>Hello world?</b>", // HTML body  TODO: for now html is axtive later you can active
        });

        console.log("Message Sent : ",info.messageId);
        return info;

    } catch (error) {
        console.error("❌Error in sending Email : ", error);
        throw error;
    }
}