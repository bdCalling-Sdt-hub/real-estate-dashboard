/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "antd";
import { useState } from "react";
import { LiaEdit } from "react-icons/lia";
import { MdDeleteOutline } from "react-icons/md";
import ResModal from "../../../component/Modal/Modal";
import ResTable from "../../../component/Table";
import ResConfirm from "../../../component/UI/PopConfirm";
import { subAdminData } from "../../../db";
import CreateSubAdmin from "./CreateSubAdmin";
import EditSubAdmin from "./EditSubAdmin";

const SubAdmin = () => {
  const [show, setShow] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const column = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
    },

    {
      title: "action",

      render: (data: any, index: number) => {
        console.log(data, index);
        return (
          <div className="flex items-center gap-x-2">
            <LiaEdit
              className="cursor-pointer"
              size={22}
              onClick={() => setShowEditModal((prev) => !prev)}
            />
            <ResConfirm description="this action cannot be undone!">
              <MdDeleteOutline
                className="cursor-pointer"
                color="red"
                size={22}
              />
            </ResConfirm>
          </div>
        );
      },
    },
  ];
  return (
    <div className="container mx-auto">
      <ResModal
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        title="Edit Sub Admin"
      >
        <EditSubAdmin />
      </ResModal>
      <ResModal
        showModal={show}
        setShowModal={setShow}
        title="Create Sub Admin"
      >
        <CreateSubAdmin />
      </ResModal>
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-20 font-500 text-gray">Sub Admin</h1>
        <Button
          className="bg-primary text-white font-500"
          onClick={() => setShow((prev) => !prev)}
        >
          Create SubAdmin
        </Button>
      </div>
      <ResTable
        column={column}
        data={subAdminData}
        pagination={{ pageSize: 10, total: subAdminData?.length }}
      />
    </div>
  );
};

export default SubAdmin;
