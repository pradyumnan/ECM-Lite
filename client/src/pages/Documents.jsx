import { useEffect, useState } from "react";
import axios from "axios";
import "./Documents.css";
import { toast } from "react-toastify";

function Documents() {

    const [documents, setDocuments] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadDocuments();
    }, []);

    const loadDocuments = async () => {

        try {

            const response = await axios.get(
                "http://localhost:5000/api/documents"
            );

            setDocuments(response.data);

        }
        catch (error) {

            console.log(error);

        }

    };

    const downloadDocument = (id) => {

        window.open(
            `http://localhost:5000/api/documents/download/${id}`,
            "_blank"
        );

    };

    const deleteDocument = async (id) => {

        if (!window.confirm("Delete this document?")) {
            return;
        }

        try {

            await axios.delete(
                `http://localhost:5000/api/documents/${id}`
            );

            toast.success("Document deleted successfully");

            loadDocuments();

        }
        catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Unable to delete document"
            );

        }

    };

    return (

        <div className="documents-container">

            <h1 className="documents-title">
                Documents
            </h1>

            <input
                type="text"
                placeholder="Search Document..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-box"
            />

            <table className="documents-table">

                <thead>

                    <tr>

                        <th>ID</th>
                        <th>Name</th>
                        <th>Original File</th>
                        <th>Category</th>
                        <th>Uploaded By</th>
                        <th>Uploaded On</th>
                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        documents
                            .filter(doc =>
                                doc.document_name
                                    .toLowerCase()
                                    .includes(search.toLowerCase())
                            )
                            .map(doc => (

                                <tr key={doc.id}>

                                    <td>{doc.id}</td>

                                    <td>{doc.document_name}</td>

                                    <td className="filename">
                                        {doc.original_file_name}
                                    </td>

                                    <td>{doc.category}</td>

                                    <td>{doc.uploaded_by}</td>

                                    <td>
                                        {new Date(doc.uploaded_at).toLocaleDateString()}
                                    </td>

                                    <td>

                                        <div className="action-buttons">

                                            <button
                                                className="download-btn"
                                                onClick={() => downloadDocument(doc.id)}
                                            >
                                                Download
                                            </button>

                                            <button
                                                className="delete-btn"
                                                onClick={() => deleteDocument(doc.id)}
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))
                    }

                </tbody>

            </table>

        </div>

    );

}

export default Documents;