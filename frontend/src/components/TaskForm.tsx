import React from 'react';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Select from 'antd/lib/select';
import notification from 'antd/lib/notification';
import { TaskService } from '../services/taskService';
import { UserService, User } from '../services/UserService';
import { useState, useEffect } from 'react';

const { TextArea } = Input;
const { Option } = Select;

export interface FormValues {
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  assigned_to: number;
}

const TaskForm: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  // Fetch users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userList = await UserService.getAllUsers();
        setUsers(userList);
      } catch (error) {
        console.error('Greška prilikom pribavljanja korisnika:', (error as any).response);
      }
    }
    fetchUsers();
  }, 
  []);

  const [form] = Form.useForm<FormValues>();

  const onFinish = async (values: FormValues) => {
    try {
      await TaskService.createTask(values);
      form.resetFields();
      notification.success({
        message: 'Uspješno ste kreirali zadatak!',
        description: 'Novi zadatak je uspješno kreiran.'
      });
      console.log('Zadatak uspješno dodan:', values);
    } catch (error) {
      console.error('Greška prilikom dodavanja zadatka:', (error as any).response);
      notification.error({
        message: 'Greška',
        description: 'Došlo je do greške prilikom dodavanja zadatka.'
      });
    }
  };

  return (
    <Form 
      form={form} 
      onFinish={onFinish} 
      layout="vertical"
    >
      <Form.Item 
        name="title" 
        label="Naslov" 
        rules={[{ required: true, message: 'Naslov je obavezan' }]}
      >
        <Input placeholder="Unesite naslov" />
      </Form.Item>

      <Form.Item 
        name="description" 
        label="Opis" 
        rules={[{ required: true, message: 'Opis je obavezan' }]}
      >
        <TextArea placeholder="Unesite opis" rows={4} />
      </Form.Item>

      <Form.Item 
        name="status" 
        label="Status" 
        rules={[{ required: true, message: 'Status je obavezan' }]}
      >
        <Select placeholder="Odaberite status">
          <Option value="pending">Na čekanju</Option>
          <Option value="in_progress">U toku</Option>
          <Option value="completed">Završeno</Option>
        </Select>
      </Form.Item>

      <Form.Item 
        name="assigned_to" 
        label="ID korisnika" 
        rules={[{ required: true, message: 'ID korisnika je obavezan' }]}
      >
        <Select placeholder="Odaberite korisnika">
          {users.map(user => (
            <Option key={user.id} value={user.id}>
              {user.first_name} {user.last_name} ({user.username})
            </Option>
          ))}
        </Select>

      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Dodaj zadatak
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;