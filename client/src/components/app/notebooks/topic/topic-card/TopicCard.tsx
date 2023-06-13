import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Input, Text, HStack, useColorModeValue } from "@chakra-ui/react";

import { Topic } from "@/types";
import { useUpdateTopic } from "@/hooks";
import { cardActiveStyle } from "@/styles";
import { ContextMenu } from "./ContextMenu";

export const TopicCard = ({ topic }: { topic: Topic }) => {
  cardActiveStyle.bg = useColorModeValue("red.500", "blue.500");

  const { mutate: onUpdateTopic, isLoading } = useUpdateTopic();

  const navigate = useNavigate();
  const { state, pathname } = useLocation();
  const notebookId = state && state.notebook.id;
  const isActive = pathname.includes(topic.id);

  // for input element
  const ref = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<string>(topic.name);
  const [readOnly, setReadOnly] = useState(true);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const handleRename = () => {
    if (value && notebookId) {
      onUpdateTopic(
        { notebookId, topicId: topic.id, update: { name: value } },
        {
          onSuccess: () => {
            setReadOnly(true);
          },
        }
      );
    }
  };

  const onKeyDown = (k: KeyboardEvent<HTMLInputElement>) => {
    if (value == "") return;
    if (k.key === "Enter") {
      handleRename();
    }
  };

  const onBlur = () => {
    if (readOnly) return;
    if (value == "") return;
    handleRename();
  };

  return (
    <ContextMenu topic={topic} inputRef={ref} setReadOnly={setReadOnly}>
      <HStack
        minH={"40px"}
        pos={"relative"}
        flex={1}
        p={4}
        mb={2}
        cursor={"pointer"}
        boxShadow={"base"}
        _before={isActive ? cardActiveStyle : undefined}
        _hover={{ bg: useColorModeValue("gray.100", "blackAlpha.400") }}
        onClick={() => navigate(topic.id, { state: { ...state, topic } })}
      >
        <Input
          variant={readOnly ? "unstyled" : "outline"}
          size={"sm"}
          cursor={"pointer"}
          p={0}
          fontWeight={600}
          border={readOnly ? "hidden" : "ActiveBorder"}
          value={value}
          ref={ref}
          isDisabled={isLoading}
          isReadOnly={readOnly}
          readOnly={readOnly}
          onChange={onChange}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
        />
      </HStack>
    </ContextMenu>
  );
};
