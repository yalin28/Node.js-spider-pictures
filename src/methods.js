const config = require('./cofig'),
  fs = require('fs'),
  cheerio = require('cheerio'),
  axios = require('axios')

module.exports = {
  // 获取页面数据
  async getPage(url) {
    return {
      res: await axios.get(url)
    }
  },
  // 获取所有图片地址
  getImageSrc(page) {
    let imageSrcArr = []
    let $ = cheerio.load(page.res.data)
    $('.carousel-inner')
      .find('img')
      .each((index, item) => {
        imageSrcArr.push(item.attribs.src)
      })
    return imageSrcArr
  },
  // 获取所有图片版本名
  getImageSrcName(page) {
    let imageSrcNameArr = []
    let $ = cheerio.load(page.res.data)
    $('.carousel-inner')
      .find('.titulo')
      .each((index, item) => {
        imageSrcNameArr.push(item.children[0].data)
      })
    return imageSrcNameArr
  },
  // 校验当前环境是否存在配置中的存放图片路径 不存在则创建
  chechedPath(path) {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path)
      console.log('文件夹创建成功！')
    }
  },
  // 下载图片到本地
  async downloadImage(url, imageSrc, filePath) {
    let headers = {
      Referer: url,
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.19 Safari/537.36'
    }
    // 创建读取数据流对象
    let { data: ReadStream } = await axios({
      method: 'get',
      url: imageSrc,
      responseType: 'stream',
      headers
    })
    // 创建写入数据流对象
    let writeStream = fs.createWriteStream(filePath)
    // 通过管道下载数据流
    ReadStream.pipe(writeStream)
    // 监听当前图片下载完成
    writeStream.on('close', () => {
      console.log(`${filePath} 下载完成！`)
    })
  }
}
