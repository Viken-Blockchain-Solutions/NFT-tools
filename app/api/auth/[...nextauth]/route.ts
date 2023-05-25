import NextAuth, { Session } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google';
import User from '@/models/user';
import { connectToDB } from '@/lib/database';


const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            /* profile(profile) {
                return {
                    id: profile.id,
                    name: profile.name,
                    email: profile.email,
                    image: profile.image,
                } 
            },
            */
        })
    ],
    callbacks: {

        async session({ session }: { session: any }) {

            if(!session.user) {
                console.log("No Session!")
                return;
            }

            const sessionUser = await User.findOne({
                email: session?.user?.email
            });

            session.user.id = sessionUser._id.toString();
            return session;
        },
        
        async signIn({ profile }) {
            try {
                await connectToDB();

                const userExists = await User.findOne({
                    email: profile?.email
                });
                
                if(!userExists) {
                    await User.create({
                        email: profile?.email,
                        username: profile?.name?.replace(' ', '').toLowerCase(),
                        image: profile?.image,
                    })
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