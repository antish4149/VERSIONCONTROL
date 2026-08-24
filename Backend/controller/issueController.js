const createIssue = (req, res) => {
    res.send("Issue created");
}

const getIssue = (req, res) => {
    res.send("Issue fetched");
}

const getIssueById = (req, res) => {
    res.send("Issue fetched by Id");
}
const updateIssue = (req, res) => {
    res.send("Issue updated");
}

const deleteIssue = (req, res) => {
    res.send("Issue deleted");
}



const issueController = {
    createIssue, getIssue,
    getIssueById, updateIssue,
    deleteIssue
}

export default issueController;
