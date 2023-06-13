import "./styles-reset.scss";

import { EditorContent } from "@tiptap/react";
import { Box, Input, HStack } from "@chakra-ui/react";
import { JOYRIDE_NOTE_EDITOR, JOYRIDE_NOTE_TITLE } from "@/constants/app-tour";
import { useEditor } from "@/hooks";

import { Toolbar } from "./editor-toolbar/tool-bar";
import { ToggleReadOnly } from "./mode-togglers/ToggleReadOnly";
import { ToggleFocus } from "./mode-togglers/ToggleFocus";

export const EditorPane = () => {
  const { editor, note, updateTitle } = useEditor();

  return (
    editor && (
      <Box p={2} id={JOYRIDE_NOTE_EDITOR}>
        <HStack justifyContent={"flex-end"}>
          <ToggleReadOnly />
          <ToggleFocus />
        </HStack>

        <Input
          id={JOYRIDE_NOTE_TITLE}
          key={note.id}
          defaultValue={note.title}
          onChange={updateTitle}
          size={"lg"}
          variant={"unstyled"}
          my={".5rem"}
          fontSize={"2.23em"}
          fontWeight={700}
        />

        <Toolbar editor={editor} />

        <Box overflowY="auto">
          <EditorContent editor={editor} />
        </Box>
      </Box>
    )
  );
};
