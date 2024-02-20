import { Input, Select } from "antd";
import { useLazyGetUsersQuery } from "../../store/slices/api/users";
import { useState } from "react";

export type SearchInputProps = {
  onSearch: (value: string, type: SearchTypes) => void;
  onChange: (value: string, didClear: boolean) => void;
  isLoading?: boolean;
};

export enum SearchTypes {
  Users = "Users",
  Repos = "Repositories",
}

const SearchInput = (props: SearchInputProps) => {
  let type: SearchTypes = SearchTypes.Users;
  let search: string = "";
  const [isError, setIsError] = useState(false);
  const updateType = (value: string) => {
    //not best
    type = value === "Repos" ? SearchTypes.Repos : SearchTypes.Users;
    props.onSearch(search, type);
  };

  const onSearch = (value: string) => {
    search = value;
    setIsError(search.length <= 3);

    props.onSearch(search, type);
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {

    props.onChange(e.currentTarget?.value, (e.type === "click" && e.currentTarget.value === ''));
  };

  // const selectBefore = (
  //   <Select defaultValue={type} onSelect={updateType}>
  //     <Select.Option value="Users">Users</Select.Option>
  //     <Select.Option value="Repos">Repos</Select.Option>
  //   </Select>
  // );

  console.log(props.isLoading);

  return (
    <>
      <Input.Search
        placeholder="input something that search.length > 3"
        enterButton="Search"
        size="large"
        onSearch={onSearch}
        onChange={onChange}
        status={isError ? "error" : ""}
        autoFocus
        loading={props.isLoading}
        allowClear
        cy-test="searchbar"
      />
    </>
  );
};

export default SearchInput;
