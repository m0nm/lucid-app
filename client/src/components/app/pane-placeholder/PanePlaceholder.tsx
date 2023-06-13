import { Button, Image, Stack, Text } from "@chakra-ui/react";
import { getPlaceholder, PlaceholderKeys } from "./placeholder-content";
import { HiPlus } from "react-icons/hi";
import { JOYRIDE_CREATE_BUTTON } from "@/constants/app-tour";

type IProps = {
  placeholder: PlaceholderKeys;
  size?: number;
  showCreateButton?: boolean;
  isLoadingButton?: boolean;
  onCreateClick(): void;
};

export const PanePlaceholder = (props: IProps) => {
  const {
    placeholder,
    size,
    onCreateClick,
    showCreateButton = true,
    isLoadingButton,
  } = props;

  const item = getPlaceholder(placeholder);

  return (
    <Stack h={"60vh"} alignItems={"center"} placeContent={"center"} spacing={4}>
      {item.image && (
        <Image
          src={item.image}
          userSelect={"none"}
          pointerEvents={"none"}
          w={size || 16}
          h={size || 16}
        />
      )}

      <Stack>
        <Text as={"span"} fontSize={"sm"} textAlign={"center"}>
          {item.text}
        </Text>

        {showCreateButton && (
          <Button
            id={JOYRIDE_CREATE_BUTTON}
            isLoading={isLoadingButton}
            size={"sm"}
            variant={"outline"}
            cursor={"pointer"}
            leftIcon={<HiPlus />}
            onClick={onCreateClick}
          >
            Click to Create
          </Button>
        )}
      </Stack>
    </Stack>
  );
};
