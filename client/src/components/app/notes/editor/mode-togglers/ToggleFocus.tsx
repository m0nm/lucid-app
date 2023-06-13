import { useEditorStore } from "@/store";
import { Box, IconButton } from "@chakra-ui/react";
import { AiFillEye, AiOutlineEyeInvisible } from "react-icons/ai";

export const ToggleFocus = () => {
  const { toggleFocusMode, isFocusMode } = useEditorStore();

  return (
    <Box onClick={toggleFocusMode}>
      {isFocusMode ? (
        <IconButton
          colorScheme={"gray"}
          variant={"ghost"}
          aria-label="normal mode"
          title="normal mode"
          icon={<AiOutlineEyeInvisible />}
        />
      ) : (
        <IconButton
          colorScheme={"gray"}
          variant={"ghost"}
          aria-label="focus mode"
          title="focus mode"
          icon={<AiFillEye />}
        />
      )}
    </Box>
  );
};
