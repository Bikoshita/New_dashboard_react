// // // // // // // // import React, { createContext, useState } from 'react';

// // // // // // // // export const AppContext = createContext();

// // // // // // // // export const AppProvider = ({ children }) => {
// // // // // // // //   const [data, setData] = useState({
// // // // // // // //     allDevices: '',
// // // // // // // //     totalDevices: '',
// // // // // // // //     totalTests: '',
// // // // // // // //     totalTestsToday: '',
// // // // // // // //     totalPatientsToday: '',
// // // // // // // //   });
// // // // // // // //   const [tableData, setTableData] = useState([]);
// // // // // // // //   const [filteredTable, setFilteredTable] = useState([]);
// // // // // // // //   const [showFilteredTable, setShowFilteredTable] = useState(false);

// // // // // // // //   const AllDevices = data.allDevices;

// // // // // // // //   return (
// // // // // // // //     <AppContext.Provider value={{ data, setData, tableData, setTableData, AllDevices,filteredTable,setFilteredTable,showFilteredTable,setShowFilteredTable }}>
// // // // // // // //       {children}
// // // // // // // //     </AppContext.Provider>
// // // // // // // //   );
// // // // // // // // };

import React, { createContext, useEffect, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [data, setData] = useState({
    allDevices: '',
    totalDevices: '',
    totalTests: '',
    totalTestsToday: '',
    totalPatientsToday: '',
  });
  const [tableData, setTableData] = useState([]);
  const [filteredTable, setFilteredTable] = useState([]);
  const [logDataTable, setLogDataTable] = useState([]);
  const [showFilteredTable, setShowFilteredTable] = useState(false);
  // const [standardTable, setStandardTable] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3011/queries");
        if (response.ok) {
          const jsonData = await response.json();
          console.log(jsonData);

          setData({
            allDevices: jsonData.allDevices,
            totalDevices: jsonData.totalDevices,
            totalTests: jsonData.totalTests,
            totalTestsToday: jsonData.totalTestsToday,
            totalPatientsToday: jsonData.totalPatientsToday,
          });

          setTableData(jsonData.recentTests);
        } else {
          console.log('Response not ok:', response.status);
        }
      } catch (error) {
        console.log('Error:', error.message);
      }
    };

    fetchData();
  }, [data.totalTests]);

  const AllDevices = data.allDevices;

  return (
    <AppContext.Provider value={{ data, setData, tableData, setTableData, AllDevices, filteredTable, setFilteredTable,
     showFilteredTable, setShowFilteredTable, logDataTable,setLogDataTable}}>
      {children}
    </AppContext.Provider>
  );
};

// // // // // // import React, { createContext, useEffect, useState } from 'react';

// // // // // // export const AppContext = createContext();

// // // // // // export const AppProvider = ({ children }) => {
// // // // // //   const [data, setData] = useState({
// // // // // //     allDevices: '',
// // // // // //     totalDevices: '',
// // // // // //     totalTests: '',
// // // // // //     totalTestsToday: '',
// // // // // //     totalPatientsToday: '',
// // // // // //   });
// // // // // //   const [tableData, setTableData] = useState([]);
// // // // // //   const [filteredTable, setFilteredTable] = useState([]);
// // // // // //   const [logDataTable, setLogDataTable] = useState([]);
// // // // // //   const [showFilteredTable, setShowFilteredTable] = useState(false);

// // // // // //   useEffect(() => {
// // // // // //     const cachedData = localStorage.getItem('appData');

// // // // // //     if (cachedData) {
// // // // // //       const jsonData = JSON.parse(cachedData);
// // // // // //       setData({
// // // // // //         allDevices: jsonData.allDevices,
// // // // // //         totalDevices: jsonData.totalDevices,
// // // // // //         totalTests: jsonData.totalTests,
// // // // // //         totalTestsToday: jsonData.totalTestsToday,
// // // // // //         totalPatientsToday: jsonData.totalPatientsToday,
// // // // // //       });
// // // // // //       setTableData(jsonData.recentTests);
// // // // // //     } else {
// // // // // //       fetchData();
// // // // // //     }
// // // // // //   }, []);

// // // // // //   const fetchData = async () => {
// // // // // //     try {
// // // // // //       const response = await fetch("http://localhost:3000/queries");
// // // // // //       if (response.ok) {
// // // // // //         const jsonData = await response.json();
// // // // // //         console.log(jsonData);

// // // // // //         setData({
// // // // // //           allDevices: jsonData.allDevices,
// // // // // //           totalDevices: jsonData.totalDevices,
// // // // // //           totalTests: jsonData.totalTests,
// // // // // //           totalTestsToday: jsonData.totalTestsToday,
// // // // // //           totalPatientsToday: jsonData.totalPatientsToday,
// // // // // //         });

// // // // // //         setTableData(jsonData.recentTests);

// // // // // //         // Store the fetched data in local storage for future use
// // // // // //         localStorage.setItem('appData', JSON.stringify(jsonData));
// // // // // //       } else {
// // // // // //         console.log('Response not ok:', response.status);
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.log('Error:', error.message);
// // // // // //     }
// // // // // //   };

// // // // // //   const AllDevices = data.allDevices;

// // // // // //   return (
// // // // // //     <AppContext.Provider value={{ data, setData, tableData, setTableData, AllDevices, filteredTable, setFilteredTable, showFilteredTable, setShowFilteredTable }}>
// // // // // //       {children}
// // // // // //     </AppContext.Provider>
// // // // // //   );
// // // // // // };

// // // // // import React, { createContext, useEffect, useState } from 'react';

// // // // // export const AppContext = createContext();

// // // // // export const AppProvider = ({ children }) => {
// // // // //   const [data, setData] = useState({
// // // // //     allDevices: '',
// // // // //     totalDevices: '',
// // // // //     totalTests: '',
// // // // //     totalTestsToday: '',
// // // // //     totalPatientsToday: '',
// // // // //   });
// // // // //   const [tableData, setTableData] = useState([]);
// // // // //   const [filteredTable, setFilteredTable] = useState([]);
// // // // //   const [logDataTable, setLogDataTable] = useState([]);
// // // // //   const [showFilteredTable, setShowFilteredTable] = useState(false);
// // // // //   const [dataFetched, setDataFetched] = useState(false); // Flag variable to track data fetch status

// // // // //   useEffect(() => {
// // // // //     if (!dataFetched) {
// // // // //       fetchData();
// // // // //     }
// // // // //   }, [dataFetched]);

// // // // //   const fetchData = async () => {
// // // // //     try {
// // // // //       const response = await fetch("http://localhost:3000/queries");
// // // // //       if (response.ok) {
// // // // //         const jsonData = await response.json();
// // // // //         console.log(jsonData);

// // // // //         setData({
// // // // //           allDevices: jsonData.allDevices,
// // // // //           totalDevices: jsonData.totalDevices,
// // // // //           totalTests: jsonData.totalTests,
// // // // //           totalTestsToday: jsonData.totalTestsToday,
// // // // //           totalPatientsToday: jsonData.totalPatientsToday,
// // // // //         });

// // // // //         setTableData(jsonData.recentTests);

// // // // //         // Set dataFetched flag to true once data is fetched
// // // // //         setDataFetched(true);
// // // // //       } else {
// // // // //         console.log('Response not ok:', response.status);
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.log('Error:', error.message);
// // // // //     }
// // // // //   };

// // // // //   const AllDevices = data.allDevices;

// // // // //   return (
// // // // //     <AppContext.Provider value={{ data, setData, tableData, setTableData, AllDevices, filteredTable, setFilteredTable, showFilteredTable, setShowFilteredTable }}>
// // // // //       {children}
// // // // //     </AppContext.Provider>
// // // // //   );
// // // // // };

// // // // import React, { createContext, useEffect, useState } from 'react';

// // // // export const AppContext = createContext();

// // // // export const AppProvider = ({ children }) => {
// // // //   const [data, setData] = useState({
// // // //     allDevices: '',
// // // //     totalDevices: '',
// // // //     totalTests: '',
// // // //     totalTestsToday: '',
// // // //     totalPatientsToday: '',
// // // //   });
// // // //   const [tableData, setTableData] = useState([]);
// // // //   const [filteredTable, setFilteredTable] = useState([]);
// // // //   const [logDataTable, setLogDataTable] = useState([]);
// // // //   const [showFilteredTable, setShowFilteredTable] = useState(false);
// // // //   const [dataFetched, setDataFetched] = useState(false); // Flag variable to track data fetch status

// // // //   useEffect(() => {
// // // //     const cachedData = localStorage.getItem('appData');

// // // //     if (cachedData) {
// // // //       const jsonData = JSON.parse(cachedData);
// // // //       setData({
// // // //         allDevices: jsonData.allDevices,
// // // //         totalDevices: jsonData.totalDevices,
// // // //         totalTests: jsonData.totalTests,
// // // //         totalTestsToday: jsonData.totalTestsToday,
// // // //         totalPatientsToday: jsonData.totalPatientsToday,
// // // //       });
// // // //       setTableData(jsonData.recentTests);
// // // //       setDataFetched(true);
// // // //     } else {
// // // //       if (!dataFetched) {
// // // //         fetchData();
// // // //       }
// // // //     }
// // // //   }, [dataFetched]);

// // // //   const fetchData = async () => {
// // // //     try {
// // // //       const response = await fetch("http://localhost:3000/queries");
// // // //       if (response.ok) {
// // // //         const jsonData = await response.json();
// // // //         console.log(jsonData);

// // // //         setData({
// // // //           allDevices: jsonData.allDevices,
// // // //           totalDevices: jsonData.totalDevices,
// // // //           totalTests: jsonData.totalTests,
// // // //           totalTestsToday: jsonData.totalTestsToday,
// // // //           totalPatientsToday: jsonData.totalPatientsToday,
// // // //         });

// // // //         setTableData(jsonData.recentTests);

// // // //         // Set dataFetched flag to true once data is fetched
// // // //         setDataFetched(true);

// // // //         // Store the fetched data in local storage for future use
// // // //         localStorage.setItem('appData', JSON.stringify(jsonData));
// // // //       } else {
// // // //         console.log('Response not ok:', response.status);
// // // //       }
// // // //     } catch (error) {
// // // //       console.log('Error:', error.message);
// // // //     }
// // // //   };

// // // //   const AllDevices = data.allDevices;

// // // //   return (
// // // //     <AppContext.Provider value={{ data, setData, tableData, setTableData, AllDevices, filteredTable, setFilteredTable, showFilteredTable, setShowFilteredTable }}>
// // // //       {children}
// // // //     </AppContext.Provider>
// // // //   );
// // // // };


// // // import React, { createContext, useEffect, useState } from 'react';

// // // export const AppContext = createContext();

// // // export const AppProvider = ({ children }) => {
// // //   const [data, setData] = useState({
// // //     allDevices: '',
// // //     totalDevices: '',
// // //     totalTests: '',
// // //     totalTestsToday: '',
// // //     totalPatientsToday: '',
// // //   });
// // //   const [tableData, setTableData] = useState([]);
// // //   const [filteredTable, setFilteredTable] = useState([]);
// // //   const [logDataTable, setLogDataTable] = useState([]);
// // //   const [showFilteredTable, setShowFilteredTable] = useState(false);

// // //   useEffect(() => {
// // //     let isMounted = true; // Flag to track component mount status

// // //     const fetchData = async () => {
// // //       try {
// // //         const response = await fetch("http://localhost:3000/queries");
// // //         if (response.ok && isMounted) {
// // //           const jsonData = await response.json();
// // //           console.log(jsonData);

// // //           setData({
// // //             allDevices: jsonData.allDevices,
// // //             totalDevices: jsonData.totalDevices,
// // //             totalTests: jsonData.totalTests,
// // //             totalTestsToday: jsonData.totalTestsToday,
// // //             totalPatientsToday: jsonData.totalPatientsToday,
// // //           });

// // //           setTableData(jsonData.recentTests);
// // //         } else {
// // //           console.log('Response not ok:', response.status);
// // //         }
// // //       } catch (error) {
// // //         console.log('Error:', error.message);
// // //       }
// // //     };

// // //     fetchData();

// // //     return () => {
// // //       isMounted = false; // Cleanup function to update the isMounted flag on unmount
// // //     };
// // //   }, []);

// // //   const AllDevices = data.allDevices;

// // //   return (
// // //     <AppContext.Provider value={{ data, setData, tableData, setTableData, AllDevices, filteredTable, setFilteredTable, showFilteredTable, setShowFilteredTable }}>
// // //       {children}
// // //     </AppContext.Provider>
// // //   );
// // // };


// // import React, { createContext, useEffect, useState } from 'react';
// // import Cookies from 'js-cookie';

// // export const AppContext = createContext();

// // export const AppProvider = ({ children }) => {
// //   const [data, setData] = useState({
// //     allDevices: '',
// //     totalDevices: '',
// //     totalTests: '',
// //     totalTestsToday: '',
// //     totalPatientsToday: '',
// //   });
// //   const [tableData, setTableData] = useState([]);
// //   const [filteredTable, setFilteredTable] = useState([]);
// //   const [logDataTable, setLogDataTable] = useState([]);
// //   const [showFilteredTable, setShowFilteredTable] = useState(false);
// //   const [dataFetched, setDataFetched] = useState(false); // Flag variable to track data fetch status

// //   useEffect(() => {
// //     const cachedData = Cookies.get('appData');

// //     if (cachedData) {
// //       const decryptedData = decryptData(cachedData);
// //       const jsonData = JSON.parse(decryptedData);
// //       setData({
// //         allDevices: jsonData.allDevices,
// //         totalDevices: jsonData.totalDevices,
// //         totalTests: jsonData.totalTests,
// //         totalTestsToday: jsonData.totalTestsToday,
// //         totalPatientsToday: jsonData.totalPatientsToday,
// //       });
// //       setTableData(jsonData.recentTests);
// //       setDataFetched(true);
// //     } else {
// //       if (!dataFetched) {
// //         fetchData();
// //       }
// //     }
// //   }, [dataFetched]);

// //   const fetchData = async () => {
// //     try {
// //       const response = await fetch("http://localhost:3000/queries");
// //       if (response.ok) {
// //         const jsonData = await response.json();
// //         console.log(jsonData);

// //         setData({
// //           allDevices: jsonData.allDevices,
// //           totalDevices: jsonData.totalDevices,
// //           totalTests: jsonData.totalTests,
// //           totalTestsToday: jsonData.totalTestsToday,
// //           totalPatientsToday: jsonData.totalPatientsToday,
// //         });

// //         setTableData(jsonData.recentTests);

// //         // Set dataFetched flag to true once data is fetched
// //         setDataFetched(true);

// //         // Store the fetched data in an encrypted cookie for future use
// //         const encryptedData = encryptData(JSON.stringify(jsonData));
// //         Cookies.set('appData', encryptedData, { expires: 1 }); // Expires in 1 day
// //       } else {
// //         console.log('Response not ok:', response.status);
// //       }
// //     } catch (error) {
// //       console.log('Error:', error.message);
// //     }
// //   };

// //   const encryptData = (data) => {
// //     // Implement your encryption logic here
// //     // Return the encrypted data
// //   };

// //   const decryptData = (encryptedData) => {
// //     // Implement your decryption logic here
// //     // Return the decrypted data
// //   };

// //   const AllDevices = data.allDevices;

// //   return (
// //     <AppContext.Provider value={{ data, setData, tableData, setTableData, AllDevices, filteredTable, setFilteredTable, showFilteredTable, setShowFilteredTable }}>
// //       {children}
// //     </AppContext.Provider>
// //   );
// // };



// import React, { createContext, useEffect, useState } from 'react';
// import Cookies from 'js-cookie';

// export const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const [data, setData] = useState({
//     allDevices: '',
//     totalDevices: '',
//     totalTests: '',
//     totalTestsToday: '',
//     totalPatientsToday: '',
//   });
//   const [tableData, setTableData] = useState([]);
//   const [filteredTable, setFilteredTable] = useState([]);
//   const [logDataTable, setLogDataTable] = useState([]);
//   const [showFilteredTable, setShowFilteredTable] = useState(false);
//   const [dataFetched, setDataFetched] = useState(false); // Flag variable to track data fetch status

//   useEffect(() => {
//     const cachedData = Cookies.get('appData');

//     if (cachedData) {
//       const decryptedData = decryptData(cachedData);
//       const jsonData = JSON.parse(decryptedData);
//       setData({
//         allDevices: jsonData.allDevices,
//         totalDevices: jsonData.totalDevices,
//         totalTests: jsonData.totalTests,
//         totalTestsToday: jsonData.totalTestsToday,
//         totalPatientsToday: jsonData.totalPatientsToday,
//       });
//       setTableData(jsonData.recentTests);
//       setDataFetched(true);
//     } else {
//       if (!dataFetched) {
//         fetchData();
//       }
//     }
//   }, [dataFetched]);

//   const fetchData = async () => {
//     try {
//       const response = await fetch("http://localhost:3000/queries");
//       if (response.ok) {
//         const jsonData = await response.json();
//         console.log(jsonData);

//         setData({
//           allDevices: jsonData.allDevices,
//           totalDevices: jsonData.totalDevices,
//           totalTests: jsonData.totalTests,
//           totalTestsToday: jsonData.totalTestsToday,
//           totalPatientsToday: jsonData.totalPatientsToday,
//         });

//         setTableData(jsonData.recentTests);

//         // Set dataFetched flag to true once data is fetched
//         setDataFetched(true);

//         // Store the fetched data in an encrypted cookie for future use
//         const encryptedData = encryptData(JSON.stringify(jsonData));
//         Cookies.set('appData', encryptedData, { expires: 1 }); // Expires in 1 day
//       } else {
//         console.log('Response not ok:', response.status);
//       }
//     } catch (error) {
//       console.log('Error:', error.message);
//     }
//   };

//   const encryptData = (data) => {
//     // Implement your encryption logic here
//     // Return the encrypted data
//   };

//   const decryptData = (encryptedData) => {
//     // Implement your decryption logic here
//     // Return the decrypted data
//   };

//   const AllDevices = data.allDevices;

//   return (
//     <AppContext.Provider value={{ data, setData, tableData, setTableData, AllDevices, filteredTable, setFilteredTable, showFilteredTable, setShowFilteredTable }}>
//       {children}
//     </AppContext.Provider>
//   );
// };


// import React, { createContext, useEffect, useState } from 'react';

// export const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const [data, setData] = useState({
//     allDevices: '',
//     totalDevices: '',
//     totalTests: '',
//     totalTestsToday: '',
//     totalPatientsToday: '',
//   });
//   const [tableData, setTableData] = useState([]);
//   const [filteredTable, setFilteredTable] = useState([]);
//   const [logDataTable, setLogDataTable] = useState([]);
//   const [showFilteredTable, setShowFilteredTable] = useState(false);
//   const [dataFetched, setDataFetched] = useState(false); // Flag variable to track data fetch status

//   useEffect(() => {
//     const cachedData = localStorage.getItem('appData');

//     if (cachedData) {
//       const jsonData = JSON.parse(cachedData);
//       setData({
//         allDevices: jsonData.allDevices,
//         totalDevices: jsonData.totalDevices,
//         totalTests: jsonData.totalTests,
//         totalTestsToday: jsonData.totalTestsToday,
//         totalPatientsToday: jsonData.totalPatientsToday,
//       });
//       setTableData(jsonData.recentTests);
//       setDataFetched(true);
//     } else {
//       if (!dataFetched) {
//         fetchData();
//       }
//     }
//   }, [dataFetched]);

//   const fetchData = async () => {
//     try {
//       const response = await fetch("http://localhost:3000/queries");
//       if (response.ok) {
//         const jsonData = await response.json();
//         console.log(jsonData);

//         setData({
//           allDevices: jsonData.allDevices,
//           totalDevices: jsonData.totalDevices,
//           totalTests: jsonData.totalTests,
//           totalTestsToday: jsonData.totalTestsToday,
//           totalPatientsToday: jsonData.totalPatientsToday,
//         });

//         setTableData(jsonData.recentTests);

//         // Set dataFetched flag to true once data is fetched
//         setDataFetched(true);

//         // Store the fetched data in local storage for future use
//         localStorage.setItem('appData', JSON.stringify(jsonData));
//       } else {
//         console.log('Response not ok:', response.status);
//       }
//     } catch (error) {
//       console.log('Error:', error.message);
//     }
//   };

//   const AllDevices = data.allDevices;

//   return (
//     <AppContext.Provider value={{ data, setData, tableData, setTableData, AllDevices, filteredTable, setFilteredTable, showFilteredTable, setShowFilteredTable }}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// import React, { createContext, useEffect, useState } from 'react';
// import { AES, enc } from 'crypto-js';

// export const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const [data, setData] = useState({
//     allDevices: '',
//     totalDevices: '',
//     totalTests: '',
//     totalTestsToday: '',
//     totalPatientsToday: '',
//   });
//   const [tableData, setTableData] = useState([]);
//   const [filteredTable, setFilteredTable] = useState([]);
//   const [logDataTable, setLogDataTable] = useState([]);
//   const [showFilteredTable, setShowFilteredTable] = useState(false);
//   const [dataFetched, setDataFetched] = useState(false); // Flag variable to track data fetch status

//   // Define a secret key to use for encryption and decryption
//   const secretKey = 'secret-key';

//   useEffect(() => {
//     const cachedData = localStorage.getItem('appData');

//     if (cachedData) {
//       // Decrypt the data from localStorage using the secretKey
//       const decryptedData = AES.decrypt(cachedData, secretKey).toString(enc.Utf8);
//       const jsonData = JSON.parse(decryptedData);
//       setData({
//         allDevices: jsonData.allDevices,
//         totalDevices: jsonData.totalDevices,
//         totalTests: jsonData.totalTests,
//         totalTestsToday: jsonData.totalTestsToday,
//         totalPatientsToday: jsonData.totalPatientsToday,
//       });
//       setTableData(jsonData.recentTests);
//       setDataFetched(true);
//     } else {
//       if (!dataFetched) {
//         fetchData();
//       }
//     }
//   }, [data]);

//   const fetchData = async () => {
//     try {
//       const response = await fetch('http://localhost:3000/queries');
//       if (response.ok) {
//         const jsonData = await response.json();
//         console.log(jsonData);

//         setData({
//           allDevices: jsonData.allDevices,
//           totalDevices: jsonData.totalDevices,
//           totalTests: jsonData.totalTests,
//           totalTestsToday: jsonData.totalTestsToday,
//           totalPatientsToday: jsonData.totalPatientsToday,
//         });

//         setTableData(jsonData.recentTests);

//         // Set dataFetched flag to true once data is fetched
//         setDataFetched(true);

//         // Encrypt the data before storing it in localStorage using the secretKey
//         const encryptedData = AES.encrypt(JSON.stringify(jsonData), secretKey).toString();

//         // Store the encrypted data in local storage for future use
//         localStorage.setItem('appData', encryptedData);
//       } else {
//         console.log('Response not ok:', response.status);
//       }
//     } catch (error) {
//       console.log('Error:', error.message);
//     }
//   };

//   const AllDevices = data.allDevices;

//   return (
//     <AppContext.Provider
//       value={{
//         data,
//         setData,
//         tableData,
//         setTableData,
//         AllDevices,
//         filteredTable,
//         setFilteredTable,
//         showFilteredTable,
//         setShowFilteredTable,
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };
