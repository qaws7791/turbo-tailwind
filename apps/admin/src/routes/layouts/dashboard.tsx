import {
  Bars3Icon,
  HomeIcon,
  SquaresPlusIcon,
  TagIcon,
  TicketIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { Button } from "@repo/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@repo/ui/drawer";
import { IconButton } from "@repo/ui/icon-button";
import { cn } from "@repo/ui/utils";
import { Link, Outlet, useLocation } from "react-router";

const PAGES = [
  {
    name: "홈",
    path: "/dashboard",
    icon: <HomeIcon className="size-5" />,
  },
  {
    name: "카테고리 관리",
    path: "/dashboard/categories",
    icon: <TagIcon className="size-5" />,
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

function DashBoardSidebar() {
  return (
    <>
      <div className="flex items-center justify-between lg:hidden p-2">
        <Drawer direction="left">
          <DrawerTrigger asChild>
            <IconButton variant="ghost">
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="size-5" />
            </IconButton>
          </DrawerTrigger>
          <DrawerContent direction="left">
            <DrawerHeader>
              <DrawerTitle className="sr-only">대시보드 사이드바</DrawerTitle>
              <DrawerDescription className="sr-only">
                원하는 페이지를 선택하세요.
              </DrawerDescription>
              <div>
                <DrawerClose asChild>
                  <IconButton variant="ghost">
                    <XMarkIcon className="size-5" />
                  </IconButton>
                </DrawerClose>
              </div>
            </DrawerHeader>
            <div>
              <h1 className="font-semibold text-lg py-4 px-2">🧑‍💼대시보드</h1>
              <nav className="mt-4">
                <ul className="flex flex-col">
                  {PAGES.map((page) => (
                    <li key={page.path}>
                      <Link
                        to={page.path}
                        className={cn(
                          "px-2 py-2.5 rounded font-semibold flex text-zinc-500 hover:bg-zinc-200/70",
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
          </DrawerContent>
        </Drawer>
        <Button>user</Button>
      </div>
      <div className="w-64 p-2 hidden lg:block">
        <h1 className="font-semibold text-lg py-4 px-2">🧑‍💼대시보드</h1>
        <nav className="mt-4">
          <ul className="flex flex-col">
            {PAGES.map((page) => (
              <li key={page.path}>
                <Link
                  to={page.path}
                  className={cn(
                    "px-2 py-2.5 rounded font-semibold flex text-zinc-500 hover:bg-zinc-200/70",
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
    </>
  );
}

export default function DashboardLayout() {
  const location = useLocation();
  console.log(location);
  return (
    <div className="min-h-dvh flex lg:bg-zinc-100 flex-col lg:flex-row">
      <DashBoardSidebar />
      <main className="lg:p-2 flex-1">
        <div className="bg-white h-full lg:rounded-xl p-4 lg:border border-zinc-950/10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
