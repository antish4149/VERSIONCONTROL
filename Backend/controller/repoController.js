
const createRepository = (req, res) => {
    res.send("Respository created");
}

const getRepository = (req, res) => {
    res.send("Respository fetched");
}

const getRepositoryById = (req, res) => {
    res.send("Respository fetched by ID");
}

const getRepositoryByName = (req, res) => {
    res.send("Respository fetched by Name");
}

const updateRepository = (req, res) => {
    res.send("Respository updated");
}

const getRepositoryForCurrUser = (req, res) => {
    res.send("Respository fetched for current user");
}

const deleteRepository = (req, res) => {
    res.send("Respository deleted");
}

const toogleVisibility = (req, res) => {
    res.send("Visibility toggled");
}

const repoController = {
    createRepository, getRepository,
    getRepositoryById, getRepositoryByName,
    getRepositoryForCurrUser, toogleVisibility,
    updateRepository, deleteRepository
};

export default repoController;