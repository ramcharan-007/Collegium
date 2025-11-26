import React from "react";

interface SidebarProps {
  onSelect: (page: string) => void;
  active: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelect, active }) => {
  return (
    <aside className="bg-gray-900 text-white w-64 p-4 min-h-screen space-y-4">
      <h2 className="text-xl font-bold mb-6 text-center border-b border-gray-700 pb-2">
        Admin Menu
      </h2>

      <div>
        <p className="text-gray-400 uppercase text-sm mb-1">College Portal</p>
        <button
          onClick={() => onSelect("approve")}
          className={`block w-full text-left px-3 py-2 rounded ${
            active === "approve" ? "bg-blue-700" : "hover:bg-gray-800"
          }`}
        >
          Approve
        </button>
        <button
          onClick={() => onSelect("add")}
          className={`block w-full text-left px-3 py-2 rounded ${
            active === "add" ? "bg-blue-700" : "hover:bg-gray-800"
          }`}
        >
          Add
        </button>
      </div>

      <div>
        <p className="text-gray-400 uppercase text-sm mb-1">Student Portal</p>
        <button
          onClick={() => onSelect("students")}
          className={`block w-full text-left px-3 py-2 rounded ${
            active === "students" ? "bg-blue-700" : "hover:bg-gray-800"
          }`}
        >
          Manage Students
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
