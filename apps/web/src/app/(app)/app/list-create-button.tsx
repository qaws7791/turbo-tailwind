"use client";
import { createEmptyList } from "@/lib/supabase/client/mutations/lists";
import { Button } from "@repo/ui/button";
import { toast } from "@repo/ui/toaster";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ListCreateButton(): JSX.Element {
  const router = useRouter();
  const handleClick = async () => {
    try {
      const list = await createEmptyList();
      toast.success("리스트가 생성되었습니다");
      router.push(`/app/lists/${list.id}`);
    } catch (error) {
      toast.error("리스트 생성에 실패했습니다");
    }
  };

  return (
    <Button onClick={handleClick}>
      <Plus className="mr-2" /> 리스트 추가
    </Button>
  );
}
