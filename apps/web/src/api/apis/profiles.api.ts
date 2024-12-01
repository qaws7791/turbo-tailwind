import httpClient from "@/api/http-client";

export interface UploadProfileAvatarRequest {
  file: File;
}

export interface UploadProfileAvatarResponse {
  path: string;
}

export function uploadProfileAvatar({ file }: UploadProfileAvatarRequest) {
  const formData = new FormData();
  formData.append("file", file);

  return httpClient
    .post<UploadProfileAvatarResponse>(`profiles/upload`, {
      body: formData,
    })
    .json();
}

export function updateProfile(body: { avatar_url?: string }) {
  return httpClient
    .patch(`profiles`, {
      json: body,
    })
    .json();
}
