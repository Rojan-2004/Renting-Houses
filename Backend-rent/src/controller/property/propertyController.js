import { Property } from '../../models/index.js';

export const createProperty = async (req, res) => {
  try {
    const property = await Property.create(req.body);
    res.status(201).json({ data: property, message: 'Property created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating property', error: error.message });
  }
};

export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.findAll();
    res.status(200).json({ data: properties });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching properties', error: error.message });
  }
};

export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.status(200).json({ data: property });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching property', error: error.message });
  }
};

export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    await property.update(req.body);
    res.status(200).json({ data: property, message: 'Property updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating property', error: error.message });
  }
};

export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    await property.destroy();
    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting property', error: error.message });
  }
};

export const propertyController = {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
}; 