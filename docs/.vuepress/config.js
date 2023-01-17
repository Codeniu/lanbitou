const utils = require('./utils')

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
        text: '首页',
        link: '/',
      },
      {
        text: '库',
        link: '/repository/',
      },
      {
        text: '网站',
        link: '/website/',
      },
      {
        text: '最近在做',
        link: '/doing/',
      },
      {
        text: 'Blog',
        link: '/blog/',
      },
      {
        text: '笔记',
        link: '/notes/',
      },
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
