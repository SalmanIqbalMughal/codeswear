import NextAuth, { NextAuthOpions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import connectDb from "../../../../../middleware/Connect";
import Logins from "../../../../../models/Login";
var CryptoJS = require('crypto-js');

export const authOptions = {

    providers: [

        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Username" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {

                if (credentials && credentials.username && credentials.password) {
                    // Add logic here to look up the user from the credentials supplied
                    connectDb();
                    let user = await Logins.findOne({ "username": credentials.username });
                    // const user = users.find(usr => usr.username === credentials.username)
                    if (user) {
                        const decryptedPassword = CryptoJS.AES.decrypt(user?.password, process.env.AES_SECRET).toString(CryptoJS.enc.Utf8);
                        // Any object returned will be saved in `user` property of the JWT
                        if (decryptedPassword === credentials.password) {
                            // console.log(user);
                            return user
                        }
                    }
                }
                // If you return null then an error will be displayed advising the user to check their details.
                return null

                // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
            },
        })
    ],

    callbacks: {
        async session({ session, token }) {
            session.user = token.user;
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
    },

    secret: process.env.NEXTAUTH_SECRET

}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }