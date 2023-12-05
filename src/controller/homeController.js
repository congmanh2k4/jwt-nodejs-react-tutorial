import userService from '../service/userService';
const handleHelloWorld = (res, req) => {
  return req.render("home.ejs");
};
const handleUserPage = (res, req) => {
  return req.render("user.ejs");
};
const handleCreateNewUser = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let username = req.body.username;
 
//   userService.createNewUser(email,password,username);
    userService.getUserList();
  return res.send("handleCreateNewUser");
};


module.exports = {
  handleHelloWorld,
  handleUserPage,
  handleCreateNewUser,
};
