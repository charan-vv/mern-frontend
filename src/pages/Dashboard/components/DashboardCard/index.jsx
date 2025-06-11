import React from "react";
import { Cards } from "../../../../components";
import "./style.scss"


const DashboardCard = ({cardData,loading}) => {
 
  return (
    <div className="dashboard-card-container">
      {(loading ? [...Array(cardData?.length)] : cardData)?.map((item, index) => (
        <Cards
          key={item?.id || index}
          loading={loading}
          title={item?.title}
          value={item?.description}
           style={{ "--card-bg-color": item?.bgColor }}
        />
      ))}
    </div>
  );
};

export default DashboardCard;
