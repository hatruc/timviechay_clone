import Intro from '../nha-tuyen-dung/quan-ly-chung/Intro/Intro'
import s from './box_container.module.scss'

const Box_container = ({ title, children }: any) => {
    return (
        <div className={s.box_container}>
            <Intro />
            {title && <div className={s.box_title}>
                <p>{title}</p>
                <div className={s.under} />
            </div>}
            {children}
        </div>
    )
}

export default Box_container
