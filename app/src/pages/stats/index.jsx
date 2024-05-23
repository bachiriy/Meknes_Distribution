import React, { useEffect, useState } from 'react';
import { LittNumStat } from '../../components/Dashboard/LittNumStat';
import CircleGraph from '../../components/Dashboard/CircleGraph';
import BarGraph from '../../components/Dashboard/BarGraph';
import GET from '../../utils/GET';

const icons = {
  clients: (
    <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
    </svg>
  ),
  users: (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" font-size="var(--icon-fontSize-lg)">
      <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"></path>
    </svg>
  ),
  files: (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" font-size="var(--icon-fontSize-lg)">
      <path d="M80,64a8,8,0,0,1,8-8H216a8,8,0,0,1,0,16H88A8,8,0,0,1,80,64Zm136,56H88a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Zm0,64H88a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16ZM44,52A12,12,0,1,0,56,64,12,12,0,0,0,44,52Zm0,64a12,12,0,1,0,12,12A12,12,0,0,0,44,116Zm0,64a12,12,0,1,0,12,12A12,12,0,0,0,44,180Z"></path>
    </svg>
  )
};

const Stats = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let statsSession = JSON.parse(sessionStorage.getItem('stats'));
    console.log(statsSession);
    const fetchData = async () => {
      setLoading(true);
      let response = await GET('stats');
      if (response.message === 'success') setStats(response.trendingCommune.map((d, i) => ({...d, address: response.fullAddresses[i].full_address})));
      setLoading(false);
    };
    fetchData();
  }, []);

  if(loading) return <p>loading...</p>;

  return (
    <div className='flex flex-col ml-16 mr-4'>
      <div className='w-full grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4 mt-6'>
        {stats.map(i => (
          <LittNumStat key={i.id} htmlIcon={icons.files} color='blue' txt={i.name} desc={i.address} count={i.client_files_count} />
        ))}
      </div>

      <div>
        <p>content</p>
        <div className='flex'>
          <BarGraph />
          <CircleGraph />
        </div>
      </div>
    </div>
  );
};

export default Stats;
