import NextAuth, { User, type NextAuthOptions } from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prismadb from "@/lib/prismadb";
import EmailProvider from "next-auth/providers/email";
import { render } from "@react-email/render";
import WelcomeEmailProvider from "@/components/email/welcome-email-provider";
import { transporter } from "@/lib/nodemailer";
import { stripe } from "@/lib/strip";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prismadb),
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    EmailProvider({
      sendVerificationRequest: async ({ identifier: email, url }) => {
        await transporter.sendMail({
          from: "aurelien.r35@gmail.com",
          to: email,
          subject: "Création de votre compte Limpa Car",
          html: render(WelcomeEmailProvider({ url })),
        });
      },
    }),
    GoogleProvider({
      profile(profile: GoogleProfile) {
        return {
          id: profile.sub.toString(),
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        const u = user as User;
        const dbUser = await prismadb.user.findUnique({
          where: { email: u.email as string },
        });
        if (dbUser) {
          if (!dbUser.stripeCustomerId) {
            const customer = await stripe.customers.create({
              email: dbUser.email as string,
              name: dbUser.name ? dbUser.name : "",
            });

            const updatedUser = await prismadb.user.update({
              where: { id: u.id },
              data: { stripeCustomerId: customer.id },
            });
            token.stripeCustomerId = updatedUser.stripeCustomerId;
            token.id = updatedUser.id;
            token.name = updatedUser.name;
            token.role = updatedUser.role;
          } else {
            token.stripeCustomerId = dbUser.stripeCustomerId;
            token.id = dbUser.id;
            token.name = dbUser.name;
            token.role = dbUser.role;
          }
        }
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        return {
          ...session,
          user: {
            ...session.user,
            name: token.name,
            id: token.id,
            role: token.role,
            stripeCustomerId: token.stripeCustomerId,
          },
        };
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
