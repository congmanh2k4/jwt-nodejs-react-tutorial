import { Sequelize } from "sequelize";

const sequelize = new Sequelize("jwt", "root", null, {
  host: "localhost",
  dialect: "mysql",
});

const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log('connection has been establish successfully ');
  } catch (error) {
    console.error('unable: ',error);
  }
};
export default connection;