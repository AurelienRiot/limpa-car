import GetUser from "@/actions/get-user-server";
import { ContactForm } from "./components/contact-form";

export const metadata = {
  title: "Limpa Car - Contact",
};

export type UserContact = {
  name: string;
  mail: string;
  phone: string;
  subject: string;
  message: string;
};

const ContactPage = async () => {
  const user = await GetUser();

  const userContact: UserContact = {
    name: user?.name ? user.name : "",
    mail: user?.email ? user.email : "",
    phone: user?.phone ? user.phone : "",
    subject: "",
    message: "",
  };

  return (
    <div className="flex-col mt-10">
      <div className="flex flex-col gap-4 mb-6 text-center">
        <h1 className="text-3xl font-bold">{"Secteur d'intervention"}</h1>
        <p>
          RIOT TECH est basé dans le Morbihan (56) et intervient pour les
          installations et SAV sur toute la Bretagne.
        </p>
        <p>Et sur toute la France métropolitaine pour les Box 4G.</p>
      </div>
      <div className="flex-1 p-8 pt-6 space-y-4">
        <ContactForm userContact={userContact} userId={user?.id} />
      </div>
    </div>
  );
};

export default ContactPage;
