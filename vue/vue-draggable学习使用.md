## 安装

```undefined
npm i -S vuedraggable
```

## 使用

###### 页面引入

```jsx
import draggable from 'vuedraggable'
```

###### 页面使用

```dart
  <draggable :options="{group:'people',animation:150,ghostClass:'sortable-ghost',chosenClass:'chosenClass',scroll:true,scrollSensitivity:200}"
              v-model="list2"
              @change="change"
              @start="start"
              @end="end"
              :move="move"
              style="display: inline-block; width:190px;height: 200px;background: #eee;overflow: auto">
            <li v-for="(item, index) in list2"
                :class="setclass(item,index)"
                :key="index">
              {{item.name}}
            </li>
          </draggable>
```

###### 事件

```jsx
//evt里面有两个值，一个evt.added 和evt.removed  可以分别知道移动元素的ID和删除元素的ID
    change: function (evt) {
      console.log(evt)
    },
    //start ,end ,add,update, sort, remove 得到的都差不多
    start: function (evt) {
      console.log(evt)
    },
    end: function (evt) {
      console.log(evt)
      evt.item //可以知道拖动的本身
      evt.to    // 可以知道拖动的目标列表
      evt.from  // 可以知道之前的列表
      evt.oldIndex  // 可以知道拖动前的位置
      evt.newIndex  // 可以知道拖动后的位置
    },
    move: function (evt, originalEvent) {
      console.log(evt)
      console.log(originalEvent) //鼠标位置
    }
```

###### 属性

```ruby
  group: "name",  // or { name: "...", pull: [true, false, clone], put: [true, false, array] } name相同的组可以互相拖动
  sort: true,  // 内部排序列表
  delay: 0, // 以毫秒为单位定义排序何时开始。
  touchStartThreshold: 0, // px,在取消延迟拖动事件之前，点应该移动多少像素?
  disabled: false, // 如果设置为真，则禁用sortable。
  store: null,  // @see Store
  animation: 150,  // ms, 动画速度运动项目排序时，' 0 ' -没有动画。
  handle: ".my-handle",  // 在列表项中拖动句柄选择器。
  filter: ".ignore-elements",  // 不导致拖拽的选择器(字符串或函数)
  preventOnFilter: true, // 调用“event.preventDefault()”时触发“filter”
  draggable: ".item",  // 指定元素中的哪些项应该是可拖动的。
  ghostClass: "sortable-ghost",  // 设置拖动元素的class的占位符的类名。
  chosenClass: "sortable-chosen",  // 设置被选中的元素的class
  dragClass: "sortable-drag",  //拖动元素的class。
  dataIdAttr: 'data-id',

  forceFallback: false,  // 忽略HTML5的DnD行为，并强制退出。（h5里有个属性也是拖动，这里是为了去掉H5拖动对这个的影响）
  fallbackClass: "sortable-fallback",  // 使用forceFallback时克隆的DOM元素的类名。
  fallbackOnBody: false,  // 将克隆的DOM元素添加到文档的主体中。（默认放在被拖动元素的同级）
  fallbackTolerance: 0, // 用像素指定鼠标在被视为拖拽之前应该移动的距离。

  scroll: true, // or HTMLElement
  scrollFn: function(offsetX, offsetY, originalEvent, touchEvt, hoverTargetEl) { ... }, // if you have custom scrollbar scrollFn may be used for autoscrolling
scrollSensitivity: 30, // px, how near the mouse must be to an edge to start scrolling.
  scrollSpeed: 10, // px
```

###### slot

使用footer插槽在vuedraggable组件内添加不可拖动的元素。重要:它应该与可拖动选项一起使用，以标记可拖拽元素。注意，在默认情况下，页脚槽将始终被添加

```xml
<draggable v-model="myArray" :options="{draggable:'.item'}">
    <div v-for="element in myArray" :key="element.id" class="item">
        {{element.name}}
    </div>
    <button slot="footer" @click="addPeople">Add</button>
</draggable>
```

详情参考：
 Vue.Draggable   [https://github.com/SortableJS/Vue.Draggable](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2FSortableJS%2FVue.Draggable)
 Sortable   [https://github.com/RubaXa/Sortable](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2FRubaXa%2FSortable)


