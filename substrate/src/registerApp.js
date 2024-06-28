import { registerMicroApps, start, initGlobalState } from 'qiankun';

function loader(loading) {
    // console.log('加载状态', loading);
}

const actions = initGlobalState({
    name: 'test-bird',
    age: 20,
});

actions.onGlobalStateChange((newVal, oldVal)=>{
console.log('====parent====',newVal, oldVal);
})

registerMicroApps([
    {
        name: 'birdReact',
        entry: '//localhost:10000', // 默认react启动的入口是10000端口，
        activeRule: '/react', // 当路径是/react的时候
        container: '#container',
        loader
    },
    {
        name: 'birdVue',
        entry: '//localhost:20000', // 默认vue启动的入口是20000端口，
        activeRule: '/vue', // 当路径是/react的时候
        container: '#container',
        loader
    },
    {
        name: 'birdStatic',
        entry: '//localhost:5500/bird-static/index.html', // 可以用vscode插件 Live Server 5500
        activeRule: '/static', // 当路径是/react的时候
        container: '#container',
        loader
    },
], {
    beforeLoad() {
        console.log('before load ');
    },
    beforeMount() {
        console.log('before mount');
    },
    afterMount() {
        console.log('after mount')
    },
    beforeUnmount() {
        console.log('before unmount')
    },
    afterUnmount() {
        console.log('after unmount');
    }
})

start({
    sandbox: {
        // 实现了动态样式表
        // css-module，scoped 可以在打包的时候生成一个选择器的名字  qiankun的experimentalStyleIsolation就是用的这种，把所有import的语法，都换成style，再增加熟悉，来进行隔离
        // BEM 必须按照规范来写
        // CSS in js  会导致代码很混乱
        // shadowDOM  严格的隔离

        // strictStyleIsolation: true,
        // experimentalStyleIsolation: true, // 缺点：就是子应用中的dom元素如果挂载到了外层，会导致样式不生效
    }
})