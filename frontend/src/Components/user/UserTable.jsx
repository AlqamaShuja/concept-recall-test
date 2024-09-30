// src/components/UserTable.jsx
import React, { useEffect } from 'react';
import { Table, Avatar, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, setPage } from '../../slice/userSlice';
import Loader from '../Loader/loader';
import { useNavigate } from 'react-router-dom';

const UserTable = ({ user=[], href=null, }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, currentPage, totalPages, loading } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers({ page: currentPage, limit: 10 }));
  }, [dispatch, currentPage]);

  const handleTableChange = (pagination) => {
    dispatch(setPage(pagination.current));
  };

  const columns = [
    { title: 'Username', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Avatar', dataIndex: 'avatar', key: 'avatar', render: (text) => <Avatar src={text} /> },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button
          onClick={() => navigate(href ?? `/user/${record.id}`, { state: { userRecord: record } })}
        >
          View {href ? "Posts": ""}
        </Button>
      ),
    },
  ];

  if (loading) {
    return <Loader />;
  }

  return (
    <Table
      columns={columns}
      dataSource={user.length > 0 ? user.map((user) => ({ ...user, key: user.id })) : users.map((user) => ({ ...user, key: user.id }))}
      pagination={user.length > 0 ? null: {
        current: currentPage,
        total: totalPages * 10,
        pageSize: 10,
        showSizeChanger: false
      }}
      onChange={handleTableChange}
    />
  );
};

export default UserTable;
