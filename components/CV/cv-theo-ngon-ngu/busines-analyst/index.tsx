import s from "./styles.module.scss"

const BusinessAnalyst =({contentBA}:{contentBA :any}) => {
    return(
        <div className={s.firstmap}>
            <div className={s.boxContentItem} dangerouslySetInnerHTML={{ __html: contentBA }} />
            <div className={s.more}> xem thêm</div>
        </div>
    )
}
export default BusinessAnalyst;