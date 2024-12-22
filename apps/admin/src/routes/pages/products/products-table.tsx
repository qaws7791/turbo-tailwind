import { ArrowDownIcon, EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/dropdown-menu";
import { IconButton } from "@repo/ui/icon-button";
import { cn } from "@repo/ui/utils";
import { ColumnDef } from "@tanstack/react-table";
import DynamicTable from "../../../components/dynamic-table";
import { PRODUCTS } from "../../../mocks/data/products";

export type Product = {
  id: number;
  image: string;
  name: string;
  brand: string;
  modelName: string;
  status: string;
  category: {
    id: number;
    name: string;
  };
  price: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
};

export const columns: ColumnDef<Product>[] = [
  {
    header: ({ column }) => {
      const isASC = column.getIsSorted() === "asc";
      return (
        <button
          className="flex items-center flex-nowrap text-nowrap h-full px-2 hover:bg-zinc-100 rounded-md"
          onClick={() => column.toggleSorting(isASC)}
        >
          상품 ID
          <ArrowDownIcon
            className={cn(
              "size-4 ml-2 transition-transform duration-200",
              isASC ? "transform rotate-0" : "transform rotate-180"
            )}
          />
        </button>
      );
    },
    accessorKey: "id",
    cell: (props) => <span className="ml-4">{props.row.original.id}</span>,
  },
  {
    accessorKey: "image",
    header: () => <div>이미지</div>,
    cell: (props) => (
      <img
        src={props.row.original.image}
        alt={props.row.original.name}
        className="w-20 h-20 object-cover rounded"
      />
    ),
  },
  {
    header: "카테고리",
    accessorKey: "category",
    cell: (props) => <span>{props.row.original.category.name}</span>,
  },
  {
    header: "브랜드",
    accessorKey: "brand",
  },
  {
    header: "모델명",
    accessorKey: "modelName",
  },
  {
    header: "상품명",
    accessorKey: "name",
  },
  {
    header: "상태",
    accessorKey: "status",
  },
  {
    header: "가격",
    accessorKey: "price",
    cell: (props) => {
      const formattedPrice = new Intl.NumberFormat("ko-KR", {
        style: "currency",
        currency: "KRW",
      }).format(props.row.original.price);

      return <span>{formattedPrice}</span>;
    },
  },
  {
    header: "재고",
    accessorKey: "stock",
  },
  {
    header: "생성일",
    accessorKey: "createdAt",
    cell: (props) => {
      const formattedDate = new Date(
        props.row.original.createdAt
      ).toLocaleDateString();
      return <span>{formattedDate}</span>;
    },
  },
  {
    header: "메뉴",
    accessorKey: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <IconButton variant="ghost">
            <EllipsisVerticalIcon className="size-5" />
          </IconButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" forceMount>
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <button className="w-full">수정하기</button>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <button className="w-full">삭제하기</button>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

export default function ProductsTable() {
  const data = PRODUCTS;
  return <DynamicTable data={data} columns={columns} />;
}
