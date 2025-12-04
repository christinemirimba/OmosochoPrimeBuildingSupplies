import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import ChatBubble from './ChatBubble';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isAISupportPage = location.pathname === '/ai-support';

  // AI Support page has its own layout
  if (isAISupportPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
      <ChatBubble />
    </div>
  );
};

export default Layout;
