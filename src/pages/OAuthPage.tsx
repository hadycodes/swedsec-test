import { Link, Navigate, useSearchParams } from "react-router-dom";
import { useGetTokenQuery } from "../store/slices/api/auth";
import Loader from "../components/common/Loader";
import { App, Space, Typography } from "antd";
import { GUEST_TOKEN } from "../const";
import { useDispatch } from "react-redux";
import { setToken } from "../store/slices/token";

const OAuthPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const isGuest = code === GUEST_TOKEN;
  const { message } = App.useApp();

  const { isLoading, isError, isSuccess, data } = useGetTokenQuery(code ?? "", {
    skip: !code || isGuest,
  });

  if (code == null || code === "") {
    return <Navigate to="/" replace={true} />;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <>
        <Space direction="vertical" size="middle" align="center">
          <Typography.Text> SOMETHING WENT WRONG </Typography.Text>
          <Typography.Link href="https://cors-anywhere.herokuapp.com">
            Most likely you need to get temp access to CORS ANYWHERE{" "}
          </Typography.Link>
          <Typography.Link href="/"> Return to main page </Typography.Link>
        </Space>
      </>
    );
  }

  //due to the reverse proxy, it returns 200
  //if there is a data or error response, so github issue handled here
  if (data && isSuccess) {
    const parsed_error = JSON.parse(JSON.stringify(data));
    if (parsed_error["error_description"] != null) {
      return (
        <Space direction="vertical" size="middle" align="center">
          <Typography.Title level={4}>
            {" "}
            WOOP WOOP, GITHUB ERROR
          </Typography.Title>
          <Typography.Text>{parsed_error["error_description"]}</Typography.Text>
          <Typography.Link href="/"> Return to main page </Typography.Link>
        </Space>
      );
    } else {
      dispatch(setToken({ code: data?.access_token }));
      return <Navigate to="/" replace></Navigate>;
    }
  } else if (isGuest) {
    dispatch(setToken({ code: code }));
    return <Navigate to="/" replace></Navigate>;
  } else {

    message.error("Something weird happend")
    return <></>
  }

  return <></>;
};

export default OAuthPage;
