import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DocumentService, Document } from "../services/DocumentService";


export default function DocumentList() {
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

    return(
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Lista Dokumenata</h1>
            <input
                type="text"
                placeholder="Pretraži dokumente..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border px-3 py-2 w-full mb-4 rounded"
            />
            {documents.length == 0 ? (
                <div className="text-red-600">Nije pronađen nijedan dokument.</div>
            ) : (
                <ul className="space-y-3">
                    {documents.map((document) => (
                        <li key={document.id} className="p-4 border rounded shadow">
                            <a href={document.file} target="_blank" rel="noopener noreferrer">
                                <h2 className="text-xl text-blue-600 font-semibold">{document.title}</h2>
                            </a>
                            <p className="text-sm text-gray-600">Uploadovao: {document.uploaded_by_username}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}