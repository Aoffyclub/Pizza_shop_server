/** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     await queryInterface.addColumn("userinfo", "birth", {
//       type: Sequelize.STRING(50),
//       allowNull: true,
//     });
//     await queryInterface.addColumn("userinfo", "firstName", {
//       type: Sequelize.STRING(50),
//       allowNull: true,
//     });
//     await queryInterface.addColumn("userinfo", "lastName", {
//       type: Sequelize.STRING(50),
//       allowNull: true,
//     });
//     await queryInterface.addColumn("userinfo", "image", {
//       type: Sequelize.STRING(50),
//       allowNull: true,
//     });
//     await queryInterface.addColumn("userinfo", "email", {
//       type: Sequelize.STRING(50),
//       allowNull: true,
//     });
//   },
//   down: async (queryInterface, Sequelize) => {
//     await queryInterface.removeColumn("userinfo", "birth");
//     await queryInterface.removeColumn("userinfo", "firstName");
//     await queryInterface.removeColumn("userinfo", "lastName");
//     await queryInterface.removeColumn("userinfo", "image");
//     await queryInterface.removeColumn("userinfo", "email");
//   },
// };
