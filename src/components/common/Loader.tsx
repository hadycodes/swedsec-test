import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const Loader = () => {
  return <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />;
};

export default Loader;
