import { createLink, deleteLink, updateLink } from "@/api/apis/link.api";
import linkQueries from "@/feature/links/hooks/queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateLinkMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createLink,
    onSuccess: (_, { listId }) => {
      queryClient.invalidateQueries({
        queryKey: linkQueries.list(listId).queryKey,
      });
    },
  });
};

export const useDeleteLinkMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteLink,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: linkQueries.lists(),
      });
    },
  });
};

export const useUpdateLinkMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateLink,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: linkQueries.lists(),
      });
    },
  });
};
