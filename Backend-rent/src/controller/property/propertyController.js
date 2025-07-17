import { Property, User } from '../../models/index.js';

export const createProperty = async (req, res) => {
  try {
    // Validation: Ensure image field is present
    if (typeof req.body.image === 'undefined' || req.body.image === null || req.body.image === '') {
      return res.status(400).json({ message: 'Image is required.' });
    }
    const property = await Property.create(req.body);
    res.status(201).json({ data: property, message: 'Property created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating property', error: error.message });
  }
};

export const getAllProperties = async (req, res) => {
  try {
    const where = {};
    if (req.query.userId) {
      where.userId = req.query.userId;
    }
    const properties = await Property.findAll({
      where,
      include: [{ model: User, attributes: ['name'] }]
    });
    // Map to include owner name at top level
    const result = properties.map(p => ({
      ...p.toJSON(),
      owner: p.User ? p.User.name : 'Unknown'
    }));
    res.status(200).json({ data: result });
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
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting property', error: error.message });
  }
};

export const getPropertyCount = async (req, res) => {
  try {
    const count = await Property.count();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch property count' });
  }
};

export const propertyController = {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getPropertyCount
}; 