const Organization = require("./Organization");
const User = require("./User");
const Product = require("./Product");
const Setting = require("./Setting");

Organization.hasMany(User, {
  foreignKey: "organizationId",
});

User.belongsTo(Organization, {
  foreignKey: "organizationId",
});

Organization.hasMany(Product, {
  foreignKey: "organizationId",
});

Product.belongsTo(Organization, {
  foreignKey: "organizationId",
});
console.log("Setting => ", Setting);
Organization.hasOne(Setting, {
  foreignKey: "organizationId",
});

Setting.belongsTo(Organization, {
  foreignKey: "organizationId",
});

module.exports = {
  Organization,
  User,
  Product,
  Setting,
};