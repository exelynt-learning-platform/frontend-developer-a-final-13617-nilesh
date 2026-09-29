import { Route, Routes } from 'react-router-dom';
import AppLayout from '@src/layout/AppLayout.jsx';
import { EmployeeManagement } from '@src/pages/EmployeeManagement';
import NotFound from '@src/pages/OtherPage/NotFound';
import { OfflineScreen } from '@src/components/common/OfflineScreen.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <OfflineScreen />

      <Routes>
        <Route element={<AppLayout />}>
          <Route index path="/" element={<EmployeeManagement />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer
        position="top-left"
        autoClose={3000}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
    </>
  );
};

export default App;
