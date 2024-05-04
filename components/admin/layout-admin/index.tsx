import React, { useState, useEffect } from 'react';
import {
    AppstoreOutlined,
    ExceptionOutlined,
    ApiOutlined,
    UserOutlined,
    BankOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    AliwangwangOutlined,
    ScheduleOutlined,
    PlusSquareOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Dropdown, Space, message, Avatar, Button } from 'antd';
import type { MenuProps } from 'antd';
import { isMobile } from 'react-device-detect';
import Link from 'next/link';
import Image from 'next/image';
import styles from './layout-admin.module.scss'
import { useRouter } from 'next/router';
import AdminGetAllCandidate from '../candidate/get-all';
import Admin from '..';
import ListUser from '../user/list';
import AdminNewestRegisterCandidate from '../candidate/new-registeration';
import AdminUpdatingCandidate from '../candidate/update-cv';
import { menuItems } from '@/components/constants/menu';
import AdminUploadingCVCandidate from '../candidate/upload-cv';
import AdminUnfinishCvWebsiteCandidate from '../candidate/unfinish-cv-website';
import AdminUnfinishCvAppTimViecCandidate from '../candidate/unfinish-cv-app-timviec';
import AdminFinishCvCandidate from '../candidate/finish-cv';
import AdminGetAllHiddenCandidate from '../candidate/get-all-hidden';
import AdminStatusCandidate from '../candidate/status';
import AdminExportFileCandidate from '../candidate/export-file';
import AdminUnfinishCvAppCvCandidate from '../candidate/unfinish-cv-app-cv';
import AdminImport365Candidate from '../candidate/import-365';
import AdminImportSateliteCandidate from '../candidate/import-satelite';
import AdminErrorAddingCandidate from '../candidate/error-adding';
import AdminErrorRegisterationCandidate from '../candidate/error-registeration';
import AdminExportErrorCvCandidate from '../candidate/error-cv';
import AdminSensitiveCandidate from '../candidate/sensitive-keyword';
import RegisterRecruitment from '../recruitment/register';

const { Content, Sider } = Layout;

const LayoutAdmin = ({ children }: any) => {

    const [collapsed, setCollapsed] = useState(false);
    const [activeMenu, setActiveMenu] = useState('/');

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }, [activeMenu]);

    const handleLogout = async () => {
        //     const res = await callLogout();
        //     if (res && res.data) {
        //         dispatch(setLogoutAction({}));
        //         message.success('Đăng xuất thành công');
        //         navigate('/')
        //     }
        // }

        // if (isMobile) {
        //     items.push({
        //         label: <label
        //             style={{ cursor: 'pointer' }}
        //             onClick={() => handleLogout()}
        //         >Đăng xuất</label>,
        //         key: 'logout',
        //         icon: <LogoutOutlined />
        //     })
        // }
    }

    const itemsDropdown = [
        {
            label: <Link href={'/'}>Trang chủ</Link>,
            key: 'home',
        },
        {
            label: <label
                style={{ cursor: 'pointer' }}
                onClick={() => handleLogout()}
            >Đăng xuất</label>,
            key: 'logout',
        },
    ];

    return (
        <>
            <Layout
                className={styles["layout-admin"]}
            >
                {!isMobile ?
                    <Sider
                        width={300}
                        theme='light'
                        collapsible
                        collapsed={collapsed}
                        onCollapse={(value) => setCollapsed(value)}>
                        <div onClick={() => setActiveMenu('/')} className={styles['admin-logo']}>
                            <Image className={styles['admin-logo-img']} src={'/images/admin/system.png'} alt='systemImg' width={512} height={512} />
                            <span> ADMIN</span>
                        </div>
                        <Menu
                            selectedKeys={[activeMenu]}
                            mode="inline"
                            items={menuItems}
                            onClick={(e) => setActiveMenu(e.key)}
                        />
                    </Sider>
                    :
                    <Menu
                        selectedKeys={[activeMenu]}
                        items={menuItems}
                        onClick={(e) => setActiveMenu(e.key)}
                        mode="horizontal"
                    />
                }

                <Layout>
                    {!isMobile &&
                        <div className={styles['admin-header']}>
                            <Button
                                type="text"
                                icon={collapsed ? React.createElement(MenuUnfoldOutlined) : React.createElement(MenuFoldOutlined)}
                                onClick={() => setCollapsed(!collapsed)}
                                className={styles['btn-collapse']}
                            />

                            <Dropdown menu={{ items: itemsDropdown }} trigger={['click']}>
                                <Space className={styles['admin-header-option']}>
                                    Welcome Admin
                                    <Avatar src={'/images/admin/admin.png'}></Avatar>
                                </Space>
                            </Dropdown>
                        </div>
                    }
                    <Content className={styles['admin-body']}>
                        {/* Candidate */}
                        {activeMenu === '/' && <Admin />}
                        {activeMenu === '/admin/user/list' && <ListUser />}
                        {activeMenu === '/admin/candidate/newest-list' && <AdminNewestRegisterCandidate />}
                        {activeMenu === '/admin/candidate/update-cv' && <AdminUpdatingCandidate />}
                        {activeMenu === '/admin/candidate/upload-cv' && <AdminUploadingCVCandidate />}
                        {activeMenu === '/admin/candidate/unfinish-cv-website' && <AdminUnfinishCvWebsiteCandidate />}
                        {activeMenu === '/admin/candidate/unfinish-cv-app-timviec' && <AdminUnfinishCvAppTimViecCandidate />}
                        {activeMenu === '/admin/candidate/unfinish-cv-app-cv' && <AdminUnfinishCvAppCvCandidate />}
                        {activeMenu === '/admin/candidate/finish-cv' && <AdminFinishCvCandidate />}
                        {activeMenu === '/admin/candidate/get-all' && <AdminGetAllCandidate />}
                        {activeMenu === '/admin/candidate/get-all-hidden' && <AdminGetAllHiddenCandidate />}
                        {activeMenu === '/admin/candidate/status' && <AdminStatusCandidate />}
                        {activeMenu === '/admin/candidate/export-file' && <AdminExportFileCandidate />}
                        {activeMenu === '/admin/candidate/import-365' && <AdminImport365Candidate />}
                        {activeMenu === '/admin/candidate/import-satelite' && <AdminImportSateliteCandidate />}
                        {activeMenu === '/admin/candidate/error-adding' && <AdminErrorAddingCandidate />}
                        {activeMenu === '/admin/candidate/error-registeration' && <AdminErrorRegisterationCandidate />}
                        {activeMenu === '/admin/candidate/export/error-cv' && <AdminExportErrorCvCandidate />}
                        {activeMenu === '/admin/candidate/add/sensitive-keyword' && <AdminSensitiveCandidate />}

                        {/* Recruitment */}
                        {activeMenu === '/admin/recruitment/register' && <RegisterRecruitment />}
                    </Content>
                </Layout>
            </Layout>

        </>
    );
};

export default LayoutAdmin;