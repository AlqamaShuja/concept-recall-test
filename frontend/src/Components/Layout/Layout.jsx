import React, { useState } from 'react';
import { Layout } from 'antd';
import Header from '../Header/Header'; 
import Sidebar from '../SideBar/SideBar';

const { Content } = Layout;

const MainLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ height: '100vh' }}>
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} />

      {/* Main Layout */}
      <Layout className="site-layout">
        {/* Header */}
        <Header collapsed={collapsed} toggleSidebar={toggleSidebar} />

        {/* Content */}
        <Content className="p-4 overflow-y-auto">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;















// import { useState } from "react"
// import SideBar from "../SideBar/SideBar";
// import Header from "../Header/Header";
// import Main from "../Main/Main";

// const Layout = ({ children }) => {
//     const [isOpen, setIsOpen] = useState(false);


//   return (
//     <div className="flex relative top-0 left-0 w-full min-h-screen">
//         <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
//         <div className={`flex flex-col flex-grow sm:absolute left-0 min-h-screen sm:left-[340px] w-[calc(100%-340px)] ${isOpen ? '':''}`}> 
//             <Header setIsOpen={setIsOpen} />
//             <Main>{children}</Main>
//         </div>
//     </div>
//   )
// }

// export default Layout