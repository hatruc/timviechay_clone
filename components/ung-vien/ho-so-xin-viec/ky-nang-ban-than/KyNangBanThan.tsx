import { useEffect, useState } from "react";
import s from "./MucTieuNgheNghiep.module.scss";
import { POSTCUSTOM } from "@/pages/api/base-api";
import { Spin } from "antd";

interface IndexProps {
  dataKNBT: any;
  handleRefreshData: () => void;
}
const Index: React.FC<IndexProps> = ({ dataKNBT, handleRefreshData }) => {
  const [skill, setSkill] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<any>(false);
  const handleSubmitChange = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();
    if (skill && skill.trim() !== "") {
      const submit = await POSTCUSTOM("candidate/CompleteProfileUV_KNBT", {
        knbt: skill
      });
      if (submit?.data?.result) {
        setIsLoading(false);
        setError("");
        alert("Update thành công.");
        await handleRefreshData();
      } else {
        setIsLoading(false);
        setError("Vui lòng nhập trường này.");
        alert("Vui lòng kiểm tra và thử lại.");
      }
    } else {
      setIsLoading(false);
      setError("Vui lòng nhập trường này.");
    }
  };

  useEffect(() => {
    setSkill(dataKNBT ? dataKNBT : "");
  }, [dataKNBT]);
  return (
    <>
      <div className={s.body}>
        <div className={s.container}>
          <div className={s.title}>
            <div className={s.title_1}>KỸ NĂNG BẢN THÂN</div>
            <div className={s.title_2}></div>
          </div>
          <div className={s.form_input}>
            <label htmlFor="descriptions">
              Mô tả ngắn kỹ năng của bản thân{" "}
              <span style={{ color: "red" }}>*</span>
            </label>
            <div className={s.form_input_div}>
              <textarea
                value={skill}
                name="descriptions"
                placeholder="Viết mô tả ngắn kỹ năng của bản thân"
                onChange={(e) => setSkill(e.target.value)}
              ></textarea>
            </div>
            <p className={s.error_message}>{error}</p>
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className={s.btn_submit}
            onClick={(e) => handleSubmitChange(e)}
          >
            {isLoading ? <Spin /> : "Cập nhật"}
          </button>
        </div>
      </div>
    </>
  );
};
export default Index;
