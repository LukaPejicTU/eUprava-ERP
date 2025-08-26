import React from 'react';
import Button from 'antd/lib/button';
import { useNavigate } from 'react-router-dom';
import TaskList from '../components/TaskList';
import { useUser } from '../context/UserContext';

const TasksPage = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <div>Učitavanje korisničkih informacija...</div>;
  }

  return (
    <div style={{ padding: '2rem' }}>



      <TaskList />
      {user && (user.role === 'admin' || user.role === 'manager') && (
      <Button type="primary" onClick={() => navigate('/tasks/create')} style={{ marginBottom: '1rem' }}>
        Dodaj zadatak
      </Button>
      )}
    </div>
  );
};

export default TasksPage;
