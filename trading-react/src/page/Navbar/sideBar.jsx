import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import {
  Home,
  LayoutDashboard,
  Bookmark,
  BarChart3,
  Wallet,
  Landmark,
  Archive,
  CircleUser,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const menu = [
  { name: "Home", path: "/", icon: <Home className="w-6 h-6" /> },
  {
    name: "Portfolio",
    path: "/portfolio",
    icon: <LayoutDashboard className="w-6 h-6" />,
  },
  {
    name: "Watchlist",
    path: "/watchlist",
    icon: <Bookmark className="w-6 h-6" />,
  },
  {
    name: "Activity",
    path: "/activity",
    icon: <BarChart3 className="w-6 h-6" />,
  },
  {
    name: "Wallet",
    path: "/wallet",
    icon: <Wallet className="w-6 h-6" />,
  },
  {
    name: "Payment Details",
    path: "/payment_details",
    icon: <Landmark className="w-6 h-6" />,
  },
  {
    name: "Withdrawal",
    path: "/withdrawal",
    icon: <Archive className="w-6 h-6" />,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: <CircleUser className="w-6 h-6" />,
  },
  { name: "Logout", path: "/", icon: <LogOut className="w-6 h-6" /> },
];

const SideBar = () => {
  const navigate=useNavigate()


  return (
    <div className="flex h-full flex-col justify-between px-0 py-0">
      <div className="space-y-1 pt-2">
        {menu.slice(0, 8).map((item) => (
          <div key={item.name}>
            <SheetClose className="w-full">
              <Button
                variant="ghost"
                className="flex items-center justify-start gap-5 py-6 px-8 w-full rounded-none border-0 bg-transparent shadow-none hover:bg-white/10"
                onClick={() => navigate(item.path)}
              >
                <span className="w-8 flex items-center justify-center text-white">
                  {item.icon}
                </span>
                <p className="font-medium text-[15px] text-white">
                  {item.name}
                </p>
              </Button>
            </SheetClose>
          </div>
        ))}
      </div>
      <div className="mt-auto pb-4">
        <SheetClose className="w-full">
          <Button
            variant="ghost"
            className="flex items-center justify-start gap-5 py-6 px-8 w-full rounded-none border-0 bg-transparent shadow-none hover:bg-white/10"
          >
            <span className="w-8 flex items-center justify-center text-white">
              {menu[8].icon}
            </span>
            <p className="font-medium text-[15px] text-white">
              {menu[8].name}
            </p>
          </Button>
        </SheetClose>
      </div>
    </div>
  );
};

export default SideBar;