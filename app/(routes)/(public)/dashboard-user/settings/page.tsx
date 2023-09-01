import GetUser from "@/actions-server/get-user";
import { redirect } from "next/navigation";
import { UserForm } from "./components/user-form";

const SettingsPage = async () => {
  const user = await GetUser();
  if (!user) redirect("/login");

  const { orders, messages, ...formatedUser } = user;

  return (
    <div className="flex-col p-8 pt-6">
      <UserForm initialData={formatedUser} />
    </div>
  );
};

export default SettingsPage;
