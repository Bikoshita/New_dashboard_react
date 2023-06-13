import React from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import { useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const DdiagTable = () => {
  const location = useLocation();
  const deviceDiagnosticData = location.state?.deviceDiagnostic[1] || location.state?.deviceDiagnostic[0];
  console.log("device data is", deviceDiagnosticData);

  const fieldNames = Object.keys(deviceDiagnosticData);
  const fieldValues = Object.values(deviceDiagnosticData);

  const handleDownload = () => {
    const worksheet = XLSX.utils.aoa_to_sheet([fieldNames, fieldValues]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Device Diagnostics');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'device_diagnostics.xlsx');
  };

  return (
    <Paper sx={{ width: 1200, my: 20, mx: 15, boxShadow: '1px 2px 10px #888888' }}>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              {fieldNames.map((fieldName, index) => (
                <TableCell
                  key={index}
                  align="center"
                  sx={{
                    position: 'sticky',
                    top: 0,
                    backgroundColor: '#fff',
                    zIndex: 1,
                    minWidth: 200,
                    fontWeight: 'bold',
                  }}
                >
                  {fieldName}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              {fieldValues.map((fieldValue, index) => (
                <TableCell key={index} align="center">
                  {fieldValue}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" onClick={handleDownload} sx={{ float: 'right',position:'sticky',my: 2, mx: 'auto' }}>
        Download as Excel
      </Button>
    </Paper>
  );
};

export default DdiagTable;


// import React from 'react';
// import TableContainer from '@mui/material/TableContainer';
// import Table from '@mui/material/Table';
// import TableHead from '@mui/material/TableHead';
// import TableBody from '@mui/material/TableBody';
// import TableRow from '@mui/material/TableRow';
// import TableCell from '@mui/material/TableCell';
// import Paper from '@mui/material/Paper';
// import { useLocation } from 'react-router-dom';
// import Button from '@mui/material/Button';
// import { saveAs } from 'file-saver';
// import * as XLSX from 'xlsx';

// const DdiagTable = () => {
//   const location = useLocation();
//   const deviceDiagnosticData = location.state?.deviceDiagnostic[1] || location.state?.deviceDiagnostic[0];
//   console.log("device data is", deviceDiagnosticData);

//   const fieldNames = Object.keys(deviceDiagnosticData);
//   const fieldValues = Object.values(deviceDiagnosticData);

//   const handleDownload = () => {
//     const worksheet = XLSX.utils.aoa_to_sheet([fieldNames, fieldValues]);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Device Diagnostics');
//     const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
//     const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
//     saveAs(data, 'device_diagnostics.xlsx');
//   };

//   return (
//     <Paper sx={{ width: 1200, my: 20, mx: 15, boxShadow: '1px 2px 10px #888888' }}>
//       <TableContainer>
//         <Table>
//           <TableBody>
//             <TableRow>
//               {fieldNames.map((fieldName, index) => (
//                 <TableCell
//                   key={index}
//                   align="center"
//                   sx={{
//                     position: 'sticky',
//                     top: 0,
//                     backgroundColor: '#fff',
//                     zIndex: 1,
//                     minWidth: 200,
//                     fontWeight: 'bold',
//                   }}
//                 >
//                   {fieldName}
//                 </TableCell>
//               ))}
//             </TableRow>
//             <TableRow>
//               {fieldValues.map((fieldValue, index) => (
//                 <TableCell key={index} align="center">
//                   {fieldValue}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Button variant="contained" onClick={handleDownload} sx={{ float: 'right', position: 'sticky', my: 2, mx: 'auto' }}>
//         Download as Excel
//       </Button>
//     </Paper>
//   );
// };

// export default DdiagTable;


