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

    const fetchDocuments = async () => {
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
    };
    
    useEffect(() => {
        fetchDocuments();
    }, [search]);

    function handleUploadSuccess() {
        setIsModalOpen(false);
        fetchDocuments(); 
    }

    return (
        <div style={{ padding: '2rem' }}>
            <input
                type="text"
                placeholder="Pretraži dokumente..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border px-3 py-2 w-full mb-4 rounded"
            />
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
                <DocumentForm onUploadSuccess={handleUploadSuccess} />
            </Modal>
        </div>
    );
};

export default DocumentsPage;
  