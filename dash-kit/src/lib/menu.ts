interface MenuItem {
    name: string;
    path: string;
  }
  
  export const menuItems: MenuItem[] = [
    { name: "Overview", path: "/overview" },
    { name: "Tickets", path: "/tickets" },
    { name: "Ideas", path: "/ideas" },
    { name: "Contacts", path: "/contacts" },
    { name: "Agents", path: "/agents" },
    { name: "Articles", path: "/articles" },
    { name: "Settings", path: "/settings" },
    { name: "Subscription", path: "/subscription" },
  ];
  
  export const getTitleFromPath = (path: string): string => {
    const menuItem = menuItems.find((item) => item.path === path);
    return menuItem ? menuItem.name : "Default Title";
  };
  