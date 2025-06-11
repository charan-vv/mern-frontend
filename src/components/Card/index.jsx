// Card.js
import React from 'react';
import './style.scss';

const Card = ({ title,loading, value, icon, iconWrapperClassName,style }) => {
  return (
    <div className=" card" style={style}>
      <div className={`card-icon ${iconWrapperClassName}`} >
      {icon &&   <img src={icon} alt={title} />}
      </div>
      <div className="card-details card-content ">
        <div className="card-title title_medium font-medium">{title}</div>
        <div className="card-value">{value}</div>
      </div>
    </div>
  );
};

export default Card;
