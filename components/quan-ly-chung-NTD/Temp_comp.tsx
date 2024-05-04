/* eslint-disable @next/next/no-img-element */
import Footer from '../common/Footer';
import s from './Temp_comp.module.scss';
import Header_manage from './common/Header_manage';
import Header_mobile from './common/Header_mobile';
import Sidebar from './common/Sidebar';
const Temp_comp = ({ children }: any) => {
    return (
        <>
            <div className={s.container}>
                <Sidebar />
                <div className={s.content}>
                    <Header_manage />
                    <Header_mobile />
                    {children}
                </div>
            </div>
            <Footer />
        </>

    );
}

export default Temp_comp
