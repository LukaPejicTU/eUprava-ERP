import Button from 'antd/lib/button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DocumentList from '../components/DocumentList';
import { Modal } from 'antd';
import DocumentForm from '../components/DocumentForm';

const DocumentsPage = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div style={{ padding: '2rem' }}>
            <DocumentList />
            <Button type="primary" onClick={() => setIsModalOpen(true)} style={{ marginBottom: '1rem' }}>
                Dodaj dokument
            </Button>
            <Modal
                title='Upload new document'
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}

            >
                <DocumentForm />
            </Modal>
        </div>
    );
};

export default DocumentsPage;
  