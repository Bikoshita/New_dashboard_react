import React,{useContext} from 'react';
import Sidebar from '../components/SidebarAndNav';
import { AppContext } from '../components/AppContext';
import ComboBox from '../components/ComboBox';
import TableData from '../components/TableData';
import LogDataFilters from '../components/LogDataFilters';
import LogDataTable from '../components/LogDataTable';
import './Home.scss';

const LogData = () => {
  const { AllDevices,logDataTable, filteredTable, showFilteredTable } = useContext(AppContext);

  return (
    <React.Fragment>
      <div className='logData'>
        <div><Sidebar heading="Log Data" /></div>
        <div className='filterBoxLogData'>

          <div>
            <LogDataFilters devices={AllDevices} />
          </div>

        </div>

        <div>
          {showFilteredTable &&

            <div className='filterTable'>
              <LogDataTable data={logDataTable} />
            </div>}
        </div>
      </div>
    </React.Fragment>
  );
}

export default LogData