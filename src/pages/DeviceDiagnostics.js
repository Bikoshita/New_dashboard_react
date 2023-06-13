import React from 'react';
import SidebarAndNav from '../components/SidebarAndNav';
import './Home.scss';
import DdiagTable from '../components/DdiagTable';
import ColumnGroupingTable from '../components/ColumnGroupingTable';

const DeviceDiagnostics = () => {
  return (
    <div className='home'>
        <div><SidebarAndNav /></div>
        <div><DdiagTable  /></div>
        {/* <div><ColumnGroupingTable  /></div> */}
    </div>
  )
}

export default DeviceDiagnostics;