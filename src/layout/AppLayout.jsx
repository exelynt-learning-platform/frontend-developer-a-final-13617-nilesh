import Header from '@src/layout/Header.jsx';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div className='min-h-screen w-full'>
        <div className="mx-auto w-full max-w-[1440px] p-5 border bg-[#f3f5fe]">
            <Header />

            <main className='mt-3'>
                <Outlet />
            </main>
        </div>
    </div>
  );
};

export default AppLayout;
