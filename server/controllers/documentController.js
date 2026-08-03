
const pool = require("../db/db");
const fs = require("fs");
const path = require("path");

const uploadDocument = async (req, res) => {

    try {

        const {
            documentName,
            category,
            description,
            uploadedBy
        } = req.body;

        const storedFileName = req.file.filename;
        const originalFileName = req.file.originalname;

        await pool.query(

            `INSERT INTO documents
            (
                document_name,
                original_file_name,
                stored_file_name,
                category,
                description,
                uploaded_by
            )
            VALUES($1,$2,$3,$4,$5,$6)`,

            [
                documentName,
                originalFileName,
                storedFileName,
                category,
                description,
                uploadedBy
            ]

        );

        res.json({
            message: "Document Uploaded Successfully"
        });

    }
    catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

const getDocuments = async (req, res) => {

    try {

        const result = await pool.query(
            `SELECT
                id,
                document_name,
                original_file_name,
                stored_file_name,
                category,
                description,
                uploaded_by,
                uploaded_at
             FROM documents
             ORDER BY id DESC`
        );

        res.json(result.rows);

    }
    catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

const downloadDocument = async (req, res) => {

    try {

        const { id } = req.params;

        const result = await pool.query(
            `SELECT original_file_name,
                    stored_file_name
             FROM documents
             WHERE id = $1`,
            [id]
        );

        if (result.rows.length === 0) {

            return res.status(404).json({
                message: "Document not found"
            });

        }

        const document = result.rows[0];

        const path = require("path");

        const filePath = path.join(
            __dirname,
            "..",
            "uploads",
            document.stored_file_name
        );

        res.download(
            filePath,
            document.original_file_name
        );

    }
    catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

const deleteDocument = async (req, res) => {

    try {

        const { id } = req.params;

        const result = await pool.query(
            `SELECT stored_file_name
             FROM documents
             WHERE id=$1`,
            [id]
        );

        if (result.rows.length === 0) {

            return res.status(404).json({
                message: "Document not found"
            });

        }

        const filePath = path.join(
            __dirname,
            "..",
            "uploads",
            result.rows[0].stored_file_name
        );

        if (fs.existsSync(filePath)) {

            fs.unlinkSync(filePath);

        }

        await pool.query(
            "DELETE FROM documents WHERE id=$1",
            [id]
        );

        res.json({
            message: "Document Deleted"
        });

    }
    catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

module.exports = {
    uploadDocument,
    getDocuments,
    downloadDocument,
    deleteDocument
};