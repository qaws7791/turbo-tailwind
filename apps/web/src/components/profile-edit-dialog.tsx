import {
  useUpdateProfile,
  useUploadProfileAvatar,
} from "@/feature/users/hooks/mutations";
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
  onClose: () => void;
}

export default function ProfileEditDialog({
  user,
  onClose,
}: ProfileEditDialogProps): JSX.Element {
  const [avatar, setAvatar] = useState<string | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const uploadProfileAvatar = useUploadProfileAvatar();
  const updateProfile = useUpdateProfile();

  const handleChooseAvatar = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadProfileAvatar.mutate(
        { file },
        {
          onSuccess: (data) => {
            setAvatar(data.path);
          },
        }
      );
    }
  };

  const handleSaveProfile = async () => {
    const body: { avatar_url?: string } = {};
    if (avatar) {
      body.avatar_url = avatar;
    }
    updateProfile.mutate(body, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const isAnyPending = uploadProfileAvatar.isPending || updateProfile.isPending;

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
          <AvatarImage
            alt={user.name}
            src={avatar || user.avatar}
            className="object-cover"
          />
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
        <Button
          onClick={() => avatarInputRef.current?.click()}
          disabled={isAnyPending}
        >
          {uploadProfileAvatar.isPending ? "업로드 중..." : "프로필 사진 변경"}
        </Button>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="ghost">취소</Button>
        </DialogClose>
        <Button
          type="button"
          onClick={handleSaveProfile}
          disabled={updateProfile.isPending}
        >
          저장하기
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
