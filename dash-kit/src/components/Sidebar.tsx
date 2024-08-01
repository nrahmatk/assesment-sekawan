import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
    <div className="w-64 h-screen bg-gray-100 p-4">
      {menuItems.map((item) => (
        <SidebarItem key={item.path} href={item.path} label={item.name} />
      ))}
    </div>
  );
};

export default Sidebar;
