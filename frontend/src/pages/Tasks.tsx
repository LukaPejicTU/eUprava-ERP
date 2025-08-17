import React from 'react';
import Button from 'antd/lib/button';
import { useNavigate } from 'react-router-dom';

const TaskList = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Lista zadataka</h1>

      <Button type="primary" onClick={() => navigate('/tasks/create')} style={{ marginBottom: '1rem' }}>
        Dodaj zadatak
      </Button>

      {/* Ovdje ide tvoja lista zadataka */}
    </div>
  );
};

export default TaskList;
