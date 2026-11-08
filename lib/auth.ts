import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URL as string)
const db = client.db('hireloop-db');

export const auth = betterAuth({
    emailAndPassword: { 
    enabled: true, 
  }, 
   user: {
       additionalFields: {
          role: {
              type: ["seeker","recruiter","admin"],
              input: false
            } 
        }
    },
  socialProviders: { 
    github: { 
      clientId: process.env.GITHUB_CLIENT_ID as string, 
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
    }, 
  }, 
  database: mongodbAdapter(db, {
    client,
  }),
  
});