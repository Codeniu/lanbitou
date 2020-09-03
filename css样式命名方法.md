[TOC]



## 1.css样式命名方法

> CSS命名规范-BEM

block-name__element-name--modifier-name，也就是模块名 + 元素名 + 修饰器名。

Instagram团队使用的驼峰式:

```css
.blockName-elementName--modifierName { /* ... */ }
```

还有单下划线：

```css
.block-name_element-name--modifierName { /* ... */ }
```

还有修饰器名用单横线连接：

```css
.blockName__elementName-modifierName { /* ... */ }
```





文章：

从 BEM 谈大型项目中 CSS 的组织和管理

https://www.ibm.com/developerworks/cn/web/1512_chengfu_bem/



BEM

https://en.bem.info/methodology/







## 2.foreach中的this指向问题

如果不使用箭头函数是找不到this的指向的







