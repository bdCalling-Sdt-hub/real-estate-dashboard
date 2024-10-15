/* eslint-disable @typescript-eslint/no-explicit-any */

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Row } from "antd";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner"; 
import GuruForm from "../../component/Form/FormProvider";
import ResInput from "../../component/Form/ResInput";
import ErrorResponse from "../../component/UI/ErrorResponse";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { setUser, TUser } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import { authValidationSchema } from "../../schema/auth.schema";
import { verifyToken } from "../../utils/verifyToken";
import LoginHeader from "./header";
import { Header } from "antd/es/layout/layout";
const Login = () => {
  // const [LoginFn] = useLoginMutation()
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const onSubmit = async (data: any) => {
    // const res = await LoginFn()
    const toastId = toast.loading("Logging in..");
    // navigate("/dashboard");
    try {
      console.log(data);
      const res: any = await login(data).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Logged in", { id: toastId, duration: 2000 });
      navigate(`/${user?.role}/dashboard`);
    } catch (err) {
      ErrorResponse(err, toastId);
    }
  };

  return (
    <>
     <Header className="sticky top-0 z-10 w-full bg-[#A9C9FF] ">

    <LoginHeader />
     </Header>
    <div className="container mx-auto h-screen flex items-center justify-center"> 
          <div className="w-[500px] mx-auto">
            <div className="bg-white px-4 rounded">
              <div className="text-center">
                <h1 className="text-primary text-32 font-600">
                  {t("Welcome!")}
                </h1>
                {/* <p className="text-20 text-gray">
                  {t("Please login for a better experience!")}
                </p> */}
              </div>
              <div className="mt-[20px]">
                <GuruForm
                  onSubmit={onSubmit}
                  resolver={zodResolver(
                    authValidationSchema.loginValidationSchema
                  )}
                >
                  <ResInput
                    size="large"
                    type="email"
                    name="email"
                    label={t("Email")}
                    placeholder={t("Enter your email")}
                  />
                  <ResInput
                    type="password"
                    size="large"
                    name="password"
                    label={t("Password")}
                    placeholder={t("Enter your password")}
                  />
                  <NavLink to="/forgot-password">
                    <h5 className="text-18 text-gray text-end font-600 cursor-pointer">
                      {t("Forgot Password")}
                    </h5>
                  </NavLink>
                  <Button
                    className="w-full mt-[30px] text-18 font-600 h-10 bg-primary text-white"
                    htmlType="submit"
                  >
                    {t("Sign In")}
                  </Button>
                </GuruForm>
              </div>
            </div>
          </div>
 
    </div>
    </>
  );
};

export default Login;
