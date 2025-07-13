import express from "express";
import upload from "../middleware/multerConfig.js";
import { uploadFile } from "../controller/fileController.js";

const router = express.Router();
const commentRouter = require('./comment');
const favoriteRouter = require('./favorite');
const likeRouter = require('./like');
const resellerRouter = require('./reseller');


// Route for single file upload
router.post("/upload", upload.single("file"), uploadFile);

export default router;
