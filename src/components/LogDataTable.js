import * as React from 'react';
import './TableData.scss';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

const LogDataTable = ({ data }) => {
  console.log("data received is",data);
  const navigate = useNavigate();

  const columns = [
    { field: 'id', headerName: 'ID', width: 70, headerClassName: 'bold-header' },
    { field: 'd_id', headerName: 'Device Id', width: 100, headerClassName: 'bold-header' },
    { field: 'dates', headerName: 'Date', width: 100, headerClassName: 'bold-header' },
    { field: 'time', headerName: 'Time', width: 100, headerClassName: 'bold-header' },
    { field: 'testname', headerName: 'Test Name', width: 120, headerClassName: 'bold-header' },
    { field: 'blk_st', headerName: 'BLANK_ST', width: 120, headerClassName: 'bold-header' },
    { field: 'read_st', headerName: 'READ_ST', width: 120, headerClassName: 'bold-header' },
    { field: 'abs_st', headerName: 'ABS_ST', width: 120, headerClassName: 'bold-header' },
    { field: 'LLIM', headerName: 'LLIM', width: 120, headerClassName: 'bold-header' },
    { field: 'ULIM', headerName: 'ULIM', width: 100, headerClassName: 'bold-header' },
    {
      field: 'raw',
      headerName: 'Raw',
      width: 130,
      headerClassName: 'bold-header',
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate('/logData/standard/raw',  { state: { rawData: params.row.raw, temperature: params.row.temperature,sendrow:params.row } } )}
        >
          Raw
        </Button>
      ),
    },
    // {
    //   field: 'dd',
    //   headerName: 'Device Diagnostic',
    //   width: 130,
    //   headerClassName: 'bold-header',
    //   renderCell: (params) => (
    //     <Button 
    //       variant="outlined" 
    //       color="primary"
    //       onClick={() => navigate('/home/deviceDiagnostics',{ state: { deviceDiagnostic: params.row.deviceDiagnostic } })}
    //     >
    //       Data
    //     </Button>
    //   ),
    // },
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

  const sortedData = [...data].sort((a, b) => {
    const dateA = new Date(`${a.date} ${convertTime(a.time)}`);
    const dateB = new Date(`${b.date} ${convertTime(b.time)}`);
    return dateB - dateA;
  });

  const rows = sortedData.map((row, index) => ({
    ...row,
    id: index + 1,
    raw: row.raw,
    temperature: row.temperature,
  }));

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
      />
    </div>
  );
};

export default LogDataTable;


