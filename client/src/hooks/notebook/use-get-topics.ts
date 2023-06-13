import { useGetNotebooks } from "..";

export const useGetTopics = (notebookId: string) => {
  const { notebooks } = useGetNotebooks();

  const notebook = notebooks?.find((n) => n.id === notebookId);

  return { topics: notebook?.topics ?? [] };
};
