import React, { useContext } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import s from "@/components/admin/ung-vien/style.module.scss";
import { Input, Radio, Select } from "antd";
import {
  allCapBac,
  ExperWork,
  getAllCity,
  getDistrict,
  getGioiTinh,
  getJob,
  job_array,
  listHinhThucFilter,
  listMucLuongFilter,
  listNgonNgu,
  xepLoai
} from "@/functions/functions";
import ButtonAdmin from "../button/button";
import { NTD_UV_Context } from "@/components/context/ntd_uv_context";
const { TextArea } = Input;

type LoginFormInputs = {
  fileImage: string;
  email: string;
  username: string;
  phone: string;
  date: string;
  gender: number;
  marry: boolean;
  city: number;
  district: number;
  address: string;
  jobWant: any;
  levelJob: any;
  jobListAddress: any;
  jobs: any;
  salary: number;
  workDoIn: number;
  exp: number;
  targetJob: string;
  skill: string;
  levelEdu: string;
  nameSchool: string;
  startDate: string;
  endDate: string;
  specialized: number;
  graduation: string;
  inforEdu: string;
  namePosition: string;
  position: string;
  startWork: string;
  endWork: string;
  workInfor: string;
  language: number;
  graduationLanguage: string;
  point: number;
};

const gioiTinh = [
  {
    label: "Chọn giới tính",
    value: 0
  },
  {
    label: "Nam",
    value: 1
  },
  {
    label: "Nữ",
    value: 2
  },
  {
    label: "Khác",
    value: 3
  }
];

const honNhan = [
  {
    label: "Chọn tình trạng hôn nhân",
    value: 0
  },
  {
    label: "Độc thân",
    value: 1
  },
  {
    label: "Đã lập gia đình",
    value: 2
  }
];

const Add = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormInputs>();
  const { handlePermission} =
  useContext(NTD_UV_Context);
  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
  };
  return (
    <>
    {
      handlePermission.add && 
    <div
      style={{
        width: "100%",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: '50px'
      }}
    >
      <span>Những ô dấu sao (*) là bắt buộc phải nhập.</span>

      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="fileImage"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div className={s.input}>
              <p>Ảnh đại diện :</p>
              <Input type="file" placeholder="" {...field} />
            </div>
          )}
        />
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{
            required: "Vui lòng nhập mật khẩu"
          }}
          render={({ field }) => (
            <div className={s.input}>
              <p>
                <span>*</span> Email ứng viên :
              </p>
              <Input type="email" placeholder="" {...field} />
            </div>
          )}
        />
        <Controller
          name="username"
          control={control}
          defaultValue=""
          rules={{
            required: "Vui lòng nhập mật khẩu"
          }}
          render={({ field }) => (
            <div className={s.input}>
              <p>
                <span>*</span>Tên ứng viên :
              </p>
              <Input type="text" placeholder="" {...field} />
            </div>
          )}
        />
        <Controller
          name="phone"
          control={control}
          defaultValue=""
          rules={{
            required: "Vui lòng nhập mật khẩu"
          }}
          render={({ field }) => (
            <div className={s.input}>
              <p>
                <span>*</span>Số điện thoại :
              </p>
              <Input type="text" placeholder="" {...field} />
            </div>
          )}
        />
        <Controller
          name="date"
          control={control}
          defaultValue=""
          rules={{
            required: "Vui lòng nhập mật khẩu"
          }}
          render={({ field }) => (
            <div className={s.input}>
              <p>
                <span>*</span>Ngày sinh :
              </p>
              <Input type="date" {...field} />
            </div>
          )}
        />
        <Controller
          name="gender"
          control={control}
          defaultValue={0}
          rules={{
            required: "Vui lòng nhập mật khẩu"
          }}
          render={({ field }) => (
            <div className={s.input}>
              <p>
                <span>*</span>Giới tính :
              </p>
              <Select
                {...field}
                className={``}
                defaultValue={0}
                placeholder="Please select"
                onChange={(selectedOptions) => {
                  field.onChange(selectedOptions);
                }}
                style={{ width: "100%" }}
                options={gioiTinh}
                size="middle"
              />
            </div>
          )}
        />
        <Controller
          name="city"
          control={control}
          defaultValue={0}
          rules={{
            required: "Vui lòng nhập tỉnh thành"
          }}
          render={({ field }) => (
            <div className={s.input}>
              <p>
                <span>*</span>Tình trạng hôn nhân :
              </p>
              <Select
                {...field}
                className={``}
                placeholder="Please select"
                onChange={(selectedOptions) => {
                  field.onChange(selectedOptions);
                }}
                style={{ width: "100%" }}
                options={honNhan}
                size="middle"
              />
            </div>
          )}
        />
        <Controller
          name="district"
          control={control}
          defaultValue={0}
          rules={{
            required: "Vui lòng nhập mật khẩu"
          }}
          render={({ field }) => (
            <div className={s.input}>
              <p>
                <span>*</span>Tỉnh / thành phố :
              </p>
              <Select
                {...field}
                className={``}
                placeholder="Please select"
                onChange={(selectedOptions) => {
                  field.onChange(selectedOptions);
                }}
                style={{ width: "100%" }}
                options={[
                  {
                    value: 0,
                    label: "Chọn tỉnh thành"
                  },
                  ...getAllCity()
                  
                ]}
                size="middle"
              />
            </div>
          )}
        />
        
        <Controller
          name="address"
          control={control}
          defaultValue=""
          rules={{
            required: "Vui lòng nhập mật khẩu"
          }}
          render={({ field }) => (
            <div className={s.input}>
              <p>
                <span>*</span>Địa điểm chi tiết :
              </p>
              <TextArea placeholder="" {...field} />
            </div>
          )}
        />
        <Controller
          name="jobWant"
          control={control}
          defaultValue={[]}
          rules={{
            required: "Vui lòng nhập Công việc mong muốn"
          }}
          render={({ field }) => (
            <div className={s.input}>
              <p>
                <span>*</span>Công việc mong muốn :
              </p>
              <Input type="text" placeholder="" {...field} />
            </div>
          )}
        />
        
        
        <Controller
          name="levelJob"
          control={control}
          defaultValue={0}
          rules={{
            required: "Vui lòng nhập mật khẩu"
          }}
          render={({ field }) => (
            <div className={s.input}>
              <p>
                <span>*</span>Cấp bậc :
              </p>
              <Select
                {...field}
                className={``}
                defaultValue={0}
                placeholder="Please select"
                onChange={(selectedOptions) => {
                  field.onChange(selectedOptions);
                }}
                style={{ width: "100%" }}
                options={allCapBac}
                size="middle"
              />
            </div>
          )}
        />

<Controller
          name="jobListAddress"
          control={control}
          rules={{
            required: "Vui lòng nhập Công việc mong muốn"
          }}
          render={({ field }) => (
            <div className={s.input}>
              <p>
                <span>*</span>Địa điểm làm việc :
              </p>
              <Select
                {...field}
                className={``}
                defaultValue={[]}
                mode="multiple"
                placeholder="Chọn tối đa 3 tỉnh thành "
                onChange={(selectedOptions) => {
                  if(selectedOptions.length <= 3) {
                  field.onChange(selectedOptions);
                  }
                }}
                style={{ width: "100%" }}
                options={getAllCity()}
                size="middle"
              />
            </div>
          )}
        />
        {/* <Controller
          name="jobs"
          control={control}
          defaultValue=""
          rules={{
            required: "Vui lòng nhập mật khẩu"
          }}
          render={({ field }) => (
            <div className={s.input}>
              <p>
                <span>*</span>Địa điểm làm việc :
              </p>
              <Select
                {...field}
                className={``}
                defaultValue={0}
                mode="multiple"
                placeholder="Chọn tối đa 3 tỉnh thành "
                onChange={(selectedOptions) => {
                  field.onChange(selectedOptions);
                }}
                style={{ width: "100%" }}
                options={getAllCity()}
                size="middle"
              />
            </div>
          )}
        /> */}
        <Controller
          name="jobs"
          control={control}
          rules={{
            required: "Vui lòng nhập mật khẩu"
          }}
          render={({ field }) => (
            <div className={s.input}>
              <p>
                <span>*</span>Ngành nghề :
              </p>
              <Select
                {...field}
                className={``}
                defaultValue={[]}
                mode="multiple"
                placeholder="Chọn tối đa 3 ngành nghề"
                onChange={(selectedOptions) => {
                  if(selectedOptions.length <= 3) {
                    field.onChange(selectedOptions);
                  }
                }}
                style={{ width: "100%" }}
                options={job_array.map((job) => ({
                  value: job.cat_id,
                  label: job.cat_name
                }))}
                size="middle"
              />
            </div>
          )}
        />
        <Controller
          name="salary"
          control={control}
          defaultValue={0}
          rules={{
            required: "Vui lòng nhập mật khẩu"
          }}
          render={({ field }) => (
            <div className={s.input}>
              <p>
                <span>*</span>Mức lương :
              </p>
              <Select
                {...field}
                className={``}
                defaultValue={0}
                placeholder="Mức lương"
                onChange={(selectedOptions) => {
                  field.onChange(selectedOptions);
                }}
                style={{ width: "100%" }}
                options={listMucLuongFilter}
                size="middle"
              />
            </div>
          )}
        />
        <Controller
          name="workDoIn"
          control={control}
          defaultValue={0}
          rules={{
            required: "Vui lòng nhập mật khẩu"
          }}
          render={({ field }) => (
            <div className={s.input}>
              <p>
                <span>*</span> Hình thức làm việc :
              </p>
              <Select
                {...field}
                className={``}
                defaultValue={0}
                placeholder=" Hình thức làm việc"
                onChange={(selectedOptions) => {
                  field.onChange(selectedOptions);
                }}
                style={{ width: "100%" }}
                options={listHinhThucFilter}
                size="middle"
              />
            </div>
          )}
        />
        <Controller
          name="jobs"
          control={control}
          defaultValue=""
          rules={{
            required: "Vui lòng nhập mật khẩu"
          }}
          render={({ field }) => (
            <div className={s.input}>
              <p>
                <span>*</span>Số năm kinh nghiệm :
              </p>
              <Select
                {...field}
                className={``}
                defaultValue={0}
                placeholder="Số năm kinh nghiệm"
                onChange={(selectedOptions) => {
                  field.onChange(selectedOptions);
                }}
                style={{ width: "100%" }}
                options={ExperWork}
                size="middle"
              />
            </div>
          )}
        />

        <Controller
          name="targetJob"
          control={control}
          defaultValue=""
          rules={{
            required: "Vui lòng nhập mật khẩu"
          }}
          render={({ field }) => (
            <div className={s.input}>
              <p>
                <span>*</span> Mục tiêu nghề nghiệp :
              </p>
              <TextArea
                style={{
                  height: "200px"
                }}
                placeholder="- Mong muốn được làm việc trong một môi trường chuyên nghiệp.
- Công việc phù hợp và ổn định
- Mong muốn tìm được nơi có cơ hội cống hiến bản thân tốt
- Có cơ hội học tập và phát triển kỹ năng chuyên môn
- Mong muốn tìm được chỗ làm có mức lương tốt"
                {...field}
              />
            </div>
          )}
        />
        <Controller
          name="skill"
          control={control}
          defaultValue=""
          rules={{
            required: "Vui lòng nhập mật khẩu"
          }}
          render={({ field }) => (
            <div className={s.input}>
              <p>
                <span>*</span>Kỹ năng bản thân :
              </p>
              <TextArea
                style={{
                  height: "200px"
                }}
                placeholder="- Trung thực, cẩn thận, có óc sáng tạo
- Giao tiếp, ứng xử với mọi người tốt
- Khả năng thích ứng với công việc nhanh
- Kỹ năng lên kế hoạch, tổ chức sắp xếp công việc.
- Chịu được áp lực cao trong công việc
- Kỹ năng làm việc nhóm tốt.
- Khả năng nhận diện vấn đề nhanh
- Kỹ năng thao tác bàn phím tốt
- Khả năng truyền đạt thông tin hiệu quả"
                {...field}
              />
            </div>
          )}
        />
        <Controller
          name="levelEdu"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div className={s.input}>
              <p>Bằng cấp chứng chỉ :</p>
              <Input type="text" placeholder="Bằng cấp chứng chỉ" {...field} />
            </div>
          )}
        />
        <Controller
          name="nameSchool"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div className={s.input}>
              <p>Trường học :</p>
              <Input type="text" placeholder="" {...field} />
            </div>
          )}
        />

        <Controller
          name="startDate"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div className={s.input}>
              <p>Ngày bắt đầu học :</p>
              <Input type="date" placeholder="" {...field} />
            </div>
          )}
        />
        <Controller
          name="endDate"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div className={s.input}>
              <p>Ngày kết thúc học :</p>
              <Input type="date" placeholder="Ngày kết thúc học" {...field} />
            </div>
          )}
        />
        <Controller
          name="specialized"
          control={control}
          defaultValue={0}
          render={({ field }) => (
            <div className={s.input}>
              <p>Xếp loại :</p>
              <Select
                {...field}
                className={``}
                defaultValue={0}
                placeholder="Xếp loại"
                onChange={(selectedOptions) => {
                  field.onChange(selectedOptions);
                }}
                style={{ width: "100%" }}
                options={xepLoai}
                size="middle"
              />
            </div>
          )}
        />
        <Controller
          name="graduation"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div className={s.input}>
              <p>Chuyên ngành :</p>
              <Input type="text" placeholder="Chuyên ngành" {...field} />
            </div>
          )}
        />
        <Controller
          name="inforEdu"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div className={s.input}>
              <p>Thông tin bổ sung ( Bằng cấp ) :</p>
              <TextArea
                style={{
                  height: "200px"
                }}
                placeholder=""
                {...field}
              />
            </div>
          )}
        />
        <Controller
          name="namePosition"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div className={s.input}>
              <p>Chức danh/vị trí :</p>
              <Input type="text" placeholder="Chức danh/vị trí " {...field} />
            </div>
          )}
        />
        <Controller
          name="position"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div className={s.input}>
              <p>Công ty :</p>
              <Input type="text" placeholder="Công ty" {...field} />
            </div>
          )}
        />
        <Controller
          name="startWork"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div className={s.input}>
              <p>Ngày bắt đầu :</p>
              <Input type="date" placeholder="" {...field} />
            </div>
          )}
        />
        <Controller
          name="endWork"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div className={s.input}>
              <p>Ngày kết thúc :</p>
              <Input type="date" placeholder="" {...field} />
            </div>
          )}
        />
        <Controller
          name="workInfor"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div className={s.input}>
              <p>Thêm thông tin ( Kinh nghiệm Làm việc ) :</p>
              <TextArea placeholder="" {...field} />
            </div>
          )}
        />
        <Controller
          name="language"
          control={control}
          defaultValue={0}
          render={({ field }) => (
            <div className={s.input}>
              <p>Chọn ngôn ngữ :</p>
              <Select
                {...field}
                className={``}
                defaultValue={0}
                placeholder="Xếp loại"
                onChange={(selectedOptions) => {
                  field.onChange(selectedOptions);
                }}
                style={{ width: "100%" }}
                options={listNgonNgu}
                size="middle"
              />
            </div>
          )}
        />

        <Controller
          name="graduationLanguage"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div className={s.input}>
              <p>Chứng chỉ :</p>
              <Input type="text" placeholder="Chứng chỉ " {...field} />
            </div>
          )}
        />
        <Controller
          name="point"
          control={control}
          render={({ field }) => (
            <div className={s.input}>
              <p>Số điểm :</p>
              <Input type="text" placeholder="Số điểm" {...field} />
            </div>
          )}
        />
        <div style={{
          display: 'flex'
        }}>
          <p style={{
            marginRight: '20px'
          }}>Sau khi lưu dữ liệu :</p>
          <Radio.Group defaultValue={1}>
            <Radio value={1}>Thêm mới </Radio>
            <Radio value={2}>Quay về danh sách</Radio>
            <Radio value={3}>Sửa bản ghi</Radio>
          </Radio.Group>
        </div>
        <div className={s.btns_add}>
          <button type="submit" className={``}>
            Cập nhật
          </button>
          <button onClick={(e) => {
            e.preventDefault()
          }}>Làm lại</button>
        </div>
      </form>
    </div>
    }
    </>
  );
};

export default Add;
