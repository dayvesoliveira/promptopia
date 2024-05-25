import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { connectToDB } from '@utils/database';
import User from '@app/api/models/user';

const nextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET as string,

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  callbacks: {
    async session({ session }: any) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });

      sessionUser.user._id = sessionUser._id.toString();

      return session;
    },

    async signIn({ profile }: any) {
      try {
        await connectToDB();

        // check if a user already exists
        const userExists = await User.findOne({
          email: profile.email,
        });

        // if not, create a new user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name?.replace(' ', '').toLocaleLowerCase(),
            // image: profile.picture,
          });
        }
      } catch (error) {
        console.error(error);
        return false;
      }

      return true;
    },
  },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions };
