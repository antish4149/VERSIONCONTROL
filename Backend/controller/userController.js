const getALLUsers = (req, res) => {
    res.send("All users");
}

const getUserById = (req, res) => {
    res.send("User by Id");
}

const updateUser = (req, res) => {
    res.send("User updated");
}

const deleteUser = (req, res) => {
    res.send("User deleted");
}

const userController = { getALLUsers, getUserById, updateUser, deleteUser }

export default userController