import { useCallback, useEffect, useState } from "react";
import { ActionMeta, MultiValue, OnChangeValue } from "chakra-react-select";
import { Option } from "@/types";
import { useGetTopics, useCreateTopic, useUpdateTopic } from "@/hooks";
import toast from "react-hot-toast";

export const useContextTopics = (notebookId: string, noteId: string) => {
  const { mutate: onCreateTopic } = useCreateTopic();
  const { mutateAsync: onUpdateTopic } = useUpdateTopic();
  const { topics } = useGetTopics(notebookId);

  const [value, setValue] = useState<MultiValue<Option>>([]);
  const [isTopicUpdating, setIsTopicUpdating] = useState(false);

  // to get topics assigned to this note
  useEffect(() => {
    if (notebookId && topics) {
      const newValue = topics
        .filter((t) => t.notesRef.includes(noteId))
        .map((t) => ({
          id: t.id,
          label: t.name,
          value: t.name,
        }));

      setValue(newValue);
    }
  }, [notebookId]);

  const clearTopicsValue = () => {
    setValue([]);
  };

  const getTopicsOptions = useCallback(() => {
    if (!notebookId || !topics) return [];

    return topics.map((t) => ({
      id: t.id,
      label: t.name,
      value: t.name,
    }));
  }, [topics, notebookId]);

  const onChange = (
    newValue: OnChangeValue<Option, true>,
    { action, removedValue }: ActionMeta<Option>
  ) => {
    setValue((prev) => newValue);

    // unassign note from topic
    if (
      action === "remove-value" ||
      action === "pop-value" ||
      action === "deselect-option"
    ) {
      setIsTopicUpdating(true);

      const topic = topics?.find((t) => t.id === removedValue?.id);
      const newNotesRef = topic!.notesRef.filter((nId) => nId !== noteId);

      onUpdateTopic({
        notebookId,
        topicId: topic!.id,
        update: { notesRef: newNotesRef },
      }).then(() => {
        toast.success(`note detached from topic ${topic?.name}`);
        setIsTopicUpdating(false);
      });
    }
  };

  const onCreate = (topicName: string) => {
    onCreateTopic(
      { notebookId, topicName },
      {
        onSuccess: (topic) => {
          if (topic) {
            const newOption: Option = {
              id: topic.id,
              label: topic.name,
              value: topic.name,
            };

            setValue((prev) => prev.concat([newOption]));
          }
        },
      }
    );
  };

  const addNoteRef = async () => {
    setIsTopicUpdating(true);

    const ids = value.map((topic) => topic.id);

    for (const topicId of ids) {
      const isSuccess = await onUpdateTopic({
        notebookId,
        topicId,
        update: { noteId },
      });

      if (isSuccess) continue;
    }

    toast.success(`note linked to topics: ${value.map((t) => `${t.label}, `)}`);
    setIsTopicUpdating(false);

    return !isTopicUpdating;
  };

  return {
    topicsValue: value,
    isTopicUpdating,
    getTopicsOptions,
    onTopicsChange: onChange,
    onTopicCreate: onCreate,
    addNoteRef,
    clearTopicsValue,
  };
};
