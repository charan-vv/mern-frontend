import React from 'react';
import { Modal } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import "./style.scss"

const CustomModal = ({open,onClose,title = '',children,footer = null,width = 600,closable = true,centered = true,}) => {
  
    return (
        <>
            <Modal open={open} onCancel={onClose}footer={footer}width={width}closable={false}centered={centered}>
                <div className='mb-5'>
                    <p className="text-center strong_text flex justify-center relative">{title}</p>
                    {closable && (<button onClick={onClose}className="budget_action_icons text-gray-500 transition-all absolute"><CloseOutlined className=" cursor-pointer text-lg" /></button>)}
                </div>
                <div className="text-gray-700">{children}</div>
            </Modal>
        </>
    );
};

export default CustomModal;
