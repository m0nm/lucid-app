import { Editor as EditorType } from "@tiptap/react";
import { Box, ButtonGroup, HStack, useColorModeValue } from "@chakra-ui/react";
import { JOYRIDE_EDITOR_TOOLS } from "@/constants/app-tour";

import { HeadingsMenu } from "./headings-menu";
import { Marks } from "./marks";
import { Listers } from "./listers";
import { MoreOptions } from "./more-options";
import { UndoRedo } from "./undo-redo";
import { Aligners } from "./aligners";

export interface MenuItemProps {
  editor: EditorType;
  bgStyle?: string | string;
}

export const Toolbar = ({ editor }: { editor: EditorType | null }) => {
  if (!editor) return null;

  const bgStyle = useColorModeValue("gray.200", "gray.600");

  return (
    <HStack mb={4} id={JOYRIDE_EDITOR_TOOLS}>
      <ButtonGroup
        variant="outline"
        colorScheme={"gray"}
        size={"sm"}
        w={"full"}
      >
        <Marks editor={editor} bgStyle={bgStyle} />

        <HeadingsMenu editor={editor} bgStyle={bgStyle} />

        <Listers editor={editor} />

        <Aligners editor={editor} />

        <MoreOptions editor={editor} bgStyle={bgStyle} />

        <Box style={{ marginLeft: "auto" }}>
          <UndoRedo editor={editor} />
        </Box>
      </ButtonGroup>
    </HStack>
  );
};
