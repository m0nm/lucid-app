import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Reorder } from "framer-motion";
import { HiPlus } from "react-icons/hi";

import { useGetTasks } from "@/hooks";
import { PanePlaceholder } from "../pane-placeholder/PanePlaceholder";
import { TaskCreateModal } from "./TaskCreateModal";
import { TaskCard } from "./TaskCard";

import {
  Box,
  HStack,
  Heading,
  IconButton,
  useColorModeValue,
  useDisclosure,
  Skeleton,
  Stack,
} from "@chakra-ui/react";

export const TasksView = () => {
  const { data, isLoading } = useGetTasks();

  const [tasks, setTasks] = useState(data ?? []);
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    if (data) setTasks(data);
  }, [data]);

  return (
    <Box w={"full"} p={4}>
      <Helmet>
        <title>Lucid | Your tasks</title>
      </Helmet>

      <HStack align={"center"} justify={"space-between"} h={12} mb={8}>
        <Heading as={"h3"} fontSize={"2xl"}>
          Tasks
        </Heading>

        <IconButton
          aria-label={`new task`}
          title={`new task`}
          fontWeight={600}
          fontSize={"lg"}
          icon={<HiPlus />}
          colorScheme={useColorModeValue("red", "blue")}
          onClick={onOpen}
        />
      </HStack>

      {isLoading && <Skeletons />}

      {!isLoading && !data?.length && !tasks.length && (
        <PanePlaceholder
          placeholder={"tasks"}
          size={160}
          onCreateClick={onOpen}
        />
      )}

      {tasks.length > 0 && (
        <Reorder.Group axis={"y"} values={tasks} onReorder={setTasks}>
          {tasks.map((task) => (
            <Reorder.Item
              key={task.id}
              value={task}
              style={{ listStyle: "none", cursor: "grab" }}
              onDrag={(e) => {
                if (e.target) {
                  // @ts-ignore
                  e.target.style.cursor = "grabbing";
                }
              }}
              onDragEnd={(e) => {
                if (e.target) {
                  // @ts-ignore
                  e.target.style.cursor = "grab";
                }
              }}
            >
              <TaskCard task={task} />
            </Reorder.Item>
          ))}
        </Reorder.Group>
      )}

      <TaskCreateModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

function Skeletons() {
  return (
    <Stack>
      <Skeleton h="120px" />
      <Skeleton h="120px" />
      <Skeleton h="120px" />
    </Stack>
  );
}
