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
    <Link href={href}>
      <p
        className={`block px-4 py-2 rounded-md ${
          isActive
            ? "bg-blue-500 text-white"
            : "text-gray-700 hover:bg-gray-200"
        }`}
      >
        {label}
      </p>
    </Link>
  );
}
