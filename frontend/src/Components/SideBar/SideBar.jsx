// components/Sidebar.js
import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, AlignLeftOutlined, PicRightOutlined, BranchesOutlined, CalendarOutlined, } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { DASHBOARD_PATH } from '../../routes/route_constant';

const { Sider } = Layout;

// const ROUTE_KEY = {
//   [DASHBOARD_PATH]: '1',
//   // [MANAGE_ORDER_LIST_PATH]: '2',
//   // [MANAGE_BRANCH_LIST_PATH]: '3',
//   // [MANAGE_USER_LIST_PATH]: '4',
//   // [MANAGE_CATEGORY_LIST_PATH]: '5',
// }

const Sidebar = ({ collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState(DASHBOARD_PATH);

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
    switch(e.key){
        case DASHBOARD_PATH:
          navigate(DASHBOARD_PATH);
          break;
        default:
          navigate(DASHBOARD_PATH);
          break;
    }
  };

  useEffect(()=>{
    setSelectedKey(DASHBOARD_PATH);
  }, [])

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{
        background: 'linear-gradient(180deg, #FF6B38, #E3302E)', // Gradient background
        color: '#fff',
        minHeight: '100vh',
      }}
      className="custom-sidebar"
    >
      <div className="text-white p-4 text-center font-bold text-lg">
        {collapsed ? 'CR' : 'ConceptRecall'}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[DASHBOARD_PATH]}
        selectedKeys={[selectedKey]} // Set selected key
        onClick={handleMenuClick} // Handle click to change selected key
        style={{
          background: 'transparent',
        }}
      >
        <Menu.Item key={DASHBOARD_PATH} icon={<AlignLeftOutlined />}>
          Dashboard
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;


{/* <Menu.Item key="2" icon={<PicRightOutlined />}>
      Orders
    </Menu.Item>
    <Menu.Item key="3" icon={<BranchesOutlined />}>
      Manage Branch
    </Menu.Item>
    <Menu.Item key="4" icon={<UserOutlined />}>
      Users
    </Menu.Item>
    <Menu.Item key="5" icon={<CalendarOutlined />}>
      Category
    </Menu.Item> 
*/}


















// import { customerIcon } from '../../utils/icons';
// import Button from '../Button/Button';

// const SideBar = ({ isOpen, setIsOpen, }) => {
//   return (
//     <div className={`top-0 left-0 min-h-screen bg-mygreen ${isOpen ? "fixed block z-50 w-[90%]":"fixed hidden w-[340px]"} max-w-[400px] sm:block`}>
//         <div className="flex justify-end mr-4 mt-2 text-white font-bold cursor-pointer sm:hidden" onClick={() => setIsOpen(false)}>
//             X
//         </div>
//         <div className="mt-6 sm:mt-8 flex justify-center w-full mb-14">
//             {/* <img src={icon} className='object-fill' alt="" /> */}
//             <h2 className="text-4xl font-bold">SideBar</h2>
//         </div> 
//         <div className="flex justify-center w-full mb-3">
//             <Button onClick={()=>{console.log("Button 1 Clcked")}} className={`bg-gradient-to-bl hover:from-green-700 hover:to-green-950`}>
//                 <span className='ml-5 mr-8'>{customerIcon}</span>
//                 <span>Button 1</span>
//             </Button>
//         </div>
//         <div className="flex justify-center w-full mb-3">
//             <Button onClick={()=>{console.log("Button 2 Clcked")}} className={`bg-gradient-to-bl hover:from-green-700 hover:to-green-950`}>
//                 <span className='ml-5 mr-8'>{customerIcon}</span>
//                 <span>Button 2</span>
//             </Button>
//         </div>
//         <div className="flex justify-center w-full mb-3">
//             <Button onClick={()=>{console.log("Button 3 Clcked")}} className={`bg-gradient-to-bl hover:from-green-700 hover:to-green-950`}>
//                 <span className='ml-5 mr-8'>{customerIcon}</span>
//                 <span>Button 3</span>
//             </Button>
//         </div>
//     </div>
//   );
// }

// export default SideBar