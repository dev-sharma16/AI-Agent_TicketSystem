import { inngest } from "../client.js";
import User from "../../models/user.js"
import { NonRetriableError } from "inngest";
import { sendEmail } from "../../utils/mailer.js";

export const onUserSignUp = inngest.createFunction(
    {id: "on-user-signup", retries: 2},
    {event: "user/signup"},
    
    async ({event, step}) => {
        try {
            const {email} = event.data;
            const user = await step.run("get-user-email", async()=>{
                const userObject = await User.findOne({email})
                
                if (!userObject) {
                    throw new NonRetriableError("User no longer exists in are database");
                }

                return userObject;
            })

            await step.run("send-welcome-email", async()=>{
                const subject = `Welcome to the app`
                const message = `
                    Hi,
                    \n\n
                    Thanks for signing up..!, Glad to have you onBoard!
                `
                await sendEmail(user.email, subject, message)
            })

            return {success:true};
        } catch (error) {
            console.error("❌Error in running steps (on-signup)", error.message);
            return {success:false};
        }
    }
)