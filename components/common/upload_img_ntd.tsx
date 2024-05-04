/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import styles from './upload_img_ntd.module.scss';
const Upload_img_ntd = ({ onImagesChange, arrImage }: any) => {
    // xử lý upload ảnh
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [uploadedImages, setUploadedImages] = useState<any[]>([]);
    useEffect(() => {
        if (arrImage) {
            const newImages: any[] = arrImage?.map((http: any) => {
                const id = Math.random()
                return {
                    id,
                    imageUrl: http
                }
            })
            setUploadedImages(newImages)
        }
    }, [])
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let err: boolean = false
        if (event.target.files && event.target.files.length > 0) {
            const selectedFiles = Array.from(event.target.files);
            let newImages: any[] = []
            let newSelects: any[] = []
            selectedFiles.forEach((file, index) => {
                const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif']
                const fileExtension = '.' + file?.name?.split('.')?.pop()?.toLowerCase();
                if (!allowedExtensions.includes(fileExtension)) {
                    err = true
                } else {
                    newSelects.push(file)
                    newImages.push({
                        id: Date.now() + index,
                        file,
                        imageUrl: URL.createObjectURL(file),
                    })
                }
            })
            setSelectedImages([...selectedImages, ...newSelects]);
            setUploadedImages([...uploadedImages, ...newImages]);
            // Tùy chỉnh chỗ này theo nhu cầu lấy ra cái gì
            onImagesChange([...uploadedImages, ...newImages]);
        }
        if (err) {
            alert('Chỉ cho phép tải lên các tệp tin ảnh dạng (jpg, jpeg, png, gif)');
        }
    };

    const handleRemoveImage = (id: number) => {
        const newUploadedImages = uploadedImages?.filter(image => image.id !== id);
        const newSelectedImages = newUploadedImages?.map(image => image.file);
        setUploadedImages(newUploadedImages);
        setSelectedImages(newSelectedImages);
        onImagesChange(newUploadedImages);
    };
    return (
        <>
            <div className={`${styles.form_reg} `}>
                <label className={styles.form_title}>
                    Thêm hình ảnh công ty:
                </label>
                <input type='file' accept=".jpg, .jpeg, .png, .gif" onChange={handleImageChange} multiple id='up_file' style={{ opacity: 0, position: 'absolute', left: '-9999px' }} ></input>
            </div>
            <div className={styles.list_img}>
                <label htmlFor="up_file" className={styles.box_img}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                        <path d="M29.1667 14.5833C29.1667 14.1966 29.013 13.8256 28.7395 13.5521C28.466 13.2786 28.0951 13.125 27.7083 13.125C27.3216 13.125 26.9506 13.2786 26.6771 13.5521C26.4036 13.8256 26.25 14.1966 26.25 14.5833H29.1667ZM14.5833 2.91667C14.9701 2.91667 15.341 2.76302 15.6145 2.48953C15.888 2.21604 16.0417 1.84511 16.0417 1.45833C16.0417 1.07156 15.888 0.700626 15.6145 0.427136C15.341 0.153645 14.9701 0 14.5833 0V2.91667ZM25.5208 26.25H3.64583V29.1667H25.5208V26.25ZM2.91667 25.5208V3.64583H0V25.5208H2.91667ZM26.25 14.5833V25.5208H29.1667V14.5833H26.25ZM3.64583 2.91667H14.5833V0H3.64583V2.91667ZM3.64583 26.25C3.45245 26.25 3.26698 26.1732 3.13023 26.0364C2.99349 25.8997 2.91667 25.7142 2.91667 25.5208H0C0 26.4878 0.384113 27.4151 1.06784 28.0988C1.75157 28.7826 2.6789 29.1667 3.64583 29.1667V26.25ZM25.5208 29.1667C26.4878 29.1667 27.4151 28.7826 28.0988 28.0988C28.7826 27.4151 29.1667 26.4878 29.1667 25.5208H26.25C26.25 25.7142 26.1732 25.8997 26.0364 26.0364C25.8997 26.1732 25.7142 26.25 25.5208 26.25V29.1667ZM2.91667 3.64583C2.91667 3.45245 2.99349 3.26698 3.13023 3.13023C3.26698 2.99349 3.45245 2.91667 3.64583 2.91667V0C2.6789 0 1.75157 0.384113 1.06784 1.06784C0.384113 1.75157 0 2.6789 0 3.64583H2.91667Z" fill="#9E9E9E" />
                        <path d="M1.45801 22.6042L9.25499 15.4569C9.51779 15.216 9.85971 15.0798 10.2161 15.0738C10.5726 15.0679 10.9188 15.1928 11.1895 15.4248L20.4163 23.3333M17.4997 19.6875L20.98 16.2072C21.2282 15.9588 21.5578 15.8083 21.9081 15.7834C22.2583 15.7585 22.6059 15.8608 22.8868 16.0716L27.708 19.6875M18.958 5.83333H27.708M23.333 1.45833V10.2083" stroke="#9E9E9E" strokeWidth="2.91667" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </label>
                <div className={styles.list_img_upload}>
                    {uploadedImages?.map((image, i) => (
                        <div key={i} className={styles.box_item_img}>
                            <img src={image?.imageUrl} alt={`Uploaded`} />
                            <div className={styles.box_del} onClick={() => {
                                handleRemoveImage(image.id)
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 7 7" fill="none" className={styles.del_item}>
                                    <path d="M0.192302 0.192302C0.253177 0.131341 0.325473 0.0829784 0.405054 0.0499814C0.484636 0.0169844 0.569942 0 0.656093 0C0.742245 0 0.827551 0.0169844 0.907132 0.0499814C0.986714 0.0829784 1.05901 0.131341 1.11988 0.192302L3.5001 2.57164L5.88031 0.192302C5.94121 0.131396 6.01352 0.083083 6.0931 0.050121C6.17268 0.0171589 6.25797 0.000193615 6.3441 0.000193613C6.43023 0.000193611 6.51552 0.0171589 6.5951 0.050121C6.67468 0.083083 6.74698 0.131396 6.80789 0.192302C6.8688 0.253208 6.91711 0.325514 6.95007 0.405091C6.98303 0.484669 7 0.569959 7 0.656093C7 0.742227 6.98303 0.827518 6.95007 0.907096C6.91711 0.986673 6.8688 1.05898 6.80789 1.11988L4.42855 3.5001L6.80789 5.88031C6.9309 6.00331 7 6.17014 7 6.3441C7 6.51805 6.9309 6.68489 6.80789 6.80789C6.68489 6.9309 6.51805 7 6.3441 7C6.17014 7 6.00331 6.9309 5.88031 6.80789L3.5001 4.42855L1.11988 6.80789C0.99688 6.9309 0.830049 7 0.656093 7C0.482138 7 0.315307 6.9309 0.192302 6.80789C0.0692972 6.68489 0.000193613 6.51805 0.000193613 6.3441C0.000193613 6.17014 0.0692972 6.00331 0.192302 5.88031L2.57164 3.5001L0.192302 1.11988C0.131341 1.05901 0.0829784 0.986714 0.0499814 0.907132C0.0169844 0.827551 0 0.742245 0 0.656093C0 0.569942 0.0169844 0.484636 0.0499814 0.405054C0.0829784 0.325473 0.131341 0.253177 0.192302 0.192302Z" fill="#828282" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </>
    )
}

export default Upload_img_ntd
