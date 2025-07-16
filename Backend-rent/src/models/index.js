import { User } from "./user/User.js";
import { Comment } from "./comment/comment.js";
import { Favorite } from "./favorite/favorite.js";
import { Like } from "./like/like.js";
import { Booking } from "./booking/booking.js";

// User associations
User.hasMany(Comment, { foreignKey: 'userId' });
User.hasMany(Favorite, { foreignKey: 'userId' });
User.hasMany(Booking, { foreignKey: 'userId' });
Booking.belongsTo(User, { foreignKey: 'userId' });

// Comment associations
Comment.belongsTo(User, { foreignKey: 'userId' });
Comment.hasMany(Like, { foreignKey: 'commentId' });

// Favorite associations
Favorite.belongsTo(User, { foreignKey: 'userId' });

// Like associations
Like.belongsTo(User, { foreignKey: 'userId' });
Like.belongsTo(Comment, { foreignKey: 'commentId' });

export { User, Comment, Favorite, Like, Booking };