/* eslint-disable prefer-const */
import { Col, Row } from "antd";
import { useTranslation } from "react-i18next";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { TUser, useCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
// import { useAppSelector } from "../../redux/hooks";
// import { TUser, useCurrentUser } from "../../redux/features/auth/authSlice";

const Setting = () => {
  const { t } = useTranslation();
  const User: TUser | null = useAppSelector(useCurrentUser);
  // const User = {
  //   role: "super_admin",
  // };
  return (
    <div className="container mx-auto">
      <Row gutter={[0, 30]}>
        <Col span={24}>
          <div className="flex items-center justify-between text-20  text-black">
            <p className="">{t("Notifications")}</p>
            <NavLink to={`/${User?.role}/notifications`}>
              <FaArrowRightToBracket cursor="pointer" />
            </NavLink>
          </div>
          <hr className="text-primary mt-4" />
        </Col>
        <Col span={24}>
          <div className="flex items-center justify-between text-20  text-black">
            <p className="">{t("Change Password")}</p>
            <NavLink to={`/${User?.role}/change-password`}>
              <FaArrowRightToBracket cursor="pointer" />
            </NavLink>
          </div>
          <hr className="text-primary mt-4" />
        </Col>
        <Col span={24}>
          <div className="flex items-center justify-between text-20  text-black">
            <p className="">{t("About Us")}</p>
            <NavLink to={`/${User?.role}/aboutUs`}>
              <FaArrowRightToBracket cursor="pointer" />
            </NavLink>
          </div>
          <hr className="text-primary mt-4" />
        </Col>
        <Col span={24}>
          <div className="flex items-center justify-between text-20  text-black">
            <p className="">{t("Terms and Condition")}</p>
            <NavLink to={`/${User?.role}/termsAndCondition`}>
              <FaArrowRightToBracket cursor="pointer" />
            </NavLink>
          </div>
          <hr className="text-primary mt-4" />
        </Col>
        <Col span={24}>
          <div className="flex items-center justify-between text-20  text-black">
            <p className="">{t("Privacy Policy")}</p>
            <NavLink to={`/${User?.role}/privacyPolicy`}>
              <FaArrowRightToBracket cursor="pointer" />
            </NavLink>
          </div>
          <hr className="text-primary mt-4" />
        </Col>
        <Col span={24}>
          <div className="flex items-center justify-between text-20  text-black">
            <p className="">{t("Support")}</p>
            <NavLink to={`/${User?.role}/support`}>
              <FaArrowRightToBracket cursor="pointer" />
            </NavLink>
          </div>
          <hr className="text-primary mt-4" />
        </Col>
      </Row>
    </div>
  );
};

export default Setting;
