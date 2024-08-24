/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterOutlined } from "@ant-design/icons";
import { Button, Dropdown, Input, Menu } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CgUnblock } from "react-icons/cg";
import { MdBlock } from "react-icons/md";
import { toast } from "sonner";
import eye from "../../../assets/eye.png";
import info from "../../../assets/info.png";
import unverified from "../../../assets/unverified.png";
import verified from "../../../assets/verified.png";
import ResModal from "../../../component/Modal/Modal";
import ResTable from "../../../component/Table";
import ErrorResponse from "../../../component/UI/ErrorResponse";
import ResConfirm from "../../../component/UI/PopConfirm";
import {
  useGetAllUserQuery,
  useUpdateUserMutation,
} from "../../../redux/features/auth/authApi";
import { NumberFormat } from "../../../utils/Format";
import GuestDetails from "./GuestDetails";
const Guest = () => {
  const query: Record<string, any> = {};
  const [show, setShow] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [updateUserFn] = useUpdateUserMutation();
  // import block from "../../../assets/block.svg"
  const [users, setUsers] = useState([]);
  const { t } = useTranslation();

  query["limit"] = limit;
  query["page"] = page;
  query["searchTerm"] = search;
  query["role"] = "user";

  if (isVerified === true || isVerified === false) {
    query["isVerified"] = isVerified;
  }

  const {
    data: data,
    isSuccess,
    isLoading,
    isFetching,
  } = useGetAllUserQuery({ ...query });

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

      if (res.success) {
        toast.success(t("user blocked success"), {
          id: "block",
          duration: 2000,
        });
      } else {
        toast.success(res.message, { id: "block", duration: 2000 });
      }
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

      if (res.success) {
        toast.success(t("user unblock success"), {
          id: "active",
          duration: 2000,
        });
      } else {
        toast.success(res.message, { id: "active", duration: 2000 });
      }
    } catch (error) {
      ErrorResponse(error, "active");
    }
  };

  const column = [
    {
      title: t("Full Name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("Nationality"),
      dataIndex: "nationality",
      key: "nationality",
    },
    {
      title: t("Phone No."),
      dataIndex: "phoneNumber",
      key: "email",
    },
    {
      title: t("Income"),
      dataIndex: "monthlyIncome",
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
      title: t("Verification"),
      dataIndex: "isVerified",
      key: "isVerified",
      render: (data: any) => {
        return data ? (
          <img src={verified} alt="" />
        ) : (
          <img src={unverified} alt="" />
        );
      },
    },
    {
      title: t("Action"),
      render: (data: any, index: number) => {
        return (
          <div className="flex items-center gap-x-2">
            <img
              className="cursor-pointer"
              src={eye}
              onClick={() => {
                handleToggleModal(data);
              }}
            />
            <img
              className="cursor-pointer"
              src={info}
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
                  className={`${isVerified === true && "bg-"}`}
                  onClick={() => setIsVerified(true)}
                >
                  {t("Verified")}
                </Menu.Item>
                <Menu.Item
                  onClick={() => setIsVerified(false)}
                  className={`${isVerified === false && "bg-primary"}`}
                >
                  {t("Unverified")}
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
        loading={isLoading || isFetching}
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
