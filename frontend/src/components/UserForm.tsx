import { User, UserData, UserService } from "../services/UserService";
import Form from 'antd/lib/form';
import Input from "antd/lib/input";
import Select from 'antd/lib/select';
import { useEffect } from "react";
import notification from "antd/lib/notification";
import Button from "antd/lib/button";
import { Space } from "antd/lib";

const { TextArea } = Input;
const { Option } = Select;
 
export interface UserFormProps {
    initialValues: User | null,
    onSuccess: () => void,
    onCancel: () => void
}

const UserForm: React.FC<UserFormProps> = ({ initialValues, onSuccess, onCancel }) => {

    const [form] = Form.useForm();
    
    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
        } else {
            form.resetFields();
        }
    },
    [initialValues]);

    const onFinish = async (values: UserData) => {
        try{
            if (initialValues) {
                await UserService.updateUser(initialValues.id, values);
            } else {
                await UserService.createUser(values);
            }

            notification.success({message: 'User saved successfully!', description:''});
            onSuccess();

        } catch (error) {
            console.error("Failed to save user:", error);
            notification.error({ message: 'Error saving user', description:''});
        } 

        
        
    }

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
        >
            <Form.Item
                name="username"
                label="Username"
                rules={[{required: true, message: "Username je obavezan"}]}
            >
                <Input placeholder="Unesite Username" />
            </Form.Item> 
            <Form.Item
                name="email"
                label="Email"
                rules={[{required: true, message: "Email je obavezan"}]}
            >
                <Input placeholder="Unesite email" />
            </Form.Item>
            <Form.Item
                name="password"
                label="Lozinka"
                rules={[{required: true, message: "Lozinka je obavezna"}]}
            >
                <Input.Password placeholder="Unesite lozinku" />
            </Form.Item>
            <Form.Item
                name="first_name"
                label="Ime"
                rules={[{required: true, message: "Ime je obavezno"}]}
            >
                <Input placeholder="Unesite ime" />
            </Form.Item>
            <Form.Item
                name="last_name"
                label="Prezime"
                rules={[{required: true, message: "Prezime je obavezno"}]}
            >
                <Input placeholder="Unesite prezime" />
            </Form.Item>
            <Form.Item
                name="role"
                label="Pozicija"
                rules={[{required: true, message: "Pozicija je obavezna"}]}
            >
                <Select placeholder="Odaberite poziciju">
                    <Option value="admin">Admin</Option>
                    <Option value="manager">Menadžer</Option>
                    <Option value="worker">Radnik</Option>
                </Select>
            </Form.Item>
            <Form.Item>
                <Space>
                    <Button type="primary" htmlType="submit">Potvrdi</Button>
                    <Button onClick={onCancel}>Otkaži</Button>
                </Space>
            </Form.Item>
        </Form>
    )
}

export default UserForm;