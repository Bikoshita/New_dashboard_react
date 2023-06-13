import * as React from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useLocation } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const RawTable = () => {
  const location = useLocation();
  const raw = location.state?.rawData || [];
  const temperature = location.state?.temperature || [];
  const row = location.state?.sendrow || [];
  console.log("rawData is", raw);
  console.log("temperature is", temperature);
  console.log("row is", row);

  const indexArray = Array.from({ length: raw.length }, (_, index) => index + 1);

  const handleDownload = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.table_to_sheet(document.getElementById('raw-table'));

    // Set width for the first column
    const firstColumnWidth = document.getElementById('raw-table').querySelector('th').offsetWidth;
    const firstColumnStyle = { width: firstColumnWidth };
    worksheet['!cols'] = [{ width: firstColumnWidth / 7 }, ...Array.from({ length: raw.length }, () => ({ width: 10 }))];

    // Set bold font for the first column and indexes
    const firstColumnIndexes = indexArray.map((_, index) => `A${index + 2}`);
    const firstColumnAndIndexes = ['A1', ...firstColumnIndexes];
    firstColumnAndIndexes.forEach((cell) => {
      const style = worksheet[cell]?.s || {};
      style.font = { bold: true };
      worksheet[cell] = { ...worksheet[cell], s: style };
    });

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'table.xlsx');
  };

  return (
    <Paper sx={{ width: 1200, my: 20, mx: 15, boxShadow: '1px 2px 10px #888888' }}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table" id="raw-table">
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                style={{
                  minWidth: 360,
                  position: 'sticky',
                  top: 0,
                  backgroundColor: '#fff',
                  zIndex: 1,
                  fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;",
                  fontWeight: 'bold'
                }}
              >
                {`${row.testName}_${row.did}_${row.date} | ${row.time}`}
              </TableCell>
              {indexArray.map((index) => (
                <TableCell
                  align="center"
                  key={index}
                  style={{
                    position: 'sticky',
                    top: 0,
                    backgroundColor: '#fff',
                    zIndex: 1,
                    fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;",
                    fontWeight: 'bold'
                  }}
                >
                  {index}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell
                align="center"
                style={{
                  position: 'sticky',
                  top: 0,
                  backgroundColor: '#fff',
                  zIndex: 1,
                  fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;",
                  fontSize: 16,
                  fontWeight: 'bold'
                }}
              >
                Raw
              </TableCell>
              {raw.map((value, index) => (
                <TableCell align="center" key={index}>
                  {value}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell
                align="center"
                style={{
                  position: 'sticky',
                  top: 0,
                  backgroundColor: '#fff',
                  zIndex: 1,
                  fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;",
                  fontSize: 16,
                  fontWeight: 'bold'
                }}
              >
                Temperature
              </TableCell>
              {temperature.map((value, index) => (
                <TableCell align="center" key={index}>
                  {value}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" onClick={handleDownload} sx={{ float: 'right',position:'sticky',my: 2, mx: 'auto' }}>Download as Excel</Button>

    </Paper>
  );
};

export default RawTable;
