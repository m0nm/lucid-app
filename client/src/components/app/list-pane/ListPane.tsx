import { ReactElement, useEffect, useState } from "react";
import { Virtuoso } from "react-virtuoso";
import { CustomScrollbar } from "@/components";
import { IFilterType, useFilterData, useRenderItem } from "@/hooks";

import { Searchbar } from "./Searchbar";
import { SortMenu } from "./SortMenu";
import { HiPlus } from "react-icons/hi";
import { PanePlaceholder } from "../pane-placeholder/PanePlaceholder";

import {
  Box,
  Stack,
  HStack,
  Heading,
  IconButton,
  Skeleton,
  useColorModeValue,
} from "@chakra-ui/react";

type IProps = {
  data: any[];
  listType: "note" | "notebook" | "topic" | "tag";
  placeholder: ReactElement;
  header: string | ReactElement;
  hideCreateButton?: boolean;
  dataLoaded?: boolean;
  onCreateClick(): void;
};

export const ListPane = (props: IProps) => {
  const {
    data,
    dataLoaded = true,
    listType,
    onCreateClick,
    placeholder,
    header,
    hideCreateButton,
  } = props;

  const { renderItem } = useRenderItem();

  const [filterType, setFilterType] = useState<IFilterType>("newest");
  const { filtered, search, setSearch } = useFilterData(data, filterType);

  const [vKey, setVKey] = useState(+Date());
  useEffect(() => setVKey(+Date()), []);

  return (
    <Box w={"100%"} p={4}>
      <HStack align={"center"} justify={"space-between"} h={12} mb={8}>
        {typeof header == "string" ? (
          <Heading as={"h3"} fontSize={"2xl"}>
            {header}
          </Heading>
        ) : (
          header
        )}

        {!hideCreateButton && (
          <IconButton
            aria-label={`new ${listType}`}
            title={`new ${listType}`}
            fontWeight={600}
            fontSize={"lg"}
            icon={<HiPlus />}
            colorScheme={useColorModeValue("red", "blue")}
            onClick={() => onCreateClick()}
          />
        )}
      </HStack>
      <HStack justify={"space-between"} mb={3}>
        <Searchbar setSearch={setSearch} />

        <Box ml="auto">
          <SortMenu setFilterType={setFilterType} />
        </Box>
      </HStack>

      {/* no data yet */}
      {!data.length && !search && dataLoaded && placeholder}

      {/* loading data */}
      {!dataLoaded && <Skeletons />}

      {/* no data found by search */}
      {search && !filtered.length && (
        <PanePlaceholder
          size={140}
          placeholder={"search"}
          showCreateButton={false}
          onCreateClick={() => {}}
        />
      )}

      {dataLoaded && data.length > 0 && filtered.length > 0 && (
        <Virtuoso
          key={vKey}
          style={{ height: "80vh" }}
          totalCount={filtered.length}
          computeItemKey={(i) => filtered[i].id}
          data={filtered}
          components={{ Footer, Scroller: CustomScrollbar }}
          itemContent={(i, item) => renderItem(item)}
        />
      )}
    </Box>
  );
};

function Footer() {
  return <div style={{ paddingBottom: "2rem" }} />;
}

function Skeletons() {
  return (
    <Stack>
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton
          key={"skeleton-" + i}
          height={"60px"}
          endColor={useColorModeValue("gray.300", "gray.600")}
          speed={parseFloat(`0.8${i}`)}
        />
      ))}
    </Stack>
  );
}
