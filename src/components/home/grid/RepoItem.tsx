import { Repo } from "src/store/slices/api/repos/types";
import { ArrowRightOutlined, LinkOutlined } from "@ant-design/icons";
import { Avatar, Card } from "antd";
import { Link } from "react-router-dom";

const RepoItem = (props: Repo) => {
  return (
    <Card
      style={{ width: 300, marginTop: 16 }}
      actions={[
        <a href={props.html_url} target="__blank">
          <LinkOutlined />
        </a>,
        <Link to={`repos/${props.id}`}>
          <ArrowRightOutlined />
        </Link>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar src={props.owner.avatar_url} />}
        title={props.full_name}
        description={props.description}
      />
    </Card>
  );
};

export default RepoItem;
