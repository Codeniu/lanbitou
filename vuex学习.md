单一状态树，每个应用将仅仅包含一个 store 实例。



创建：

```js
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
```

