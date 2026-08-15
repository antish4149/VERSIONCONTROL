import { readdir } from 'node:fs';
import fs from 'node:fs/promises'
import path from 'node:path';
import { v4 as uuidv4 } from 'uuid';

const commitRepo = async (args) => {
    try {
        const commitId = uuidv4();
        const repoPath = path.join(process.cwd(), ".gitFolder");
        const stagingPath = path.join(repoPath, "staging");
        const commitPath = path.join(repoPath, "commits", commitId);

        await fs.mkdir(commitPath, { recursive: true });

        const files = await fs.readdir(stagingPath);

        for (const file of files) {
            const sourcePath = path.join(stagingPath, file);
            const destPath = path.join(commitPath, file);
            await fs.copyFile(sourcePath, destPath);
        }


        await fs.writeFile(
            path.join(commitPath, "commit.json"),
            JSON.stringify({
                commitId,
                message: args.message,
                timestamp: new Date().toISOString(),
                files
            }, null, 2)
        );

        console.log(`Commit created successfully ${commitId} with message: "${args.message}"`);
    } catch (error) {
        console.error("Error creating commit:", error);
    }
};
export default commitRepo;