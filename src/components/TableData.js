import * as React from 'react';
import './TableData.scss';
import { Button, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

const TableData = ({ data }) => {
  console.log("data received is",data);
  const [selectedRows, setSelectedRows] = React.useState([]);

  const navigate = useNavigate();

  const columns = [
    { field: 'id', headerName: 'ID', width: 70, headerClassName: 'bold-header' },
    { field: 'did', headerName: 'Device Id', width: 100, headerClassName: 'bold-header' },
    // { field: 'did', headerName: 'Device Id', width: 100, filterable: true },
    
    { field: 'date', headerName: 'Date', width: 100, headerClassName: 'bold-header' },
    { field: 'time', headerName: 'Time', width: 100, headerClassName: 'bold-header' },
    { field: 'p_name', headerName: 'Patient Name', width: 120, headerClassName: 'bold-header' },
    { field: 'testName', headerName: 'Test Name', width: 120, headerClassName: 'bold-header' },
    { field: 'abs_st', headerName: 'ABS_ST', width: 120, headerClassName: 'bold-header' },
    { field: 'abs_s', headerName: 'ABS_S', width: 120, headerClassName: 'bold-header' },
    { field: 'cal', headerName: 'Calculated', width: 120, headerClassName: 'bold-header' },
    { field: 'error', headerName: 'Error', width: 100, headerClassName: 'bold-header' },
    {
      field: 'raw',
      headerName: 'Raw',
      width: 130,
      headerClassName: 'bold-header',
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="primary"

          onClick={() => navigate('/home/raw',  { state: { rawData: params.row.raw, temperature: params.row.temperature,sendrow:params.row } } )}
        >
          Raw
        </Button>
      ),
    },
    {
      field: 'dd',
      headerName: 'Device Diagnostic',
      width: 160,
      headerClassName: 'bold-header',
      renderCell: (params) => (
        <Button 
          variant="outlined" 
          color="primary"
          onClick={() => 
            {
              const selectedData = selectedRows.map((rowId) => rows[rowId].deviceDiagnostic);
              // navigate('/home/deviceDiagnostics', { state: { deviceDiagnostic: selectedData } });

              navigate('/home/deviceDiagnostics',{ state: { deviceDiagnostic: params.row.deviceDiagnostic } })
            }
            }>
          Data
        </Button>
      ),
    },
    { field: 'reg_1_lot', headerName: 'Reagent_1_Lot', width: 120, headerClassName: 'bold-header' },
    { field: 'reg_1_expiry', headerName: 'Reagent_1_Expiry', width: 150, headerClassName: 'bold-header' },
    { field: 'reg_1_kitId', headerName: 'Reagent_1_KitID', width: 150, headerClassName: 'bold-header' },
    { field: 'reg_1_openingDate', headerName: 'Reagent_1_OpeningDate', width: 200, headerClassName: 'bold-header' },
    { field: 'reg_2_lot', headerName: 'Reagent_2_Lot', width: 120, headerClassName: 'bold-header' },
    { field: 'reg_2_expiry', headerName: 'Reagent_2_Expiry', width: 150, headerClassName: 'bold-header' },
    { field: 'reg_2_kitId', headerName: 'Reagent_2_KitID', width: 150, headerClassName: 'bold-header' },
    { field: 'reg_2_openingDate', headerName: 'Reagent_2_OpeningDate', width: 200, headerClassName: 'bold-header' },
    { field: 'reg_standard_lot', headerName: 'Reagent_Standard_Lot', width: 180, headerClassName: 'bold-header' },
    { field: 'reg_standard_expiry', headerName: 'Reagent_Standard_Expiry', width: 200, headerClassName: 'bold-header' },
    { field: 'reg_standard_kitId', headerName: 'Reagent_Standard_KitID', width: 200, headerClassName: 'bold-header' },
    { field: 'reg_standard_openingDate', headerName: 'Reagent_Standard_OpeningDate', width: 250, headerClassName: 'bold-header' },
  ];

  const convertTime = (time) => {
    const [hour, minute, period] = time.split('_');
    let hourNum = parseInt(hour);
    if (period === 'PM' && hourNum !== 12) {
      hourNum += 12;
    } else if (period === 'AM' && hourNum === 12) {
      hourNum = 0;
    }
    return `${hourNum.toString().padStart(2, '0')}:${minute}`;
  };

  // const sortedData = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));

  const sortedData = [...data].sort((a, b) => {
    const dateA = new Date(`${a.date} ${convertTime(a.time)}`);
    const dateB = new Date(`${b.date} ${convertTime(b.time)}`);
    return dateB - dateA;
  });

  const rows = sortedData.map((row, index) => ({
    ...row,
    id: index + 1,
    abs_st: row.testLog.abs_st,
    abs_s: row.testLog.abs_s,
    cal: row.testLog.calculated,
    error: row.testLog.actual,
    raw: row.testLog.raw,
    temperature: row.testLog.temperature,
    deviceDiagnostic: row.deviceDiagnostic,
    time: row.time,
    reg_1_lot:row.createPath.reagenArrayKey.reagent1lots,
    reg_1_expiry:row.createPath.reagenArrayKey.reagent1expiryDate,
    reg_1_kitId:row.createPath.reagenArrayKey.reagent1kitID,
    reg_1_openingDate:row.createPath.reagenArrayKey.reagent1openingDate,
    reg_2_lot:row.createPath.reagenArrayKey.reagent2lots,
    reg_2_expiry:row.createPath.reagenArrayKey.reagent2expiryDate,
    reg_2_kitId:row.createPath.reagenArrayKey.reagent2kitID,
    reg_2_openingDate:row.createPath.reagenArrayKey.reagent2openingDate,
    reg_standard_lot:row.createPath.reagenArrayKey.standardlots,
    reg_standard_expiry:row.createPath.reagenArrayKey.standardexpiryDate,
    reg_standard_kitId:row.createPath.reagenArrayKey.standardkitID,
    reg_standard_openingDate:row.createPath.reagenArrayKey.standardopeningDate,
  }));

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        onSelectionModelChange={(newSelection) => setSelectedRows(newSelection)}
      />
    </div>
  );
};

export default TableData;


