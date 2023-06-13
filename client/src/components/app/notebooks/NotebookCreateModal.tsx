import React from "react";
import toast from "react-hot-toast";
import moment from "moment";
import { CreatableSelect } from "chakra-react-select";
import { v4 as uuid } from "uuid";

import { useCreateNotebook } from "@/hooks";
import { Modal } from "@/components";
import { Topic, Option } from "@/types";

import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";

// <****************** ******************>
//            TopicCreateField
// <****************** ******************>
type TopicOption = Omit<Option, "id">;

type TopicCreateFieldProps = {
  topicsOpts: readonly TopicOption[];
  setTopicsOpts: React.Dispatch<React.SetStateAction<readonly TopicOption[]>>;
};

const components = { DropdownIndicator: null };

const TopicCreateField = ({
  topicsOpts,
  setTopicsOpts,
}: TopicCreateFieldProps) => {
  const [topicInputValue, setTopicInputValue] = React.useState("");

  const onKeyDown: React.KeyboardEventHandler = (e) => {
    if (!topicInputValue) return;

    const newOption = {
      label: topicInputValue,
      value: topicInputValue,
    };

    switch (e.key) {
      case "Enter":
      case "Tab":
        setTopicsOpts((prev) => [...prev, newOption]);
        setTopicInputValue("");
        e.preventDefault();
    }
  };

  return (
    <FormControl>
      <FormLabel
        fontSize={"sm"}
        fontWeight={600}
        optionalIndicator={
          <Text as="span" fontSize="xs">
            {" "}
            (optional)
          </Text>
        }
      >
        Topics
      </FormLabel>

      <CreatableSelect
        isClearable
        isMulti
        placeholder={"Type topic name..."}
        menuIsOpen={false}
        components={components}
        inputValue={topicInputValue}
        value={topicsOpts}
        onKeyDown={onKeyDown}
        onChange={(newTopic) => setTopicsOpts(newTopic)}
        onInputChange={(newValue) => setTopicInputValue(newValue)}
      />

      <FormHelperText>Press Enter or Tab after adding new topic</FormHelperText>
    </FormControl>
  );
};

// <****************** ******************>
//           NotebookCreateModal
// <****************** ******************>

type IProps = { isOpen: boolean; onClose(): void; notebookName?: string };

export const NotebookCreateModal = (props: IProps) => {
  const { isOpen, onClose, notebookName } = props;

  const { mutate: onCreateNotebook, isLoading } = useCreateNotebook();

  const notebookInputRef = React.useRef<HTMLInputElement>(null);
  const [topicsOpts, setTopicsOpts] = React.useState<readonly TopicOption[]>(
    []
  );

  const onCreate = () => {
    const name = notebookInputRef?.current?.value;

    if (name == "" || name == undefined) {
      toast.error("Notebook name cannot be empty");
      return;
    }

    const topics: Topic[] = topicsOpts.map((t) => ({
      id: uuid(),
      kind: "Topic" as "Topic",
      name: t.label,
      notesRef: [],
      createdAt: moment().format(),
      updatedAt: moment().format(),
    }));

    onCreateNotebook(
      { name, topics },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <Modal
      autoFocus
      isCentered
      size={"sm"}
      header={"Create a new notebook"}
      isOpen={isOpen}
      isButtonLoading={isLoading}
      onClose={onClose}
      onConfirmClick={onCreate}
      body={
        <Stack>
          <FormControl>
            <FormLabel fontSize={"sm"} fontWeight={600}>
              Notebook&apos;s Name
            </FormLabel>

            <Input
              ref={notebookInputRef}
              autoFocus
              isRequired
              placeholder="Type notebook name..."
              defaultValue={notebookName}
              onKeyDown={(e) => {
                e.key == "Enter" && onCreate();
              }}
            />
          </FormControl>

          {/* topic create field */}
          <TopicCreateField
            topicsOpts={topicsOpts}
            setTopicsOpts={setTopicsOpts}
          />
        </Stack>
      }
    />
  );
};
