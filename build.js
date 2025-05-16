import fs from 'fs/promises';

const templateDir = "./templates";
const siteDir = "./site";

const files = await fs.readdir(templateDir);
const template = await fs.readFile(`${templateDir}/template.html`, "utf8");

files.filter(f => f.endsWith("partial.html")).map(async f => {
    const content = await fs.readFile(`${templateDir}/${f}`, "utf8");
    const html = template.replace("%%CONTENT%%", content);
    return fs.writeFile(`${siteDir}/${f.replace(".partial", "")}`, html);
});