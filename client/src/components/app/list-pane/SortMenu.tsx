import { Dispatch, SetStateAction, useState } from "react";
import { IFilterType } from "@/hooks";

import {
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";

import {
  HiSortAscending,
  HiSortDescending,
  HiChevronDown,
  HiCheck,
} from "react-icons/hi";

import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";

const MENU = [
  {
    label: "Newest",
    icon: <HiSortAscending />,
  },
  {
    label: "Oldest",
    icon: <HiSortDescending />,
  },
  {
    label: "A-Z",
    icon: <AiOutlineSortDescending />,
  },
  {
    label: "Z-A",
    icon: <AiOutlineSortAscending />,
  },
];

type IProps = {
  setFilterType: Dispatch<SetStateAction<IFilterType>>;
};

export const SortMenu = ({ setFilterType }: IProps) => {
  const [active, setActive] = useState(MENU[0]);

  const onClick = (i: number) => {
    const item = MENU[i];
    setActive(item);
    setFilterType(item.label.toLowerCase() as IFilterType);
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        aria-label={`sort by: ${active.label}`}
        title={`sort by: ${active.label}`}
        rightIcon={<HiChevronDown />}
      >
        {active.icon}
      </MenuButton>

      <MenuList>
        {MENU.map((item, i) => {
          const isActive = item.label == active.label;

          return (
            <MenuItem
              key={item.label}
              pos={"relative"}
              fontSize={"2xl"}
              icon={item.icon}
              onClick={() => onClick(i)}
            >
              <Text fontSize={"sm"}>{item.label}</Text>

              {isActive && (
                <Icon
                  as={HiCheck}
                  pos={"absolute"}
                  fontSize={"sm"}
                  top={2}
                  right={4}
                />
              )}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};
