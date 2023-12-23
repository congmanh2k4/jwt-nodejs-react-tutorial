import loginRegister from "../service/loginRegister"
const testApi = (req,res) => {
    return res.status(200).json({
        message: 'ok',
        data: 'test api'
    })
}
const handleLogin = async (req,res) => {
    try {
        let data = await loginRegister.handleUserLogin(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}
const handleRegister= async (req,res) => {
    try {
        if (!req.body.email || !req.body.phone || !req.body.phone || !req.body.password) {
            return res.status(200).json({
                EM: 'missing required param',
                EC: '1',
                DT: ''
            })
        }
        if(req.body.password && req.body.password.length < 6){
            return res.status(200).json({
                EM: 'your password must have at least 6 characters',
                EC: '1',
                DT: ''
            })
        }
        let data = await loginRegister.createRegisterNewUser(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: ''
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }

}
module.exports = {
    testApi,
    handleRegister, 
    handleLogin
}