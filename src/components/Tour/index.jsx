import React from 'react';
import { Tour } from 'antd';
import "./style.scss";

const AppTour = ({ open, onClose, steps }) => {
  return (
    <div >
      <Tour
      open={open}
      onClose={onClose}
      steps={steps}
      mask={{
        style: {
          boxShadow: 'inset 0 0 15px #333',
        },
        color: 'rgba(147, 151, 151, 0.4)',
      }}
      placement={"bottomLeft"}
    />
    </div>
  );
};

export default AppTour;
