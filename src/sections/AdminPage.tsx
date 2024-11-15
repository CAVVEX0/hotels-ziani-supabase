"use client";
import { Button } from "@/components/ui/button";
import { Input } from "../components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdminSchema, AdminSchemaType } from "../schema/adminSchema";
import { createUser } from "../actions/createUser";
import { EyeIcon, EyeOff, XIcon } from "lucide-react";
import { deleteUser } from "../actions/deleteUser";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { signOutAction } from "../actions/signOut";

const roles = ["admin", "receptionist"];

type Props = {
  users: any;
};
const AdminPage = ({ users }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm({
    resolver: zodResolver(AdminSchema),
    defaultValues: {
      name: "",
      password: "",
      role: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["create_user"],
    mutationFn: createUser,
    onSuccess: async (data) => {
      if (data?.success) {
        toast.success("Utilisateur créé avec succès!");
        await signOutAction();
      } else {
        toast.error("l'utilisateur existe déjà!");
      }
    },
  });

  const onSubmit = (values: AdminSchemaType) => {
    if (!values.name || !values.password || !values.role) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }
    mutate(values);
  };

  const deleteUSer = async (id: string) => {
    deleteUser(id);
    toast.success("Utilisateur supprimé avec succès.");
  };

  return (
    <div className="bg-white shadoww min-h-[600px] rounded-[37px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 place-items-center min-h-[600px] relative pb-9 mb-4">
        <div className="absolute top-12 left-9 hidden lg:flex items-center gap-x-3">
          <h1 className="text-4xl font-realce uppercase">créer</h1>
          <h1 className="text-4xl font-realce uppercase text-orange-600">ou</h1>
          <h1 className="text-4xl font-realce uppercase">supprimer</h1>
          <h1 className="text-4xl font-realce uppercase">utilisateur</h1>
        </div>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-1 h-full w-full flex flex-col items-center justify-center p-8 gap-y-4 "
        >
          <Input
            placeholder="Name..."
            {...form.register("name")}
            className="bg-gray-300"
          />
          <div className="w-full relative">
            <Input
              placeholder="Password..."
              {...form.register("password")}
              type={showPassword ? "text" : "password"}
              className="bg-gray-300"
            />
            {showPassword ? (
              <EyeIcon
                className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-700 h-full "
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <EyeOff
                className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-700 h-full"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>
          <Select onValueChange={(value) => form.setValue("role", value)}>
            <SelectTrigger className="w-full bg-gray-300">
              <SelectValue placeholder="Users" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((user: any, idx: number) => {
                return (
                  <SelectItem key={idx} value={user} className="capitalize">
                    {user}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <Button className="w-full" disabled={isPending}>
            {isPending ? "Ajout en cours..." : "Ajouter"}
          </Button>
        </form>
        <div className="flex-1 h-full w-full">
          <div className="flex justify-center flex-col h-full px-8 gap-3">
            {users?.map((user: any) => (
              <div
                key={user.id}
                className="border p-2.5 rounded flex items-center justify-between"
              >
                <h1 className="capitalize text-[15px] flex-1">
                  {user.username}
                </h1>
                <div className="flex-1">
                  <p className="text-center text-[15px]">{user.role}</p>
                </div>
                <div className="flex-1 flex justify-end">
                  <Button
                    className="size-6 "
                    size={"icon"}
                    variant={"destructive"}
                    onClick={() => deleteUSer(user.id)}
                  >
                    <XIcon />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
