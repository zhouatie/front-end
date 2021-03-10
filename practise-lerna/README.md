
lerna bootstrap
安装所有子模块的包

lerna bootstrap --hoist 
lerna可以通过lerna bootstrap一行命令安装所有子项目的依赖包，而且在安装依赖时还有依赖提升功能，所谓“依赖提升”，就是把所有项目npm依赖文件都提升到根目录下，这样能避免相同依赖包在不同项目安装多次。比如多个项目都用了redux，通过依赖提升，多个项目一共只需要下载一次即可。不过，需要额外的参数--hoist让依赖提升生效。

lerna run
lerna run < script > -- [..args] # 运行所有包里面的有这个script的命令
$ lerna run --scope my-component test
例子

$ lerna run test # 运行所有包的 test 命令
$ lerna run build # 运行所有包的 build 命令


lerna exec
$ lerna exec -- < command > [..args] # runs the command in all packages
$ lerna exec -- rm -rf ./node_modules
$ lerna exec -- protractor conf.js
lerna exec --scope my-component -- ls -la
例子：
$ lerna add lodash # 将 lodash 安装到所有模块

$ lerna exec -- npm uninstall lodash

抽离公共方法

抽离公共组件

提取node_modules