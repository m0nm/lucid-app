import { useLocation, useSearchParams } from "react-router-dom";
import { format } from "timeago.js";

import { Note } from "@/types";
import { useGetTag } from "@/hooks";
import { cardActiveStyle } from "@/styles";

import { ContextMenu } from "./ContextMenu";
import { HiOutlineHashtag } from "react-icons/hi";
import { JOYRIDE_NOTE_CARD } from "@/constants/app-tour";

import {
  Heading,
  HStack,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";

export const NoteCard = ({ note }: { note: Note }) => {
  cardActiveStyle.bg = useColorModeValue("red.500", "blue.500");

  const { state } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const isActive = note.id === searchParams.get("noteId");

  const { getTag } = useGetTag();
  const noteTags = note.tagsRef.map((tId) => getTag(tId));

  const onClick = () => {
    setSearchParams({ noteId: note.id }, { state: { ...state, note } });
  };

  return (
    <ContextMenu note={note}>
      <VStack
        id={JOYRIDE_NOTE_CARD}
        flex={1}
        align={"flex-start"}
        minH={"65px"}
        pos={"relative"}
        cursor={"pointer"}
        boxShadow={"base"}
        p={4}
        mb={2}
        _before={isActive ? cardActiveStyle : undefined}
        _hover={{ bg: useColorModeValue("gray.100", "blackAlpha.400") }}
        onClick={onClick}
      >
        <HStack justify={"space-between"} w={"full"}>
          <Heading size="sm" maxW={"90%"} noOfLines={1} title={note.title}>
            {note.title}
          </Heading>

          <Text
            as={"span"}
            fontSize={"xs"}
            whiteSpace={"nowrap"}
            color={"gray.500"}
          >
            {format(note.createdAt)}
          </Text>
        </HStack>

        {/* tags */}
        <HStack align={"center"}>
          {noteTags.map((tag) => (
            <HStack key={tag?.id} spacing={-1}>
              <HiOutlineHashtag size={14} />

              <Text
                as={"span"}
                fontSize={"xs"}
                color={useColorModeValue("blackAlpha.900", "gray.400")}
              >
                {tag?.name},
              </Text>
            </HStack>
          ))}
        </HStack>
      </VStack>
    </ContextMenu>
  );
};
