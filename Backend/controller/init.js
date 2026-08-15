import fs from 'node:fs/promises';
import path from 'node:path';


const initRepo = async () => {
    const repoPath = path.resolve(process.cwd(), ".gitFolder");
    const commitPath = path.join(repoPath, 'commits');
    try {
        await fs.mkdir(repoPath, { recursive: true });
        await fs.mkdir(commitPath, { recursive: true });
        await fs.writeFile(
            path.join(repoPath, "config.json"),
            JSON.stringify({
                bucket: "s3 bucket"
            })
        );

        console.log("Repository Initiliazed");
    } catch (error) {
        console.error("Error initializing repository:", error);
    }
}
export default initRepo;
