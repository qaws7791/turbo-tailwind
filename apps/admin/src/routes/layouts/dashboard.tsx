import {
  HomeIcon,
  SquaresPlusIcon,
  TicketIcon,
  UsersIcon,
} from "@heroicons/react/20/solid";
import { cn } from "@repo/ui/utils";
import { Link, Outlet, useLocation } from "react-router";

const PAGES = [
  {
    name: "홈",
    path: "/dashboard",
    icon: <HomeIcon className="size-5" />,
  },
  {
    name: "상품 관리",
    path: "/dashboard/products",
    icon: <SquaresPlusIcon className="size-5" />,
  },
  {
    name: "주문 관리",
    path: "/dashboard/orders",
    icon: <TicketIcon className="size-5" />,
  },
  {
    name: "고객 관리",
    path: "/dashboard/customers",
    icon: <UsersIcon className="size-5" />,
  },
];

export default function DashboardLayout() {
  const location = useLocation();
  console.log(location);
  return (
    <div className="min-h-dvh flex bg-zinc-100">
      <div className="w-64 p-2">
        <h1 className="font-semibold text-lg py-4 px-2">🧑‍💼대시보드</h1>
        <nav className="mt-4">
          <ul className="flex flex-col gap-2">
            {PAGES.map((page) => (
              <li key={page.path}>
                <Link
                  to={page.path}
                  className={cn(
                    "p-2 rounded font-semibold flex text-zinc-500",
                    location.pathname === page.path && "text-zinc-900"
                  )}
                >
                  {page.icon}
                  <span className="ml-2">{page.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <main className="p-2 flex-1">
        <div className="bg-white h-full rounded-xl p-4 border border-zinc-950/10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
