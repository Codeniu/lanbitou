[TOC]



### 1对后端发的post请求，使用blob格式

```html
<el-button  size="mini" class="filter-item" type="primary" icon="el-icon-download" @click="handleExport(scope.row)">导出</el-button>
//method方法
handleExport(row){
const url="/user/downloadExcel"
const options = {snapshotTime:formatDate(new Date(row.snapshotTime), 'yyyy-MM-dd hh:mm')}
exportExcel(url,options)
}
/**
 * 封装导出Excal文件请求
 * @param url
 * @param data
 * @returns {Promise}
 */
//api.js
export function exportExcel(url, options = {}) {
  return new Promise((resolve, reject) => {
    console.log(`${url} 请求数据，参数=>`, JSON.stringify(options))
    axios.defaults.headers['content-type'] = 'application/json;charset=UTF-8'
    axios({
      method: 'post',
      url: url, // 请求地址
      data: options, // 参数
      responseType: 'blob' // 表明返回服务器返回的数据类型
    }).then(
      response => {
        resolve(response.data)
        let blob = new Blob([response.data], {
          type: 'application/vnd.ms-excel'
        })
        console.log(blob)
        let fileName = Date.parse(new Date()) + '.xlsx'
        if (window.navigator.msSaveOrOpenBlob) {
          // console.log(2)
          navigator.msSaveBlob(blob, fileName)
        } else {
          // console.log(3)
          var link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          link.download = fileName
          link.click()
          //释放内存
          window.URL.revokeObjectURL(link.href)
        }
      },
      err => {
        reject(err)
      }
    )
  })
}

```

### 2.通过创建iframe的方式：

```js
<el-button  size="mini" class="filter-item" type="primary" icon="el-icon-download" @click="handleExport(scope.row)">导出</el-button>
//method方法：
handleExport(row) {
      var elemIF = document.createElement('iframe')
      elemIF.src = 'user/downloadExcel?snapshotTime=' + formatDate(new Date(row.snapshotTime), 'yyyy-MM-dd hh:mm') +
                    '&category=' + row.category 
      elemIF.style.display = 'none'
      document.body.appendChild(elemIF)
    }



           // let elemIF = document.createElement('iframe');
            // elemIF.src = api;
            // elemIF.style.display = 'none';
            // document.body.appendChild(elemIF);

```

### 3.通过a标签的链接向后端服务发get请求

```js
<a :href='"/user/downloadExcel"' >下载模板</a>

另一种情况是创建div标签，动态创建a标签：
<div name="downloadfile" "downloadExcel()">下载</div>
function downloadExcel() {
    let a = document.createElement('a')
    a.href ="/user/downloadExcel"
    a.click();
} 
```

