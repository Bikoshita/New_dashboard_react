import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../components/AppContext';
import Sidebar from '../components/SidebarAndNav';
import './Home.scss';
import ComboBox from '../components/ComboBox';
import TableData from '../components/TableData'

const ClinicalValidation = () => {
  const { AllDevices, filteredTable, showFilteredTable } = useContext(AppContext);

  return (
    <React.Fragment>
      <div className='clinicalValidation'>
        <div><Sidebar heading="Clinical Validation" /></div>
        <div className='filterBoxClinical'>

          <div>
            <ComboBox devices={AllDevices} />
          </div>

        </div>

        <div>
          {showFilteredTable &&

            <div className='filterTable'>
              <TableData data={filteredTable} />
            </div>}
        </div>
      </div>
    </React.Fragment>
  );
}

export default ClinicalValidation;
