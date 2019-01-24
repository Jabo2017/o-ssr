const Vue = require('vue')
const { createRenderer } = require('vue-server-renderer')
const server = require('express')()
const context = {
  title: '模版插值模式',
  meta: `
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="description" content="Vue.js 服务端渲染指南">
  `
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

  const renderer = createRenderer({
    template: require('fs').readFileSync('./index.template.html', 'utf-8')
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
