import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "../app/actions/auth/loginUser.js"
import dbConnect, { collectionName } from "./dbConnect.js";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

export const authOptions = {

    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Email", type: "email", placeholder: "enter email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const user = await loginUser(credentials)
                console.log(user)

                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        })
    ],
    pages: {
        signIn: '/login',
        // signOut: '/auth/signout',
        // error: '/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // (used for check email message)
        // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
                        // Console these to check necessary properites
            console.log("from authopt",{ user, account, profile, email, credentials })
            if (account) {
                const { providerAccountId, provider } = account
                const { email: user_email, image, name } = user
                const userCollection = dbConnect(collectionName.userCollection)
                const isExisted = await userCollection.findOne({ providerAccountId })
                if (!isExisted) {
                    const payload = { providerAccountId, provider, email: user_email, image, name, }
                    await userCollection.insertOne(payload)
                }
            }
          return true
        },
        // async redirect({ url, baseUrl }) {
        //   return baseUrl
        // },
        async session({ session, token, user }) {
            if (token) {
                session.user = {
                  id: token.id,
                  email: token.email,
                  name: token.name,
                  image: token.image,
                };
              }
              return session;
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            if (user) {
                token.id = user._id;
                token.email = user.email;
                token.name = user.name;
                token.image = user.image;
              }
          return token
        }
      }

}