import { Allotment } from "allotment";
import { Outlet, useLocation } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import { useGetTopics } from "@/hooks";

import { ListPane } from "../list-pane/ListPane";
import { PanePlaceholder } from "../pane-placeholder/PanePlaceholder";
import { TopicCreateModal } from "./topic/TopicCreateModal";

export const TopicsView = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { state } = useLocation();
  const { notebook } = state;

  const { topics } = useGetTopics(notebook.id as string);

  return (
    <>
      <Allotment defaultSizes={[400, 600]}>
        <Allotment.Pane minSize={0}>
          <ListPane
            listType={"topic"}
            header={notebook.name}
            data={topics ?? []}
            dataLoaded={Boolean(topics)}
            onCreateClick={onOpen}
            placeholder={
              <PanePlaceholder
                placeholder={"topics"}
                onCreateClick={onOpen}
                size={160}
              />
            }
          />
        </Allotment.Pane>

        <Allotment.Pane>
          <Outlet />
        </Allotment.Pane>
      </Allotment>

      <TopicCreateModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
