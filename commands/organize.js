let fs = require("fs");
let path = require("path");

let types = {
    media: ["mp4", "mkv", "jpg", "jpeg", "png"],
    archives: ["zip", "rar", "7z", "tar", "gz"],
    documents: ["doc", "docx", "xls", "xlsx", "pdf", "txt", "ppt", "pptx"],
    app: ["exe", "dmg", "msi", "pkg", "deb"]
}

function organizeFn(dirPath) {
    // console.log("Organize command implemented for ", dirPath);
    let destPath;
    if (dirPath == undefined) {
        destPath = prcoess.cwd();
        return;
    } else {
        let doesExist = fs.existsSync(dirPath);
        if (doesExist) {

            destPath = path.join(dirPath, "organized_files");

            if (fs.existsSync(destPath) == false) {
                fs.mkdirSync(destPath);
            }

        } else {
            console.log("Kindly enter correct path")
            return;
        }
    }

    organizedHelper(dirPath, destPath);

}

function organizedHelper(src, dest) {

    let childnames = fs.readdirSync(src);
    // console.log(childnames);

    for (let i = 0; i < childnames.length; i++) {
        let childAddress = path.join(src, childnames[i]);
        let isFile = fs.lstatSync(childAddress).isFile();
        if (isFile) {
            // console.log(childnames[i]);
            let category = getCategory(childnames[i]);
            // console.log(childnames[i], "belongs to -->" , category );
            sendFiles(childAddress, dest, category);
        }

    }

}


function sendFiles(srcFilePath, dest, category) {

    let categoryPath = path.join(dest, category);
    // console.log(categoryPath);
    if (fs.existsSync(categoryPath) == false) {
        fs.mkdirSync(categoryPath);
    }

    let filename = path.basename(srcFilePath);
    let destFilePath = path.join(categoryPath, filename);
    fs.copyFileSync(srcFilePath, destFilePath);
    console.log(filename, "copied to ", category);

}

function getCategory(name) {
    let ext = path.extname(name);
    ext = ext.slice(1);
    // console.log(ext);

    for (let type in types) {
        let cTypeArray = types[type];
        for (let i = 0; i < cTypeArray.length; i++) {
            if (ext == cTypeArray[i]) {
                return type;
            }
        }
    }
    return "others";

}

module.exports={
    organizeKey : organizeFn
}