import { User, ShoppingBasket } from "lucide-react";
import UserDropdown from "./UserDropdown";

export default function Header({
  toggleCart,
  users,
  selectedUser,
  setSelectedUser,
}) {
  return (
    <>
      <header className="flex items-center justify-between px-6 py-4 bg-[#f2e6d9] shadow-sm">
        <div className="text-3xl font-bold text-[#c3012d] tracking-wide">
          <span className="font-serif">ROSS</span>
          <span className="font-sans">MANN</span>
        </div>

        <div className="flex items-center gap-4">
          {/* <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full hover:bg-gray-100 cursor-pointer transition">
            <User size={20} />
          </div> */}

          <UserDropdown
            users={users}
            selectedUser={selectedUser}
            onSelect={(user) => setSelectedUser(user)}
          />
          <div
            onClick={() => toggleCart()}
            className="w-10 h-10 flex items-center justify-center bg-white rounded-full hover:bg-gray-100 cursor-pointer transition"
          >
            <ShoppingBasket size={20} />
          </div>
        </div>
      </header>
    </>
  );
}
