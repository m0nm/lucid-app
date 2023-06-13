import { memo, useRef } from "react";
import { CreatableSelect, createFilter } from "chakra-react-select";
import { HiHashtag } from "react-icons/hi";

import { Note, Option } from "@/types";
import { useContextTagsMenu, useGetTag } from "@/hooks";

import {
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useDisclosure,
  useOutsideClick,
} from "@chakra-ui/react";

const selectComponents = {
  DropdownIndicator: () => null,
  IndicatorSeparator: () => null,
};

export const TagsMenu = memo(({ note }: { note: Note }) => {
  // menu -----------------------------------------
  const ref = useRef(null);
  const { isOpen, onClose, onToggle: onMenuToggle } = useDisclosure();
  useOutsideClick({ ref, handler: onClose });

  // react select -----------------------------------------
  const { options, onChange, onCreate } = useContextTagsMenu(note);
  const { getTag } = useGetTag();

  const noteTags: (Option | undefined)[] = note!.tagsRef!.map((tagId) => {
    const tag = getTag(tagId);
    if (!tag) return;
    return { id: tag?.id, label: tag?.name, value: tag?.name };
  });

  return (
    <Box>
      <Menu placement={"right-start"} isOpen={isOpen} isLazy>
        <MenuButton
          as={MenuItem}
          icon={<HiHashtag fontSize={15} />}
          onClick={onMenuToggle}
          _hover={{ bg: useColorModeValue("gray.100", "whiteAlpha.100") }}
        >
          <Text as={"span"} fontSize={"sm"}>
            Assign a tag
          </Text>
        </MenuButton>

        <MenuList ref={ref} w={300}>
          {isOpen && (
            <CreatableSelect
              menuIsOpen
              isMulti
              autoFocus
              isClearable={false}
              size={"sm"}
              placeholder={"Search..."}
              value={noteTags}
              options={options as typeof noteTags}
              onCreateOption={onCreate}
              onChange={onChange}
              components={selectComponents}
              filterOption={createFilter({ ignoreAccents: false })}
            />
          )}
        </MenuList>
      </Menu>
    </Box>
  );
});
