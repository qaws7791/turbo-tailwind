"use client";
import { createList } from "@/api/apis/list.api";
import { useCreateListMutation } from "@/feature/lists/hooks/mutations";
import { Button } from "@repo/ui/button";
import { toast } from "@repo/ui/toaster";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ListCreateButton(): JSX.Element {
  const createList = useCreateListMutation();
  const router = useRouter();
  const handleClick = async () => {
    createList.mutate(
      { type: "empty" },
      {
        onSuccess: (list) => {
          toast.success("리스트가 생성되었습니다");
          router.push(`/app/lists/${list.id}`);
        },
        onError: () => {
          toast.error("리스트 생성에 실패했습니다");
        },
      }
    );
  };

  return (
    <Button onClick={handleClick}>
      <Plus className="mr-2" /> 리스트 추가
    </Button>
  );
}
