import { MultiValue } from "chakra-react-select";
import { useEffect, useState } from "react";

import { Note, Option } from "@/types";
import { useCreateTag, useGetTags, useUpdateNote } from "@/hooks";

export const useContextTagsMenu = (note: Note) => {
  const { onUpdateNote } = useUpdateNote(note.id);
  const { mutate: onCreateTag, data: tag } = useCreateTag();

  const { tags } = useGetTags();
  const tagsOptions: Option[] = tags.map((t) => ({
    id: t.id,
    label: t.name,
    value: t.name,
  }));

  const [options, setOptions] =
    useState<MultiValue<Option | undefined>>(tagsOptions);

  useEffect(() => setOptions(tagsOptions), [tags]);

  const onChange = (newTags: MultiValue<Option | undefined>) => {
    setOptions((p) => newTags);

    const ids = newTags.map((tag) => tag!.id);
    onUpdateNote({ tagsRef: ids });
  };

  const onCreate = (value: string) => {
    onCreateTag(value);
    const option = { id: tag!.id, label: tag!.name, value: tag!.name };

    if (tag?.id) {
      setOptions((prev) => prev.concat([option]));
      onUpdateNote({
        tagsRef: note.tagsRef?.concat(tag!.id),
      });
    }
  };

  return { onCreate, onChange, options };
};
