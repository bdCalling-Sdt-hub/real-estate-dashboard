import { Button } from "antd";
import { useState } from "react";
import { MdEditSquare } from "react-icons/md";
import FileUpload from "../../component/FileUpload";
import ProfileForm from "../../component/ProfileForm";
import UseImageUpload from "../../hooks/useImageUpload";
import { useProfileQuery } from "../../redux/features/auth/authApi";
const Profile = () => {
  const { imageUrl, setFile, imageFile } = UseImageUpload();
  const [toggleEdit, setToggleEdit] = useState<boolean>(true);
  const { data: profile } = useProfileQuery(undefined);

  return (
    <div className="container mx-auto">
      <h1 className="text-20 font-500 mb-2 text-gray">Personal Information</h1>
      <div className="bg-white p-6">
        <div className="flex justify-end">
          <Button
            htmlType="submit"
            className="bg-primary flex items-center font-500"
            icon={<MdEditSquare />}
            onClick={(prev) => setToggleEdit(!prev)}
          >
            Edit
          </Button>
        </div>
        <div className="flex items-center  gap-x-4 text-white ">
          <div className="flex items-center gap-x-4">
            <FileUpload setSelectedFile={setFile} imageUrl={imageUrl} />
            <h1 className="text-24 w-full text-gray font-500">James Tracy</h1>
          </div>
          <h1 className="text-40 text-black font-600">{profile?.data?.name}</h1>
        </div>
        <div className="w-full mt-4">
          <ProfileForm
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
