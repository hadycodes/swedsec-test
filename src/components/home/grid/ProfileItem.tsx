import { BorderOuterOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Card, Space, Typography } from "antd";
import { Link } from "react-router-dom";
import { Profile } from "src/store/slices/api/users/types";

export const ProfileItem = (props: Profile) => {

  return (
    <>
      <Card
        cover={<img alt="image" src={props.avatar_url} />}
        actions={[
          <Space direction="vertical" size="small">
            <BorderOuterOutlined style={{ fontSize: "26px" }} />
            <Typography.Text>{props.location}</Typography.Text>
          </Space>,
          <Link to={props.html_url} target="__blank">
            <Space direction="vertical" size="small">
              <UserOutlined style={{ fontSize: "26px" }} />
              <Typography.Text>PROFILE</Typography.Text>
            </Space>
          </Link>,
        ]}
      >
        <Card.Meta title={props.name ?? props.login} description={props.bio} />
      </Card>
    </>
  );
};
