import { Avatar } from "antd";
import s from "./styles.module.scss"
import Image from 'next/image';
import { getDate, handleImageSource } from "@/functions/functions";
import { useEffect, useRef, useState } from "react";
import { functionalUpdate } from "react-query/types/core/utils";
interface BoxContentProps {
    boxContent: any,
    handleShowTable: (e: any) => void
}
const BoxContent:React.FC<BoxContentProps>=({boxContent, handleShowTable}) =>{
    const textRef = useRef<any>();
    const desRef = useRef<any>();
    let newTableContent: any = '';
    const [des, setDes ] = useState<any>();

    // console.log(boxContent?.new_teaser)
    
    function getTextFromH() {
        console.log(desRef)
        desRef.current?.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(async (item: any) => {
            const text = item.textContent; 
            const id = item.textContent.replace(/\s+/g, '-').toLowerCase()
            item.id = id
            if (item.tagName == "H1") {
                newTableContent =  newTableContent + `<h1><a href='#${id}' style={{
                    fontSize: 18px,  color: '#001D82',
                }}> ${text} </a></h1>`
            }
            if(item.tagName == 'H2') {
                newTableContent =  newTableContent + `<h2><a href='#${id}' style={{
                    fontSize: 17px,
                }}> ${text} </a></h2>`
            }  
            if (item.tagName == 'H3') {
                newTableContent = newTableContent +  `<h3><a  href='#${id}'  styles={{
                    fontSize: 16px,
                }}>${text}</a></h3>`
            }
            if (item.tagName == 'H4') {
                newTableContent = newTableContent +  `<h4><a  href='#${id}'  styles={{
                    fontSize: 15px,
                }}>${text}</a></h4>`
            }
            if (item.tagName == 'H5') {
                newTableContent = newTableContent +  `<h5><a  href='#${id}'  styles={{
                    fontSize: 14px,
                }}>${text}</a></h5>`
            }
            if (item.tagName == 'H6') {
                newTableContent = newTableContent +  `<h6><a  href='#${id}'  styles={{
                    fontSize: 13px,
                }}>${text}</a></h6>`
            }
            
        } );
        handleShowTable(newTableContent)
    }
    

    useEffect(() => {
        if(boxContent?.new_description) {
            setDes(boxContent?.new_description)
            setTimeout(() => {
                getTextFromH()
            }, 200)
            }
    }, [boxContent?.new_description])
    
    
    
    const formatTime = (time: string) => {
        const day = time.split("/");
        const yearMonthDayString = `${day[0]}/${day[1]}/${day[2]}`;
        return yearMonthDayString;
      };
    return(
        <div className={s.container_box} key={boxContent?.new_id}>
            <div className={s.first_map}>
                <div>
                    <h1>
                        {boxContent?.new_title}
                    </h1>
                </div>
                <div className={s.heading}>
                    <div style={{width:"32px",height:"32px",borderRadius:"50px"}}> 
                        <Image src={handleImageSource(boxContent?.amd_picture)}  width={32} height={32}  alt='' />
                    </div>
                    <div>{boxContent?.adm_name}</div>
                    <span></span>
                    <div>{formatTime(getDate(boxContent?.new_date))}</div>
                </div>
            </div>
            <div className={s.second_map}>
                <div ref={textRef}  className={`${s.boxContentItem} ${s.boxContentItemText} ck-content`} dangerouslySetInnerHTML={{ __html: boxContent?.new_teaser }} />
                <div ref={desRef} className={`${s.boxContentItem} ${s.boxContentItemDes} ck-content`} dangerouslySetInnerHTML={{__html : des}}></div>
                {/* <div ref={textRef}  className={` ck-content`} dangerouslySetInnerHTML={{ __html: boxContent?.new_teaser }} /> */}
                {/* <div ref={desRef} className={` ck-content`} dangerouslySetInnerHTML={{__html : des}}></div> */}
            </div>
        </div>
    )
}
export default BoxContent;