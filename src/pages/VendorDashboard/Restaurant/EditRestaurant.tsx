/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import MultiUpload from "../../../component/MultiUpload/MultiUpload";
import { Button, Col, Divider, Form, Row, Switch, UploadFile } from "antd";
import { RcFile } from "antd/es/upload";
import ResInput from "../../../component/Form/ResInput";
import ResTextArea from "../../../component/Form/ResTextarea";
import ResTimePicker from "../../../component/Form/ResTimepicker";
import {
  useDeleteFileMutation,
  useEditRestaurantMutation,
  useGetSingleRestaurantQuery,
} from "../../../redux/features/restaurant/restaurantApi";
import ErrorResponse from "../../../component/UI/ErrorResponse";
import { toast } from "sonner";
import ResDatePicker from "../../../component/Form/ResDatePicker";
import moment from "moment";
import { days } from "../../../constant/days";
import { zodResolver } from "@hookform/resolvers/zod";
import { restaurantSchema } from "../../../schema/restaurant.schema";
import ResForm from "../../../component/Form/FormProvider";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import showImage from "../../../utils/showImage";
dayjs.extend(customParseFormat);

const EditRestaurant = () => {
  const { id } = useParams();
  const [reviewStatus, setReviewStatus] = useState(true);
  const [editRestaurant] = useEditRestaurantMutation();
  const [deletImages] = useDeleteFileMutation();
  const { data: singleRestaurantData } = useGetSingleRestaurantQuery(id!);
  const formatedImage = singleRestaurantData?.data?.images?.map(
    (image: any, index: number) => {
      return {
        uid: image?._id,
        name: image?.url,
        status: "done",
        url: showImage(image?.url),
      };
    }
  );
  const [fileList, setFileList] = useState<UploadFile[]>(formatedImage);
  const formatedData = {
    ...singleRestaurantData?.data,
    close: {
      from: dayjs(singleRestaurantData?.data?.close?.from, "YYYY-MM-DD HH:mm"),
      to: dayjs(singleRestaurantData?.data?.close?.to, "YYYY-MM-DD HH:mm"),
    },
  };
  const onChange = (value: boolean) => {
    setReviewStatus(value);
  };
  const onSubmit = async (data: any) => {
    days.forEach((day) => {
      const dayData = data[day];
      if (dayData.openingTime && dayData.closingTime) {
        const openingTime = moment(dayData.openingTime, "hh:mm").format(
          "HH:mm"
        ); // Convert to 24-hour format
        const closingTime = moment(dayData.closingTime, "hh:mm").format(
          "HH:mm"
        ); // Convert to 24-hour format
        data[day] = { openingTime, closingTime }; // Update the day object with formatted times
      }
    });
    const formData = new FormData();
    if (fileList && fileList.length > 0) {
      fileList.forEach((file: any) => {
        if (file.originFileObj) {
          console.log(file.originFileObj);
          formData.append("files", file.originFileObj);
        }
      });
    }

    formData.append("data", JSON.stringify({ ...data, reviewStatus }));
    const toastId = toast.loading("Editing...");
    try {
      const res = await editRestaurant({ id: id, data: formData }).unwrap();
      toast.success("Restaurant edited successfully", {
        id: toastId,
        duration: 2000,
      });
      //   console.log(res);
    } catch (err) {
      ErrorResponse(err, toastId);
    }
  };
  days.forEach((day) => {
    const dayData = formatedData[day];
    if (dayData && dayData.openingTime && dayData.closingTime) {
      const formattedDayData = {
        openingTime: dayjs(dayData.openingTime, "HH:mm"),
        closingTime: dayjs(dayData.closingTime, "HH:mm"),
      };
      formatedData[day] = formattedDayData;
    }
  });

  //   delete an image

  const deleteFile = async (file: any): Promise<boolean> => {
    return new Promise((resolve) => {
      toast("Are You Sure?", {
        description: "This action cannot be undone!",
        action: {
          label: "Delete",

          onClick: async () => {
            const toastId = toast.loading("Deleting...");
            try {
              const res = await deletImages({
                restaurantId: id,
                imageId: file?.uid,
              }).unwrap();
              toast.success("Image deleted successfully", {
                id: toastId,
                duration: 2000,
              });
              resolve(true); // Resolve with true if deletion is successful
            } catch (err) {
              ErrorResponse(err, toastId);
              resolve(false); // Resolve with false if deletion fails
            }
          },
        },
      });
    });
  };

  return (
    <div>
      <ResForm
        onSubmit={onSubmit}
        defaultValues={formatedData}
        // resolver={zodResolver(restaurantSchema.insertRestaurantSchema)}
      >
        <Row gutter={[14, 0]}>
          <Col span={24}>
            <Form.Item>
              <MultiUpload
                removeFile={deleteFile}
                fileList={fileList as RcFile[]}
                setFileList={setFileList}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <ResInput
              size="large"
              label="Enter Restaurant name"
              type="text"
              name="name"
              placeholder="type name here"
            />
          </Col>
          <Col span={12}>
            <ResInput
              size="large"
              label="Enter Restaurant Location"
              type="text"
              name="location"
              placeholder="type restaurant location"
            />
          </Col>
          <Col span={24}>
            <ResTextArea
              label="Description"
              name="description"
              placeholder="type restaurant description"
            />
          </Col>
          <Col span={6}>
            <ResDatePicker
              showTime={true}
              size="large"
              label="Enter Close From"
              name="close.from"
              placeholder="select date and time"
            />
          </Col>
          <Col span={6}>
            <ResDatePicker
              showTime={true}
              size="large"
              label="Enter Close To"
              name="close.to"
              placeholder="select date and time"
            />
          </Col>
          <Col span={24}>
            <Form.Item name="review-status">
              <div className="flex gap-x-2 items-center">
                <p>Review Status</p>
                <Switch
                  defaultValue={formatedData.reviewStatus}
                  onChange={onChange}
                />
              </div>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Divider className="bg-deepGray" />
            <Row gutter={16}>
              <Col span={12}>
                <ResTimePicker
                  label="Saturday Open Time"
                  name="saturday.openingTime"
                />
              </Col>
              <Col span={12}>
                <ResTimePicker
                  label="Saturday Close Time"
                  name="saturday.closingTime"
                />
              </Col>
              <Col span={12}>
                <ResTimePicker
                  label="Sunday Open Time"
                  name="sunday.openingTime"
                />
              </Col>
              <Col span={12}>
                <ResTimePicker
                  label="Sunday Close Time"
                  name="sunday.closingTime"
                />
              </Col>
              <Col span={12}>
                <ResTimePicker
                  label="Monday Open Time"
                  name="monday.openingTime"
                />
              </Col>
              <Col span={12}>
                <ResTimePicker
                  label="Monday Close Time"
                  name="monday.closingTime"
                />
              </Col>
              <Col span={12}>
                <ResTimePicker
                  label="Friday Open Time"
                  name="friday.openingTime"
                />
              </Col>
              <Col span={12}>
                <ResTimePicker
                  label="Friday Close Time"
                  name="friday.closingTime"
                />
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Divider className="bg-deepGray" />
            <Row gutter={16}>
              <Col span={12}>
                <ResTimePicker
                  label="Tuesday Open Time"
                  name="tuesday.openingTime"
                />
              </Col>
              <Col span={12}>
                <ResTimePicker
                  label="Tuesday Close Time"
                  name="tuesday.closingTime"
                />
              </Col>
              <Col span={12}>
                <ResTimePicker
                  label="WednesDay Open Time"
                  name="wednesday.openingTime"
                />
              </Col>
              <Col span={12}>
                <ResTimePicker
                  label="WednesDay Close Time"
                  name="wednesday.closingTime"
                />
              </Col>
              <Col span={12}>
                <ResTimePicker
                  label="Thursday Open Time"
                  name="thursday.openingTime"
                />
              </Col>
              <Col span={12}>
                <ResTimePicker
                  label="Thursday Close Time"
                  name="thursday.closingTime"
                />
              </Col>
            </Row>

            <div className="flex justify-end mt-6 ">
              <Button
                htmlType="submit"
                className=" bg-primary text-white font-600 w-[150px] text-18 h-[40px]"
              >
                Submit
              </Button>
            </div>
          </Col>
        </Row>
      </ResForm>
    </div>
  );
};

export default EditRestaurant;
