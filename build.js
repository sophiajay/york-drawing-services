import fs from 'fs/promises';

const templateDir = "./templates";
const siteDir = "./docs";

const files = await fs.readdir(templateDir);
const template = await fs.readFile(`${templateDir}/template.html`, "utf8");

files.filter(f => f.endsWith("partial.html")).map(async f => {
    const content = await fs.readFile(`${templateDir}/${f}`, "utf8");
    const html = template.replace("%%CONTENT%%", content);

    if(f === "index.partial.html") {
        console.log(`Building main page...`);
        fs.writeFile(`${siteDir}/index.html`, html);
    } else {
        console.log(`Building page: ${f}...`);
        const path = `${siteDir}/pages/${f.replace(".partial.html", "")}/index.html`
        fs.mkdir(path.substring(0, path.lastIndexOf("/")), { recursive: true });
        fs.writeFile(path, html);

    }
});