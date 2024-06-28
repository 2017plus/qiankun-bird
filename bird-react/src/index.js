import './public-path-override'
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

let root;

function render(props) {
  const container = props?.container;

  root = ReactDOM.createRoot(container ? container?.querySelector('#root') : document.getElementById('root'));

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// qiankun提供了一些标识，用于表示当前应用是否在父应用中被引入过
if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

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
  root.unmount();
}
