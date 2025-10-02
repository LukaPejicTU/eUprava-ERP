import { notification, Table } from 'antd';
import Button from 'antd/es/button';
import type { ColumnsType } from 'antd/es/table';
import { useState, useEffect } from "react";
import { UserService } from "../services/UserService";
import { User } from "../services/UserService";
import Modal from 'antd/lib/modal/Modal';
import UserForm from '../components/UserForm';

const UserManagementPage = () => {
    const [users, setUsers] = useState<User[]>([]);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);

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
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <span>
                    <Button onClick={() => showEditModal(record)}>
                        Izmjeni
                    </Button>
                    <Button danger onClick={() => handleDelete(record)} style={{ marginLeft: 8 }}>
                        Obriši
                    </Button>
                </span>
            )
        },
    ];

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

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (userToDelete: User) => {
        if (window.confirm(`Da li sigurno želite obrisati ${userToDelete.username}?`)) {
            try {
                await UserService.deleteUser(userToDelete.id);

                notification.success({ message: 'User deleted', description:'' });
                fetchData();
            } catch (error) {
                notification.error({ message: 'Failed to delete user', description: '' });
                console.error("Delete error:", error);
            }
        }
    };

    const showAddModal = () => {
        setEditingUser(null);
        setIsModalVisible(true);
    };

    const showEditModal = (user: User) => {
        setEditingUser(user);
        setIsModalVisible(true);
    };

    const onCancel = () => {
        setIsModalVisible(false);
    };

    const handleSuccess = () => {
        setIsModalVisible(false);
        fetchData();  
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">User Management</h1>
            <Button onClick={showAddModal}>Dodaj korisnika</Button>
            <Table 
                dataSource={users} 
                columns={columns as any} 
                rowKey={(record) => record.id} 
            />
            <Modal 
                open={isModalVisible}
                onCancel={onCancel}
                title={editingUser ? 'Edit User' : 'Add New User'}
                footer={null}
            >
                <UserForm
                    initialValues={editingUser}
                    onSuccess={handleSuccess}
                    onCancel={onCancel}
                />
            </Modal>
        </div>
    );
}
export default UserManagementPage;