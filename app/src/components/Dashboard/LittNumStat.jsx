import React, { useState } from 'react';

export const LittNumStat = ({ htmlIcon, count, txt, desc, color = 'orange' }) => {
  const [icon, setIcon] = useState();

  React.useEffect(() => {
    setIcon(icon);
  }, [icon]);

  const ReturnIcon = () => {
    return (
      <>
        {htmlIcon}
      </>
    );
  };

  return (
    <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-gray-100 dark:bg-gray-800">
      <div className="p-4 flex items-center">
        <div className={"p-3 rounded-full text-" + color + "-500 dark:text-"+color+"-100 bg-"+color+"-100 dark:bg-" + color + "-500 mr-4"}>
          <ReturnIcon />
        </div>
        <div>
          <p className="text-xl font-semibold text-gray-700 dark:text-gray-200">{count}</p>
          <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">{txt}</p>
          <p className='text-xs text-gray-400'>{desc}</p>
        </div>
      </div>
    </div>
  );
};
