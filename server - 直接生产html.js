// 使用一个页面模板
// <!--vue-ssr-outlet--> 注释 -- 这里将是应用程序 HTML 标记注入的地方。
const Vue = require('vue')
const renderer = require('vue-server-renderer').createRenderer()
const server = require('express')()
const context = {
  title: 'hello'
}
const mocktitle = '我爱吃的水果'
const mockdata = ['香蕉', '苹果', '橘子']
server.get('*', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url,
      data: mockdata,
      title: mocktitle
    },
    template: `<div>The visited URL is: {{ url }}
    <h3>{{title}}</h3>
    <p v-for='item in data'>{{item}}</p>
    </div>`
  })
  renderer.renderToString(app, context, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(html)
  })
})
server.listen(8080)

/***
*** 运行： node server.js
*** 在浏览器中运行： localhost:8080
***/
