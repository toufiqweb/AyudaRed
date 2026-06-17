import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins/jwt";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("Bazaro");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "donor", // Admin, Volunteer, Donor
      },
      status: {
        type: "string",
        defaultValue: "active", // active, blocked
      },
      bloodGroup: {
        type: "string",
        required: true, // A+, A-, B+, B-, AB+, AB-, O+, O-
      },
      district: {
        type: "string",
        required: true,
      },
      upazila: {
        type: "string",
        required: true,
      },
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 60 * 24 * 30,
    },
  },
  plugins: [jwt()],
});
