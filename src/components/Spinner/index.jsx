import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";

import "./style.scss"

const SpinnerComponent = () => {
  const { loader } = useSelector((state) => state.loader)
 
  return (
    <div className="custom-spinner">
      <Spin spinning={loader} indicator={<LoadingOutlined style={{ fontSize: 48, }} spin />} fullscreen />
    </div>
  );
};
export default SpinnerComponent;