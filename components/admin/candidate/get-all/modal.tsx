import { Modal } from 'antd'
import React, { useState } from 'react'

interface AdminModalShowProps {
    isOpen: boolean,
    action: () => void
    content: any
}

const AdminModalShow = ({isOpen, action, content} : AdminModalShowProps) => {
  return (
    <>
        <div>
        <Modal
        title=""
        centered
        open={isOpen}
        onOk={() => action()}
        onCancel={() => action()}
        width="60%"
        style={{
          height: "80%"
        }}
      >
        {content}
      </Modal>
      </div>
    </>
   
  )
}

export default AdminModalShow