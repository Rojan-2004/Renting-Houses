import express from "express";
import { propertyController } from "../../controller/property/propertyController.js";

const router = express.Router();

router.post("/", propertyController.createProperty);
router.get("/", propertyController.getAllProperties);
router.get('/count', propertyController.getPropertyCount);
router.get("/:id", propertyController.getPropertyById);
router.put("/:id", propertyController.updateProperty);
router.delete("/:id", propertyController.deleteProperty);

export { router as propertyRouter }; 