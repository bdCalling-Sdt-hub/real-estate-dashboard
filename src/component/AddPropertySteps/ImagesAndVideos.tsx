/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Button, Col, Row, Switch } from "antd";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { governorates } from "../../db";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { useCreatePropertyMutation } from "../../redux/features/property/propertyApi";
import {
  setCount,
  setdocument,
  setgovernorate,
} from "../../redux/features/property/propertySlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { propertyvalidation } from "../../schema/property.schema";
import ResForm from "../Form/FormProvider";
import ResInput from "../Form/ResInput";
import ResSelect from "../Form/ResSelect";
import ResTextArea from "../Form/ResTextarea";
import ErrorResponse from "../UI/ErrorResponse";
const containerStyle = {
  width: "800px",
  height: "400px",
};

const center = {
  lat: 29.3759, // Default latitude for Kuwait
  lng: 47.9774, // Default longitude for Kuwait
};
const DocumentSwitch = ({ label, defaultChecked, onChange }: any) => {
  return (
    <div className="flex items-center gap-x-4">
      <p className="text-16 font-500">{label}</p>
      <Switch defaultChecked={defaultChecked} onChange={onChange} />
    </div>
  );
};
const ImagesAndVideos = () => {
  const navigate = useNavigate();
  const [imageFiles, setImageFile] = useState([]);
  const [videoFiles, setVideoFile] = useState([]);
  const [map, setMap] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(center);
  const [marker, setMarker] = useState(null);
  const { role }: any = useAppSelector(useCurrentUser);
  const { governorate, areas, count, property, document }: any = useAppSelector(
    (state) => state.property
  );

  const [submitProperty] = useCreatePropertyMutation();
  const dispatch = useAppDispatch();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDhzY2k-tIrpnoBut75TTDJTuE1kURA_fU",
  });

  const onMapClick = useCallback(
    (event: any) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setSelectedPosition({ lat, lng });

      if (marker) {
        // @ts-ignore
        marker.setPosition({ lat, lng });
      } else {
        const newMarker = new window.google.maps.Marker({
          position: { lat, lng },
          map: map,
        });
        // @ts-ignore
        setMarker(newMarker);
      }
    },
    [marker, map]
  );

  const onLoad = useCallback((map: any) => {
    setMap(map);
    const initialMarker = new window.google.maps.Marker({
      position: center,
      map: map,
    });
    // @ts-ignore
    setMarker(initialMarker);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
    if (marker) {
      // @ts-ignore
      marker.setMap(null);
    }
  }, [marker]);

  const handleImageChange = (event: any) => {
    const files = event.target.files;
    if (files) {
      setImageFile(Array.from(files)); // Convert FileList to array
    }
  };

  const handleVideoChange = (event: any) => {
    const files = event.target.files;
    if (files) {
      setVideoFile(Array.from(files)); // Convert FileList to array
    }
  };
  const handleSelectChange = (value: string | number) => {
    dispatch(setgovernorate(value));
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Uploading Property...");
    console.log(imageFiles.length);
    if (imageFiles.length <= 0) {
      toast.error("Please select at least 1 image.", {
        id: toastId,
        duration: 2000,
      });
      return;
    }

    const formatedData = {
      ...property,
      ...document,
      ...data,
      location: {
        latitude: selectedPosition?.lat,
        longitude: selectedPosition?.lng,
        type: "Point",
      },
    };

    try {
      const formData = new FormData();
      imageFiles.forEach((image) => formData.append("images", image));
      videoFiles.forEach((video) => formData.append("videos", video));

      formData.append("data", JSON.stringify(formatedData));
      await submitProperty(formData).unwrap();
      toast.success("Property sucessfully added", {
        id: toastId,
        duration: 2000,
      });
      navigate(`/${role}/properties`);
    } catch (error) {
      ErrorResponse(error);
    }
  };
  return (
    <div>
      <div className="flex justify-between mb-6">
        <div className="flex ">
          <div>
            <label htmlFor="" className="mb-1">
              Upload images
            </label>
            {/* <div className="flex gap-x-2 items-center my-auto"> */}
            {/* <img width={40} src={deleteIcon} alt="" /> */}
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              style={{ display: "block", marginBottom: "15px" }}
            />
            {/* </div> */}
          </div>

          <div>
            <label htmlFor="" className="mb-1">
              Upload videos
            </label>
            <input
              type="file"
              accept="video/*"
              multiple
              onChange={handleVideoChange}
              style={{ display: "block", marginBottom: "15px" }}
            />
          </div>
        </div>

        <div>
          <h5 className="text-20 mb-2 text-center">Required Documents</h5>
          <div className="flex justify-around gap-x-4">
            <DocumentSwitch
              label="Marriage Certificate"
              defaultChecked={true}
              onChange={(data: boolean) =>
                dispatch(setdocument({ marriageCertificate: data }))
              }
            />
            <DocumentSwitch
              label="Salary Certificate"
              defaultChecked={true}
              onChange={(data: boolean) =>
                dispatch(setdocument({ salaryCertificate: data }))
              }
            />
            <DocumentSwitch
              label="Bank Statement"
              defaultChecked={true}
              onChange={(data: boolean) =>
                dispatch(setdocument({ bankStatement: data }))
              }
            />
            <DocumentSwitch
              label="Passport"
              defaultChecked={true}
              onChange={(data: boolean) =>
                dispatch(setdocument({ passport: data }))
              }
            />
          </div>
        </div>
      </div>

      <ResForm
        onSubmit={onSubmit}
        resolver={zodResolver(propertyvalidation.proeprtyAddresschema)}
      >
        <Row gutter={[16, 16]}>
          <Col lg={12}>
            <ResTextArea
              size="large"
              placeholder="Enter Description"
              name="propertyAbout"
              label="Enter Description"
            />
            <ResSelect
              defaultValue={property?.address?.governorate}
              options={governorates?.map((data: string) => {
                return { label: data, value: data };
              })}
              value={governorate}
              onChange={handleSelectChange}
              size="large"
              placeholder="Select governorate"
              name="address.governorate"
              label="Select governorate"
            />
            <ResSelect
              defaultValue={property?.address?.area}
              options={areas?.map((data: string) => {
                return { label: data, value: data };
              })}
              size="large"
              placeholder="Select area"
              name="address.area"
              label="Select area"
            />

            <ResInput
              type="text"
              size="large"
              placeholder="Enter building no"
              name="address.house"
              label="Enter house no"
            />

            <div className="flex">
              <Col lg={12}>
                <ResInput
                  type="text"
                  size="large"
                  placeholder="Enter apartment no"
                  name="address.apartment"
                  label="Enter apartment no"
                />
              </Col>
              <Col lg={12}>
                <ResInput
                  type="text"
                  size="large"
                  placeholder="Enter floor no"
                  name="address.floor"
                  label="Enter floor no"
                />
              </Col>
            </div>
            <div className="flex">
              <Col lg={12}>
                <ResInput
                  type="text"
                  size="large"
                  placeholder="Enter street Name/number"
                  name="address.street"
                  label="Enter street Name/number"
                />
              </Col>
              <Col lg={12}>
                <ResInput
                  type="text"
                  size="large"
                  placeholder="Enter block no."
                  name="address.block"
                  label="Enter block no"
                />
              </Col>
            </div>

            <div className="flex">
              <Col lg={12}>
                <ResInput
                  type="text"
                  size="large"
                  placeholder="Enter aveneu"
                  name="address.aveneu"
                  label="Enter aveneu(optional)"
                />
              </Col>
              <Col lg={12}>
                <ResInput
                  type="text"
                  size="large"
                  placeholder="Enter additional directions"
                  name="address.additionalDirections"
                  label="Enter additional directions"
                />
              </Col>
            </div>
          </Col>

          <Col lg={12}>
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={selectedPosition}
                zoom={12}
                onLoad={onLoad}
                onUnmount={onUnmount}
                onClick={onMapClick}
              >
                {" "}
                <Marker position={selectedPosition} />
              </GoogleMap>
            ) : (
              <></>
            )}
          </Col>
        </Row>
        <div className="flex justify-end gap-x-4">
          <Button
            onClick={() => dispatch(setCount(count - 1))}
            className="  text-primary border border-primary text-20 font-500 w-[150px] h-[44px]"
          >
            previous
          </Button>
          <Button
            htmlType="submit"
            className="bg-primary text-white text-20 font-500 w-[150px] h-[44px]"
          >
            Submit
          </Button>
        </div>
      </ResForm>
    </div>
  );
};

export default ImagesAndVideos;
