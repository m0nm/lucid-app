import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import { Notebook, Topic } from "@/types";
import { ContextMenu } from "./ContextMenu";

import {
  VStack,
  HStack,
  Heading,
  Text,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";

export const NotebookCard = ({ notebook }: { notebook: Notebook }) => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const date = moment(notebook.createdAt).format("MMM DD, YYYY");
  const topicsCount = notebook.topics.length;
  const notesCount = notebook.topics.reduce(
    (acc, curr) => acc + curr.notesRef.length,
    0
  );

  const onClick = () =>
    navigate(notebook.id, {
      state: { ...state, notebook: { id: notebook.id, name: notebook.name } },
    });

  const onTopicClick = (topic: Topic) => {
    navigate(`${notebook.id}/${topic.id}`, {
      state: {
        ...state,
        notebook: { id: notebook.id, name: notebook.name },
        topic,
      },
    });
  };

  return (
    <ContextMenu notebook={notebook}>
      <VStack
        flex={1}
        align={"flex-start"}
        minH={"60px"}
        pos={"relative"}
        cursor={"pointer"}
        boxShadow={"base"}
        p={4}
        mb={2}
        _hover={{ bg: useColorModeValue("gray.100", "blackAlpha.400") }}
        onClick={onClick}
      >
        <HStack justify={"space-between"} w={"full"}>
          <Heading size="sm" maxW={"90%"} noOfLines={1} title={notebook.name}>
            {notebook.name}
          </Heading>

          <Text
            as={"span"}
            fontSize={"xs"}
            whiteSpace={"nowrap"}
            color={"gray.500"}
          >
            {topicsCount} topics - {notesCount} notes - {date}
          </Text>
        </HStack>

        <HStack justify={"space-between"}>
          {notebook.topics.map((topic) => (
            <Button
              key={topic.id}
              variant={"outline"}
              size={"xs"}
              transform={"scale(.9)"}
              fontSize={"xs"}
              fontWeight={300}
              border={"1px solid"}
              borderColor={useColorModeValue("gray.400", "gray.600")}
              _hover={{ bg: useColorModeValue("gray.300", "gray.700") }}
              onClick={(e) => {
                e.stopPropagation();
                onTopicClick(topic);
              }}
            >
              {topic.name}
            </Button>
          ))}
        </HStack>
      </VStack>
    </ContextMenu>
  );
};
