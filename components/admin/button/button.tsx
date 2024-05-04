import React from 'react'

interface ButtonAdminProps {
    text: string,
    action: () => void,
    className: string,
    classText: string 
}

const ButtonAdmin = ({ text, action, className, classText}: ButtonAdminProps) => {
  return (
    <div onClick={() => action()} className={`${className}`}>
        <p className={`${classText}`}>{text}</p>
    </div>
  )
}

export default ButtonAdmin;