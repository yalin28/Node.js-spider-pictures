const fs = require('fs'),
  config = require('./cofig'),
  methods = require('./methods')

const start = async () => {
  methods.chechedPath(config.savePath) //校验当前环境是否存在配置中的存放图片路径
  const page = await methods.getPage(config.originPath)
  const imageSrc = await methods.getImageSrc(page)
  const imageSrcName = await methods.getImageSrcName(page)
  imageSrc.forEach((src, index) => {
    let originPath = config.originPath
    let imgSrc = src
    let imgPath = `${config.savePath}/${imageSrcName[index]}.jpg`
    methods.downloadImage(originPath, imgSrc, imgPath)
  })
}

module.exports = {
  start
}
