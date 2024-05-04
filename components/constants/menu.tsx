import { PlusSquareOutlined } from "@ant-design/icons";

export const menuItems = [
    {
        label: <div>Danh sách tài khoản</div>,
        key: '/admin/user',
        icon: <PlusSquareOutlined />,
        children: [
            {
                key: '/admin/user/create',
                label: `Thêm mới`,
            },
            {
                key: '/admin/user/list',
                label: `Danh sách`,
            }
        ],
    },
    {
        label: <div>Ứng viên</div>,
        key: '/admin/candidate',
        icon: <PlusSquareOutlined />,
        children: [
            {
                key: '/admin/candidate/create',
                label: `Thêm mới`,
            },
            {
                key: '/admin/candidate/newest-list',
                label: `Ứng viên đăng ký mới`,
            },
            {
                key: '/admin/candidate/update-cv',
                label: `Ứng viên cập nhật, sửa hồ sơ`,
            },
            {
                key: '/admin/candidate/upload-cv',
                label: `Ứng viên tải CV từ máy tính cá nhân`,
            },
            {
                key: '/admin/candidate/unfinish-cv-website',
                label: `Ứng viên chưa hoàn thiện hồ sơ từ Website`,
            },
            {
                key: '/admin/candidate/unfinish-cv-app-timviec',
                label: `Ứng viên chưa hoàn thiện hồ sơ từ App Timviec`,
            },
            {
                key: '/admin/candidate/unfinish-cv-app-cv',
                label: `Ứng viên chưa hoàn thiện hồ sơ từ App CV`,
            },
            {
                key: '/admin/candidate/finish-cv',
                label: `Ứng viên ứng tuyển NTD`,
            },
            {
                key: '/admin/candidate/get-all',
                label: `Tất cả ứng viên`,
            },
            {
                key: '/admin/candidate/get-all-hidden',
                label: `Ứng viên bị ẩn`,
            },
            {
                key: '/admin/candidate/status',
                label: `Trạng thái ứng viên NHS`,
            },
            {
                key: '/admin/candidate/export-file',
                label: `Xuất file ứng viên`,
            },
            {
                key: '/admin/candidate/import-365',
                label: `Ứng viên nhập từ Timviec365`,
            },
            {
                key: '/admin/candidate/import-satelite',
                label: `Ứng viên nhập từ vệ tinh`,
            },
            {
                key: '/admin/candidate/error-adding',
                label: `Ứng viên add lỗi`,
            },
            {
                key: '/admin/candidate/error-registeration',
                label: `Ứng viên đăng ký lỗi`,
            },
            {
                key: '/admin/candidate/export/error-cv',
                label: `Xuất excel ứng viên lỗi cv`,
            },
            {
                key: '/admin/candidate/add/sensitive-keyword',
                label: `Thêm từ khóa nhạy cảm`,
            }
        ],
    },
    {
        label: <div>Ứng viên</div>,
        key: '/admin/recruitment',
        icon: <PlusSquareOutlined />,
        children: [
            {
                key: '/admin/recruitment/create-new',
                label: `Thêm mới`,
            },
            {
                key: '/admin/recruitment/register',
                label: `NTD đăng ký`,
            },
            {
                key: '/admin/recruitment/all',
                label: `Tất cả NTD`,
            },
            {
                key: '/admin/recruitment/hidden',
                label: `NTD bị ẩn`,
            },
            {
                key: '/admin/recruitment/un-release',
                label: `NTD chưa đăng tin`,
            },
            {
                key: '/admin/recruitment/almost-expired',
                label: `NTD có tin sắp hết hạn`,
            },
            {
                key: '/admin/recruitment/login',
                label: `NTD đăng nhập`,
            },
            {
                key: '/admin/recruitment/sending-candidate-by-expert',
                label: `Gửi ứng viên (Chuyên viên gửi)`,
            },
            {
                key: '/admin/recruitment/sending-candidate-by-self',
                label: `Gửi ứng viên (Ứng viên tự ứng tuyển)`,
            },
            {
                key: '/admin/recruitment/sending-candidate-in-day',
                label: `Gửi ứng viên trong ngày`,
            }
        ],
    },
];