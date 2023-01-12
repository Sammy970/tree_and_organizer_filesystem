let fs = require("fs");
let path = require("path");

function treeFn(dirPath) {
    // console.log("Tree command implemented for ", dirPath);
    // let destPath;
    if (dirPath == undefined) {
        treeHelper(process.cwd(), "");
    } else {
        let doesExist = fs.existsSync(dirPath);
        if (doesExist) {
            treeHelper(dirPath, "");
        } else {
            console.log("Kindly enter correct path")
            return;
        }
    }
}

function treeHelper(dirPath, indent) {
    //is file or folder
    let isFile = fs.lstatSync(dirPath).isFile();
    if (isFile == true) {
        let filename = path.basename(dirPath);
        console.log(indent + "├──" + filename);
    } else {
        let dirName = path.basename(dirPath);
        console.log(indent + "└──" + dirName);
        let childrens = fs.readdirSync(dirPath);
        for (let i = 0; i < childrens.length; i++) {
            let childPath = path.join(dirPath, childrens[i]);
            treeHelper(childPath, indent + "\t");
        }
    }
}

module.exports={
    treeKey: treeFn
}