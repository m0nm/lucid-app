import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useCreateNote, useUpdateTopic, useGetTopicNotes } from "@/hooks";

import { EditorPane } from "../../notes/editor/EditorPane";
import { ListPane } from "../../list-pane/ListPane";
import { PanePlaceholder } from "../../pane-placeholder/PanePlaceholder";

export const TopicView = () => {
  const [searchParams] = useSearchParams();
  const { state } = useLocation();
  const { notebook, topic } = state;

  const { mutate: onCreateNote } = useCreateNote();
  const { getTopicNotes } = useGetTopicNotes();
  const { mutate: onUpdateTopic } = useUpdateTopic();

  const [topicNotes, setTopicNotes] = useState(getTopicNotes(topic.notesRef));

  useEffect(() => {
    setTopicNotes(getTopicNotes(topic.notesRef));
  }, [state]);

  const createTopicNote = () => {
    onCreateNote(undefined, {
      onSuccess: (note) => {
        onUpdateTopic({
          notebookId: notebook.id,
          topicId: topic.id,
          update: { noteId: note.id },
        });

        setTopicNotes([...topicNotes, note]);
      },
    });
  };

  return searchParams.get("noteId") ? (
    <EditorPane />
  ) : (
    <ListPane
      listType={"note"}
      header={topic.name}
      data={topicNotes}
      dataLoaded={Boolean(topicNotes)}
      onCreateClick={createTopicNote}
      placeholder={
        <PanePlaceholder
          placeholder={"topic-notes"}
          onCreateClick={createTopicNote}
          size={160}
        />
      }
    />
  );
};
