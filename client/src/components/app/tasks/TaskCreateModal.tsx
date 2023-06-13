import toast from "react-hot-toast";
import { useRef, useState } from "react";
import { ChakraStylesConfig, Select } from "chakra-react-select";
import { Task } from "@/types";
import { useCreateTask } from "@/hooks";
import { createLocalTask } from "@/utils";
import { Modal } from "@/components";
import { PriorityOption, priorityOptions } from "./priorities";

import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

type IProps = { isOpen: boolean; onClose(): void };

// ************************
// Custom Option styling
// ************************
const dot = (color = "transparent") => ({
  alignItems: "center",
  display: "flex",

  ":before": {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: "block",
    marginRight: 2,
    height: 4,
    width: 4,
  },
});

const styles: ChakraStylesConfig<PriorityOption> = {
  singleValue: (provided, state) => ({ ...provided, ...dot(state.data.color) }),
  option: (provided, state) => ({
    ...provided,
    ...dot(state.data.color),
    fontSize: 14,
    fontWeight: 500,
    backgroundColor: state.isSelected
      ? useColorModeValue("gray.200", "whiteAlpha.200")
      : undefined,
    color: state.isSelected ? useColorModeValue("black", "white") : undefined,
  }),
};

// ************************
// TaskCreateModal
// ************************

export const TaskCreateModal = ({ isOpen, onClose }: IProps) => {
  const { mutate: onCreateTask, isLoading } = useCreateTask();

  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);
  const [priority, setPriority] = useState<Task["priority"]>();

  const createTask = () => {
    const title = titleRef?.current?.value;
    const desc = descRef?.current?.value;

    if (title == "" || typeof title == undefined) {
      toast.error("Title cannot be empty");
    }
    if (priority == undefined) {
      toast.error("Please select a priority");
    }

    if (title && priority) {
      onCreateTask(
        { title, description: desc, priority },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
    }
  };

  return (
    <Modal
      isCentered
      size={"md"}
      header={"Create a new task"}
      isOpen={isOpen}
      isButtonLoading={isLoading}
      onClose={onClose}
      onConfirmClick={createTask}
      body={
        <FormControl>
          <Stack spacing={4}>
            <Stack spacing={-1}>
              <FormLabel fontSize={"sm"} fontWeight={600}>
                Title
              </FormLabel>
              <Input
                isRequired
                ref={titleRef}
                autoFocus
                placeholder={"Enter task title..."}
              />
            </Stack>

            <Stack spacing={-1}>
              <FormLabel fontSize={"sm"} fontWeight={600}>
                Description{" "}
                <Text as={"span"} fontSize={"xs"}>
                  {" "}
                  (optional)
                </Text>
              </FormLabel>
              <Input ref={descRef} placeholder={"Enter task description..."} />
            </Stack>

            <Stack spacing={-1}>
              <FormLabel fontSize={"sm"} fontWeight={600}>
                Priority
              </FormLabel>

              <Select
                isRequired
                isMulti={false}
                isSearchable={false}
                isClearable={false}
                size={"md"}
                placeholder={"Select a priority"}
                chakraStyles={styles}
                options={priorityOptions}
                onChange={(selected) => setPriority(selected?.value)}
              />
            </Stack>
          </Stack>
        </FormControl>
      }
    />
  );
};
