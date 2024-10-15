 
import { Select } from "antd";
import { KW, US } from "country-flag-icons/react/3x2"; 
import { useTranslation } from "react-i18next"; 
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setlang } from "../../redux/features/locals/localSlice";
import logo from "../../assets/Final Logo 2.png"

const LoginHeader = () => {
    const { i18n, t } = useTranslation();
    const dispatch = useAppDispatch();
    const { lang } = useAppSelector((state) => state.lang);
    const changeLanguage = (lng: string) => {
      i18n.changeLanguage(lng);
      dispatch(setlang(localStorage.getItem("i18nextLng")));
    };  
 
    return (
        <div className="flex justify-between ">
        <div
          className="flex items-center"
     
        > 
            <img src={logo} alt="Logo" className="h-14 " />
          
        </div>
  
        <div className="flex items-center  gap-x-6">
          <Select
            onChange={changeLanguage}
            defaultValue={localStorage.getItem("i18nextLng") || "ar"}
            style={{ width: 120 }}
            options={[
              {
                value: "ar",
                label: (
                  <div className="flex gap-x-2">
                    <KW title="Kuwait" className="w-[20px]" />
                    <p className="font-500">Arabic</p>
                  </div>
                ),
              },
              {
                value: "en",
                label: (
                  <div className="flex gap-x-2">
                    <US title="United States" className="w-[20px]" />
                    <p className="font-500">English</p>
                  </div>
                ),
              },
            ]}
          /> 
   
        </div>
      </div>
    );
};

export default LoginHeader;