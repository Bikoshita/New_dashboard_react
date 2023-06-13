import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import TableData from './TableData';
import "../pages/Home.scss";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker'
// import { AppContext } from './pages/AppContext';
import { AppContext } from './AppContext';

export default function ComboBox(props) {
  // const { tableData,setTableData } = useContext(AppContext);
  // console.log("table data received in combobox is",tableData);
  console.log("props received in combobox", props);
  const { filteredTable,setFilteredTable, showFilteredTable,setShowFilteredTable } = useContext(AppContext);
  const allDevices = props.devices;
  const [selectedBatch, setSelectedBatch] = useState('');
  const [splitDevices, setSplitDevices] = useState([]);
  const [filteredDevices, setFilteredDevices] = useState([]);
  const [device, setDevice] = useState('');
  const [profile, setProfile] = useState('');
  const [testName, setTestName] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  // const [filteredTable, setFilteredTable] = useState([]);
  // const [showFilteredTable, setshowFilteredTable] = useState(false);
  

  useEffect(() => {
    const fetchSplitDevices = async () => {
      const uniqueDevices = new Set(allDevices.map(device => device.slice(0, 3)));
      console.log("unique devices are", uniqueDevices);
      const result = Array.from(uniqueDevices);
      console.log("result is", result);
      setSplitDevices(result);
    };

    fetchSplitDevices();
  }, [allDevices]);

  useEffect(() => {
    if (selectedBatch) {
      const devicesStartingWithSelectedBatch = allDevices.filter(device =>
        device.startsWith(selectedBatch)
      );
      setFilteredDevices(devicesStartingWithSelectedBatch);
    } else {
      setFilteredDevices([]);
    }
  }, [selectedBatch, allDevices]);

  const getTestOptions = (profile) => {
    switch (profile) {
      case 'VITAL 7':
        return vital_7;
      case 'KIDNEY':
        return kidney;
      case 'LIVER':
        return liver;
      case 'HEART':
        return heart;
      case 'PANCREAS':
        return pancreas;
      case 'OTHER TESTS':
        return others;
      default:
        return [];
    }
  };

  if (device !== '' || testName !== '' || selectedDate !== '') {
    console.log("selected options are", device, testName, selectedDate);
  }

  return (
    <React.Fragment>
      <div style={{display:'flex'}}>

      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={splitDevices}
        sx={{ width: 200 }}
        onChange={(event, newValue) => {
          setSelectedBatch(newValue);

        }}
        renderInput={(params) => <TextField {...params} label="Select Batch" />}
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={filteredDevices}
        sx={{ width: 200 }}
        // value={filteredDevices}
        onChange={(event, newValue) => {
          setDevice(newValue);

        }}
        renderInput={(params) => <TextField {...params} label="Select Devices" />}
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={profiles}
        sx={{ width: 200 }}
        onChange={(event, newValue) => {
          setProfile(newValue.label);
        }}
        renderInput={(params) => <TextField {...params} label="Select Profile" />}
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={getTestOptions(profile)}
        sx={{ width: 200 }}
        onChange={(event, newValue) => {
          setTestName(newValue);
        }}
        renderInput={(params) => <TextField {...params} label="Select Test" />}
      />

      <TextField
        label="Select Date"
        type="date"
        value={selectedDate}
        onChange={(event) => {
          setSelectedDate(event.target.value);
        }}
        sx={{ width: 200 }}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <Button variant="contained" onClick={async () => {
        try {
          const requestBody = JSON.stringify({
            selectedDate: selectedDate,
            device: device,
            testName: testName
          });

          const response = await fetch("http://localhost:3011/queries/filter", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: requestBody
          });

          if (response.ok) {
            const jsonData = await response.json();
            console.log("filtered data is",jsonData.filteredTests);
            setFilteredTable(jsonData.filteredTests);
            setShowFilteredTable(true);

          } else {
            console.log('Response not ok:', response.status);
          }

        } catch (error) {
          console.log('Error:', error.message);
        }

      }}>Filter</Button>
      </div>

      {/* <div style={{display:'flex',marginTop:30}}>

{showFilteredTable && <div className='tableDetails'><TableData data={filteredTable} /></div>}
      </div> */}



    </React.Fragment>
  );
}

const profiles = [
  { label: 'VITAL 7' },
  { label: 'KIDNEY' },
  { label: 'LIVER' },
  { label: 'HEART' },
  { label: 'PANCREAS' },
  { label: 'OTHER TESTS' },
]

const vital_7 = [
  'Glucose',
  'Triglyceride',
  'Cholesterol',
  'Uric_Acid',
  'Total_Protein',
  'Albumin',
  'Haemoglobin',
]
const kidney = [
  'Creatinine',
  'Calcium',
  'Glucose',
  'Potassium',
  'Sodium',
  'Urea_B',
]
const heart = [
  'ALT',
  'Triglyceride',
  'Cholesterol',
  'HDL',
  'LDL',
]
const liver = [
  'Albumin',
  'ALP',
  'Bilirubin Direct',
  'AST',
  'Bilirubin_Total',
  'Total_Protein',
]
const pancreas = [
  'Amylase',
  'Lipase',
]
const others = [
  'Micro_protein',
  'Phosphorus',
  'Magnesium',
  'Uric_Acid',
  'Haemoglobin',
  'Chloride',
  'TSH',
  'SGOT',
  'GGT',
  'SGPT',
]

