import './public-path-override'
import { createApp } from 'vue'
import App from './App.vue'
import routes from './router';
import { createRouter, createWebHistory } from 'vue-router';

let app;
let router;
let history;

function render(props) {
    const container = props?.container;

    const box = container? container?.querySelector('#app'): document.getElementById('app');

    app = createApp(App);

     history = createWebHistory(window.__POWERED_BY_QIANKUN__ ? '/vue' : '');
     router = createRouter({
        history,
        routes
    })

    app.use(router).mount(box)
}

// qiankun提供了一些标识，用于表示当前应用是否在父应用中被引入过
if (!window.__POWERED_BY_QIANKUN__) {
    render({});
}


// qiankun要求应用暴露的方式需要是umd格式
export async function bootstrap(props) {
    console.log('bootstrap', props);
}
export async function mount(props) {
    // 本项目里的外层容易的id为container
    // 底座会传props过来，props里有挂载节点
    render(props)
}
export async function unmount(props) {
    console.log('unmount', props);
    app.unmount();
    history.destroy();
    app = null;
    router = null;
}
