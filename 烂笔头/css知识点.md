# 1.span标签适合用在什么地方

1. 用于包裹图标

```vue
<span class="svg-container">
    <svg-icon icon-class="user" />
</span>
```

# 2.div点击穿透，阻止穿透

**点击穿透**

`pointer-events: none;`

**阻止穿透**
在`js`的点击事件里面添加这句话，阻止冒泡 

`event.stopPropagation();`



# 3.让文字在一行显示

```css
p {
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

