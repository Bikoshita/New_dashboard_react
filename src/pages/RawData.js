import React from 'react';
import SidebarAndNav from '../components/SidebarAndNav';
import './Home.scss';
import RawTable from '../components/RawTable';

const RawData = () => {
  return (
    <div className='home'>
        <div><SidebarAndNav /></div>
        <div><RawTable  /></div>
    </div>
  )
}

export default RawData