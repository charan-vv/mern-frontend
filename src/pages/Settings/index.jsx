import React, { useCallback, useMemo, useState } from "react";
import { Tab } from "src/components";
import { Popover } from "antd";
import { BsThreeDots } from "react-icons/bs";
import BasicDetails from "./components/BasicDetails";
import BankDetails from "./components/BankDetails";
import CardDetails from "./components/CardsDetails";
import FixedDeposite from "./components/FixedDeposite";
import LICDetails from "./components/LicDetails";
import EmiDetails from "./components/EmiDetails";

const Settings = () => {
  
  const [infoState, setInfoState] = useState({
    activeKey: "1",
    additionalTab: null,
    popoverOpen: false,
    isLoading: false,
  });



  // Visible tabs
  const BASE_TABS = useMemo(
    () => [
      {
        key: "1",
        label: "Basic Details",
        children: <BasicDetails />,
      },
      {
        key: "2",
        label: "Bank Details ",
        children: <BankDetails />,
      },
      {
        key: "3",
        label: "Cards Details",
        children: <CardDetails />,
      },
      {
        key:"4",
        label:"Fixed Deposite",
        children:<FixedDeposite />
      },
     
      
    ],
    []
  );




  // Hidden tabs
  const HIDDEN_TABS = useMemo(
    () => [
      {
        key: "5",
        label: "Lic",
        children: <LICDetails/>,
      },
      {
        key: "6",
        label: "EMI",
        children: <EmiDetails/>,
      },
    ],
    []
  );



  //  visible tabs with the additional tab if present
  const visibleTabs = useMemo(() => {
    return infoState.additionalTab
      ? [...BASE_TABS, infoState.additionalTab]
      : BASE_TABS;
  }, [infoState.additionalTab, BASE_TABS]);




  // Handle selecting a hidden tab
  const handleSelectTab = useCallback((selectedTab) => {
    setInfoState((prevState) => ({
      ...prevState,
      additionalTab: selectedTab,
      activeKey: selectedTab.key,
      popoverOpen: false,
      isLoading: true,
    }));

    // Clear loading infoState after DOM update
    setTimeout(() => {
      setInfoState((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }, 300);
  }, []);




  // Handle tab change from tab clicks
  const handleTabChange = useCallback(
    (key) => {
      setInfoState((prevState) => {
        const newState = { ...prevState, activeKey: key };
        if (
          BASE_TABS?.some((tab) => tab.key === key) &&
          prevState.additionalTab
        ) {
          newState.additionalTab = null;
        }

        return newState;
      });
    },
    [BASE_TABS]
  );




  // Handle popover visibility
  const handlePopoverOpenChange = useCallback((open) => {
    setInfoState((prevState) => ({
      ...prevState,
      popoverOpen: open,
    }));
  }, []);




  // Memoize popover content
  const popoverContent = useMemo(
    () => (
      <div>
        {HIDDEN_TABS?.map((tab) => (
          <div
            key={tab.key}
            className="p-3 hover:bg-gray-100 rounded cursor-pointer"
            onClick={() => handleSelectTab(tab)}
          >
            {tab.label}
          </div>
        ))}
      </div>
    ),
    [handleSelectTab, HIDDEN_TABS]
  );




  // Custom tab bar with more options menu
  const renderTabBar = useCallback(
    (props, DefaultTabBar) => (
      <div className="flex items-center">
        <DefaultTabBar {...props} />

       { HIDDEN_TABS.length>0 &&(<>
        <Popover
          content={popoverContent}
          trigger="click"
          open={infoState.popoverOpen}
          onOpenChange={handlePopoverOpenChange}
          placement="bottomRight"
        >
          <div className="ml-4 mb-4 cursor-pointer p-2 hover:bg-gray-100 rounded">
            <BsThreeDots size={20} />
          </div>
        </Popover>
       </>) }
      </div>
    ),
    [infoState.popoverOpen, popoverContent, handlePopoverOpenChange]
  );



  return (
    <>
      <Tab
        items={visibleTabs}
        onChange={handleTabChange}
        activeKey={infoState.activeKey}
        renderTabBar={renderTabBar}
      />
    </>
  );
};

export default Settings;
