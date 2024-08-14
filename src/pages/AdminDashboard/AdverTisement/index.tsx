import { EyeOutlined, FilterOutlined } from "@ant-design/icons";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Dropdown, Menu } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ResModal from "../../../component/Modal/Modal";
import ResTable from "../../../component/Table";
import AdsDetails from "./AdsDetails";
import { useGetAllAdsQuery } from "../../../redux/features/ads/adsApi";
import { useGetAllCategoriesQuery } from "../../../redux/features/category/categoryApi";
import moment from "moment";

const AdverTisement = () => {
  const [category, setCategory] = useState<string | null>(null);
  const query: Record<string, any> = {};
  const categoryQuery: Record<string, any> = {};
  const [show, setShow] = useState<boolean>(false);
  // const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [adverTisementData, setAdverTisementData] = useState([]);
  const { t } = useTranslation();
  if (category) {
    query["property.category.name"] = category;
  }
  query["limit"] = limit;
  query["page"] = page;
  // query["searchTerm"] = search;

  const { data: data, isSuccess } = useGetAllAdsQuery({ ...query });

  categoryQuery["limit"] = 99999999999;
  const { data: categories } = useGetAllCategoriesQuery({ ...categoryQuery });

  const [modalData, setModalData] = useState({});

  useEffect(() => { 
    if (isSuccess) {
      setAdverTisementData(data?.data?.data);
    }
  }, [isSuccess, data]);

  const handleToggleModal = (data: any) => {
    setModalData(data);
    setShow((prevShow) => !prevShow); // Toggle the state using the previous state value
  };

  const onPaginationChange = (page: any, pageSize: any) => {
    setPage(page);
    setLimit(pageSize);
  };

  const column = [
    {
      title: t("Property Name"),
      dataIndex: "property",
      key: "propertyName",
      render: (data: any) => {
        return data?.propertyName;
      },
    },
    {
      title: t("Advertiser"),
      dataIndex: "property",
      key: "ownerName",
      render: (data: any) => {
        return data?.host?.name;
      },
    },
    {
      title: t("Category"),
      dataIndex: "property",
      key: "category",
      render: (data: any) => {
        return data?.category?.name;
      },
    },
    {
      title: t("Status"),
      dataIndex: "status",
      key: "status",
      render: (data: any) => { 
        return (
          <div className="flex items-center justify-center">
            {data ? (
              <span className="text-[#237804] px-2 py-1 bg-[#d9f7be]">
                Active
              </span>
            ) : (
              <span className="text-[#cf1322] px-2 py-1 bg-[#ffccc7]">
                Deactivate
              </span>
            )}
          </div>
        );
      },
    },
    {
      title: t("Start Date"),
      dataIndex: "startAt",
      key: "startDate",
      render: (data: any) => {
        return moment(data?.startAt).format().slice(0, 10);
      },
    },
    {
      title: t("End Date"),
      dataIndex: "expireAt",
      key: "endDate",
      render: (data: any) => {
        return moment(data?.expireAt).format().slice(0, 10);
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
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-20 font-500 text-gray">
          {t("Active Advertisement Listings")}
        </h1>
        <div className="flex gap-x-2">
          {/* <Input.Search
            style={{ width: 304 }}
            placeholder={t("Search")}
            allowClear
            onChange={(e) => setSearch(e.target.value)}
          /> */}
          <Dropdown
            overlay={
              <Menu>
                {categories?.data?.data?.length !== 0 &&
                  categories?.data?.data?.map((item: any) => (
                    <Menu.Item
                      className={`${category === item?.name && "bg-primary"}`}
                      onClick={() => setCategory(item?.name)}
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
        </div>
      </div>
      <ResModal width={1000} setShowModal={setShow} showModal={show}>
        <AdsDetails modalData={modalData} />
      </ResModal>
      <ResTable
        column={column}
        data={adverTisementData}
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

export default AdverTisement;
