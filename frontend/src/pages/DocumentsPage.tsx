import Button from 'antd/lib/button';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DocumentList from '../components/DocumentList';
import { Modal } from 'antd';
import DocumentForm from '../components/DocumentForm';
import { DocumentService, Document } from '../services/DocumentService';

const DocumentsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [documents, setDocuments] = useState<Document[]>([]);
        const [search, setSearch] = useState("");
        const navigate = useNavigate();
    
        useEffect(() => {
            async function fetchDocuments() {
                try {
                    const data = await DocumentService.getDocuments(search);
    
                    if (Array.isArray(data)) {
                        setDocuments(data);
                    } else {
                        console.warn("Unexpected response:", data);
                    }
                } catch (err) {
                    console.error("Failed to fetch documents", err);
                    navigate("/login");
                }
            }
            fetchDocuments();
        }, [search]);

    return (
        <div style={{ padding: '2rem' }}>
            <DocumentList documents={documents} />
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
  