"use client";

import { User } from "@prisma/client";
import CardUser from "./card-user";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Heading } from "@/components/ui/heading";

interface UserClientProps {
  users: User[];
  orderLengths: number[];
  messagesLengths: number[];
}

const UserClient: React.FC<UserClientProps> = ({
  users,
  orderLengths,
  messagesLengths,
}) => {
  const [search, setSearch] = useState("");

  const searchKeys = ["email", "name", "phone"];
  const displayKeys = ["email", "nom", "téléphone"];
  const [selectValue, setSelectValue] = useState(searchKeys[1]);

  const filteredUsers = users.filter((user) => {
    const value = String((user as any)[selectValue]);
    return value.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
      <div className="m-4">
        <Heading
          title={`Clients (${filteredUsers.length})`}
          description="Liste des clients"
        />
        <div className="justify-content-center mt-4 grid grid-cols-1 gap-4 md:grid-cols-6">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Recherche"
          />

          <Select
            defaultValue={selectValue}
            onValueChange={(newValue) => {
              setSelectValue(newValue);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a value" />
            </SelectTrigger>
            <SelectContent>
              {searchKeys.map((key, index) => (
                <SelectItem key={key} value={key}>
                  {String(displayKeys[index])}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 space-y-4 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
          {filteredUsers.map((user, index) => (
            <div key={user.id} className="m-4">
              <CardUser
                user={user}
                orderLength={orderLengths[index]}
                messagesLength={messagesLengths[index]}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserClient;
