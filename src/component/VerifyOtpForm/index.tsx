/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { Button, ConfigProvider, GetProp, Input } from "antd";
import { OTPProps } from "antd/es/input/OTP";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  useResendOtpMutation,
  useVerifyOtpMutation,
} from "../../redux/features/otp/otpApi";
import ErrorResponse from "../UI/ErrorResponse";
import style from "./verifyOtpForm.module.css";
import { useState } from "react";

const VerifyOtpFrom = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string | null>();
  const [VerifyOtp] = useVerifyOtpMutation();
  const [resendOtps] = useResendOtpMutation();

  const handleSubmit = async () => {
    const toastId = toast.loading("VERIFYING...");

    try {
      if (!otp) {
        toast.error("Please enter OTP", { duration: 2000 });
        return;
      }

      await VerifyOtp({ otp: otp }).unwrap();
      toast.success("Otp verified successfully", {
        id: toastId,
        duration: 2000,
      });
      // sessionStorage.setItem("token", res?.data?.token);
      navigate("/new-password");
    } catch (err) {
      ErrorResponse(err, toastId);
    }
  };
  const onChange: GetProp<typeof Input.OTP, "onChange"> = (text) => {
    setOtp(text); 
  };

  const sharedProps: OTPProps = {
    onChange,
    style: { width: "400px" },
  };

  const resendOtp = async () => {
    const toastId = toast.loading("Resending....");

    try {
      const res: any = await resendOtps({
        email: sessionStorage.getItem("email"),
      }).unwrap(); 
      toast.success("Otp sent successfully", { id: toastId, duration: 2000 });
      sessionStorage.setItem("token", res?.data?.token);
    } catch (error) {
      ErrorResponse(error, toastId);
    }
  };
  return (
    <div>
      <div className="flex justify-center ">
        <ConfigProvider
          theme={{
            components: {
              Input: {
                lineHeight: 4,
              },
            },
          }}
        >
          <Input.OTP length={6} {...sharedProps} />
        </ConfigProvider>
      </div>
      <div className="flex justify-between my-4">
        <p className="text-gray text-18 text-600">Don't received code?</p>
        <p
          className="reset-password-resend text-gray  font-600 text-18 hover:text-primary cursor-pointer"
          onClick={resendOtp}
        >
          Resend
        </p>
      </div>

      <div>
        <Button
          onClick={handleSubmit}
          htmlType="submit"
          className={`${style.otpButton}  `}
          block
        >
          Submit
        </Button>
      </div>
    </div>
  );
};
export default VerifyOtpFrom;
