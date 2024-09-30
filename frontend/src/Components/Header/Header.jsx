import React from 'react';
import { Button, Avatar, Badge, Dropdown, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BellOutlined,
  SearchOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { getAdmin, setClearAdminOrUserDataReducer } from '../../slices/authSlice';

const Header = ({ collapsed, toggleSidebar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const admin = useSelector(getAdmin);

  // const handleLogout = () => {
  //   dispatch(setClearAdminOrUserDataReducer())
  //   localStorage.clear();
  //   navigate('/login');
  // }

  // Menu items for the dropdown
  const menuItems = (
    <Menu>
      <Menu.Item
        key="profile"
        icon={<SettingOutlined style={{ fontSize: '16px' }} />}
        // onClick={() => navigate('/profile')} // Navigate to /profile
      >
        Profile
      </Menu.Item>
      <Menu.Item
        key="logout"
        icon={<LogoutOutlined style={{ fontSize: '16px' }} />}
        // onClick={handleLogout}
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="bg-white flex justify-between items-center px-4 py-3 shadow-md">
      <Button
        className="text-lg"
        type="text"
        onClick={toggleSidebar}
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      />

      <div className="flex items-center space-x-6">
        <Badge count={12}>
          <BellOutlined style={{ fontSize: '20px' }} />
        </Badge>
        <SettingOutlined style={{ fontSize: '20px' }} />

        {/* Dropdown for Avatar */}
        <Dropdown overlay={menuItems} trigger={['hover']}>
          <div className="flex items-center space-x-2 cursor-pointer">
            <Avatar icon={<UserOutlined />} />
            <span className="font-semibold">Test</span>
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
