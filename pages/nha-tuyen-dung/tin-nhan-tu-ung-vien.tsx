import Box_container from '@/components/quan-ly-chung-NTD/Box_container'
import Temp_comp from '@/components/quan-ly-chung-NTD/Temp_comp'
import React from 'react'
import styles from './quan-ly-ho-so/qly-danh-sach.module.scss'
import Pagination_page from '@/components/quan-ly-chung-NTD/common/Pagination_page'
const data_list_time_send: any[] = [
    {
        candidate: 'Triệu Việt Hoàng',
        title: 'TRIỆU VIỆT HOÀNG - THIẾT KẾ ĐỒ HỌA',
        content: 'Tôi tên là Nguyễn Hà P. Tôi viết thư xin việc này bày tỏ nguyện vọng ứng tuyển vị trí Nhân viên Marketing mà công ty đang có nhu cầu tuyển dụng. Với kinh nghiệm và khao khát học hỏi không ngừng, Với kinh nghiệm và khao khát học hỏi không ngừng 33333',
        time_send: '00:00 - 01/01/2024',
        action: 'Đã xem',
    },
    {
        candidate: 'Triệu Việt Hoàng',
        title: 'TRIỆU VIỆT HOÀNG - THIẾT KẾ ĐỒ HỌA',
        content: 'Tôi tên là Nguyễn Hà P. Tôi viết thư xin việc này bày tỏ nguyện vọng ứng tuyển vị trí Nhân viên Marketing mà công ty đang có nhu cầu tuyển dụng. Với kinh nghiệm và khao khát học hỏi không ngừng, Với kinh nghiệm và khao khát học hỏi không ngừng 33333',
        time_send: '00:00 - 01/01/2024',
        action: 'Đã xem',
    },
    {
        candidate: 'Triệu Việt Hoàng',
        title: 'TRIỆU VIỆT HOÀNG - THIẾT KẾ ĐỒ HỌA',
        content: 'Tôi tên là Nguyễn Hà P. Tôi viết thư xin việc này bày tỏ nguyện vọng ứng tuyển vị trí Nhân viên Marketing mà công ty đang có nhu cầu tuyển dụng. Với kinh nghiệm và khao khát học hỏi không ngừng, Với kinh nghiệm và khao khát học hỏi không ngừng 33333',
        time_send: '00:00 - 01/01/2024',
        action: 'Đã xem',
    },
    {
        candidate: 'Triệu Việt Hoàng',
        title: 'TRIỆU VIỆT HOÀNG - THIẾT KẾ ĐỒ HỌA',
        content: 'Tôi tên là Nguyễn Hà P. Tôi viết thư xin việc này bày tỏ nguyện vọng ứng tuyển vị trí Nhân viên Marketing mà công ty đang có nhu cầu tuyển dụng. Với kinh nghiệm và khao khát học hỏi không ngừng, Với kinh nghiệm và khao khát học hỏi không ngừng 33333',
        time_send: '00:00 - 01/01/2024',
        action: 'Đã xem',
    },
    {
        candidate: 'Triệu Việt Hoàng',
        title: 'TRIỆU VIỆT HOÀNG - THIẾT KẾ ĐỒ HỌA',
        content: 'Tôi tên là Nguyễn Hà P. Tôi viết thư xin việc này bày tỏ nguyện vọng ứng tuyển vị trí Nhân viên Marketing mà công ty đang có nhu cầu tuyển dụng. Với kinh nghiệm và khao khát học hỏi không ngừng, Với kinh nghiệm và khao khát học hỏi không ngừng 33333',
        time_send: '00:00 - 01/01/2024',
        action: 'Đã xem',
    },

]

const Message_candidate = () => {
    const maxChars = 120;

    return (
        <Temp_comp>
            <Box_container title="TIN NHẮN TỪ ỨNG VIÊN">
                <div className={styles.table_container}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th style={{ width: '16%' }}>Ứng viên</th>
                                <th style={{ width: '20%' }}>Tiêu đề</th>
                                <th style={{ width: '30%' }}>Nội dung</th>
                                <th style={{ width: '18%' }}>Thời gian gửi</th>
                                <th style={{ width: '16%' }}>Hành động</th>
                            </tr>
                        </thead>
                        {!(data_list_time_send.length === 0) && (
                            <tbody>
                                {data_list_time_send.map((data, index) => {
                                    const truncatedContent = `${data.content.slice(0, maxChars)}...`
                                    return (
                                        <tr key={index}>
                                            <td>
                                                <a href="#" className={styles['t-xanh']}>
                                                    {data.candidate}
                                                </a>
                                            </td>
                                            <td>
                                                {data.title}
                                            </td>
                                            <td >
                                                <p className={styles.content}>
                                                    {data.content}
                                                </p>
                                            </td>
                                            <td>
                                                <a href="#" className={styles['t-xanh']}>
                                                    {data.time_send}
                                                </a>
                                            </td>
                                            <td style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
                                                {data.action}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        )}
                    </table>
                </div>
                <Pagination_page />
            </Box_container>
        </Temp_comp >
    )
}

export default Message_candidate
