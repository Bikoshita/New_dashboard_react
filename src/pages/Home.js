// import React, { useContext, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import "./Home.scss";
// import SidebarAndNav from '../components/SidebarAndNav';
// import DeviceCard from '../components/DeviceCard';
// import TableData from '../components/TableData';
// import ComboBox from '../components/ComboBox';
// import { AppContext } from '../components/AppContext';

// const Home = () => {
//   const navigate = useNavigate();
//   const { data,setData, tableData,setTableData } = useContext(AppContext);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/queries");
//         if (response.ok) {
//           const jsonData = await response.json();
//           console.log(jsonData);

//           setData({
//             allDevices: jsonData.allDevices,
//             totalDevices: jsonData.totalDevices,
//             totalTests: jsonData.totalTests,
//             totalTestsToday: jsonData.totalTestsToday,
//             totalPatientsToday: jsonData.totalPatientsToday,
//           });
//           console.log("data set is",data);
//           setTableData(jsonData.recentTests);
          
//         } else {
//           console.log('Response not ok:', response.status);
//         }
//       } catch (error) {
//         console.log('Error:', error.message);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     console.log("useEffect is called");
//     if (!localStorage.getItem('token')) {
//       navigate('/');
//     }
//   }, [navigate]);

//   return (
//     <React.Fragment>
//       <div className='home'>
//         <div><SidebarAndNav /></div>
//         <div className='container'>
//           <div className='deviceDetails'>
//             <DeviceCard heading='Total Devices' data={data.totalDevices} />
//             <DeviceCard heading='Total Tests' data={data.totalTests} />
//             <DeviceCard heading='Total Tests Today' data={data.totalTestsToday} />
//             <DeviceCard heading='Total Patients Today' data={data.totalPatientsToday} />
//           </div>
//           <h2>Recent Tests</h2>
//           <div className='tableDetails'><TableData data={tableData} /></div>
//         </div>
//       </div>
//     </React.Fragment>
//   );
// };

// export default Home;

import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Home.scss";
import Sidebar from '../components/SidebarAndNav';
import DeviceCard from '../components/DeviceCard';
import TableData from '../components/TableData';
import { AppContext } from '../components/AppContext';

const Home = () => {
  const navigate = useNavigate();
  const { data, tableData } = useContext(AppContext);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <React.Fragment>
      <div className='home'>
        <div><Sidebar heading="Home" /></div>
        <div className='container'>
          <div className='deviceDetails'>
            <DeviceCard heading='Total Devices' data={data.totalDevices} />
            <DeviceCard heading='Total Tests' data={data.totalTests} />
            <DeviceCard heading='Total Tests Today' data={data.totalTestsToday} />
            <DeviceCard heading='Total Patients Today' data={data.totalPatientsToday} />
          </div>
          <h2>Recent Tests</h2>
          <div className='tableDetails'><TableData data={tableData} /></div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;

