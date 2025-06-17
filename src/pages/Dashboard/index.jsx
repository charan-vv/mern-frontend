import { useEffect, useState } from "react";
import {
  DashboardCard,
  DashboardChart,
  DashboardTranscations,
  BalanceCards,
} from "./components";
import data from "./data.json";
// import { useOutletContext } from "react-router-dom";


const index = ({route_components_ref}) => {
  const [loading, setLoading] = useState(true);

  // const { route_components_ref } = useOutletContext();
  
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <div className="px-6 py-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">

        <div className="md:col-span-6">
         
           <DashboardCard route_components_ref={route_components_ref} cardData={data?.cards} loading={loading} />
        </div>

        <div className="md:col-span-6">
          <BalanceCards route_components_ref={route_components_ref} loading={loading} cards={data?.balanceCards} />
        </div>
      </div>
     

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">

        <div className="md:col-span-8">
          <DashboardTranscations
          route_components_ref={route_components_ref}
            loading={loading}
            transactions={data?.transactions}
          />
        </div>

        <div className="md:col-span-4">
          <DashboardChart loading={loading} chartData={data?.reportChart} />
        </div>
      </div>

    </div>
  );
};

export default index;
