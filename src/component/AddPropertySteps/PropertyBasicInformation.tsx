/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Row } from "antd";
import { FieldValues, SubmitErrorHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useGetAllUserQuery } from "../../redux/features/auth/authApi";
import { useGetAllCategoriesQuery } from "../../redux/features/category/categoryApi";
import {
  setCount,
  setProperty,
} from "../../redux/features/property/propertySlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { propertyvalidation } from "../../schema/property.schema";
import ResForm from "../Form/FormProvider";
import ResInput from "../Form/ResInput";
import ResSelect from "../Form/ResSelect";

const PropertyBasicInformation = () => {
  const { count, property }: any = useAppSelector((state) => state.property);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { data: Landlorddata } = useGetAllUserQuery({
    role: "landlord",
    limit: 999999999,
  });
  const { data: categorydata } = useGetAllCategoriesQuery({});
  const landlordData = Landlorddata?.data?.data?.map((data: any) => {
    return {
      label: data?.username,
      value: data?._id,
    };
  });
  const Categories = categorydata?.data?.data?.map((data: any) => {
    return {
      label: data?.name,
      value: data?._id,
    };
  });
  const features = [
    { label: "Elevator", value: "Elevator" },
    { label: "Security", value: "Security" },
    { label: "Parking", value: "Parking" },
    { label: "Furnished", value: "Furnished" },
    { label: "WiFi", value: "WiFi" },
    { label: "Pool", value: "Pool" },
    { label: "Maids Room", value: "Maids Room" },
    { label: "Central A.C", value: "Central A.C" },
    { label: "Jacuzzi", value: "Jacuzzi" },
    { label: "Driver Room", value: "Driver Room" },
    { label: "Dewaniya", value: "Dewaniya" },
    { label: "Sea View", value: "Sea View" },
    { label: "Kitchenware", value: "Kitchenware" },
    { label: "Pet Friendly", value: "Pet Friendly" },
    { label: "Balcony", value: "Balcony" },
    { label: "Gym", value: "Gym" },
  ];

  const onsubmit: SubmitErrorHandler<FieldValues> = (data) => {
    dispatch(setProperty(data));
    dispatch(setCount(Number(count) + 1));
  };
  return (
    <ResForm
      onSubmit={onsubmit}
      defaultValues={property!}
      resolver={zodResolver(propertyvalidation.propertyInitalScema)}
    >
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <ResSelect
            defaultValue={property?.host}
            showSearch
            name="host"
            label={t("Select landlord name")}
            options={landlordData}
            placeholder={t("Select landlord name")}
            size="large"
          />
          <ResSelect
            defaultValue={property?.category}
            name="category"
            label={t("Select category")}
            options={Categories}
            placeholder={t("Select category")}
            size="large"
          />
          <ResInput
            type="text"
            name="propertyName"
            label={t("Enter property title")}
            placeholder={t("Enter property title")}
            size="large"
          />
          <ResInput
            type="text"
            name="squareFeet"
            label={t("Enter squareFeet")}
            placeholder={t("Enter squareFeet")}
            size="large"
          />
          <ResInput
            type="number"
            name="bedrooms"
            label={t("Enter number of bedrooms")}
            placeholder={t("Enter number of bedrooms")}
            size="large"
          />
          <ResInput
            type="number"
            name="bathrooms"
            label={t("Enter number of bathrooms")}
            placeholder={t("Enter number of bathrooms")}
            size="large"
          />
        </Col>
        <Col span={12}>
          <ResSelect
            defaultValue={property?.residenceType}
            name="residenceType"
            label={t("Select residence type")}
            options={[
              { label: "Condominium", value: "Condominium" },
              { label: "Private", value: "Private" },
            ]}
            placeholder={t("Select residence type")}
            size="large"
          />
          <ResSelect
            mode="multiple"
            defaultValue={property?.features}
            showSearch
            name="features"
            label={t("Select features")}
            options={features}
            placeholder={t("Select features")}
            size="large"
          />
          <ResSelect
            name="rentType"
            defaultValue={property?.rentType}
            label={t("Select rent type")}
            options={[
              { label: "Short Term", value: "Short Term" },
              { label: "Long Term", value: "Long Term" },
            ]}
            placeholder={t("Select rent type")}
            size="large"
          />
          <ResSelect
            name="paymentType"
            defaultValue={property?.paymentType}
            label={t("Select payment type")}
            options={[
              { label: "Per Night", value: "Per Night" },
              { label: "Per Month", value: "Per Month" },
            ]}
            placeholder={t("Select payment type")}
            size="large"
          />
          <ResInput
            type="number"
            name="deposit"
            label={t("Enter deposit amount")}
            placeholder={t("Enter deposit amount")}
            size="large"
          />
          <ResInput
            type="number"
            name="rent"
            label={t("Enter rental price")}
            placeholder={t("Enter rental price")}
            size="large"
          />
        </Col>
      </Row>

      <div className="flex justify-end">
        <Button
          htmlType="submit"
          className="bg-primary text-white text-20 font-500 w-[100px] h-[44px]"
        >
          {t("Next")}
        </Button>
      </div>
    </ResForm>
  );
};

export default PropertyBasicInformation;
