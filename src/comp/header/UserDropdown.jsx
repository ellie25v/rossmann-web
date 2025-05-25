import { useState } from "react";
import { ChevronDown, User } from "lucide-react";

export default function UserDropdown({ users, selectedUser, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (user) => {
    onSelect(user);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 border rounded-lg  bg-white shadow hover:bg-gray-100"
      >
        <User size={20} />
        <span>{selectedUser.first_name}</span>
        <ChevronDown size={16} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-50">
          {users.map((user, ind) => (
            <button
              key={user.user_id}
              onClick={() => handleSelect(user)}
              className={`flex ${user.user_id ==selectedUser.user_id ? " bg-gray-200": ""} ${ind == 0 ? "rounded-t": ind == users.length-1 ? "rounded-b" : ""}  flex-col items-start w-full px-4 py-2 text-left hover:bg-gray-100`}
            >
              <span className="font-medium">{user.first_name}</span>
              <span className="text-sm text-gray-600">{user.email}</span>
              <span className="text-sm text-gray-500">city: {user.city}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
