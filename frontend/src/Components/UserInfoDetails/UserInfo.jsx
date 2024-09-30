import React from 'react';
import { Avatar, Card } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const UserInfo = ({ userDetails }) => {
  const navigate = useNavigate();
  const cardTitle = <div><ArrowLeftOutlined onClick={()=>navigate(-1)} className='mr-2' />User Information</div>
  return (
    <Card title={cardTitle} className="mb-4">
      <div className="user-basic-info flex items-center">
        <Avatar src={userDetails.avatar} size={100} className="mr-4" />
        <div>
          <h3 className='text-lg'>{userDetails.name}</h3>
          <p className='text-base'>{userDetails.email}</p>
        </div>
      </div>
    </Card>
  );
};

export default UserInfo;
