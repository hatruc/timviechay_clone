// Import thư viện và stylesheet của react-quill
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

import 'react-quill/dist/quill.snow.css';

// Import các thành phần và hooks khác từ React hoặc Next.js
import { useState } from 'react';
import dynamic from 'next/dynamic';

interface Props {
    className?: string;
    className_rv?: string;
    name?: any;
    form?: any;
}
const BlogEditor = ({ className, className_rv ,name, form}:  Props) => {
    // Khai báo state để lưu trữ nội dung của trình soạn thảo
    const [content, setContent] = useState('');

    // Hàm xử lý khi nội dung trình soạn thảo thay đổi
    const handleEditorChange = (value: string) => {
        // console.log("object");
        setContent(value);
        form.setFieldsValue({
            [name]: value,
          });
    };

    return (
        <div className={className} >
            {/* Trình soạn thảo văn bản */}
            <ReactQuill
                value={content}
                onChange={handleEditorChange}
                modules={{
                    toolbar: [
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ 'color': [] }, { 'background': [] }], // Thêm màu sắc cho văn bản và nền
                        ['link', 'image', 'video'],
                        ['blockquote', 'code-block'],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        [{ 'indent': '-1' }, { 'indent': '+1' }],
                        [{ 'align': [] }],
                        ['clean'],
                    ],
                }}
                theme="snow"
            />
            {/* Hiển thị nội dung trình soạn thảo */}
            <div className={className_rv}>
                <h2>Preview</h2>
                <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        </div>
    );
};

export default BlogEditor;
