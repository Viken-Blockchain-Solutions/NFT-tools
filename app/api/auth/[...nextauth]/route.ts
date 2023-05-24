import NextAuth, { Session } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google';
import User from '@/models/user';
import { connectToDB } from '@/lib/database';


const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: '197370458766-c79s1gkou5074enuvkkr8lrgrv5fed3u.apps.googleusercontent.com',
            clientSecret: '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'
        })
    ],
    callbacks: {

    async session({ session }) {

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
                    image: profile?.image
                })
            }
            return true;
        } catch (error) {
            console.log(error)
            return false;
        }
    }
    }
})

export { handler as GET, handler as POST };