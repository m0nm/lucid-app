import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Tag } from "@/types";
import { useUpdateTag } from "@/hooks";
import { cardActiveStyle } from "@/styles";

import { ContextMenu } from "./ContextMenu";
import { HiHashtag } from "react-icons/hi";

import {
  HStack,
  useColorModeValue,
  VStack,
  Icon,
  Box,
  Input,
} from "@chakra-ui/react";

export const TagCard = ({ tag }: { tag: Tag }) => {
  cardActiveStyle.bg = useColorModeValue("red.500", "blue.500");

  const navigate = useNavigate();
  const { hash, state } = useLocation();
  const { mutate: onUpdateTag, isLoading } = useUpdateTag(tag.id);

  const isActive = `#${tag.name}` === hash;

  // for input element
  const ref = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<string | undefined>(tag.name);
  const [readOnly, setReadOnly] = useState(true);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const handleRename = () => {
    onUpdateTag(
      { name: value as string },
      {
        onSuccess: (newTag) => {
          setReadOnly(true);
          navigate(`#${newTag.name}`, {
            replace: true,
            state: { ...state, tag: newTag },
          });
        },
      }
    );
  };

  const onKeyDown = (k: KeyboardEvent<HTMLInputElement>) => {
    if (value == "" || value == undefined) return;
    if (k.key === "Enter") {
      handleRename();
    }
  };

  const onBlur = () => {
    if (readOnly) return;
     setReadOnly(true);
  };

  return (
    <ContextMenu tag={tag} inputRef={ref} setReadOnly={setReadOnly}>
      <VStack
        flex={1}
        align={"flex-start"}
        minH={"60px"}
        pos={"relative"}
        cursor={"pointer"}
        boxShadow={"base"}
        p={4}
        mb={2}
        _before={isActive ? cardActiveStyle : undefined}
        _hover={{ bg: useColorModeValue("gray.100", "blackAlpha.400") }}
        onClick={() => navigate(`#${tag.name}`, { state: { ...state, tag } })}
      >
        <Box>
          <HStack spacing={-1} align={"center"}>
            <Icon>
              <HiHashtag size={20} />
            </Icon>

            <Input
              variant={"outline"}
              size={"sm"}
              cursor={"pointer"}
              p={0}
              fontWeight={600}
              border={readOnly ? "hidden" : "ActiveBorder"}
              ref={ref}
              value={value}
              isDisabled={isLoading}
              isReadOnly={readOnly}
              readOnly={readOnly}
              onChange={onChange}
              onKeyDown={onKeyDown}
              onBlur={onBlur}
            />
          </HStack>
        </Box>
      </VStack>
    </ContextMenu>
  );
};
