import { Helmet } from "react-helmet-async";
import { useDisclosure } from "@chakra-ui/react";
import { Allotment } from "allotment";
import { useGetNotebooks } from "@/hooks";

import { ListPane } from "../list-pane/ListPane";
import { PanePlaceholder } from "../pane-placeholder/PanePlaceholder";
import { NotebookCreateModal } from "./NotebookCreateModal";

export const NotebooksView = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notebooks, isLoading } = useGetNotebooks();

  return (
    <>
      <Helmet>
        <title>Lucid | Your notebooks</title>
      </Helmet>

      <Allotment defaultSizes={[400, 600]}>
        <Allotment.Pane>
          <ListPane
            listType={"notebook"}
            header={"Notebooks"}
            data={notebooks}
            dataLoaded={!isLoading}
            onCreateClick={onOpen}
            placeholder={
              <PanePlaceholder
                size={160}
                placeholder={"notebooks"}
                onCreateClick={onOpen}
              />
            }
          />
        </Allotment.Pane>

        <Allotment.Pane>{""}</Allotment.Pane>
      </Allotment>

      <NotebookCreateModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
