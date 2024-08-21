/* eslint-disable @typescript-eslint/no-explicit-any */
import { EyeOutlined, FilterOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Space } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ResModal from "../../../component/Modal/Modal";
import ResTable from "../../../component/Table";
import PropertyDetails from "./PropertyDetails";
import { useGetAllPropertyQuery } from "../../../redux/features/property/propertyApi";
import { priceFormat } from "../../../utils/Format";
import { useGetAllCategoriesQuery } from "../../../redux/features/category/categoryApi";

const Property = () => { 
  const [category, setCategory] = useState<string | null>(null);
  const query: Record<string, any> = {};
  const categoryQuery: Record<string, any> = {};
  const [show, setShow] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [property, setProperty] = useState([]);
  const { t } = useTranslation();
  if (category) {
    query["category"] = category;
  }
  query["limit"] = limit;
  query["page"] = page;
  const { data: data, isSuccess } = useGetAllPropertyQuery({ ...query });

  categoryQuery["limit"] = 99999999999;
  const { data: categories } = useGetAllCategoriesQuery({ ...categoryQuery });

  const [modalData, setModalData] = useState({});

  useEffect(() => {
    if (isSuccess) {
      setProperty(data?.data?.allResidence);
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


  const column = [
    {
      title: t("Property Name"),
      dataIndex: "propertyName",
      key: "propertyName",
    },
    {
      title: t("Rent"),
      dataIndex: "rent",
      key: "rent",
      render: (data: any) => {
        return priceFormat(data);
      },
    }, 
    {
      title: t("Category"),
      dataIndex: "category",
      key: "category",
      render: (data: any) => {
        return <p>{t(data?.name)}</p>;
      },
    }, 
    {
      title: t("Landlord Name"),
      dataIndex: "host",
      key: "agent",
      render: (data: any) => {
        return <p>{data?.name}</p>;
      },
    },
    {
      title: t("Action"),
      key: "action",
      render: (data: any) => {
        return (
          <div>
            <EyeOutlined
              className="text-18 cursor-pointer"
              onClick={() => handleToggleModal(data)}
            />
          </div>
        );
      },
    },
  ];
 
  return (
    <div className="container mx-auto h-80 my-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-20 mb-2 font-500 text-gray">{t("Real Estate")}</h1>
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
        column={column}
        data={property}
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
