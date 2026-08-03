const express = require("express");

const router = express.Router();

const upload = require("../middleware/multerConfig");

const {
    uploadDocument,
    getDocuments,
    downloadDocument,
    deleteDocument
} = require("../controllers/documentController");

router.post(
    "/upload",
    upload.single("file"),
    uploadDocument
);

router.get(
    "/",
    getDocuments
);

router.get(
    "/download/:id",
    downloadDocument
);

router.delete(
    "/:id",
    deleteDocument
);

module.exports = router;