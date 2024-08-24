/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Space } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import eye from "../../../assets/eye.png";
import info from "../../../assets/info.png";
import ResModal from "../../../component/Modal/Modal";
import ResTable from "../../../component/Table";
import { useGetAllCategoriesQuery } from "../../../redux/features/category/categoryApi";
import { useGetAllPropertyQuery } from "../../../redux/features/property/propertyApi";
import PropertyDetails from "./PropertyDetails";
const Property = () => {
  const [category, setCategory] = useState<string | null>(null);
  const query: Record<string, any> = {};
  const categoryQuery: Record<string, any> = {};
  const [show, setShow] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const { t } = useTranslation();
  if (category) {
    query["category"] = category;
  }
  query["limit"] = limit;
  query["page"] = page;
  const {
    data: data,
    isLoading,
    isFetching,
  } = useGetAllPropertyQuery({ ...query });
  categoryQuery["limit"] = 99999999999;
  const { data: categories } = useGetAllCategoriesQuery({ ...categoryQuery });
  const navigate = useNavigate();
  const [modalData, setModalData] = useState({});

  const handleToggleModal = (data: any) => {
    setModalData(data);
    setShow((prevShow) => !prevShow);
  };

  const onPaginationChange = (page: any, pageSize: any) => {
    setPage(page);
    setLimit(pageSize);
  };

  const column = [
    {
      title: t("Property ID"),
      dataIndex: "_id",
      key: "_id",
      render: (data: any) => {
        return <p>#{t(data?.slice(0, 6))}</p>;
      },
    },
    {
      title: t("Property Name"),
      dataIndex: "propertyName",
      key: "propertyName",
    },
    // {
    //   title: t("Rent"),
    //   dataIndex: "rent",
    //   key: "rent",
    //   render: (data: any) => {
    //     return priceFormat(data);
    //   },
    // },
    {
      title: t("Governorate"),
      dataIndex: "address",
      key: "address",
      render: (data: any) => {
        return <p>{t(data?.governorate)}</p>;
      },
    },

    {
      title: t("Area"),
      dataIndex: "address",
      key: "address",
      render: (data: any) => {
        return <p>{t(data?.area)}</p>;
      },
    },
    {
      title: t("Rental Type"),
      dataIndex: "rentType",
      key: "rentType",
    },
    {
      title: t("Bedrooms"),
      dataIndex: "bedrooms",
      key: "bedrooms",
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
            {/* {data?.status === "blocked" ? (
            <ResConfirm handleOk={() => handelToUnBlock(data?._id)}>
              <MdBlock className="text-18 cursor-pointer " color="red" />
            </ResConfirm>
          ) : (
            <ResConfirm handleOk={() => handelToBlock(data?._id)}>
              <CgUnblock className="text-18 cursor-pointer" color="green" />
            </ResConfirm>
          )} */}
          </div>
        );
      },
    },
  ];

  return (
    <div className="container mx-auto h-80 my-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-20 mb-2 font-500 text-gray">{t("Properties")}</h1>

        <div className="flex gap-x-4 mb-2">
          <Space size="middle">
            <Dropdown
              overlay={
                <Menu>
                  {categories?.data?.data?.length !== 0 &&
                    categories?.data?.data?.map((item: any) => (
                      <Menu.Item
                        className={`${category === item?._id && "bg-primary"}`}
                        onClick={() => setCategory(item?._id)}
                        key={item?._id}
                      >
                        {t(item.name)}
                      </Menu.Item>
                    ))}
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
          </Space>
          <Button
            className="bg-primary text-white "
            onClick={() => navigate("/admin/realState/create")}
          >
            Add real Estate
          </Button>
        </div>
      </div>
      <ResModal
        width={1000}
        title={t("Real estate details")}
        setShowModal={setShow}
        showModal={show}
      >
        <PropertyDetails modalData={modalData} />
      </ResModal>
      <ResTable
        loading={isFetching || isLoading}
        column={column}
        data={data?.data?.allResidence}
        // onTableChange={}
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

export default Property;
