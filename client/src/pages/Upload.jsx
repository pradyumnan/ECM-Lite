import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Upload.css";

function Upload() {

    const [documentName, setDocumentName] = useState("");
    const [category, setCategory] = useState("HR");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);

    const uploadDocument = async () => {

        if (
            !documentName.trim() ||
            !description.trim() ||
            !file
        ) {

            toast.error("Please fill all fields");

            return;
        }

        try {

            const formData = new FormData();

            formData.append("documentName", documentName);
            formData.append("category", category);
            formData.append("description", description);
            formData.append(
                "uploadedBy",
                JSON.parse(localStorage.getItem("user")).username
            );
            formData.append("file", file);

            await axios.post(
                "http://localhost:5000/api/documents/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            toast.success("Document uploaded successfully");

            setDocumentName("");
            setCategory("HR");
            setDescription("");
            setFile(null);

            document.getElementById("fileInput").value = "";

        }
        catch (error) {

            console.log(error);

            toast.error("Upload failed");

        }

    };

    return (

        <div className="upload-container">

            <h1 className="upload-title">
                Upload Document
            </h1>

            <div className="upload-form">

                <input
                    type="text"
                    placeholder="Document Name"
                    value={documentName}
                    onChange={(e) =>
                        setDocumentName(e.target.value)
                    }
                />

                <select
                    value={category}
                    onChange={(e) =>
                        setCategory(e.target.value)
                    }
                >
                    <option>HR</option>
                    <option>Finance</option>
                    <option>Legal</option>
                    <option>General</option>
                </select>

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) =>
                        setDescription(e.target.value)
                    }
                />

                <input
                    id="fileInput"
                    type="file"
                    onChange={(e) =>
                        setFile(e.target.files[0])
                    }
                />

                <button
                    onClick={uploadDocument}
                >
                    Upload Document
                </button>

            </div>

        </div>

    );

}

export default Upload;