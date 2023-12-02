const handleHelloWorld = (res, req) => {
    return req.render("home.ejs");
}
const handleUserPage = (res,req) => {
    return req.render("user.ejs");
}
module.exports = {
    handleHelloWorld,
    handleUserPage
}