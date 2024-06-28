# qiankun微前端demo

启动顺序： 

1、启动基座substrate 

2、启动子应用，static可以用vscode的live server 

# 原理解析

注册和启动采用的是single-spa的方法

1.预先加载的功能->import-html-entry,利用浏览器空闲时间进行加载其他应用.类似于react fiber的渲染原理

2.js沙箱(proxy单例沙箱 || proxy沙箱 || 快照沙箱),(创建一个sandbox,让你的execScripts方法运行在sandbox),css样式隔离(1:影子DOM:shadowDOM;2:scopedcss)

3.获取导出的接入协议(在沙箱中执行的),进行扩展(增加了用户提供的生命周期)

