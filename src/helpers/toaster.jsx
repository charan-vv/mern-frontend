import { App } from 'antd';
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    InfoCircleOutlined,
    ExclamationCircleOutlined,
} from '@ant-design/icons';
import "./style.scss";

export const useToast = () => {
    const { message } = App.useApp();

    const openCustomToast = (type, msg, duration = 2) => {
        let config = {
            borderLeft: '2px solid #1890ff',
            textColor: '#1890ff',
            bgColor: '#E6F7FF',
            icon: <InfoCircleOutlined style={{ fontSize: 18, color: '#1890ff' }} />,
        };

        switch (type) {
            case 'success':
                config = {
                    borderLeft: '2px solid #009A0A',
                    textColor: '#009A0A',
                    bgColor: '#E9FFD0',
                    icon: <CheckCircleOutlined style={{ fontSize: 18, color: '#009A0A' }} />,
                };
                break;
            case 'error':
                config = {
                    borderLeft: '2px solid #D32029',
                    textColor: '#D32029',
                    bgColor: '#FFECEB',
                    icon: <CloseCircleOutlined style={{ fontSize: 18, color: '#D32029' }} />,
                };
                break;
            case 'warning':
                config = {
                    borderLeft: '2px solid #D89614',
                    textColor: '#D89614',
                    bgColor: '#FFF7E6',
                    icon: <ExclamationCircleOutlined style={{ fontSize: 18, color: '#D89614' }} />,
                };
                break;
            case 'info':
            default:
                config = {
                    borderLeft: '2px solid #1890ff',
                    textColor: '#1890ff',
                    bgColor: '#E6F7FF',
                    icon: <InfoCircleOutlined style={{ fontSize: 18, color: '#1890ff' }} />,
                };
                break;
        }

        message.open({
            content: (
                <div
                    className="flex items-center gap-[8px] font-[500] justify-center text-[18px]"
                    style={{
                        backgroundColor: config.bgColor,
                        color: config.textColor,
                        borderLeft: config.borderLeft,
                        padding: '10px 15px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.25)',
                        fontFamily: 'Cabin, sans-serif',
                    }}
                >
                    {config.icon}
                    {msg}
                </div>
            ),
            icon: false,
            duration,
        });
    };

    return {
        success: (msg, duration) => openCustomToast('success', msg, duration),
        error: (msg, duration) => openCustomToast('error', msg, duration),
        warning: (msg, duration) => openCustomToast('warning', msg, duration),
        info: (msg, duration) => openCustomToast('info', msg, duration),
    };
};
