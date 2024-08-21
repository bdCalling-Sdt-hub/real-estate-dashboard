/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Row } from "antd";
import { FieldValues, SubmitErrorHandler } from "react-hook-form";
import { useGetAllUserQuery } from "../../redux/features/auth/authApi";
import { useGetAllCategoriesQuery } from "../../redux/features/category/categoryApi";
import ResForm from "../Form/FormProvider";
import ResInput from "../Form/ResInput";
import ResSelect from "../Form/ResSelect";

const PropertyBasicInformation = () => {
  const { data: Landlorddata } = useGetAllUserQuery({
    role: "landlord",
    limit: 999999999,
  });
  const { data: categorydata } = useGetAllCategoriesQuery({});
  console.log(categorydata);

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

  const onsubmit: SubmitErrorHandler<FieldValues> = async () => {};
  return (
    <ResForm onSubmit={onsubmit}>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <ResSelect
            showSearch
            name="owner"
            label="Select Landlord name"
            options={landlordData}
            placeholder="select landlord"
            size="large"
          />
          <ResSelect
            name="category"
            label="Select category"
            options={Categories}
            placeholder="select category"
            size="large"
          />
          <ResSelect
            name="features"
            label="Select Residence Type"
            options={Categories}
            placeholder="select category"
            size="large"
          />
          <ResInput
            type="text"
            name="propertyName"
            label="Enter PropertyName"
            placeholder="select PropertyName"
            size="large"
          />
          <ResInput
            type="text"
            name="squareFeet"
            label="Enter squareFeet"
            placeholder="select squareFeet"
            size="large"
          />
          <ResInput
            type="number"
            name="bedrooms"
            label="Enter number of bedrooms"
            placeholder="enter number of bedrooms"
            size="large"
          />
          <ResInput
            type="number"
            name="bathrooms"
            label="Enter number of bathrooms"
            placeholder="enter number of bathrooms"
            size="large"
          />
        </Col>
        <Col span={12}>
          <ResSelect
            mode="Select Residence Type"
            name="residenceType"
            label="Select Residence Type"
            options={[
              { label: "Condominium", value: "Condominium" },
              { label: "Private", value: "Private" },
            ]}
            placeholder="select residenceType"
            size="large"
          />
          <ResSelect
            mode="multiple"
            showSearch
            name="features"
            label="Select features"
            options={features}
            placeholder="select features"
            size="large"
          />
          <ResSelect
            name="rentType"
            label="Select rent type"
            options={[
              { label: "Short Term", value: "Short Term" },
              { label: "Long Term", value: "Long Term" },
            ]}
            placeholder="select rent type"
            size="large"
          />
          <ResSelect
            name="paymentType"
            label="Select payment type"
            options={[
              { label: "Per Night", value: "Per Night" },
              { label: "Per Month", value: "Per Month" },
            ]}
            placeholder="select rent type"
            size="large"
          />
          <ResInput
            type="number"
            name="deposit"
            label="Enter deposit amount"
            placeholder="enter deposit amount"
            size="large"
          />
          <ResInput
            type="number"
            name="rent"
            label="Enter rental price"
            placeholder="enter rental price"
            size="large"
          />
        </Col>
      </Row>
    </ResForm>
  );
};

export default PropertyBasicInformation;
