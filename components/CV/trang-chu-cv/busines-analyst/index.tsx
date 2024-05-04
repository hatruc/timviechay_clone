import { useEffect, useRef, useState } from "react";
import s from "./styles.module.scss"
import Image from "next/image";

interface listPost {
    img: string,
    title?: string,
}
const BusinessAnalyst = ({
    contentBA,
    handleShowTable,
    showFullBlog,
    setShowFullBlog,
}: {
    contentBA: any,
    handleShowTable: (e: any) => void,
    showFullBlog: any,
    setShowFullBlog: (e: any) => void
}) => {
    const desRef = useRef<any>();
    let newTableContent: any = '';
    const [title, setTitle] = useState('')

    function getTextFromH() {
        console.log(desRef)
        desRef.current?.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(async (item: any) => {
            const text = item.textContent;
            const id = item.textContent.replace(/\s+/g, '-').toLowerCase()
            item.id = id
            if (item.tagName == "H1") {
                newTableContent = newTableContent + `<h1><a href='#${id}' style={{
                    fontSize: 18px,  color: '#001D82',
                }}> ${text} </a></h1>`
            }
            if (item.tagName == 'H2') {
                newTableContent = newTableContent + `<h2><a href='#${id}' style={{
                    fontSize: 17px,
                }}> ${text} </a></h2>`
            }
            if (item.tagName == 'H3') {
                newTableContent = newTableContent + `<h3><a  href='#${id}'  styles={{
                    fontSize: 16px,
                }}>${text}</a></h3>`
            }
            if (item.tagName == 'H4') {
                newTableContent = newTableContent + `<h4><a  href='#${id}'  styles={{
                    fontSize: 15px,
                }}>${text}</a></h4>`
            }
            if (item.tagName == 'H5') {
                newTableContent = newTableContent + `<h5><a  href='#${id}'  styles={{
                    fontSize: 14px,
                }}>${text}</a></h5>`
            }
            if (item.tagName == 'H6') {
                newTableContent = newTableContent + `<h6><a  href='#${id}'  styles={{
                    fontSize: 13px,
                }}>${text}</a></h6>`
            }

        });
        handleShowTable(newTableContent)
    }

    useEffect(() => {
        if (contentBA) {
            setTitle(contentBA?.title)
            setTimeout(() => {
                getTextFromH()
            }, 200);
        }
        return () => { };
    }, [contentBA])

    const postNews: listPost[] = [
        {
            img: "/images/blog/chi-tiet-blog/Screenshot_64.png",
            title: "Tạo sức hút ấn tượng với nhà tuyển dụng bằng mẫu CV xin...",
        },
        {
            img: "/images/blog/chi-tiet-blog/Screenshot_64.png",
            title: "Tạo sức hút ấn tượng với nhà tuyển dụng bằng mẫu CV xin...",
        },
        {
            img: "/images/blog/chi-tiet-blog/Screenshot_64.png",
            title: "Tạo sức hút ấn tượng với nhà tuyển dụng bằng mẫu CV xin...",
        },
        {
            img: "/images/blog/chi-tiet-blog/Screenshot_64.png",
            title: "Tạo sức hút ấn tượng với nhà tuyển dụng bằng mẫu CV xin...",
        },
        {
            img: "/images/blog/chi-tiet-blog/Screenshot_64.png",
            title: "Tạo sức hút ấn tượng với nhà tuyển dụng bằng mẫu CV xin...",
        },
        {
            img: "/images/blog/chi-tiet-blog/Screenshot_64.png",
            title: "Tạo sức hút ấn tượng với nhà tuyển dụng bằng mẫu CV xin...",
        },
    ]
    return (
        <div className={s.container_last}>
            <div className={s.header_map}>
                <div id="blog_title">
                    <h1>
                        {title}
                    </h1>
                </div>
                {/* <div className={s.heading}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "50px" }}>
                        <Image src="/images/blog/chi-tiet-blog/avata.png" width={32} height={32} alt="anh cua banj" />
                    </div>
                    <div> Hoa Lan</div>
                    <span></span>
                    <div>12/11/2023</div>
                </div> */}
            </div>
            <div className={s.firstmap}>
                <div ref={desRef} className={`${s.boxContentItem} ck-content ${!showFullBlog && s.hide_blog}`} dangerouslySetInnerHTML={{ __html: contentBA?.noidung }} />
                <div className={s.more}>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none">
                        <path d="M1 1.07324L6.00005 5.83515L11 1.07324" stroke="#F8971C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M1 6.31152L6.00005 11.0734L11 6.31152" stroke="#F8971C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg> */}
                    <div className={s.btn_more} onClick={setShowFullBlog}>
                        {!showFullBlog ? `Hiển thị thêm` : 'Thu gọn'}
                    </div>
                </div>
                {/* <div className={s.sample}>
                    <div className={s.box_new}>
                        {
                            postNews.map((item, index) => {
                                return (
                                    <div key={index} className={s.news}>
                                        <div className={s.news_item}>
                                            <Image className={s.item_img} src={item.img} alt="" height={161} width={257} />
                                            <div>{item.title}</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div> */}
            </div>
        </div>
    )
}
export default BusinessAnalyst;