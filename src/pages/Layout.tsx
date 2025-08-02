import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import BackToTopButton from '../components/ui/BackToTopButton';
import { Toaster } from 'react-hot-toast';

import Breadcrumb from '../components/layout/Breadcrumb';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-onyx text-light-gray font-sans">
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#1D1D1D',
            color: '#F5F5F5',
            border: '1px solid #FFD700',
          },
        }}
      />
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Breadcrumb />
        <Outlet />
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  );
};

export default Layout;