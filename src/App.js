// // import logo from './logo.svg';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import './App.css';
// // import Home from './pages/Home';
// import Home from './pages/Home2';
// import ClinicalValidation from './pages/ClinicalValidation';
// import Login from './pages/Login';
// import Misc from './pages/Misc';
// import LogData from './components/LogData';
// import Experiments from './components/Experiments';
// import CheckLog from './components/CheckLog';
// import RawData from './pages/RawData';
// import DeviceDiagnostics from './pages/DeviceDiagnostics';
// // import { AppProvider } from './pages/AppContext';
// import { AppProvider } from './pages/AppContext2';

// function App() {
//   return (
//     <div className="App">
//       <BrowserRouter>
//       <AppProvider>
//         <Routes>
//           <Route path="/">
//             {/* <Route index element={<Home />} /> */}
//             <Route index element={<Login />} />

//             <Route path="/home">
//               <Route index element={<Home />} />
//               <Route path="raw" element={<RawData />} />
//               <Route path="deviceDiagnostics" element={<DeviceDiagnostics />} />

//             </Route>
//             {/* <Route path="home" element={<Home />} /> */}
//             <Route path="clinicalValidation" element={<ClinicalValidation />} />
//             <Route path="logData" element={<LogData />} />
//             <Route path="experiments" element={<Experiments />} />
//             <Route path="checkLog" element={<CheckLog />} />
//           </Route>
//         </Routes>
//         </AppProvider>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;


// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import './App.css';
// import Home from './pages/Home2';
// import ClinicalValidation from './pages/ClinicalValidation';
// import Login from './pages/Login';
// import Misc from './pages/Misc';
// import LogData from './components/LogData';
// import Experiments from './components/Experiments';
// import CheckLog from './components/CheckLog';
// import RawData from './pages/RawData';
// import DeviceDiagnostics from './pages/DeviceDiagnostics';
// import { AppProvider } from './pages/AppContext2';

// function App() {
//   const isAuthenticated = localStorage.getItem('token'); // Check if user is authenticated

//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Routes>
//           <Route path="/">
//             <Route index element={<Login />} />

//             {isAuthenticated && ( // Only render the AppProvider and its children if authenticated
//               <AppProvider>
//                 <Route path="/home">
//                   <Route index element={<Home />} />
//                   <Route path="raw" element={<RawData />} />
//                   <Route path="deviceDiagnostics" element={<DeviceDiagnostics />} />
//                 </Route>
//                 <Route path="clinicalValidation" element={<ClinicalValidation />} />
//                 <Route path="logData" element={<LogData />} />
//                 <Route path="experiments" element={<Experiments />} />
//                 <Route path="checkLog" element={<CheckLog />} />
//               </AppProvider>
//             )}
//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import ClinicalValidation from './pages/ClinicalValidation';
import Login from './pages/Login';
import Misc from './pages/Misc';
import LogData from './pages/LogData';
import Experiments from './pages/Experiments';
import CheckLog from './pages/CheckLog';
import RawData from './pages/RawData';
import DeviceDiagnostics from './pages/DeviceDiagnostics';
import { AppProvider } from './components/AppContext';

function App() {
  const isAuthenticated = localStorage.getItem('token'); // Check if user is authenticated

  return (
    <div className="App">
      <BrowserRouter>
        <AppProvider> {/* Move the AppProvider here */}
          <Routes>
            <Route path="/">
              <Route index element={<Login />} />

              {/* {isAuthenticated && ( */}
                <>
                  <Route path="/home">
                    <Route index element={<Home />} />
                    <Route path="raw" element={<RawData />} />
                    <Route path="deviceDiagnostics" element={<DeviceDiagnostics />} />
                  </Route>
                  <Route path="clinicalValidation" element={<ClinicalValidation />} />
                  <Route path="logData" element={<LogData />} />
                  <Route path="experiments" element={<Experiments />} />
                  <Route path="checkLog" element={<CheckLog />} />
                </>
              {/* )} */}
            </Route>
          </Routes>
        </AppProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;


