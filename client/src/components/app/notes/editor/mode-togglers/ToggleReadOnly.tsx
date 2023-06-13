import { useEditorStore } from "@/store";
import { Box, IconButton } from "@chakra-ui/react";
import { TbPencil, TbPencilOff } from "react-icons/tb";

export const ToggleReadOnly = () => {
  const { toggleReadOnly, isReadOnly } = useEditorStore();

  return (
    <Box onClick={toggleReadOnly}>
      {isReadOnly ? (
        <IconButton
          colorScheme={"gray"}
          variant={"ghost"}
          aria-label="disable read-only"
          title="disable read-only"
          icon={<TbPencilOff />}
        />
      ) : (
        <IconButton
          colorScheme={"gray"}
          variant={"ghost"}
          aria-label="enable read-only"
          title="enable read-only"
          icon={<TbPencil />}
        />
      )}
    </Box>
  );
};
