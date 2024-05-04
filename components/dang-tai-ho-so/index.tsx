import { Modal, Spin } from "antd"
import styles from './index.module.scss'
import { useState } from "react"
import { POST } from "@/pages/api/base-api"

interface IModalUpload {
    hoso_type: number,
    isOpen: boolean,
    onCancel: () => void,
    onSuccess: () => void,
}

const ModalUpload: React.FC<IModalUpload> = ({
    hoso_type,
    isOpen,
    onCancel,
    onSuccess,
}) => {
    const [cvFileName, setCvFileName] = useState('')
    const [cvFile, setCvFile] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleFile = (newFile: File) => {
        // Check file type
        if (hoso_type === 1) {
            const allowedTypes = [
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                "application/pdf",
                "image/png",
                "image/jpeg",
                "image/jpg",
            ];
            if (!allowedTypes.includes(newFile.type)) {
                alert("Hãy chọn file hợp lệ (doc, docx, pdf, png, jpg, jpeg)");
                return;
            }

            // Check file size
            if (newFile.size > 10 * 1024 * 1024) {
                alert("Tệp không được lớn hơn 10MB");
                return;
            }

            setCvFile(newFile);
            setCvFileName(newFile.name);
            return;
        } else
            if (hoso_type === 2) {
                const allowedTypes = ["video/mp4"];

                if (!allowedTypes.includes(newFile.type)) {
                    alert("Hãy chọn file hợp lệ (mp4)");
                    return;
                }

                // Check file size
                if (newFile.size > 50 * 1024 * 1024) {
                    alert("Tệp không được lớn hơn 50MB");
                    return;
                }

                setCvFile(newFile);
                setCvFileName(newFile.name);
                return;
            } else {
                clearFile()
            }
    };

    function handleDrop(event: React.DragEvent<HTMLDivElement>): void {
        event.preventDefault();
        const dropFile = event.dataTransfer.files[0];
        handleFile(dropFile);
    }

    function handleClickFile(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
        const inputFile = document.getElementById("up_cv");
        if (inputFile) inputFile.click();
    }

    function clearFile(): void {
        setCvFile(null);
        setCvFileName("");
        const inputFile = document.getElementById("up_cv");
    }

    function handleInputFileChange(e: React.ChangeEvent<HTMLInputElement>): void {
        // console.log(e.target.files)
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            handleFile(selectedFile);
        }
        e.target.value = ''
    }

    const closeModal = () => {
        clearFile()
        onCancel()
    }

    const upload = async () => {
        if (cvFile && hoso_type) {
            setIsLoading(true)
            const result = await POST('candidate/UploadFile', {
                CV: cvFile,
                hoso_type: hoso_type
            })
            setIsLoading(false)
            if (result?.result) {
                alert(result?.message)
                onSuccess()
                closeModal()
            } else {
                alert(result?.message)
            }
        }
    }

    return (
        <>
            <Modal
                open={isOpen}
                onCancel={closeModal}
                closable={false}
                centered
                className={styles.modal_upload}
                footer={null}
                maskClosable={false}
            >
                <div className={styles.upload_cv}
                    onDragOver={(e) => { e.preventDefault() }}
                    onDrop={handleDrop}
                >
                    {!cvFile ?
                        <div className={styles.drag_drop_container}>
                            <div className={styles.file_icon} onClick={handleClickFile}>
                                <img src='/images/upLoadCV_2.png' alt='Images ChooseCV' style={{ objectFit: 'cover', width: '150px' }} />
                            </div>
                            <div className={styles.cv_title} onClick={handleClickFile}>{`Chọn ${hoso_type === 1 ? 'CV' : 'Video'} từ máy tính của bạn`}</div>
                            <div className={styles.cv_note}>{`Tải lên ${hoso_type === 1 ? 'DOC, DOCX, PDF, PNG, JPG & JPEG' : 'MP4'}. Kích thước tối đa ${hoso_type === 1 ? '10MB' : '50MB'}`}</div>
                            <div className={`${styles.cv_note} ${styles.italic}`}>{`Lưu ý: ${hoso_type === 1 ? 'Hồ sơ' : 'Video'} mới sẽ thay thế cho ${hoso_type === 1 ? 'Hồ sơ' : 'Video'} cũ`}</div>
                        </div> :
                        <div className={styles.cv_file_container}>
                            <div className={styles.cv_file}>
                                <span
                                    className={styles.delete_file}
                                    onClick={() => {!isLoading && clearFile()}}
                                    style={{
                                        cursor: isLoading ? 'not-allowed' : 'pointer'
                                    }}
                                >x</span>
                                <div className={styles.file_icon_upload}>
                                    <img src='/images/upLoadCV_3.png' alt='Images ChooseCV' style={{ objectFit: 'cover', width: '75px' }} />
                                </div>
                                <div className={styles.cv_name}>{cvFileName}</div>
                            </div>
                        </div>}
                    <input
                        type="file"
                        hidden
                        id="up_cv"
                        onChange={handleInputFileChange}
                        accept={hoso_type === 1 ? ".doc,.docx,.pdf,.png,.jpg,.jpeg" : ".mp4"}
                    />
                </div>
                <div className={styles.btns}>
                    {!isLoading ?
                        <>
                            <button onClick={closeModal} className={styles.btn_cancel}>
                                Hủy
                            </button>
                            {cvFile &&
                                <button
                                    onClick={upload}
                                    className={`${styles.btn_delete}`}
                                >
                                    Đăng
                                </button>}
                        </> :
                        <Spin
                            size="large"
                        />}
                </div>
            </Modal>
        </>
    )
}

export default ModalUpload