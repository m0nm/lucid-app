import { ChangeEvent, useState } from "react";
import { Task } from "@/types";
import { useDeleteTask } from "@/hooks";
import { priorityOptions } from "./priorities";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  useColorModeValue,
  Box,
  Text,
  Checkbox,
  Flex,
  SlideFade,
} from "@chakra-ui/react";

export const TaskCard = ({ task }: { task: Task }) => {
  const { onDeleteTask } = useDeleteTask(task.id);

  const priority = priorityOptions.find((p) => p.value === task.priority);
  const [isChecked, setChecked] = useState(false); // checkbox

  const checkboxColorScheme =
    priority?.value == "high"
      ? "red"
      : priority?.value == "moderate"
      ? "yellow"
      : priority?.value == "low"
      ? "blue"
      : "gray";

  const onCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.checked) {
      setChecked(true);
      return;
    }

    setChecked(false);
  };

  const onAnimationEnd = () => {
    onDeleteTask();
  };

  return (
    <SlideFade in={!isChecked} onAnimationEnd={onAnimationEnd}>
      <Card
        size={"xs"}
        boxShadow={"sm"}
        borderRadius={"md"}
        border={"1px solid"}
        borderColor={useColorModeValue("gray.200", "transparent")}
        bg={useColorModeValue("gray.50", "whiteAlpha.50")}
        w={"98%"}
        my={4}
        p={4}
      >
        <CardHeader>
          <Heading as={"h3"} fontSize={"lg"} noOfLines={1} title={task.title}>
            {task.title}
          </Heading>
        </CardHeader>

        <CardBody
          as={Flex}
          alignItems={"center"}
          justifyContent={"space-between"}
          mt={4}
          mb={5}
          ml={2}
        >
          <Text color={useColorModeValue("gray.500", "gray.300")}>
            {task.description}
          </Text>
          <Checkbox
            size={"lg"}
            borderColor={priority?.color}
            colorScheme={checkboxColorScheme}
            isChecked={isChecked}
            onChange={onCheckboxChange}
          />
        </CardBody>

        <CardFooter userSelect={"none"}>
          <Flex
            px={4}
            py={1}
            alignItems={"center"}
            border={"1px solid"}
            borderRadius={"full"}
            borderColor={priority?.color}
            transform={"scale(0.9)"}
          >
            <Box
              w={4}
              h={4}
              ml={-2}
              mr={2}
              borderRadius={"full"}
              bg={priority?.color}
            />
            <Text fontSize={"sm"} fontWeight={500}>
              {priority?.label}
            </Text>
          </Flex>
        </CardFooter>
      </Card>
    </SlideFade>
  );
};
