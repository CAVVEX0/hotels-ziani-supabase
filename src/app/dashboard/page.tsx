import AddSoin from "@/src/components/AddSoin";
import DashPage from "@/src/sections/DashPage";
import { createClient } from "@/utils/supabase/server";
import { format } from "date-fns";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/login");
  }

  const { data: soins } = await supabase
    .from("soins")
    .select("*")
    .order("created_at", { ascending: true })
    .gte("created_at", new Date().toISOString().split("T")[0]);
  const { data: hotels } = await supabase
    .from("hotels")
    .select("*")
    .order("name", { ascending: true });

  if (!soins) {
    return (
      <div className="py-9">
        <div className="bg-white min-h-[500px] rounded-[37px] shadoww border border-gray-300 relative pb-[4rem] flex items-center justify-center">
          Loading...
        </div>
      </div>
    );
  }

  if (!hotels) {
    return null;
  }

  return (
    <div className="flex flex-col gap-y-4 ">
      <AddSoin hotelsData={hotels} />
      <DashPage soins={soins} />
    </div>
  );
};

export default Dashboard;
