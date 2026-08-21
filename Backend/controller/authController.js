const registerUser = (req, res) => {
    res.send("User Register");
}

const loginUser = (req, res) => {
    res.send("user logged in");
}

const logoutUser = (req, res) => {
    res.send("user logoit");
}

const authController = { registerUser, loginUser, logoutUser }
export default authController;