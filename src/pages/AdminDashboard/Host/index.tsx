/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterOutlined } from "@ant-design/icons";
import { Button, Dropdown, Input, Menu } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import block from "../../../assets/block.png";
import eye from "../../../assets/eye.png";
import info from "../../../assets/info.png";
import unverified from "../../../assets/unverified.png";
import verified from "../../../assets/verified.png";
import ResModal from "../../../component/Modal/Modal";
import ResTable from "../../../component/Table";
import ErrorResponse from "../../../component/UI/ErrorResponse";
import {
  useGetAllUserQuery,
  useUpdateUserMutation,
} from "../../../redux/features/auth/authApi";
import CreateHost from "./CreateHost";
import HostDetails from "./HostDetails";

const Host = () => {
  const query: Record<string, any> = {};
  const [show, setShow] = useState<boolean>(false);
  const [showAddModal, setshowAddModal] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [isVerified, setIsVerified] = useState<boolean | null>();
  const [updateUserFn] = useUpdateUserMutation();
  const [blockModal, setBlockModal] = useState(false);
  const [id, setid] = useState();
  const [Hosts, setHosts] = useState([]);
  const { t } = useTranslation();
  query["limit"] = limit;
  query["page"] = page;
  query["searchTerm"] = search;

  query["role"] = "landlord";

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
      setHosts(data?.data?.data);
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

  const handleToBlock = async () => {
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
  // const onSearch: SearchProps["onSearch"] = (value, _e) => setSearch(value);

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
      key: "phoneNumber",
    },
    {
      title: t("Tenants"),
      dataIndex: "tenants",
      key: "tenants",
    },
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
    // {
    //   title: t("User Type"),
    //   dataIndex: "role",
    //   key: "role",
    //   render: (data: any) => {
    //     return data === "user" && "Host";
    //   },
    // },
    // {
    //   title: t("Account Status"),
    //   dataIndex: "status",
    //   key: "status",
    //   render: (data: any) => {
    //     return data;
    //   },
    // },
    {
      title: t("Action"),
      render: (data: any, index: number) => {
        return (
          <div className="flex items-center gap-x-2">
            {/* <img
              className="cursor-pointer"
              src={}
              onClick={() => {
                handleToggleModal(data);
              }}
            /> */}

            {data?.status === "blocked" ? (
              <img
                className="cursor-pointer"
                src={block}
                width={35}
                alt=""
                onClick={() => handelToUnBlock(data?._id)}
              />
            ) : (
              <img
                className="cursor-pointer"
                src={eye}
                alt=""
                onClick={() => {
                  setid(data?._id), setBlockModal((prev) => !prev);
                }}
              />
            )}
            <img
              className="cursor-pointer"
              src={info}
              onClick={() => {
                handleToggleModal(data);
              }}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="container mx-auto">
      <ResModal showModal={blockModal} setShowModal={setBlockModal}>
        <div className="flex flex-col items-center justify-center h-[200px]">
          <h1 className="text-20 font-500">
            Sure you want to suspend this user?
          </h1>

          <div className="flex gap-x-6 mt-8">
            <Button className="border text-20 h-[50px] w-[200px] font-500  border-[#64B5F6] rounded-full">
              No
            </Button>
            <Button
              onClick={() => handleToBlock()}
              className="border text-20 h-[50px] w-[200px] font-500  bg-[#64B5F6] border-[#64B5F6] rounded-full text-white"
            >
              Yes
            </Button>
          </div>
        </div>
      </ResModal>
      <ResModal
        width={1000}
        // title="Host"
        setShowModal={setShow}
        showModal={show}
      >
        <HostDetails modalData={modalData} />
      </ResModal>
      <ResModal
        title="Create Landlord Account"
        width={600}
        // title="Host"
        setShowModal={setshowAddModal}
        showModal={showAddModal}
      >
        <CreateHost setshow={setshowAddModal} />
      </ResModal>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-20 font-500 text-gray">{t("Landlords List")}</h1>
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

          <Button
            className="bg-primary text-white font-500"
            onClick={() => setshowAddModal((prev) => !prev)}
          >
            Add Landlord
          </Button>
          {/* <Dropdown menu={{ items }} placement="bottomLeft">
            <Button
              className="bg-primary text-white font-500 "
              icon={<FilterOutlined />}
            >
              {t("Filter")}
            </Button>
          </Dropdown> */}
        </div>
      </div>
      <ResTable
        loading={isLoading || isFetching}
        column={column}
        data={Hosts}
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

export default Host;
