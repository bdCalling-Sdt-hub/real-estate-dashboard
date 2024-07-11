/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink, useNavigate } from "react-router-dom";

import { LeftOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Row } from "antd";
import { GiConfirmed } from "react-icons/gi";
import { toast } from "sonner";
import resetVector from "../../assets/vector/Reset Password.png";
import GuruForm from "../../component/Form/FormProvider";
import ResInput from "../../component/Form/ResInput";
import ErrorResponse from "../../component/UI/ErrorResponse";
import { useResetPasswordMutation } from "../../redux/features/auth/authApi";
import { authValidationSchema } from "../../schema/auth.schema";
import logo from "./../../assets/Final Logo 2.png";
const NewPassword = () => {
  const [resetPassword] = useResetPasswordMutation();
  const navigate = useNavigate();
  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Password resetting....");
    try {
      const res = await resetPassword(data).unwrap();
      toast.success(res?.data?.message, {
        id: toastId,
        duration: 200,
      });
      sessionStorage.clear();
      navigate("/login");
    } catch (err) {
      ErrorResponse(err, toastId);
    }
  };
  return (
    <div className="container mx-auto flex items-center justify-center h-screen">
      <Row align="middle" justify="center" gutter={16}>
        <Col span={12}>
          <img src={logo} alt="Logo" />
          <img src={resetVector} alt="Reset Vector" />
        </Col>
        <Col span={12}>
          <div className="w-[500px] mx-auto">
            <NavLink to="/verify-otp">
              <LeftOutlined
                style={{
                  backgroundColor: "#CCCCCC",
                  padding: "12px",
                  borderRadius: "50%",
                }}
              />
            </NavLink>
            <h1 className="text-primary text-32 font-600 mt-2">
              Set New Password
            </h1>
            <p className="text-20">
              A password should be more than 8 characters, including digits,
              letters, and symbols.
            </p>
            <div>
              <GuruForm
                onSubmit={onSubmit}
                resolver={zodResolver(authValidationSchema.resetPasswordSchema)}
              >
                <ResInput
                  size="large"
                  label="New Password"
                  type="password"
                  name="newPassword"
                  placeholder="Enter your new password"
                />
                <ResInput
                  size="large"
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  placeholder="Enter your confirm password"
                />
                <Button
                  htmlType="submit"
                  className="bg-primary w-full h-[38px] flex justify-center items-center font-600 text-18 border-0"
                  icon={<GiConfirmed />}
                >
                  Confirm
                </Button>
              </GuruForm>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default NewPassword;
