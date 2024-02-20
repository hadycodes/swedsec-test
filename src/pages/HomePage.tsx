import { Flex, FloatButton, notification } from "antd";
import SearchInput, { SearchTypes } from "../components/home/SearchInput";
import { logout } from "../store/slices/token";
import { useDispatch } from "react-redux";
import { UserDeleteOutlined } from "@ant-design/icons";
import GitGrid from "src/components/home/grid/GitGrid";
import {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Search,
  Users,
} from "src/store/slices/api/users/types";
import GridItem from "src/components/home/grid/GridItem";
import { useLazyGetUsersQuery } from "src/store/slices/api/users";

export const HomePage = () => {
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();
  const [items, setItems] = useState<Users>([]);
  const [fetchUsers, results, options] = useLazyGetUsersQuery();

  //useRef to avoid unnecessary rerender.
  type SearchQuery = Search & { searchType: SearchTypes };
  const searchQuery = useRef<SearchQuery>({
    query: "",
    page: 1,
    searchType: SearchTypes.Users,
  });

  const doLogout = () => {
    dispatch(logout({ isLogout: true }));
  };

  const onSearch = (value: string, type: SearchTypes = SearchTypes.Users) => {
    if (value.length > 3) {
      searchQuery.current = {
        query: value,
        searchType: type,
        page: 1,
      };

      fetch();
    }
  };

  const onSearchChange = (value: string, didClear: boolean) => {
    if (didClear || value.length < 4) {
      reset();
    } else {
      searchQuery.current = {
        ...searchQuery.current,
        ...{ query: value, page: 1 },
      };
      fetch();
    }
  };

  const reset = () => {
    setItems([]);
  };
  const fetch = () => {
    fetchUsers(searchQuery.current, true);
  };
  const onGridThresholdFetch = () => {
    if (results?.data?.hasNext == true) {
      searchQuery.current = {
        ...searchQuery.current,
        ...{ page: results.data.next },
      };

      fetch();
    }
  };

  const openErrorNotification = (error: string) => {
    api.error({
      message: `Error`,
      description: error,
    });
  };

  useEffect(() => {
    if (results?.isError) {
      const _error = results.error as { data?: { message: string } };

      openErrorNotification(_error?.data?.message ?? "Something went wrong!!!");
    }
  }, [results?.isError, results?.isFetching]);

  //separating data from error handling.
  useEffect(() => {
    console.log(searchQuery.current.page == 1)
    if (results.currentData?.users) {
      var list =
        searchQuery.current.page == 1
          ? [...results.currentData?.users]
          : [...items, ...results.currentData?.users];
      setItems(list);
    }
  }, [results.currentData]);

  return (
    <>
      {contextHolder}
      <Flex
        vertical
        gap="middle"
        style={{
          maxWidth: 1200,
          width: "100%",
        }}
      >
        <SearchInput
          onSearch={onSearch}
          onChange={onSearchChange}
          isLoading={results?.isLoading}
        />
        <GitGrid
          fetchNext={onGridThresholdFetch}
          hasNext={results.data?.hasNext ?? true}
          isLoading={results.isFetching == true || results?.isLoading == true}
          threshold={0.8}
          cy-test="grid"
        >
          {items.map((i) => (
            <GridItem key={i.id} {...i} />
          ))}
        </GitGrid>
      </Flex>
      <FloatButton
        tooltip={<div>Log out</div>}
        type="primary"
        icon={<UserDeleteOutlined />}
        onClick={doLogout}
      />
    </>
  );
};
