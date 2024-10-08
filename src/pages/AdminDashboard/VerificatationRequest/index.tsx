/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterOutlined } from "@ant-design/icons";
import { Button, Dropdown, Input, Menu } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import infoIcon from "../../../assets/info.png";
import ResModal from "../../../component/Modal/Modal";
import ResTable from "../../../component/Table";
import { useGetAllUserQuery } from "../../../redux/features/auth/authApi";
import VerificatonDetails from "./VerificationDetails";
const VerificationRequest = () => {
  const query: Record<string, any> = {};
  const [show, setShow] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [filter, SetFilter] = useState<string | null>(null);

  const { t } = useTranslation();

  query["limit"] = limit;
  query["page"] = page;
  query["searchTerm"] = search;
  query["verificationRequest"] = "send";

  if (filter) {
    query["role"] = filter;
  }

  // if (isVerified === true || isVerified === false) {
  //   query["isVerified"] = isVerified;
  // }

  const {
    data: data,
    isLoading,
    isFetching,
  } = useGetAllUserQuery({ ...query });

  const [modalData, setModalData] = useState({});

  const handleToggleModal = (data: any) => {
    setModalData(data);
    setShow((prevShow) => !prevShow);
  };

  const onPaginationChange = (page: any, pageSize: any) => {
    setPage(page);
    setLimit(pageSize);
  };

  //  const handelToBlock = async (id: string) => {
  //    toast.loading("Blocking...", { id: "block", duration: 2000 });
  //    try {
  //      const res: any = await updateUserFn({
  //        id,
  //        body: { status: "blocked" },
  //      }).unwrap();

  //      toast.success(res.message, { id: "block", duration: 2000 });
  //    } catch (error) {
  //      ErrorResponse(error, "block");
  //    }
  //  };

  //  const handelToUnBlock = async (id: string) => {
  //    toast.loading("Blocking...", { id: "active", duration: 2000 });
  //    try {
  //      const res: any = await updateUserFn({
  //        id,
  //        body: { status: "active" },
  //      }).unwrap();

  //      toast.success(res.message, { id: "active", duration: 2000 });
  //    } catch (error) {
  //      ErrorResponse(error, "active");
  //    }
  //  };

  const column = [
    {
      title: t("Name"),
      dataIndex: "name",
      key: "name",
    },
    // {
    //   title: t("Request Date"),
    //   dataIndex: "date",
    //   key: "date",
    // },
    {
      title: t("Email"),
      dataIndex: "email",
      key: "email",
    },
    {
      title: t("User Type"),
      dataIndex: "role",
      key: "role",
      render: (data: any) => {
        return data === "landlord" ? t("Landlord") : t("Tenant");
      },
    },
    {
      title: t("Action"),
      render: (data: any) => {
        return (
          <div className="flex items-center gap-x-2">
            <img
              src={infoIcon}
              alt=""
              className="text-18 cursor-pointer"
              onClick={() => handleToggleModal(data)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-20 font-500 text-gray mb-1">
          {t("Verification Requests")}
        </h1>
        <div className="flex gap-x-2">
          <Input.Search
            style={{ width: 304 }}
            placeholder={t("Search")}
            allowClear
            onChange={(e) => setSearch(e.target.value)}
          />
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item
                  className={`${filter === "landlord" && "bg-primary"}`}
                  onClick={() => SetFilter("landlord")}
                >
                  {t("Landlord")}
                </Menu.Item>
                <Menu.Item
                  onClick={() => SetFilter("user")}
                  className={`${filter === "user" && "bg-primary"}`}
                >
                  {t("Tenant")}
                </Menu.Item>
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
      <ResModal
        showModal={show}
        setShowModal={setShow}
        width={1000}
        title={t("Verification Information")}
      >
        <VerificatonDetails modalData={modalData} setShow={setShow} />
      </ResModal>

      <ResTable
        column={column}
        loading={isFetching || isLoading}
        data={data?.data?.data}
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

export default VerificationRequest;
