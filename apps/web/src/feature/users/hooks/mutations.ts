import { updateProfile, uploadProfileAvatar } from "@/api/apis/profiles.api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useUploadProfileAvatar = () => {
  return useMutation({
    mutationFn: uploadProfileAvatar,
    onSuccess: () => {},
  });
};

export const useUpdateProfile = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      router.refresh();
    },
  });
};
