/* eslint-disable @typescript-eslint/no-explicit-any */
import { EyeOutlined } from "@ant-design/icons";
import { useState } from "react";
import ResModal from "../../../component/Modal/Modal";
import ResTable from "../../../component/Table";
import { verificationData } from "../../../db";
import VerificatonDetails from "./VerificationDetails";

const VerificationRequest = () => {
  const [show, setShow] = useState<boolean>(false);

  const handleToggleModal = () => {
    setShow((prev: boolean) => !prev);
  };
  const column = [
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Request Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "User Type",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "action",

      render: (data: any, index: number) => {
        console.log(data, index);
        return (
          <div className="flex items-center gap-x-2">
            <EyeOutlined
              className="text-18 cursor-pointer"
              onClick={handleToggleModal}
            />
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <ResModal
        showModal={show}
        setShowModal={setShow}
        width={1000}
        title="Verification Information"
      >
        <VerificatonDetails />
      </ResModal>

      <h1 className="text-20 font-500 text-gray mb-1">Verification Request</h1>
      <ResTable column={column} data={verificationData} />
    </div>
  );
};

export default VerificationRequest;
