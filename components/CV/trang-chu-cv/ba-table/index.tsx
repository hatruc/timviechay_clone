
import { useRef } from 'react';
import s from './styles.module.scss';

const BaContent =({BaContent}:{BaContent :any }) =>{

    
    return(
        <div className={s.container_table}>
            <div className={s.div_f}>
                <div className={s.title}>Mục Lục</div>
            </div> 
            <div className={`${s.tableContentItem}`} dangerouslySetInnerHTML={{ __html: BaContent }} />
        </div>
    )
}

export default BaContent;