### Vue将组件data内的数据重置

```js
export default {
  data() {
    return {
      systemInfoArr: [],
      unitListArr: [],
      formSelectObj: {
        systemInfo: { // 业务系统列表
          name: 'systemInfo',
          arr: [],
          selectVal: '',
          value: '',
          curSelect: null
        },
        unitList: { // 用户配置系统
          name: 'unitList',
          arr: [],
          selectVal: '',
          value: '',
          curSelect: null
        }
      }

​	}

  },
  mounted(){
      // 1.这里重置 formSelectObj 数据，其他不受影响
        Object.assign(this.$data.formSelectObj, this.$options.data()) 
      // 2.这里重置 data 下的所有数据
        Object.assign(this.$data, this.$options.data()) 
  }
}
```



