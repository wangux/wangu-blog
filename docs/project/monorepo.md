# monorepo

monorepo（多个项目放到一个代码仓库的软件开发策略）所对应的就是multirepo（一个项目一个代码仓库）

最常见的monorepo解决方案是lerna和yarn的workspaces特性

monorepo是指在一个项目仓库（repo）中管理多个模块/包（package），不同于每个模块创建一个repo

lerna是管理多包存储库的工作流程工具，解决了跨多个存储库依赖不能共享、以及依赖爆炸等问题<br />项目目录大概如下图
```javascript
├── packages
|   ├── pkg1
|   |   ├── package.json
|   ├── pkg2
|   |   ├── package.json
├── package.json
```

rollupjs是一款打包构建工具，比webpack更加轻量化，起初就是为了更好的支持treeshaking
