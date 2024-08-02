import React from "react";
import SidebarItem from "./SidebarItem";

const menuItems = [
  { name: "Overview", path: "/dashboard/overview" },
  { name: "Tickets", path: "/dashboard/tickets" },
  { name: "Ideas", path: "/dashboard/ideas" },
  { name: "Contacts", path: "/dashboard/contacts" },
  { name: "Agents", path: "/dashboard/agents" },
  { name: "Articles", path: "/dashboard/articles" },
  { name: "Settings", path: "/dashboard/settings" },
  { name: "Subscription", path: "/dashboard/subscription" },
];

const Sidebar: React.FC = () => {
  return (
    <div className="sticky top-0 w-64 h-screen bg-p-gray">
      <div className="flex flex-row items-center justify-center mt-10 mb-14">
        <div className="bg-p-blue h-8 w-8 rounded-full flex items-center justify-center me-3">
          <span className="text-white text-xl font-bold">D</span>
        </div>
        <h2 className="text-lg font-medium text-gray-300">Dashboard Kit</h2>
      </div>
      {menuItems.map((item) => (
        <SidebarItem key={item.path} href={item.path} label={item.name} />
      ))}
    </div>
  );
};

export default Sidebar;
