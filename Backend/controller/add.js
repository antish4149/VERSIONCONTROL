import fs from 'node:fs/promises';
import path from 'node:path';


const addRepo = async (args) => {

    const repoPath = path.resolve(process.cwd(), ".gitFolder");
    const stagingPath = path.join(repoPath, "staging");
    try {
        await fs.mkdir(stagingPath, { recursive: true });
        const fileName = path.basename(args.file);
        const sourcePath = path.resolve(process.cwd(), args.file);
        const destPath = path.join(stagingPath, fileName);
        await fs.copyFile(sourcePath, destPath);
        console.log(`Added ${args.file} to the staging area`);
    } catch (error) {
        console.log("Error adding file: ", error)
    }
}
export default addRepo;