import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DocumentService, Document } from "../services/DocumentService";

interface DocumentListProps {
    documents: Document[];
}

export default function DocumentList({ documents }: DocumentListProps) {
    
    return(
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Lista Dokumenata</h1>
            
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