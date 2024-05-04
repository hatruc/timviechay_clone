import { useEffect, useState } from "react";
import s from "./MucTieuNgheNghiep.module.scss";
import { POSTCUSTOM } from "@/pages/api/base-api";
import { Spin } from "antd";

interface IndexProps {
  dataWorkJob: any;
  handleRefreshData: () => void;
}
const Index: React.FC<IndexProps> = ({ dataWorkJob, handleRefreshData }) => {
  const [error, setError] = useState<string>("");
  const [target, setTarget] = useState<string>("");
  const [isLoading, setIsLoading] = useState<any>(false);

  const handleSubmitChange = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();
    if (target && target.trim() !== "") {
      const submitTagetWork = await POSTCUSTOM(
        "candidate/CompleteProfileUV_MTNN",
        {
          mtnn: target
        }
      );
      if (submitTagetWork.data.result) {
        setError("");
        setIsLoading(false);

        alert("Cập nhật thành công.");
        await handleRefreshData();
      } else {
        setIsLoading(false);
        setError("Vui lòng nhập trường này.");
        alert("Vui lòng kiểm tra và thử lại.");
      }
    } else {
      setError("Vui lòng nhập trường này.");
    }
  };
  useEffect(() => {
    setTarget(dataWorkJob ? dataWorkJob : "");
  }, [dataWorkJob]);
  return (
    <>
      <div className={s.body}>
        <div className={s.container}>
          <div className={s.title}>
            <div className={s.title_1}>MỤC TIÊU NGHỀ NGHIỆP</div>
            <div className={s.title_2}></div>
          </div>
          <div className={s.form_input}>
            <label htmlFor="descriptions">
              Mô tả ngắn mục tiêu của bản thân{" "}
              <span style={{ color: "red" }}>*</span>
            </label>
            <div className={s.form_input_div}>
              <textarea
                name="descriptions"
                value={target}
                placeholder="Viết mô tả ngắn mục tiêu của bản thân"
                onChange={(e) => setTarget(e.target.value)}
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
            {
              isLoading ? <Spin /> : 'Cập nhật'
            }
          </button>
        </div>
      </div>
    </>
  );
};
export default Index;
