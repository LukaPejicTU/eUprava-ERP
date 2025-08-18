import React from 'react';
import Button from 'antd/lib/button';
import { useNavigate } from 'react-router-dom';
import TaskList from '../TaskList';

const TasksPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem' }}>

      

      <TaskList />
      <Button type="primary" onClick={() => navigate('/tasks/create')} style={{ marginBottom: '1rem' }}>
        Dodaj zadatak
      </Button>
    </div>
  );
};

export default TasksPage;
