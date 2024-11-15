import { format } from "date-fns";
import { DashSoinShecmaType } from "../schema/soinSchema";
import Paye from "./confirmDelete/Paye";
import Cancel from "./confirmDelete/Cancel";
import { cn } from "@/utils/cn";
import { getColorByUser } from "@/hooks/useColor";

type Props = {
  soin: DashSoinShecmaType;
  role: string;
  handlePay: (id: string) => void;
  handleDelete: (id: string) => void;
};

const AllDataTable = ({ soin, role, handlePay, handleDelete }: Props) => {
  const userColor = getColorByUser(soin.user); // Get color based on user name

  return (
    <div
      className={cn(
        "grid px-4 border-b py-3 text-sm hover:bg-gray-100",
        role === "admin" ? "grid-cols-12" : "grid-cols-11"
      )}
    >
      <div className={`flex items-center justify-center `}>
        <span
          className={cn(
            "size-6 flex items-center justify-center rounded-full text-[14px] border border-black uppercase"
          )}
          style={{ backgroundColor: userColor, color: "#fff" }}
        >
          {soin.user.slice(0, 2)}
        </span>
      </div>
      <div className="flex items-center justify-center relative capitalize">
        <span className="ml-3 text-center">{soin.name}</span>
      </div>
      <div className="flex items-center justify-center text-center capitalize">
        {soin.hotel}
      </div>
      <div className="flex items-center justify-center">{soin.reception}</div>
      <div className="flex items-center justify-between px-2">
        <span className="text-[13px] font-mono bg-blue-300 h-5 w-5 border border-black font-semibold text-blue-800 flex items-center justify-center rounded-full">
          {soin.salam}
        </span>
        <span className="text-[13px] font-mono bg-green-300 h-5 w-5 border border-black font-semibold text-green-800 flex items-center justify-center rounded-full">
          {soin.istanbul}
        </span>
        <span className="text-[13px] font-mono bg-red-300 h-5 w-5 border border-black font-semibold text-rose-800 flex items-center justify-center rounded-full">
          {soin.orient}
        </span>
      </div>
      <div className="flex items-center justify-center">{soin.price} DH</div>
      <div className="flex items-center justify-center">
        {format(new Date(soin.created_at), "dd/MM/yyyy, HH:mm")}
      </div>
      <div className="flex items-center justify-center">
        {soin.taxi && (
          <span className="bg-yellow-400 px-3 py-0.5  border border-black">
            Taxi
          </span>
        )}
      </div>
      <div className="flex items-center justify-center">
        {soin.paidBy ? (
          <div className="bg-rose-300 px-3  py-0.5 border border-black capitalize">
            {soin.paidBy}
          </div>
        ) : (
          <div>NonPayé</div>
        )}
      </div>
      <div className="flex items-center justify-center">
        {soin.paidBy && (
          <div>{format(new Date(soin.updated_at), "dd/MM/yyyy")}</div>
        )}
      </div>
      <div className="flex items-center justify-center">
        <Paye soin={soin} handlePay={handlePay} />
      </div>
      {role === "admin" && (
        <div className="flex items-center justify-center">
          <Cancel soin={soin} handleDelete={handleDelete} />
        </div>
      )}
    </div>
  );
};

export default AllDataTable;
