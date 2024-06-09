/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { LeftOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Row } from "antd";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import logo from "../../assets/Final Logo 2.png";
import forgotvector from "../../assets/vector/forgotemail.png";
import ResForm from "../../component/Form/FormProvider";
import ResInput from "../../component/Form/ResInput";
import ErrorResponse from "../../component/UI/ErrorResponse";
import { useForgotPasswordMutation } from "../../redux/features/auth/authApi";
import { authValidationSchema } from "../../schema/auth.schema";

const ForgotPassword = () => {
  const { t } = useTranslation();
  const [forgotPassword] = useForgotPasswordMutation();
  const navigate = useNavigate();
  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Sending Otp..");
    try {
      const res = await forgotPassword(data).unwrap();
      toast.success("An otp successfully sent your email", {
        id: toastId,
        duration: 2000,
      });
      sessionStorage.setItem("email", data?.email);
      sessionStorage.setItem("token", res?.data?.token);
      navigate("/verify-otp");
    } catch (err) {
      ErrorResponse(err, toastId);
    }
  };

  return (
    <div className="container mx-auto flex justify-around items-center h-screen">
      <Row align="middle" justify="center" gutter={16}>
        <Col lg={12}>
          <img src={logo} alt="Logo" />
          <img src={forgotvector} alt="Login Vector" />
        </Col>
        <Col lg={12}>
          <div className="w-[500px] mx-auto">
            <NavLink to="/login">
              <LeftOutlined
                style={{
                  backgroundColor: "#CCCCCC",
                  padding: "12px",
                  borderRadius: "50%",
                }}
              />
            </NavLink>
            <h1 className="text-primary text-32 font-600 mt-2">{t("Email")}</h1>
            <p className="text-20 text-gray">
              {t(
                "Enter the email address associated with your account. We'll send you an OTP to your email"
              )}
            </p>
            <div className="mt-[20px]">
              <ResForm
                onSubmit={onSubmit}
                resolver={zodResolver(authValidationSchema.fogotpasswordSchema)}
              >
                <ResInput
                  size="large"
                  type="email"
                  name="email"
                  label={t("Email")}
                  placeholder={t("Enter your email")}
                />
                <Button
                  className="w-full mt-[50px] text-18 font-600 h-10 bg-primary text-white"
                  htmlType="submit"
                >
                  {t("Send OTP")}
                </Button>
              </ResForm>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ForgotPassword;
