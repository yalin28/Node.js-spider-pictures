"use strict"
const app = require("./src/app.js")
const inquirer = require("inquirer") // https://github.com/SBoudrias/Inquirer.js
const choices1 = "1、同时执行下载图片和文章标题"
const choices2 = "2、单项执行下载图片或文章标题"

const choices3 = "1、下载图片"
const choices4 = "2、下载dom数据"
inquirer
  .prompt([
    {
      type: "list",
      name: "runType",
      message: "请选择你要运行的命令的方式？",
      choices: [choices1, choices2],
    },
    {
      type: "list",
      name: "run",
      message: "请选择你要运行的命令？",
      choices: [choices3, choices4],
      when: function (answers) {
        return answers["runType"] == choices2
      },
    },
  ])
  .then((answers) => {
    if (answers["runType"] == choices1) {
      app.downDomData()
      app.downImg()
    }
    if (answers["run"] == choices3) {
      app.downImg()
    } else if (answers["run"] == choices4) {
      app.downDomData()
    }
  })
