import { uploadProfileAvatar } from "@/api/apis/profiles.api";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/avatar";
import { Button } from "@repo/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/dialog";
import { Input } from "@repo/ui/input";
import { useRef, useState } from "react";

interface ProfileEditDialogProps {
  user: {
    name: string;
    avatar: string;
  };
}

export default function ProfileEditDialog({
  user,
}: ProfileEditDialogProps): JSX.Element {
  const [avatar, setAvatar] = useState<string | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const handleChooseAvatar = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const data = await uploadProfileAvatar({ file });
        setAvatar(data.path);
      } catch (error) {
        console.error("Failed to upload avatar", error);
      }
    }
  };

  const handleSaveProfile = async () => {
    const body: { avatar_url?: string } = {};
    if (avatar) {
      body.avatar_url = avatar;
    }
    try {
      await fetch("/api/profiles", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error("Failed to save profile", error);
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>프로필 수정하기</DialogTitle>
        <DialogDescription>
          여러분의 프로필을 수정할 수 있습니다.
        </DialogDescription>
      </DialogHeader>
      <div className="flex gap-4 py-4 flex-col items-center">
        <Avatar className="w-24 h-24">
          <AvatarImage alt={user.name} src={avatar || user.avatar} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <Input
          type="file"
          id="avatar"
          name="avatar"
          accept="image/png, image/jpeg"
          className="mt-4"
          hidden
          onChange={handleChooseAvatar}
          ref={avatarInputRef}
        />
        <Button onClick={() => avatarInputRef.current?.click()}>
          프로필 사진 선택하기
        </Button>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="ghost">취소</Button>
        </DialogClose>
        <DialogClose asChild>
          <Button type="button" onClick={handleSaveProfile}>
            저장하기
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
