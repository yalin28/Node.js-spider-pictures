"use strict"
const config = require("./config")
const methods = require("./methods")
const fs = require("fs")

const downImg = async () => {
  console.log("开始下载图片...")
  methods.chechedPath(config.savePath)
  methods.chechedPath(config.saveImg.savePath) //校验当前环境是否存在配置中的存放图片路径
  const page = await methods.getPage(config.saveImg.originPath)
  const imageSrc = methods.getImageSrc(page)
  const imageSrcName = methods.getImageSrcName(page)
  imageSrc.forEach((src, index) => {
    let originPath = config.saveImg.originPath
    let imgSrc = src
    let imgPath = `${config.saveImg.savePath}/${imageSrcName[index]}.jpg`
    methods.downloadImage(originPath, imgSrc, imgPath)
  })
}

const downDomData = async () => {
  console.log("开始下载文章标题数据...")
  methods.chechedPath(config.savePath)
  methods.chechedPath(config.saveDomData.savePath) //校验当前环境是否存在配置中的存放dom数据路径
  const page = await methods.getPage(config.saveDomData.originPath)
  const articleData = methods.getarticleTitleList(page)
  fs.writeFile(`${config.saveDomData.savePath}/test.json`, JSON.stringify(articleData, null, 2), (error) => {
    if (error) {
      console.log(error)
      return false
    }
    console.log("json保存成功！")
  })
}
module.exports = {
  downImg,
  downDomData,
}
