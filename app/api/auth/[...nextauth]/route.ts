import { NextApiHandler } from 'next';
import NextAuth, { DefaultSession, Profile, Session } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import User from '@/models/user';
import { IUser } from '@/models/user';
import { connectToDB } from '@/lib/database';
import { Types } from 'mongoose';

const handler: NextApiHandler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        })
        
    ],
    callbacks: {
        async session({session}: {session: Session | DefaultSession}) {
            
            if(!session.user?.email) {
              console.log("No Session!")
              return;
            }
        
            const sessionUser = await User.findOne({
              email: session.user?.email
            });
        
            session.user.id = sessionUser?._id.toString();
            return session;
        },
        
        async signIn({  profile }: { profile: Profile}) {
            try {
                await connectToDB();

                const userExists = await User.findOne({
                    email: profile?.email
                });

                if(!userExists) {
                    const newUser: IUser = {
                        _id: new Types.ObjectId(),
                        email: profile?.email,
                        username: profile?.name?.replace(' ', '').toLowerCase(),
                        image: profile?.image || '',
                    }
                    await User.create(newUser)
                }
                return true;
            } catch (error) {
                console.log("Got an error! :", error)
                return false;
            }
        }
    }
})

export { handler as GET, handler as POST };
