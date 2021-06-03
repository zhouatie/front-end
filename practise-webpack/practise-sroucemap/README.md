# source-map 学习笔记

## 各种参数组合源代码与参数的结果

| 方法              | map 文件 | 源代码 | 指定行列 | 备注                                                           |
| ----------------- | -------- | ------ | -------- | -------------------------------------------------------------- |
| source-map        | yes      | yes    | yes      | -                                                              |
| eval              | no       | no     | yes      | 展示 webpack 打包后的 js，且 source-map 代码存在于 eval 方法中 |
| eval-source-map   | no       | yes    | yes      | 内嵌 dataurl（base64)形式存在于 eval 方法中                    |
| cheap-source-map  | yes      | no     | no       | 但是用 cheap-module-source-map 可以显示混淆编译处理前的代码    |
| inline-source-map | no       | yes    | yes      | inline 是最后一行注释 dataurl(base64 那种文件形式              |

`eval/inline/cheap/module` 可以任意组合

1. `cheap`(不生成列映射)：低开销，不生成列映射
2. `eval`(快)：加了`eval`的配置生成的`sourceMap`会作为`DataURI`嵌入，不单独生成`.map`文件
   官方比较推荐开发场景下使用`eval`的构建模式，因为它能`cache sourceMap`,从而`rebuild`的速度会比较快
3. `inline`(`dataurl`内嵌):就是将`map`作为`DataURI`嵌入，不单独生成`.map`文件
4. `module`(信息全): 我也不知道，为啥`source-map`出问题了
5. `hidden`: 不会在js文件底部加上注释映射到map文件的代码

开发环境推荐 `cheap-module-eval-source-map`
不需要显示列映射、信息全、快
