"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "User",
      [
        {
          email: "abc@gmail.com",
          password: "12343",
          username: "fake0",
        },
        {
          email: "abc1@gmail.com",
          password: "12343",
          username: "fake2",
        },
        {
          email: "abc2@gmail.com",
          password: "12343",
          username: "fake2",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("User", null, {});
  },
};
