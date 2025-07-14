import React from "react";
import { Cards } from "../../../../components";
import "./style.scss"


const DashboardCard = ({route_components_ref,cardData,loading}) => {
 
  return (
    <div className="dashboard-card-container">
      {(loading ? [...Array(cardData?.length)] : cardData)?.map((item, index) => (
        <>
        
        <div 
         
        >
          <Cards
          key={item?.id || index}
          ref={route_components_ref && item?.ref ? route_components_ref(item.ref) : null}
          loading={loading}
          title={item?.title}
          value={item?.description}
          style={{ "--card-bg-color": item?.bgColor }}
        />
        </div>
        </>
      ))}
    </div>
  );
};

export default DashboardCard;
