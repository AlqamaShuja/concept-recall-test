import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, AlignLeftOutlined, FormOutlined, } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { ALL_POST_PATH, DASHBOARD_PATH, USERLIST_PATH } from '../../routes/route_constant';

const { Sider } = Layout;

const ROUTE_KEY = {
  [DASHBOARD_PATH]: DASHBOARD_PATH,
  [USERLIST_PATH]: USERLIST_PATH,
  [ALL_POST_PATH]: ALL_POST_PATH,
}

const Sidebar = ({ collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState('');

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
    switch(e.key){
        case DASHBOARD_PATH:
          navigate(DASHBOARD_PATH);
          break;
        case USERLIST_PATH:
          navigate(USERLIST_PATH);
          break;
        case ALL_POST_PATH:
          navigate(ALL_POST_PATH);
          break;
        default:
          navigate(DASHBOARD_PATH);
          break;
    }
  };

  // console.log(selectedKey, "===selectedSidebar");
  useEffect(()=>{
    const selectedSidebar = ROUTE_KEY[location.pathname];
    if(selectedSidebar){
      setSelectedKey(selectedSidebar);
    }
  }, [])

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{
        background: 'linear-gradient(180deg, #FF6B38, #E3302E)',
        color: '#fff',
        minHeight: '100vh',
      }}
      className="custom-sidebar"
    >
      <div className="text-white p-4 text-center font-bold text-lg">
        {collapsed ? 'IT' : 'Interview Task'}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[DASHBOARD_PATH]}
        selectedKeys={[selectedKey]}
        onClick={handleMenuClick}
        style={{
          background: 'transparent',
        }}
      >
        <Menu.Item key={DASHBOARD_PATH} icon={<AlignLeftOutlined />}>
          Dashboard
        </Menu.Item>
        <Menu.Item key={USERLIST_PATH} icon={<UserOutlined />}>
          Users
        </Menu.Item>
        <Menu.Item key={ALL_POST_PATH} icon={<FormOutlined />}>
          Posts
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;