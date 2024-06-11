import { EyeOutlined, FilterOutlined } from "@ant-design/icons";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Dropdown, Input, MenuProps } from "antd";
import { SearchProps } from "antd/es/input";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ResModal from "../../../component/Modal/Modal";
import ResTable from "../../../component/Table";
import { adverTisementData } from "../../../db/ads";
import AdsDetails from "./AdsDetails";

const AdverTisement = () => {
  const [show, setShow] = useState<boolean>(false);
  const { t } = useTranslation();
  const handleToggleModal = () => {
    setShow((prevShow) => !prevShow); // Toggle the state using the previous state value
  };
  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <p>Land</p>,
    },
    {
      key: "2",
      label: <p>Home</p>,
    },
    {
      key: "3",
      label: <p>Farm</p>,
    },
  ];
  const column = [
    {
      title: "Property Name",
      dataIndex: "propertyName",
      key: "propertyName",
    },
    {
      title: "Owner Name",
      dataIndex: "ownerName",
      key: "ownerName",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Action",
      key: "action",
      render: (data: any, index: number) => {
        console.log(data, index);
        return (
          <div>
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
    <div className="container mx-auto h-80 my-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-20 font-500 text-gray">
          {t("Active Advertisement Listings")}
        </h1>
        <div className="flex gap-x-2">
          <Input.Search
            style={{ width: 304 }}
            placeholder={t("search")}
            allowClear
            onSearch={onSearch}
          />
          <Dropdown menu={{ items }} placement="bottomLeft">
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
        <AdsDetails />
      </ResModal>
      <ResTable
        column={column}
        data={adverTisementData}
        pagination={{ total: adverTisementData?.length, pageSize: 10 }}
      />
    </div>
  );
};

export default AdverTisement;
