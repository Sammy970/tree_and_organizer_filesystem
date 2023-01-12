#!/usr/bin/env node
let inputArr = process.argv.slice(2);
const { dir } = require("console");
// console.log(inputArr);
let fs = require("fs");
let path = require("path");
let helpObj = require("./commands/help");
let treeObj = require("./commands/tree");
let organizeObj = require("./commands/organize");


let command = inputArr[0];

let types = {
    media: ["mp4", "mkv", "jpg", "jpeg", "png"],
    archives: ["zip", "rar", "7z", "tar", "gz"],
    documents: ["doc", "docx", "xls", "xlsx", "pdf", "txt", "ppt", "pptx"],
    app: ["exe", "dmg", "msi", "pkg", "deb"]
}

switch (command) {
    case "tree":
        treeObj.treeKey(inputArr[1]);
        break;
    case "organize":
        organizeObj.organizeKey(inputArr[1], types);
        break;
    case "help":
        helpObj.helpKey(inputArr[1]);
        break;
    default:
        console.log("Please input some command. Don't be a MINAL")
        break;
}





