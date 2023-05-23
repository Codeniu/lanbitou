const utils = require('./utils')
const sidebarMap = require('./sidebarMap.js')

const dynamicNav = sidebarMap.map(v => {
  return {
    text: v.title,
    link: `/${v.dirname}/`,
  }
})

module.exports = {
  title: '烂笔头',
  description: '好记性不如烂笔头',
  //   base: '/lanbitou/',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/favicon.ico',
      },
    ],
  ],
  themeConfig: {
    nav: [
      {
        text: 'Home',
        link: '/',
      },

      ...dynamicNav,
    ],
    sidebar: utils.inferSiderbars(),
    lastUpdated: '上次更新',
    repo: 'Codeniu/lanbitou',
    editLinks: true,
    docsDir: 'docs',
    editLinkText: '在 GitHub 上编辑此页',
    sidebarDepth: 2,
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@public': './public',
      },
    },
  },
  markdown: {
    extendMarkdown: md => {
      // use more markdown-it plugins!
      md.use(require('markdown-it-include'))
    },
  },
}
