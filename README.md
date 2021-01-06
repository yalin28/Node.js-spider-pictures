# Node.js-spider-pictures

Node.js 批量抓取并下载站点图片和文章信息并保存在本地

目标网站：[「ONE · 一个」](http://www.wufazhuce.com/)  

项目功能：批量下载该网站精美的轮播图和文章列表标题内容

## 一、启动项目

> 网速慢的话推荐用 `cnpm` 安装依赖

命令：

```bash
npm i
npm start
```

## 二、配置文件

```js
// 配置相关
module.exports = {
  originPath: 'xxx', // 请求地址
  savePath: 'xxx' // 默认配置的存放路径，根据需要去修改
}
```

## 三、用到的主要模块

|  模块   | 作用                                      |
| :-----: | :---------------------------------------- |
|  axios  | 获取页面数据                              |
| cheerio | 操作 DOM 节点获取图片和图片名             |
| Stream  | 创建读/写的数据流对象通过管道连接下载图片 |
| writeFile|异步地将数据写入到一个文件，如果文件已存在则覆盖该文件|

axios 相关代码：

```js
// 获取页面数据
async getPage (url) {
  return {
    res: await axios.get(url)
  }
}
```

cheerio 相关代码：

```js
// 获取所有图片地址
getImageSrc(page) {
  let imageSrcArr = []
  let $ = cheerio.load(page.res.data)
  let imageSrc = $('.carousel-inner')
  .find('img')
  .each((index, item) => {
  imageSrcArr.push(item.attribs.src)
  })
  return imageSrcArr
}
```

Stream 相关代码：

```js
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
```

writeFile 相关代码：

```js
// 写文件到指定目录
fs.writeFile(`${config.saveDomData.savePath}/test.json`, JSON.stringify(articleData, null, 2), (error) => {
    if (error) {
      console.log(error)
      return false
    }
    console.log("数据保存成功！")
  })
}
```

## 四、说明

* 此项目仅用于个人学习，不用于任何商业用途，如果侵权，即刻删除！
* 暂时只支持 Windows 平台。
