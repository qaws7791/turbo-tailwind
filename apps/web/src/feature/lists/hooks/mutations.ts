import {
  createList,
  deleteList,
  reorderList,
  updateList,
  updateListShareState,
} from "@/api/apis/list.api";
import listQueries from "@/feature/lists/hooks/queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateListMutation = () => {
  return useMutation({
    mutationFn: updateList,
  });
};

export const useDeleteListMutation = () => {
  return useMutation({
    mutationFn: deleteList,
  });
};

export const useCreateListMutation = () => {
  return useMutation({
    mutationFn: createList,
  });
};

export const useUpdateListShareStateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateListShareState,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: listQueries.detail(variables.id).queryKey,
      });
    },
  });
};

export const useReorderListMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: reorderList,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: listQueries.detail(variables.id).queryKey,
      });
    },
  });
};
