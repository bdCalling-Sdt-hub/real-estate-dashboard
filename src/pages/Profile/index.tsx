import { Button } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoMdClose } from "react-icons/io";
import { MdEditSquare } from "react-icons/md";
import FileUpload from "../../component/FileUpload";
import ProfileForm from "../../component/ProfileForm";
import UseImageUpload from "../../hooks/useImageUpload";
import { useProfileQuery } from "../../redux/features/auth/authApi";
import { profileUpload } from "../../themes/uploadTheme";
const Profile = () => {
  const { data: profile, refetch } = useProfileQuery(undefined);
  const { t } = useTranslation();
  const { imageUrl, setFile, imageFile } = UseImageUpload();
  const [toggleEdit, setToggleEdit] = useState<boolean>(true);
  // console.log(profile);
  return (
    <div className="container mx-auto">
      <h1 className="text-20 font-500 mb-2 text-gray">
        {t("Personal Information")}
      </h1>
      <div className="bg-white p-6">
        <div className="flex justify-end">
          <Button
            htmlType="submit"
            className={`bg-primary flex items-center font-500`}
            icon={toggleEdit ? <MdEditSquare /> : <IoMdClose />}
            onClick={() => setToggleEdit(!toggleEdit)}
          >
            {t(toggleEdit ? "Edit" : "Close")}
          </Button>
        </div>
        <div className="flex flex-col  gap-x-4 text-white ">
          <div className="flex items-center gap-x-4">
            <FileUpload
              theme={profileUpload}
              setSelectedFile={setFile}
              imageUrl={imageUrl}
              image={profile?.data?.image}
            />
          </div>
          <h1 className="text-24 w-full text-gray font-500">
            {profile?.data?.name}
          </h1>
          <h1 className="text-20 text-gray font-600">
            {profile?.data?.phoneCode}-{profile?.data?.phoneNumber}
          </h1>
        </div>
        <div className="w-full mt-4">
          <ProfileForm
            refetch={refetch}
            ProfileData={profile}
            imageFile={imageFile}
            toggleEdit={toggleEdit}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
