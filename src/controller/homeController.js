import userService from '../service/userService';
const handleHelloWorld = (res, req) => {
  return req.render("home.ejs");
};

const handleUserPage = async(res, req) => {
  
  let userList = await userService.getUserList();
  await userService.deleteUser();
  return req.render("user.ejs",{userList});
};
const handleCreateNewUser = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let username = req.body.username;
 
  userService.createNewUser(email,password,username);
   
  return res.redirect("/user");
};


const handleDeleteUser = async(req,res) =>{
  await userService.deleteUser(req.params.id);
  return res.redirect("/user");
}

module.exports = {
  handleHelloWorld,
  handleUserPage,
  handleCreateNewUser,
  handleDeleteUser
};
