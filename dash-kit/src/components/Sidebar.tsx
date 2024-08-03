import React, { useState } from "react";
import SidebarItem from "./SidebarItem";
import { FaBars, FaTimes } from "react-icons/fa";
import { menuItems } from "@/lib/menu";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className="md:hidden fixed top-5 left-8 z-30 text-gray-800"
        onClick={toggleSidebar}
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      <div
        className={`fixed left-0 top-0 w-64 min-h-screen bg-p-gray z-40 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:z-50`}
      >
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

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
}
