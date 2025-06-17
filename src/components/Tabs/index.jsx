import React from "react";
import { Tabs } from "antd";
import "./style.scss";

const CustomTabs = (props) => {
  const { items, onChange, activeKey, renderTabBar,destroyInactiveTabPane=false } = props;

  const transformedItems = items?.map(item => ({
    ...item,
    label: <h5>{item.label}</h5>
  }));
  
  return (
    <div className="irgo-custom-tabs">
      <Tabs 
        defaultActiveKey="1" 
        activeKey={activeKey}
        items={transformedItems} 
        onChange={onChange}
        renderTabBar={renderTabBar}
        destroyInactiveTabPane={destroyInactiveTabPane}
      />
    </div>
  );
};

export default CustomTabs;