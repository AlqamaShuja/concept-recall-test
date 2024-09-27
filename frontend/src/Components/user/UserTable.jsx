import { Table, Avatar, Button } from 'antd';

const columns = [
  { title: 'Username', dataIndex: 'username', key: 'username' },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  { title: 'Avatar', dataIndex: 'avatar', key: 'avatar', render: (text) => <Avatar src={text} /> },
  { title: 'Action', key: 'action', render: (_, record) => <Button href={`/user/${record.id}`}>View</Button> },
];

const data = [
  { id: 1, username: 'JohnDoe', email: 'john@example.com', avatar: 'https://example.com/avatar1.png' },
];

const UserTable = () => {
    return(
        <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} />
    )
}


export default UserTable;