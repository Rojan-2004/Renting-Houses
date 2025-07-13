// User associations
User.hasMany(Property, { foreignKey: 'landlordId' });
User.hasMany(Comment, { foreignKey: 'userId' });
User.hasMany(Favorite, { foreignKey: 'userId' });
User.hasMany(Like, { foreignKey: 'userId' });

// Property associations
Property.belongsTo(User, { foreignKey: 'landlordId', as: 'landlord' });
Property.hasMany(Comment, { foreignKey: 'propertyId' });
Property.hasMany(Favorite, { foreignKey: 'propertyId' });

// Comment associations
Comment.belongsTo(User, { foreignKey: 'userId' });
Comment.belongsTo(Property, { foreignKey: 'propertyId' });
Comment.hasMany(Like, { foreignKey: 'commentId' });

// Favorite associations
Favorite.belongsTo(User, { foreignKey: 'userId' });
Favorite.belongsTo(Property, { foreignKey: 'propertyId' });

// Like associations
Like.belongsTo(User, { foreignKey: 'userId' });
Like.belongsTo(Comment, { foreignKey: 'commentId' });