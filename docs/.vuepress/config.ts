import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

export default defineUserConfig<DefaultThemeOptions>({
  base: '/',
  // 主题和它的配置
  theme: '@vuepress/theme-default',
  locales: {
    '/': {
      lang: 'zh-CN',
      title: '顽固的博客',
      description: '分享学到的'
    },
  },
  themeConfig: {
    docsDir: 'docs',
    lastUpdated: true,
    lastUpdatedText: '上次更新',
    locales: {
      '/': {
        navbar: [
          {
            text: '前端基础',
            link: '/js/base',
          },
          {
            text: '算法',
            children: [
            {
              text: '手写',
              link: '/js/write',
            },
            {
              text: 'leetcode',
              link: '/js/write',
            }],
          },
          {
            text: 'github',
            link: 'https://github.com',
          }
        ],
        sidebar: [
          {
            text: 'js',
            collapsible: true,
            children: [
              {
                text: 'js基础',
                link: '/js/base',
              },
              {
                text: '变量、函数声明提升',
                link: '/js/var',
              },
              {
                text: 'JS执行上下文和执行栈',
                link: '/js/stack',
              },
              {
                text: '继承',
                link: '/js/extend',
              },
              {
                text: '基础手写，bind、call、apply等',
                link: '/js/write',
              },
              {
                text: '同步与异步，阻塞与非阻塞',
                link: '/js/async',
              },
              {
                text: 'EventLoop',
                link: '/js/eventloop',
              }
            ]
          },
          {
            text: 'ts',
            collapsible: true,
            children: [
              {
                text: 'ts基础',
                link: '/ts/base',
              },
              {
                text: 'ts进阶',
                link: '/ts/advance',
              }
            ],
          },
          {
            text: 'vue',
            children: [
              {
                text: 'vue基础',
                link: '/vue/base',
              },
              {
                text: 'vue源码',
                link: '/vue/source',
              }
            ],
          },
          {
            text: '性能优化',
            collapsible: true,
            children: [
              {
                text: '性能优化基础',
                link: '/performance/base',
              },
              {
                text: '前端埋点、性能分析sdk设计',
                link: '/performance/sdk1',
              },
              {
                text: '埋点sdk实现',
                link: '/performance/sdk2',
              },
              {
                text: '浏览器架构以及渲染流程',
                link: '/performance/chrome',
              }
            ],
          },
          {
            text: 'webpack',
            collapsible: true,
            children: [
              {
                text: 'webpack基础',
                link: '/webpack/webpack基础.md',
              },
              {
                text: 'webpack原理',
                link: '/webpack/webpack原理.md',
              },
              {
                text: '编写Plugin',
                link: '/webpack/编写Plugin.md',
              },
              {
                text: '按需加载',
                link: '/webpack/按需加载.md',
              },
              {
                text: '区分环境',
                link: '/webpack/区分环境.md',
              },
              {
                text: '使用DllPlugin',
                link: '/webpack/使用DllPlugin.md',
              },
              {
                text: 'ParallelUglifyPlugin',
                link: '/webpack/使用ParallelUglifyPlugin多进程压缩代码.md',
              },
              {
                text: 'Tree shaking',
                link: '/webpack/使用Tree Shaking压缩代码.md',
              },
              {
                text: '输出分析',
                link: '/webpack/输出分析.md',
              },
              {
                text: '缩小文件搜索范围',
                link: '/webpack/缩小文件搜索范围.md',
              },
              {
                text: '提取公共代码',
                link: '/webpack/提取公共代码.md',
              },
              {
                text: '压缩代码',
                link: '/webpack/压缩代码.md',
              },
              {
                text: 'happyPack原理',
                link: '/webpack/happyPack原理.md',
              },
              {
                text: '优化文件监听以及浏览器自动刷新',
                link: '/webpack/优化文件监听以及浏览器自动刷新.md',
              },
            ],
          },
          {
            text: 'http',
            collapsible: true,
            children: [
              {
                text: 'http基础',
                link: '/http/base',
              },
              {
                text: 'http进阶',
                link: '/http/advance',
              }
            ],
          },
          {
            text: '前端安全',
            collapsible: true,
            children: [
              {
                text: '前端加密安全策略',
                link: '/safe/encrypt',
              },
              {
                text: '前端安全',
                link: '/safe/base',
              }
            ],
          },
          {
            text: '前端工程化',
            collapsible: true,
            children: [
              {
                text: 'monorepo',
                link: '/project/monorepo',
              },
              {
                text: 'Jenkins安全',
                link: '/project/jenkins',
              }
            ],
          },
        ],
        selectLanguageName: '简体中文',
        selectLanguageText: 'Languages',
        selectLanguageAriaLabel: 'Languages',

        // page meta
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: true,
        lastUpdatedText: '上次更新',
        contributors: false,
        contributorsText: '贡献者',

        // custom containers
        tip: '提示',
        warning: '注意',
        danger: '警告',

        // 404 page
        notFound: [
            '这里什么都没有',
            '我们怎么到这来了？',
            '这是一个 404 页面',
            '看起来我们进入了错误的链接',
        ],
        backToHome: '返回首页',

        // other
        openInNewWindow: '在新窗口打开',
      }
    },
    sidebarDepth: 3,
    logo: 'https://vuejs.org/images/logo.png',
  },
})