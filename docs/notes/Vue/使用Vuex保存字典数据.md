## 使用 Vuex 保存字典数据



**准备工作**

了解vuex的：State， Mutations，Actions，Getters。

1.state:我们要把我们需要做状态管理的量放到这里来，然后在后面的操作动它

2.mutation:更改 Vuex 的 store 中的状态的唯一方法是提交 mutation

3.actions:

action 类似于 mutation，不同在于：

action 提交的是 mutation，而不是直接变更状态。

action 中可以写异步

4.getters:

官网说：有时候我们需要从 store 中的 state 中派生出一些状态，例如对列表进行过滤并计数。减少我们对这些状态数据的操作



### 1.在项目中创建文件夹 store

store 的结构如下，

![](https://gitee.com/youngniu/pic-bed/raw/master/img/20201215204904.png)

### 2.创建并编写 index.js

作用：入口

不到忘了在`main.js`中导入`import store from './store/index'`



index.js：整合modules

```js
import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";

Vue.use(Vuex);

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context("./modules", true, /\.js$/);

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

const store = new Vuex.Store({
  modules,
  getters,
});

export default store;
```

### 3.创建并编写 getter.js

作用：



getter.js

```js
export default {
  dict: (state) => state.dict.dict,
};
```

### 4.创建并编写 dict.js

作用：

dict 的数据结构：通过键值对取存储字典。

```
ditc={String:codeName:Array:codeValue}
```

每次我们需要字典数据时都从 dict 中去匹配，比如:

```json
sex:[
	{
		label:'男'，
		value:'01'
	},
	{
		label:'女'，
		value:'02'
	},
]
```

dict.sex 如果有值就把值取出来，通过 Promise 方法 resolve 出去。如果没有，就去调接口请求数据，拿到数据后，需要做下面两步操作。

1.把拿到的数据存到 vuex 中

```js
commit("SET_DICT", {
  key: code,
  value: option,
});
```

2.返回数据

`resolve({ option })`



dict.js

```js
import { queryByClaCode } from "@/apis/system";

const state = {
  dict: {},
};
const mutations = {
  SET_DICT(state, object) {
    let { key, value } = object;
    try {
      state.dict[key] = value;
    } catch (error) {
      console.log(error);
    }
  },
};
const actions = {
  // query
  getDictionary({ commit, state }, code) {
    return new Promise((resolve, reject) => {
      let dict = state.dict;
      if (!dict[code] || (dict[code] && dict[code].length === 0)) {
        //当缓存中没有时去请求
        queryByClaCode(code)
          .then((res) => {
            let option = res.data || [];
            commit("SET_DICT", {
              key: code,
              value: option,
            });
            resolve({ option });
          })
          .catch(() => {
            reject(false);
          });
      } else {
        resolve({ option: dict[code] });
      }
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
```

### 5.使用

1.通过 dispatch

```js
// codeName 字典名
this.$store.dispatch("dict/getDictionary", codeName).then((res) => {
  let codeOption = res.option || [];
});
```

2.通过 mapGetters函数

```js
import {mapGetters} from 'vuex'
computed:{
	...mapGetters([dict['sex']])
}
```

3.更新字典

```js
this.$store.commit('dict/SET_DICT', {'sex':['m':'男','w':'女']});
```

