import { LeftOutlined } from "@ant-design/icons";

import { Col, Row } from "antd";
import { NavLink } from "react-router-dom";
import logo from "../../assets/Final Logo 2.png";
import otpvector from "../../assets/vector/otp.png";
import VerifyOtpFrom from "../../component/VerifyOtpForm";
const VerifyOtp = () => {
  return (
    <div className="container mx-auto flex items-center justify-center h-screen">
      <Row align="middle" justify="center" gutter={16}>
        <Col span={12}>
          <img src={logo} alt="" />
          <img src={otpvector} alt="" />
        </Col>
        <Col span={12}>
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
            <h1 className="text-primary text-32 font-600 mt-2">Verify OTP</h1>
            <p className="text-20 mb-2">
              We've sent an OTP to your email. Please check it to reset your
              password.
            </p>
            <VerifyOtpFrom />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default VerifyOtp;
