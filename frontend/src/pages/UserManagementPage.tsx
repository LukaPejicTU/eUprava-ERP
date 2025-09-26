import { Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState, useEffect } from "react";
import { UserService } from "../services/UserService";
import { User } from "../services/UserService";

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
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">User Management</h1>
            <Table 
                dataSource={users} 
                columns={columns as any} 
                rowKey={(record) => record.id} 
            />
        </div>
    );
}
export default UserManagementPage;