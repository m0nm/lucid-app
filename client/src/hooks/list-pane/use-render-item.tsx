import { Item } from "@/types";
import { NoteCard, TopicCard, NotebookCard, TagCard } from "@/components";

export const useRenderItem = () => {
  const renderItem = (item: Item) => {
    // item is Note
    if ("content" in item) {
      return <NoteCard key={item.id} note={item} />;
    }

    // item is Tag
    else if ("kind" in item && item.kind === "Tag") {
      return <TagCard key={item.id} tag={item} />;
    }

    // item is Notebook
    else if ("topics" in item) {
      return <NotebookCard key={item.id} notebook={item} />;
    }

    // item is Topic
    else if ("kind" in item && item.kind === "Topic") {
      return <TopicCard key={item.id} topic={item} />;
    }
  };

  return { renderItem };
};
