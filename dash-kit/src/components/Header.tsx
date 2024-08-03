import { getTitleFromPath } from "@/lib/menu";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaSearch, FaBell } from "react-icons/fa";
import { LuSearch } from "react-icons/lu";
import { FiSearch } from "react-icons/fi";

export default function Header() {
  const pathname = usePathname();
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    const title = getTitleFromPath(pathname);
    setPageTitle(title);
  }, [pathname]);

  return (
    <div className="fixed top-0 bg-[#f7f8fc] z-10 flex w-full md:w-[calc(100%-16rem)] justify-between items-center p-8 h-14 md:h-28">
      <div className="ms-12 md:ms-0 font-medium text-xl md:text-2xl">
        {pageTitle}
      </div>
      <div className="flex">
        <div className="flex items-center">
          <FaSearch className="text-gray-400 h-4 w-4 mx-2" />
          <FaBell className="text-gray-400 h-4 w-4" />
        </div>
        <span className="h-10 w-0.5 bg-gray-300 mx-5"></span>
        <div className="flex items-center">
          <div className="hidden md:block">Username</div>
          <Image
            src="/user-profile.png"
            alt="profile"
            width={40}
            height={40}
            className="rounded-full ms-2"
          />
        </div>
      </div>
    </div>
  );
}
