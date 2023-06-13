import moment from "moment";
import toast from "react-hot-toast";
import { Notebook, Topic } from "@/types";
import { v4 as uuid } from "uuid";
import { NOTEBOOK_STORAGE } from "@/constants/local-events";

export const createLocalTopic = (
  notebookId: Notebook["id"],
  topicName: string
) => {
  const topic: Topic = {
    id: uuid(),
    kind: "Topic" as "Topic",
    name: topicName,
    notesRef: [],
    createdAt: moment().format(),
    updatedAt: moment().format(),
  };

  const notebooks: Notebook[] = JSON.parse(
    localStorage.getItem("notebooks") || "[]"
  );

  const notebook = notebooks.find((n) => n.id === notebookId);

  // check if topic already exist
  if (checkTopicExist(notebook!.topics, topicName)) return;

  // else add it
  notebook!.topics.push(topic);

  localStorage.setItem("notebooks", JSON.stringify(notebooks));
  window.dispatchEvent(new Event(NOTEBOOK_STORAGE));
  return topic;
};

function checkTopicExist(topics: Topic[], topicName: string) {
  const isFound = topics.findIndex(
    (t) => t.name.toLowerCase() == topicName.toLowerCase()
  );

  if (isFound !== -1) {
    const COLORMODE = localStorage.getItem("chakra-ui-color-mode");

    toast.error("a topic with this name already exists", {
      id: "topic-exist-toast",
      style: {
        backgroundColor: COLORMODE === "dark" ? "#4A5568" : "#F7FAFC",
        color: COLORMODE === "dark" ? "white" : "#111",
      },
    });

    return true;
  }

  return false;
}
