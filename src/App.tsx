/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import "./App.css";
import MainLayout from "./layout/MainLayout";
import {
  TUser,
  useCurrentToken,
  useCurrentUser,
} from "./redux/features/auth/authSlice";
import { setNotification } from "./redux/features/notification/notificationSlice";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
// import PrivateRoute from "./router/PrivateRoutes";
import { ConfigProvider } from "antd";
import { io } from "socket.io-client";
import PrivateRoute from "./router/PrivateRoutes";

const URL = "http://192.168.10.240:9001";

function App() {
  const token: string | null = useAppSelector(useCurrentToken);
  const socket = io(URL, { extraHeaders: { token: token as string } });
  const dispatch = useAppDispatch();
  const { lang } = useAppSelector((state) => state.lang);
  const user: TUser | null = useAppSelector(useCurrentUser);
  useEffect(() => {
    socket.connect();
    const handleNotificationEvent = (data: any) => {
      dispatch(setNotification(data));
    };

    socket.on(
      ("notification::" + user?.userId) as string,
      handleNotificationEvent
    );

    return () => {
      // Clean up the event listener when the component is unmounted
      socket.off(user?.userId as string, handleNotificationEvent);
      socket.disconnect();
    };
  }, [dispatch, socket, user]);

  return (
    <PrivateRoute role={undefined}>
      <ConfigProvider direction={lang === "ar" ? "rtl" : "ltr"}>
        <MainLayout />
      </ConfigProvider>
    </PrivateRoute>
  );
}

export default App;
