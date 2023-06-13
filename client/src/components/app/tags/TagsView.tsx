import { Allotment } from "allotment";
import { Helmet } from "react-helmet-async";
import { useLocation, useSearchParams } from "react-router-dom";
import { Box, useDisclosure } from "@chakra-ui/react";

import { useGetTags, useGetTagNotes, useCreateNote } from "@/hooks";

import { ListPane } from "../list-pane/ListPane";
import { PanePlaceholder } from "../pane-placeholder/PanePlaceholder";
import { EditorPane } from "../notes/editor/EditorPane";
import { TagCreateModal } from "./TagCreateModal";

export const TagsView = () => {
  const { state, hash } = useLocation();
  const [searchParams] = useSearchParams();
  const { mutate: onCreateNote } = useCreateNote();

  const { tags, isLoading } = useGetTags();

  const tag = state ? state.tag : null;
  const { tagNotes, isLoading: isNotesLoading } = useGetTagNotes(
    tag ? tag.id : undefined
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box h={"100vh"}>
      <Helmet>
        <title>Lucid | Your tags</title>
      </Helmet>

      <Allotment>
        <Allotment.Pane minSize={0} preferredSize={"40%"}>
          <ListPane
            listType={"tag"}
            header={"Tags"}
            data={tags}
            dataLoaded={!isLoading}
            onCreateClick={onOpen}
            placeholder={
              <PanePlaceholder
                size={120}
                placeholder={"tags"}
                onCreateClick={onOpen}
              />
            }
          />
        </Allotment.Pane>

        <Allotment.Pane>
          {searchParams.get("noteId") ? (
            <EditorPane />
          ) : (
            tag &&
            hash.includes(tag.name) && (
              <ListPane
                listType={"note"}
                data={tagNotes}
                dataLoaded={!isNotesLoading}
                onCreateClick={() => onCreateNote(tag.id)}
                header={"Tag Notes"}
                placeholder={
                  <PanePlaceholder
                    size={120}
                    placeholder={"tag-notes"}
                    onCreateClick={() => onCreateNote(tag.id)}
                  />
                }
              />
            )
          )}
        </Allotment.Pane>
      </Allotment>

      <TagCreateModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};
