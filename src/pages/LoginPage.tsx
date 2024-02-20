import {
  ArrowRightOutlined,
  GithubOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Divider, Flex, Typography } from "antd";
import { Navigate } from "react-router";
import { Link } from "react-router-dom";
const { Title } = Typography;

const LoginPage = () => {
  const iconStyles = { fontSize: "2em", color: "rgba(0, 0, 0, 0.88)" };

  return (
    <>
      <Flex vertical gap={"small"}>
        <Typography.Link
          href={`https://github.com/login/oauth/authorize?client_id=32461a8baf806363ecf4`}
          cy-test="github-auth-link"
        >
          <Card
            hoverable
            bordered={false}
            style={{ color: "rgba(0, 0, 0, 0.88)" }}
          >
            <Flex gap={"middle"} justify={"center"}>
              <GithubOutlined style={iconStyles} />
              <Typography.Text strong cy-test="github-auth-text"> Sign in with Github </Typography.Text>
            </Flex>
          </Card>
        </Typography.Link>

        <Divider>OR</Divider>
        <Link to={{pathname: "/oauth", search:"code=__GUEST__"}} cy-test="guest-auth-link">
          <Card
            hoverable
            bordered={false}
            style={{ color: "rgba(0, 0, 0, 0.88)" }}
          >
            <Flex gap={"middle"} justify={"center"}>
              <UserOutlined style={iconStyles} />
              <Typography.Text strong cy-test="guest-auth-text"> Continue as a Guest </Typography.Text>
            </Flex>
          </Card>
        </Link>
      </Flex>
    </>
  );
};

export default LoginPage;
