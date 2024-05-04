
import React, { useState } from 'react'
import { Button, Col, Row, Upload, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import type { UploadFile, UploadProps } from 'antd';
import styles from './import-satelite.module.scss'


const AdminImportSateliteCandidate = () => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [uploading, setUploading] = useState(false);

    const handleUpload = () => {
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('files[]', file as any);
        });
        setUploading(true);
        // You can use any AJAX library you like
        fetch('https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188', {
            method: 'POST',
            body: formData,
        })
            .then((res) => res.json())
            .then(() => {
                setFileList([]);
                message.success('upload successfully.');
            })
            .catch(() => {
                message.error('upload failed.');
            })
            .finally(() => {
                setUploading(false);
            });
    };

    const props: UploadProps = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file]);

            return false;
        },
        fileList,
    };

    return (
        <Row>
            <Col span={24}>
                <div>
                    <div className={styles['uploading-container']}>
                        <Upload {...props}>
                            <Button icon={<UploadOutlined />}>Select File</Button>
                        </Upload>
                        <Button
                            type="primary"
                            onClick={handleUpload}
                            disabled={fileList.length === 0}
                            loading={uploading}
                        >
                            {uploading ? 'Uploading' : 'Start Upload'}
                        </Button>
                    </div>
                    <h3 className={styles['title']}>File tải lên phải là từ 4 site vệ tinh. Mọi định dạng file excel khác có thể gây lỗi nghiêm trọng</h3>
                </div>

            </Col>
        </Row>
    )
}

export default AdminImportSateliteCandidate