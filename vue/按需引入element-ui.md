# 按需引入

创建文件并写入如下代码。

src/pligins/element.js

```js
import {
    Badge,
    Button,
    Cascader,
    Checkbox,
    Col,
    DatePicker,
    Dialog,
    Divider,
    Form,
    FormItem,
    Input,
    Loading,
    Message,
    MessageBox,
    Option,
    Popover,
    Radio,
    RadioButton,
    RadioGroup,
    Row,
    Select,
    Table,
    TableColumn,
    TabPane,
    Tabs,
    Tag,
    Timeline,
    TimelineItem,
    Tooltip,
    Tree,
    Upload,
} from 'element-ui';
import Vue from 'vue';

Vue.prototype.$ELEMENT = {
    size: 'middle',
    zIndex: 3000,
};

Vue.use(Loading.directive);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Timeline);
Vue.use(TimelineItem);
Vue.use(Button);
Vue.use(Upload);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Row);
Vue.use(Col);
Vue.use(DatePicker);
Vue.use(Select);
Vue.use(Option);
Vue.use(Cascader);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Tree);
Vue.use(Tooltip);
Vue.use(Divider);
Vue.use(Badge);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Dialog);
Vue.use(RadioButton);
Vue.use(Popover);
Vue.use(Checkbox);
Vue.use(Tag);

// fix _Message not define : https://github.com/ElementUI/babel-plugin-component/issues/31
const _Message = Message;
const $message = options => {
    _Message({
        ...options,
        offset: 70,
    });
};
['success', 'warning', 'info', 'error'].forEach(type => {
    $message[type] = options => {
        if (typeof options === 'string') {
            options = {
                showClose: false,
                duration: 3000,
                message: options,
                offset: 70,
            };
        }
        options.type = type;
        return _Message(options);
    };
});

Vue.prototype.$message = $message;
Vue.prototype.$confirm = MessageBox.confirm;

```

在main.js中导入

```
import '@/plugins/element';
```



# 对Message做更改

```js
// fix _Message not define : https://github.com/ElementUI/babel-plugin-component/issues/31
const _Message = Message;
const $message = options => {
    _Message({
        ...options,
        offset: 70,
    });
};
['success', 'warning', 'info', 'error'].forEach(type => {
    $message[type] = options => {
        if (typeof options === 'string') {
            options = {
                showClose: false,
                duration: 3000,
                message: options,
                offset: 70,
            };
        }
        options.type = type;
        return _Message(options);
    };
});

Vue.prototype.$message = $message;
Vue.prototype.$confirm = MessageBox.confirm;
```

但是这种更改只会在调用this.$message()时有用。

例如：

其他js文件中引用。上述更改就作用不到了

```
import { Message } from 'element-ui';

Message.error({
    message: response.message,
    offset: 70,
});
```

