import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prismadb from "@/lib/prismadb";
import EmailProvider from "next-auth/providers/email";
import { render } from "@react-email/render";
import WelcomeEmailProvider from "@/components/email/welcome-email-provider";
import { transporter } from "@/lib/nodemailer";
import { User } from "@prisma/client";
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

        if (!u.stripeCustomerId) {
          // Create a new customer in Stripe
          const customer = await stripe.customers.create({
            email: u.email as string,
            name: u.name ? u.name : "",
          });

          const updatedUser = await prismadb.user.update({
            where: { id: u.id },
            data: { stripeCustomerId: customer.id },
          });
          return {
            ...token,
            id: u.id,
            role: u.role,
            stripeCustomerId: updatedUser.stripeCustomerId,
          };
        }
      }
      return token;
    },
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
          stripeCustomerId: token.stripeCustomerId,
        },
      };
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
