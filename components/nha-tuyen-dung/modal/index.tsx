import { useEffect, useState } from "react";
import TextArea from "antd/lib/input/TextArea";
import { Button, Modal, Select } from "antd";
import s from "./modal.module.scss";

interface IPropModal {
  isOpenModal: any;
  onCancel: () => void;
  onDelete: () => void;
}
export default function ModalDelete(props: IPropModal) {
  return (
    <Modal
      open={props.isOpenModal}
      onCancel={props.onCancel}
      width={400}
      footer={null}
      styles={{ body: { maxHeight: "80vh", overflowY: "auto" } }}
      closable={false}
      centered
    >
      <div className={s.delete_container}>
        <div>
          <p>Bạn có chắc muốn xóa?</p>
          <div className={s.btns}>
            <button
              onClick={() => props.onDelete()}
              className={`${s.btn_delete} btn`}
            >
              Xóa
            </button>
            <button onClick={() => props.onCancel()} className={s.btn_cancle}>
              Hủy
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}


interface IPropModalNote {
  text: string,
  isOpenModal: any;
  onCancel: () => void;
  onDelete: (e: string) => void;
}
export const ModalNote = (props: IPropModalNote) => {
  const [ textNote, setTextNote ] = useState<string>();
  useEffect(() => {
    if(props.text.trim() !== null) {
      setTextNote(props.text)
    }
  }, [props.text, props.isOpenModal])
  return (
    <Modal
      open={props.isOpenModal}
      onCancel={props.onCancel}
      width={400}
      footer={null}
      styles={{ body: { maxHeight: "80vh", overflowY: "auto", width: '100%' } }}
      closable={false}
      centered
    >
      <div>

        <p style={{
          margin: '10px 0 10px 0',
          fontSize: '24px',
          fontWeight: 600,
          textAlign: 'center',
          color: '#3582CD'
        }}>Ghi chú</p>
      <div className={s.delete_container}>
          <TextArea rows={4} placeholder="Nội dung ghi chú" value={textNote} onChange={(e) => setTextNote(e.target.value)}></TextArea>
          <div className={s.btns}>
            <button
              onClick={() => {
                props.onDelete(textNote as string)
              }}
              className={`${s.btn_delete} btn`}
            >
              Chỉnh sửa
            </button>
            <button onClick={() => {setTextNote(''), props.onCancel()}} className={s.btn_cancle}>
              Hủy
            </button>
          </div>
      </div>
      </div>
    </Modal>
  );
}
