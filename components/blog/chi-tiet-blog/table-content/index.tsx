import * as data from '@/components/nha-tuyen-dung/danh-sach-tin-tuyen-dung/data.js';

import s from './styles.module.scss';

const TableContent =({tableContent}:{tableContent :any }) =>{
  
    return(
        <div className={s.container_table}>
            <div className={s.div_f}>
                <div className={s.title}>Mục Lục</div>
            </div> 
            <div className={s.tableContentItem} dangerouslySetInnerHTML={{ __html: tableContent }} />
        </div>
    )
}

export default TableContent;