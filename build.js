import fs from 'fs/promises';
import path from 'path';

const templateDir = "./templates";
const siteDir = "./docs";

const template = await fs.readFile(`${templateDir}/template.html`, "utf8");

async function processDirectory(dir, relativeDir = "") {
    const files = await fs.readdir(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = await fs.stat(filePath);

        if (stat.isDirectory()) {
            // Recursively process subdirectories
            await processDirectory(filePath, path.join(relativeDir, file));
        } else if (file.endsWith("partial.html")) {
            const content = await fs.readFile(filePath, "utf8");
            const html = template.replace("%%CONTENT%%", content);

            if (file === "index.partial.html") {
                console.log(`Building main page...`);
                const outputPath = relativeDir 
                    ? `${siteDir}/pages/${relativeDir}/index.html`
                    : `${siteDir}/index.html`;
                await fs.writeFile(outputPath, html);
            } else {
                console.log(`Building page: ${relativeDir}/${file}...`);
                const pageName = file.replace(".partial.html", "");
                const outputPath = relativeDir 
                    ? `${siteDir}/pages/${relativeDir}/${pageName}/index.html`
                    : `${siteDir}/pages/${pageName}/index.html`;
                
                await fs.mkdir(outputPath.substring(0, outputPath.lastIndexOf("/")), { recursive: true });
                await fs.writeFile(outputPath, html);
            }
        }
    }
}

await processDirectory(templateDir);