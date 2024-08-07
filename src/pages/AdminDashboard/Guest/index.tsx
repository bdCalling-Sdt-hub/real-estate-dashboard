/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { EyeOutlined, FilterOutlined } from "@ant-design/icons";
import { Button, Dropdown, Input, Menu, MenuProps } from "antd";
import { SearchProps } from "antd/es/input";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MdBlock } from "react-icons/md";
import ResModal from "../../../component/Modal/Modal";
import ResTable from "../../../component/Table";
import ResConfirm from "../../../component/UI/PopConfirm";
import { userData } from "../../../db";
import GuestDetails from "./GuestDetails";
import {
  useGetAllUserQuery,
  useUpdateUserMutation,
} from "../../../redux/features/auth/authApi";
import { toast } from "sonner";
import ErrorResponse from "../../../component/UI/ErrorResponse";
import moment from "moment";
import { NumberFormat } from "../../../utils/Format";
import { CgUnblock } from "react-icons/cg";

const Guest = () => {
  const query: Record<string, any> = {};
  const [show, setShow] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [updateUserFn] = useUpdateUserMutation();

  const [users, setUsers] = useState([]);
  const { t } = useTranslation();

  query["limit"] = limit;
  query["page"] = page;
  query["searchTerm"] = search;
  query["role"] = "user";

  if (isVerified === true || isVerified === false) {
    query["isVerified"] = isVerified;
  }
 
  const { data: data, isSuccess } = useGetAllUserQuery({ ...query });

  const [modalData, setModalData] = useState({});

  useEffect(() => {
    if (isSuccess) {
      setUsers(data?.data?.data);
    }
  }, [isSuccess, data]);

  const handleToggleModal = (data: any) => {
    setModalData(data);
    setShow((prevShow) => !prevShow);
  };

  const onPaginationChange = (page: any, pageSize: any) => {
    setPage(page);
    setLimit(pageSize);
  };

  const handelToBlock = async (id: string) => {
    toast.loading("Blocking...", { id: "block", duration: 2000 });
    try {
      const res: any = await updateUserFn({
        id,
        body: { status: "blocked" },
      }).unwrap();

      toast.success(res.message, { id: "block", duration: 2000 });
    } catch (error) {
      ErrorResponse(error, "block");
    }
  };

  const handelToUnBlock = async (id: string) => {
    toast.loading("Blocking...", { id: "active", duration: 2000 });
    try {
      const res: any = await updateUserFn({
        id,
        body: { status: "active" },
      }).unwrap();

      toast.success(res.message, { id: "active", duration: 2000 });
    } catch (error) {
      ErrorResponse(error, "active");
    }
  };

  const column = [
    {
      title: t("Name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("Joining Date"),
      dataIndex: "createdAt",
      key: "date",
      render: (data: any) => {
        return moment(data).format("L");
      },
    },
    {
      title: t("Email"),
      dataIndex: "email",
      key: "email",
    },
    {
      title: t("Contact No"),
      dataIndex: "phoneNumber",
      key: "number",
      render: (data: any) => { 
        return data ? NumberFormat(data) : data;
      },
    },
    {
      title: t("Address"),
      dataIndex: "address",
      key: "address",
    },
    // {
    //   title: t("User Type"),
    //   dataIndex: "role",
    //   key: "role",
    //   render: (data: any) => {
    //     return data === "user" && "Host";
    //   },
    // },
    {
      title: t("Account Status"),
      dataIndex: "status",
      key: "status",
      render: (data: any) => {
        return data;
      },
    },
    {
      title: t("Action"),
      render: (data: any, index: number) => {
        return (
          <div className="flex items-center gap-x-2">
            <EyeOutlined
              className="text-18 cursor-pointer"
              onClick={() => {
                handleToggleModal(data);
              }}
            />
            {data?.status === "blocked" ? (
              <ResConfirm handleOk={() => handelToUnBlock(data?._id)}>
                <MdBlock className="text-18 cursor-pointer " color="red" />
              </ResConfirm>
            ) : (
              <ResConfirm handleOk={() => handelToBlock(data?._id)}>
                <CgUnblock className="text-18 cursor-pointer" color="green" />
              </ResConfirm>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="container mx-auto">
      <ResModal
        width={1000}
        // title="Booking Details"
        setShowModal={setShow}
        showModal={show}
      >
        <GuestDetails modalData={modalData} />
      </ResModal>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-20 font-500 text-gray">{t("Tenants List")}</h1>
        <div className="flex gap-x-2">
          <Input.Search
            style={{ width: 304 }}
            placeholder={t("search")}
            allowClear
            onChange={(e) => setSearch(e.target.value)}
          />
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item
                  className={`${isVerified === true && "bg-primary"}`}
                  onClick={() => setIsVerified(true)}
                >
                  {t("Verified")}
                </Menu.Item>
                <Menu.Item
                  onClick={() => setIsVerified(false)}
                  className={`${isVerified === false && "bg-primary"}`}
                >
                  {t("Not Verified")}
                </Menu.Item>
                {/* <Menu.Item
                      className={`${category === item?._id && "bg-primary"}`}
                      onClick={() => setCategory(item?._id)}
                      key={item?._id}
                    >
                      {t(item.name)}
                    </Menu.Item> */}
              </Menu>
            }
          >
            <Button
              className="bg-primary text-white font-500 "
              icon={<FilterOutlined />}
            >
              {t("Filter")}
            </Button>
          </Dropdown>
        </div>
      </div>
      <ResTable
        column={column}
        data={users}
        pagination={{
          total: data?.data?.meta?.total || 0,
          pageSize: limit || 10,
          onChange: onPaginationChange,
          showSizeChanger: true,
        }}
      />
    </div>
  );
};

export default Guest;
