"use client";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex bg-[#f7f8fc]">
      <Sidebar />
      <div className="flex flex-col flex-1 md:ml-64 mt-14 md:mt-28">
        <Header />
        {children}
      </div>
    </div>
  );
}
