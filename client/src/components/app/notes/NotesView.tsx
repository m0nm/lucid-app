import { useLocation, useSearchParams } from "react-router-dom";
import { Allotment } from "allotment";
import { Stack, Heading } from "@chakra-ui/react";

import { useEditorStore } from "@/store";
import { NotesType } from "@/types";
import { useGetNotes, useCreateNote } from "@/hooks";

import { ListPane } from "../list-pane/ListPane";
import { DeleteTrash } from "./DeleteTrash";
import { PanePlaceholder } from "../pane-placeholder/PanePlaceholder";
import { EditorPane } from "./editor/EditorPane";
import { Helmet } from "react-helmet-async";

const Header = ({ notesType }: { notesType: NotesType }) => {
  return notesType == "trash" ? (
    <Stack
      flex={1}
      direction={"row"}
      justify={"space-between"}
      align={"center"}
    >
      <Heading as={"h3"} fontSize={"2xl"}>
        Trash
      </Heading>

      <DeleteTrash />
    </Stack>
  ) : notesType == "favs" ? (
    <Heading as={"h3"} fontSize={"2xl"}>
      Favorites
    </Heading>
  ) : (
    <Heading as={"h3"} fontSize={"2xl"}>
      َAll Notes
    </Heading>
  );
};

export const NotesView = ({ notesType }: { notesType: NotesType }) => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const { isFocusMode } = useEditorStore();

  const { notes, isLoading } = useGetNotes(notesType);
  const { mutate: onCreateNote, isLoading: isMutationLoading } =
    useCreateNote();

  const showCreateButton =
    !pathname.includes("trash") && !pathname.includes("favs");

  return (
    <>
      <Helmet>
        <title>Lucid | Your notes</title>
      </Helmet>

      <Allotment defaultSizes={[400, 600]}>
        <Allotment.Pane visible={!isFocusMode} minSize={0}>
          <ListPane
            listType="note"
            data={notes}
            dataLoaded={!isLoading}
            hideCreateButton={notesType == "notes" ? false : true}
            onCreateClick={() => onCreateNote(undefined)}
            header={<Header notesType={notesType} />}
            placeholder={
              <PanePlaceholder
                placeholder={notesType}
                size={160}
                onCreateClick={() => onCreateNote(undefined)}
                showCreateButton={showCreateButton}
                isLoadingButton={isMutationLoading}
              />
            }
          />
        </Allotment.Pane>

        <Allotment.Pane>
          {searchParams.get("noteId") ? (
            <EditorPane />
          ) : (
            <Stack justify="center" align={"center"}>
              Click on a note to start editing
            </Stack>
          )}
        </Allotment.Pane>
      </Allotment>
    </>
  );
};
