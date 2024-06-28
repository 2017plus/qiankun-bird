/**
 * 模拟沙箱，避免各应用对window造成污染
 * 1、window快照：加载某个应用前，对window拍照记录，卸载应用后用快照恢复window，保证每个应用之间window
 *  缺点：浪费内存
 * 2.代理window,真实修改window,只要代理window沙箱有效,修改后window就会生效,沙箱销毁,window就会还原
 * 3.代理window,不修改window,只修改window的代理对象,实现应用内外的完全隔离的效果
 */

/* function SnapshotSandbox() {
    this.modifyPropsMap = {};
    this.windowSnapshot = {};

    SnapshotSandbox.prototype.active = function () {
        this.windowSnapshot = {};

        // 给window拍照
        Object.keys(window).forEach((prop) => {
            this.windowSnapshot[prop] = window[prop]
        })

        Object.keys(this.modifyPropsMap).forEach(prop => {
            window[prop] = this.modifyPropsMap[prop];
        })
    }

    SnapshotSandbox.prototype.inactive = function () {
        this.modifyPropsMap = {};
        Object.keys(window).forEach((prop) => {
            if (window[prop] !== this.windowSnapshot[prop]) {
                // 记录更改
                this.modifyPropsMap[prop] = window[prop];
                window[prop] = this.windowSnapshot[prop];
            }
        })
    }
} */

// BEGIN 测试window快照实现的沙箱
/*
snapSandox1 = new SnapshotSandbox();
snapSandox2 = new SnapshotSandbox();

snapSandox1.active();
console.log('1-active',window.a, window.b);
window.a = 100;
window.b = 200;
console.log('1-set', window.a, window.b);
snapSandox1.inactive();
console.log('1-inactive', window.a, window.b);
snapSandox1.active();
console.log('1-active', window.a, window.b);
snapSandox1.inactive();
console.log('1-inactive',window.a, window.b);
console.log(snapSandox1,snapSandox2);

console.log('\n\n\n\n\n\n')

snapSandox2.active();
console.log('2-active', window.a, window.b);
window.a = 1000;
window.b = 2000;
console.log('2-set',window.a, window.b);
snapSandox2.inactive();
console.log('2-inactive', window.a, window.b);
snapSandox2.active();
console.log('2-active', window.a, window.b);
snapSandox2.inactive();
console.log('2-inactive',window.a, window.b);
console.log(snapSandox1,snapSandox2);

console.log('\n\n\n\n\n\n')

snapSandox1.active();
console.log('1-active', window.a, window.b);
snapSandox1.inactive();
console.log('1-inactive',window.a, window.b);
console.log(snapSandox1,snapSandox2);

console.log('\n\n\n\n\n\n')

snapSandox2.active();
console.log('2-active', window.a, window.b);
snapSandox2.inactive();
console.log('2-inactive',window.a, window.b);
console.log(snapSandox1,snapSandox2);
 */
// END 

/* function LegacySandbox() {
    this.modifyPropsMap = new Map();
    this.addedPropsMap = new Map();
    this.currentPropsMap = new Map();

    const fakeWindow = Object.create(null);

    LegacySandbox.prototype.active = function () {
        // console.log('active',this);
        this.currentPropsMap.forEach((value, key) => {
            window[key] = value;
        })
    }

    LegacySandbox.prototype.inactive = function () {

        // console.log('inactive',this);
        this.modifyPropsMap.forEach((value, key) => {
            window[key] = value;
        })
        this.addedPropsMap.forEach((value, key) => {
            delete window[key]
        })
    }

    const proxy = new Proxy(window, {
        get: (target, key, recever) => {
            return window[key]
        },
        set: (target, key, value) => {
            if (!Object.prototype.hasOwnProperty.call(window, key)) {
                // 记录新添加的值
                this.addedPropsMap.set(key, value)
            } else if (!this.modifyPropsMap.has(key)) {
                // 记录修改之前的值
                this.modifyPropsMap.set(key, window[key])
            }
            // 记录所有新添加\修改的值
            this.currentPropsMap.set(key, value)
            // console.log('after set',this);
            window[key] = value
        }
    })
    this.proxy = proxy;
} */

// BEGIN测试window代理沙箱
/* 
const sandbox1 = new LegacySandbox();
sandbox1.active();
(function (window) {
    console.log('1-active', window.a, window.b, window.c, window.d);
    window.a = 100;
    window.b = 200;
    console.log('1-set', window.a, window.b, window.c, window.d);
})(sandbox1.proxy)
console.log('应用外', window.a, window.b, window.c, window.d);

sandbox1.inactive();

console.log('1-inactive, 应用外', window.a, window.b, window.c, window.d);
console.log('\n\n\n\n\n\n');
window.c = 3000;
window.d = 4000;
console.log('应用外更改window后', window.a, window.b, window.c, window.d);
console.log('\n\n\n\n\n\n');

const sandbox2 = new LegacySandbox();
sandbox2.active();
(function (window) {
    console.log('2-active', window.a, window.b, window.c, window.d);
    window.a = 1000;
    window.b = 2000;
    window.c = 300;
    window.d = 400;
    console.log('2-set', window.a, window.b, window.c, window.d);
})(sandbox2.proxy)
console.log('应用外', window.a, window.b, window.c, window.d);

sandbox2.inactive();
console.log('2-inactive,应用外', window.a, window.b, window.c, window.d);
console.log('\n\n\n\n\n\n');

window.c = 30000;
window.d = 40000;
console.log('应用外更改window后', window.a, window.b, window.c, window.d); */
// BEGIN


function ProxySandbox() {
    this.running = false;
    const fakeWindow = Object.create(null)
    this.proxy = new Proxy(fakeWindow, {
        get: (target, key, recever) => {
            return key in target ? target[key] : window[key]
        },
        set: (target, key, value) => {
            if (this.running) {
                target[key] = value;
            }
            return true;

        }
    })

    Object.prototype.active = function () {
        if (!this.running) this.running = true;
    }
    Object.prototype.inactive = function () {
        this.running = false;
    }
}

window.c = 300;
window.d = 400;

const sandbox1 = new ProxySandbox();
sandbox1.active();
(function (window) {
    console.log('1-active', window.a, window.b, window.c, window.d);
    window.a = 100;
    window.b = 200;
    console.log('1-set', window.a, window.b, window.c, window.d);
})(sandbox1.proxy)
console.log('应用外', window.a, window.b, window.c, window.d);

sandbox1.inactive();

console.log('1-inactive, 应用外', window.a, window.b, window.c, window.d);
console.log('\n\n\n\n\n\n');
window.c = 3000;
window.d = 4000;
console.log('应用外更改window后', window.a, window.b, window.c, window.d);
console.log('\n\n\n\n\n\n');

const sandbox2 = new ProxySandbox();
sandbox2.active();
(function (window) {
    console.log('2-active', window.a, window.b, window.c, window.d);
    window.a = 1000;
    window.b = 2000;
    window.c = 3;
    window.d = 4;
    console.log('2-set', window.a, window.b, window.c, window.d);
})(sandbox2.proxy)
console.log('应用外', window.a, window.b, window.c, window.d);

sandbox2.inactive();
console.log('2-inactive,应用外', window.a, window.b, window.c, window.d);

window.c = 30000;
window.d = 40000;
console.log('\n\n\n\n\n\n');
console.log('应用外更改window后', window.a, window.b, window.c, window.d);