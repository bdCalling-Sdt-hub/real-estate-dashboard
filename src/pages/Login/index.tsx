/* eslint-disable @typescript-eslint/no-explicit-any */

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Row } from "antd";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import logo from "../../assets/Final Logo 2.png";
import loginVector from "../../assets/vector/illustration.png";
import GuruForm from "../../component/Form/FormProvider";
import ResInput from "../../component/Form/ResInput";
import ErrorResponse from "../../component/UI/ErrorResponse";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { setUser, TUser } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import { authValidationSchema } from "../../schema/auth.schema";
import { verifyToken } from "../../utils/verifyToken";
const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Logging in..");
    // navigate("/dashboard");
    try {
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
    <div className="container mx-auto h-screen flex items-center justify-center">
      <Row align="middle" justify="center" gutter={16}>
        <Col span={12}>
          <img src={logo} alt="Logo" />
          <img src={loginVector} alt="Login Vector" />
        </Col>
        <Col span={12}>
          <div className="w-[500px] mx-auto">
            <div className="bg-white px-4 rounded">
              <div className="text-center mt-6">
                <h1 className="text-primary text-32 font-600">
                  {t("Welcome")}
                </h1>
                <p className="text-20 text-gray">
                  {t("Please login for a better experience")}
                </p>
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
                    placeholder="Enter your email"
                  />
                  <ResInput
                    type="password"
                    size="large"
                    name="password"
                    label={t("Password")}
                    placeholder="Enter your password"
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
        </Col>
      </Row>
    </div>
  );
};

export default Login;
