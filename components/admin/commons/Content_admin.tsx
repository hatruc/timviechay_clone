import React, { useContext, useEffect, useRef, useState } from 'react';
import { Tabs } from 'antd';
import { CloudFilled } from '@ant-design/icons';
import  Add  from '@/components/admin/ung-vien/Add'
import AdminGetAllCandidate from '@/components/admin/candidate/get-all';
import AdminGetAllHiddenCandidate from '@/components/admin/candidate/get-all-hidden';
import AdminImport365Candidate from '@/components/admin/candidate/import-365';
import AdminNewestRegisterCandidate from '@/components/admin/candidate/new-registeration';
import AdminUpdatingCandidate from '@/components/admin/candidate/update-cv';
import AdminUploadingCVCandidate from '@/components/admin/candidate/upload-cv';
import AdminUnfinishCvWebsiteCandidate from '@/components/admin/candidate/unfinish-cv-website';
import AdminUnfinishCvAppTimViecCandidate from '@/components/admin/candidate/unfinish-cv-app-timviec';
import AdminExportFileCandidate from '@/components/admin/candidate/export-file';
import AdminStatusCandidate from '@/components/admin/candidate/status';
import AdminExportErrorCvCandidate from '@/components/admin/candidate/error-cv';
import AdminSensitiveKeywordCandidate from '@/components/admin/candidate/sensitive-keyword';
import AdminImportSateliteCandidate from '@/components/admin/candidate/import-satelite';
import AdminUnfinishCvAppCvCandidate from '@/components/admin/candidate/unfinish-cv-app-cv';
import AdminUVAplicationNTDCandidate from '@/components/admin/candidate/uv_appli_ntd';
import AdminErrorAddingCandidate from '@/components/admin/candidate/error-adding';
import AdminErrorRegisterationCandidate from '@/components/admin/candidate/error-registeration';
import AdminDownloadCVCandidate from '@/components/admin/candidate/download_cv';
import RegisterRecruitment from '@/components/admin/recruitment/register';
import AdminAllRecruitment from '@/components/admin/recruitment/all-recuitment';
import AdminNoPostNewRecruitment from '@/components/admin/recruitment/no-post-new';
import AdminHiddenRecruitment from '@/components/admin/recruitment/ntd-hidden';
import AdminExpiresRecruitment from '@/components/admin/recruitment/ntd-expired';
import LoginPage from '../../../pages/admin/login';
import AdminSentCandidate from '@/components/admin/recruitment/sent-candidate';
import AdminSentCandidateSent from '@/components/admin/recruitment/sent-candidate-sent';
import AdminAddRecuitment from '@/components/admin/recruitment/ntd-add';
import AdminNewPostRecruitment from '@/components/admin/new-application/ntd-post';
import AdminGetListApplicationRecruitment from '@/components/admin/new-application/list-get-application';
import AdminAddPoint from '@/components/admin/point/add';
import AdminGetPointBugget from '@/components/admin/point/point-bugget';
import AdminPointList from '@/components/admin/point/list';
import AdminAddCompanyPoint from '@/components/admin/point/add-company';
import AdminPointHistory from '@/components/admin/point/history';
import AdminPointIncreHistory from '@/components/admin/point/incre-history';
import AdminNTDAdd from '@/components/admin/new-application/ntd-add';
import AdminBlogList from '@/components/admin/blog/list';
import AdminBlogAdd from '@/components/admin/blog/add';
import ChangeInfor from '@/components/admin/Infor/ChangeInfor';
import { NTD_UV_Context } from '@/components/context/ntd_uv_context';
import AdminListAccount from '../list-account/list-account';
import AdminAddAccount from '../list-account/add';



type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

interface ContentAdminProps {
  lisContentShow: number,
  changeActiveSidebar: (e: number) => void
}

const ContentAdmin = ({ lisContentShow, changeActiveSidebar }: ContentAdminProps) => {
  const init: any = [
    // { label: 'Trang chủ', children: 'Trang Chủ', key: 1, closable: false },
  ]
  const initialItems = [
    //  candidate
    { label: 'Trang chủ', children: 'Trang Chủ', key: 1, closable: false },
    { label: 'Thông tin tài khoản', children: <ChangeInfor/>, key: 2, closable: false },
    { label: 'Ứng viên » Thêm mới', children: <Add/>, key: 10 , closable: true},
    { label: 'Ứng viên » Ứng viên đăng ký mới', children: <AdminNewestRegisterCandidate/>, key: 11 ,closable: true},
    { label: 'Ứng viên » Ứng viên sửa, cập nhật hồ sơ', children: <AdminUpdatingCandidate/>, key: 12 , closable: true},
    { label: 'Ứng viên » Ứng viên tải CV từ máy tính cá nhân', children: <AdminUploadingCVCandidate/>, key: 13, closable: true },
    { label: 'Ứng viên » Ứng viên chưa hoàn thiện hồ sơ từ Website', children: <AdminUnfinishCvWebsiteCandidate/>, key: 14 , closable: true},
    { label: 'Ứng viên » Ứng viên chưa hoàn thiện hồ sơ từ App Timviec', children: <AdminUnfinishCvAppTimViecCandidate/>, key: 15, closable: true },
    { label: 'Ứng viên » Ứng viên chưa hoàn thiện hồ sơ từ App CV', children: <AdminUnfinishCvAppCvCandidate/>, key: 16, closable: true },
    { label: 'Ứng viên » Ứng viên ứng tuyển NTD', children: <AdminUVAplicationNTDCandidate/>, key: 17, closable: true },
    { label: 'Ứng viên » Tất cả ứng viên', children: <AdminGetAllCandidate/>, key: 18 , closable: true},
    { label: 'Ứng viên » Ứng viên bị ẩn', children: <AdminGetAllHiddenCandidate/>, key: 19 , closable: true},
    { label: 'Ứng viên » Trạng thái ứng viên NHS', children: <AdminStatusCandidate/>, key: 110 , closable: true},
    { label: 'Ứng viên » Xuất file ứng viên', children: <AdminExportFileCandidate/>, key: 111 , closable: true},
    { label: 'Ứng viên » Ứng viên nhập từ Timviec365', children: <AdminImport365Candidate/>, key: 112 , closable: true},
    { label: 'Ứng viên » Ứng viên nhập từ site vệ tinh', children:<AdminImportSateliteCandidate/>, key: 113 , closable: true},
    { label: 'Ứng viên » Ứng viên add lỗi', children: <AdminErrorAddingCandidate/>, key: 114 , closable: true},
    { label: 'Ứng viên » Ứng viên đăng ký lỗi', children: <AdminErrorRegisterationCandidate/>, key: 115 , closable: true},
    { label: 'Ứng viên » Xuất excel ứng viên lỗi cv', children: <AdminExportErrorCvCandidate/>, key: 116 , closable: true},
    { label: 'Ứng viên » Thêm từ khóa nhạy cảm', children: <AdminSensitiveKeywordCandidate/>, key: 117 , closable: true},
    { label: 'Ứng viên » Tải cv ứng viên', children: <AdminDownloadCVCandidate/>, key: 118 , closable: true},
    // ntd
    { label: 'Nhà tuyển dụng » 	Thêm mới', children: <AdminAddRecuitment/>, key: 20 , closable: true},
    { label: 'Nhà tuyển dụng » Nhà tuyển dụng đăng ký', children: <RegisterRecruitment/>, key: 21 , closable: true},
    { label: 'Nhà tuyển dụng » Tất cả NTD', children: <AdminAllRecruitment/>, key: 22 , closable: true},
    { label: 'Nhà tuyển dụng » NTD bị ẩn', children: <AdminHiddenRecruitment/>, key: 23 , closable: true},
    { label: 'Nhà tuyển dụng » NTD chưa đăng tin', children: <AdminNoPostNewRecruitment/>, key: 24 , closable: true},
    { label: 'Nhà tuyển dụng » NTD có tin sắp hết hạn', children: < AdminExpiresRecruitment/>, key: 25 , closable: true},
    { label: 'Nhà tuyển dụng » NTD đăng nhập', children: <LoginPage isNTDLogin={true}/>, key: 26 , closable: true},
    { label: 'Nhà tuyển dụng » Gửi ứng viên (Chuyên viên gửi)', children: <AdminSentCandidate/>, key: 27 , closable: true},
    { label: 'Nhà tuyển dụng » Gửi ứng viên (Ứng viên tự ứng tuyển)', children: <AdminSentCandidateSent/>, key: 28 , closable: true},
    { label: 'Nhà tuyển dụng » Gửi ứng viên trong ngày', children: '', key: 29 , closable: true},
    // tin tuyen dung
    { label: '	Tin tuyển dụng - KD  » 	NTD tự đăng', children: <AdminNewPostRecruitment/>, key: 30 , closable: true},
    { label: '	Tin tuyển dụng - KD  » 	Danh sách lấy về', children: <AdminGetListApplicationRecruitment/>, key: 31 , closable: true},
    { label: '	Tin tuyển dụng - KD  » 	Thêm mới', children: <AdminNTDAdd/>, key: 32 , closable: true},
    //Blog 
    { label: '	Blog  » 	Thêm mới', children: <AdminBlogAdd/>, key: 40 , closable: true},
    { label: '	Blog  » 	Danh sách', children: <AdminBlogList/>, key: 41 , closable: true},
    // điểm
    { label: 'Trường điểm  » 	Thêm gói', children: < AdminAddPoint/>, key: 50 , closable: true},
    { label: 'Trường điểm  » 	Gói điểm', children: <AdminGetPointBugget/>, key: 51 , closable: true},
    { label: 'Trường điểm  » 	Danh sách', children: <AdminPointList/>, key: 52 , closable: true},
    { label: 'Trường điểm  » 	Thêm công ty', children: <AdminAddCompanyPoint/>, key: 53 , closable: true},
    { label: 'Trường điểm  » 	Lịch sử', children: <AdminPointHistory/>, key: 54 , closable: true},
    { label: 'Trường điểm  » 	Lịch sử cộng điểm', children: <AdminPointIncreHistory/>, key: 55 , closable: true},
    // danh sách tài khoản
    { label: 'Danh sách tài khoản  » 	Thêm mới', children: <AdminAddAccount/>, key: 60 , closable: true},
    { label: 'Danh sách tài khoản  » 	Danh sách', children: <AdminListAccount/>, key: 61 , closable: true},
    
  ];
  const [ contents, setContents ] = useState<any>(init);
  const [ listNumber, setListNumber ] = useState<any>([]);


  

  useEffect(() => {
    const isHave = listNumber.includes(lisContentShow)
    if(!isHave && lisContentShow) {
      setListNumber((pre: any) => [...pre, lisContentShow]);
      let content = initialItems.find((element: any ) => element.key && element.key == lisContentShow);
      if(content) {
        setContents((pre: any) => [...pre, content])
      }
    }
    setActiveKey(lisContentShow);
  }, [lisContentShow])
  const [activeKey, setActiveKey] = useState(contents[0]?.key);
  const newTabIndex = useRef(1);

  const onChange = (newActiveKey: string) => {
    changeActiveSidebar(Number(newActiveKey))
    setActiveKey(newActiveKey);
  };

  const add = () => {
    const newActiveKey = `newTab${newTabIndex.current++}`;
    const newPanes = [...contents];
    newPanes.push({ label: 'New Tab', children: 'Content of new Tab', key: newActiveKey });
    setContents(newPanes);
    setActiveKey(newActiveKey);
  };

  const remove = (targetKey: TargetKey) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    contents.forEach((item: any, i: number) => {
      if (item.key && item.key == targetKey) {
         lastIndex = i - 1;
      }
    });
    const newPanes = contents.filter((item: any) => item.key !== targetKey);
    const newListNumber = listNumber.filter((item: any) => item !== targetKey);
    setListNumber(newListNumber)
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setContents(newPanes);
    setActiveKey(newActiveKey);
  };

  const onEdit = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: 'add' | 'remove',
  ) => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };

  return (
      <Tabs
      type="editable-card"
      onChange={onChange}
      activeKey={activeKey}
      onEdit={onEdit}
      items={contents}
      hideAdd={true}
      destroyInactiveTabPane={true}
    />
  )
}

export default ContentAdmin