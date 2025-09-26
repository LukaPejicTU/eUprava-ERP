import { Table, Button } from "antd";
import { useState, useEffect } from "react";
import { UserService } from "../services/UserService";
import { User } from "../services/UserService";
import type { ColumnsType } from 'antd/es/table';

const UserManagementPage = () => {
    const [users, setUsers] = useState<User[]>([]);

    const columns: ColumnsType<User> = [
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
    ];

    useEffect(() => {
        const fetchData  = async () => {
            try {
                const data = await UserService.getAllUsers();
                if (data != null) {
                    setUsers(data); 
                }
            } catch (err) {
                console.error("Failed to fetch User data.")
            }
        };
        fetchData();
    }, []);

    return (

        <Table dataSource={users} columns={columns} rowKey="id" />
    )
}
export default UserManagementPage;