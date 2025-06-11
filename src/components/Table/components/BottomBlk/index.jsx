import React from 'react';

const BottomBlk = ({ data }) => {
  
  return (
    <div className="grid grid-cols-4 md:grid-cols-4 gap-4 p-4 ">
      {data?.length > 0 && (
        <>
          {data.map((val, index) => (
            <p key={index}>
              <>{val?.label}: {val?.value}</>
            </p>
          ))}
        </>
      )}
    </div>
  );
};

export default BottomBlk;
