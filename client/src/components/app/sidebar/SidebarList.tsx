import { Link, useLocation } from "react-router-dom";
import { ListItemType } from "@/hooks";

import {
  LinkBox,
  List,
  ListIcon,
  ListItem,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

type IProps = {
  list: ListItemType[];
  opacity: number;
};

export const SidebarList = ({ list, opacity }: IProps) => {
  const { pathname, hash } = useLocation();

  const bg = useColorModeValue("red.500", "blue.500");
  const color = useColorModeValue("gray.700", "gray.200");

  const isCollapsed = opacity === 0;
  const isActive = (link: string) =>
    new RegExp(`.*${link}$`).test(`${pathname}${hash}`); // if pathname ends with link

  return (
    <List spacing={2}>
      {list.map((item) => (
        <LinkBox key={item.label} ml={-2}>
          <Link to={item.link} state={item.state}>
            <ListItem
              rounded={"xl"}
              fontSize={"sm"}
              fontWeight={600}
              whiteSpace={"nowrap"}
              overflow={"hidden"}
              textOverflow={"ellipsis"}
              bg={isActive(item.link) ? bg : undefined}
              color={isActive(item.link) ? "white" : color}
              py={1}
              pl={isCollapsed ? 2 : 3}
              w={isCollapsed ? "fit-content" : "initial"}
              _hover={{ bg, color: "white" }}
            >
              <ListIcon as={item.icon} title={item.label} />

              {!isCollapsed && (
                <Text as={"span"} px={1}>
                  {item.label}
                </Text>
              )}
            </ListItem>
          </Link>
        </LinkBox>
      ))}
    </List>
  );
};
