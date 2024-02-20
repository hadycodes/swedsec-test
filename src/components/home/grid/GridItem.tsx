import { UserOutlined } from "@ant-design/icons";
import styles from "./GitGrid.module.css";
import { User } from "src/store/slices/api/users/types";
import { Space, Typography } from "antd";
import { useLazyGetUserQuery } from "src/store/slices/api/users";
import { useEffect, useRef } from "react";
import Loader from "src/components/common/Loader";
import { ProfileItem } from "./ProfileItem";
import { useIntersectionObserver } from "@uidotdev/usehooks";

const GridItem = (props: User) => {
  const [getProfile, results] = useLazyGetUserQuery();

  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "0px",
  });

  useEffect(() => {
    if (entry?.isIntersecting) {
      getProfile(props.login, true);
    }
  }, [entry?.isIntersecting]);

  if (results.data && results.isSuccess) {
    return <ProfileItem {...results.data} />;
  }
  return (
    <div className={styles.card} ref={ref}>
      <Space direction="vertical" size="middle">
        {(results.isLoading || results.isFetching) && <Loader />}
        {results.isError && (
          <Typography.Text type="danger">
            Error Occured while fetching profile.
          </Typography.Text>
        )}
        <img
          src={props.avatar_url}
          loading="lazy"
          alt="Avatar"
          style={{ width: "100%", objectFit: "cover" }}
        />

        <div className={styles.container}>
          <Typography.Title level={4}>{props.login}</Typography.Title>
        </div>
      </Space>
    </div>
  );
};

export default GridItem;
