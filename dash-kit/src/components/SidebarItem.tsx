import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItemProps {
  href: string;
  label: string;
}

export default function SidebarItem({ href, label }: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className="flex h-14 items-center">
      {isActive && <div className="bg-white h-full w-1"></div>}
      <p
        className={`flex items-center h-full w-full px-7 ${
          isActive
            ? "bg-[#3e4049] text-slate-100"
            : "text-gray-500 hover:bg-[#3e4049] hover:text-gray-400"
        }`}
      >
        {label}
      </p>
    </Link>
  );
}
