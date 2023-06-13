import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { useDebouncedCallback } from "use-debounce";
import { InputGroup, Input, InputRightElement } from "@chakra-ui/react";
import { HiSearch } from "react-icons/hi";

type IProps = {
  setSearch: Dispatch<SetStateAction<string>>;
};

export const Searchbar = ({ setSearch }: IProps) => {
  const debounced = useDebouncedCallback((search: string) => {
    setSearch(search);
  }, 500);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    debounced(value);
  };

  return (
    <InputGroup flex={1}>
      <Input placeholder={"search..."} onChange={onChange} />
      <InputRightElement children={<HiSearch />} />
    </InputGroup>
  );
};
