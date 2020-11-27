# 二次封装`el-table-column`组件，实现表格行内编辑。



#### 如图：

![wQBMIe.gif](https://s1.ax1x.com/2020/09/08/wQBMIe.gif)

#### 用法：

```vue
import TlTableColumn from '@/components/TlTableColumn/index';

<el-table>
    <el-table-column type="index" width="50" label="序号" />
    
    <tl-table-column
        label="培训经历"
        prop="trainingInfo"
        :show-overflow-tooltip="true"
        editType="input"
    />

    <tl-table-column
        label="结束时间"
        prop="endTime"
        editType="endTime"
        min-width="115"
    />
</el-table

```

#### 对比之前的写法简洁了许多：

```vue
<el-table-column
    label="培训经历"
    :show-overflow-tooltip="true"
    >
    <template slot-scope="{ row }">
        <template v-if="row.isEditing">
            <el-input
            v-model="row.trainingInfo"
            placeholder="请输入培训经历"
            size="small"
            />
        </template>
        <span v-else>{{ row.trainingInfo }}</span>
    </template>
</el-table-column>
```





#### 组件封装：

TlTableColumn.vue

```vue
<template>
    <el-table-column v-bind="$attrs" v-on="$listeners">
        <template slot-scope="{ row }">
            <!-- 输入框 -->
            <template v-if="editType === 'input'">
                <el-input
                    v-if="row.isEditing"
                    v-model="row[prop]"
                    placeholder="请输入备注"
                    size="small"
                />
                <span v-else>{{ row[prop] }}</span>
            </template>
            <!-- 下拉框 -->
            <template v-else-if="editType === 'select'">
                <el-select
                    v-if="row.isEditing"
                    v-model="row[prop]"
                    filterable
                    placeholder="请选择"
                    size="mini"
                >
                    <el-option
                        v-for="item in options"
                        :key="item.ctCode"
                        :label="item.ctName"
                        :value="item.ctName"
                    />
                </el-select>
                <span v-else>{{ row[prop] }}</span>
            </template>
            <!-- 开始时间 -->
            <template v-else-if="editType === 'startTime'">
                <el-date-picker
                    v-if="row.isEditing"
                    v-model="row[prop]"
                    size="small"
                    type="month"
                    class="date-picker"
                    placeholder="开始时间"
                    format="yyyy.MM"
                    value-format="yyyy.MM"
                    :picker-options="startPicker(row)"
                />
                <span v-else>{{ row[prop] }}</span>
            </template>
            <!-- 结束时间 -->
            <template v-else-if="editType === 'endTime'">
                <el-date-picker
                    v-if="row.isEditing"
                    v-model="row[prop]"
                    size="small"
                    type="month"
                    class="date-picker"
                    placeholder="结束时间"
                    format="yyyy.MM"
                    value-format="yyyy.MM"
                    :picker-options="endPicker(row)"
                />
                <span v-else>{{ row[prop] }}</span>
            </template>
            <!-- 普通显示 -->
            <template v-else>
                <span>{{ row[prop] }}</span>
            </template>
        </template>
    </el-table-column>
</template>

<script>
export default {
    inheritAttrs: false,
    props: {
        prop: {
            type: String,
            default: '',
        },
        editType: {
            type: String,
            default: '',
        },
        options: {
            type: Array,
            default: () => [],
        },
    },
    methods: {
        //开始时间验证
        startPicker(row) {
            return {
                disabledDate(time) {
                    return time.getTime() > new Date(row.endTime);
                },
            };
        },
        //结束时间验证
        endPicker(row) {
            return {
                disabledDate(time) {
                    return time.getTime() < new Date(row.startTime);
                },
            };
        },
    },
};
</script>

<style></style>

```

1.`v-bind="$attrs"` 与`v-on="$listeners"`使el-table-column接收未被父组件应用的参数，与事件。入：父组件传入的label能被el-table-column获取到。

2.inheritAttrs：false，是为了防止一些不必要的问题发生。如果不加这行代码，我在父组件调用子组件时传了一个参数 type=‘idnex’。子组件没有应用它，而恰好type属性又是孙子组件（这里也就是el-table-column）的一个属性，那么孙子组件就会被覆盖。如果孙子组件的type=‘selection'，那他就会被替换成index。详情：https://www.jianshu.com/p/ce8ca875c337



| 参数     | 描述                                                         |
| -------- | ------------------------------------------------------------ |
| prop     | 必填，数据项                                                 |
| editType | 必填：处于编辑状态的类型。可选值：input（输入框）\| startTime(开始时间) \| endTime(结束时间) \| select（下拉框） |
| label    | 可填：表头                                                   |
| 其他     | el-table-column的原有参数均可接收                            |
| options  | 当editType为select时必填，用作下拉框的数据项                 |

注意：表格数据tableData的每一行需要添加一个属性：`isEditing:false`





# 二次封装el-table组件

在如上组件的基础上进行el-table组件的封装。

效果：

![wQjucj.gif](https://s1.ax1x.com/2020/09/08/wQjucj.gif)

#### TlTable.vue

```vue
<template>
    <!-- 以下属性可以在父组件中直接调用 -->
    <!-- v-loading="loading"
        :data="tableData"
        fit
        border
        highlight-current-row
        @selection-change="handleSelectionChange" -->
    <el-table
        v-bind="$attrs"
        v-on="$listeners"
        style="width: 100%;"
        :header-cell-style="{
            background: '#eef1f6',
            color: '#606266',
            'text-align': 'center',
        }"
        :cell-style="{ 'text-align': 'center' }"
    >
        <el-table-column type="selection" width="40" />
        <el-table-column type="index" width="50" label="序号" />
        <template v-for="(th, key) in tableHeader">
            <!-- 可编辑列 -->
            <tl-table-column
                :key="key"
                v-if="th.editType"
                :prop="th.prop"
                :label="th.label"
                :fixed="th.fixed"
                :width="th.width"
                :min-width="th.minWidth"
                :editType="th.editType"
                :options="th.options"
            />
            <el-table-column
                :key="key"
                v-else
                :prop="th.prop"
                :label="th.label"
                :fixed="th.fixed"
                :width="th.width"
                :min-width="th.minWidth"
            />
        </template>
    </el-table>
</template>

<script>
import TlTableColumn from '@/components/TlTableColumn/index';
export default {
    inheritAttrs: false,
    components: { TlTableColumn },
    props: {
        tableHeader: {
            type: Array,
            default: () => [],
        },
    },
};
</script>

<style></style>

```



如何使用TlTable组件

```vue
<!--重大事项-->
<template>
    <div class="majorIssues">
        <options-bar
            :editFlag="editFlag"
            @handleDelete="handleDelete"
            @handleSubmit="handleSubmit"
            @handleCancle="handleCancle"
            @handleCreate="handleCreate"
            @handleEdit="handleEdit"
        />
        <tl-table
            v-loading="loading"
            :data="tableData"
            :tableHeader="tableHeader"
            fit
            border
            highlight-current-row
            ref="dragTable"
            @selection-change="handleSelectionChange"
        />
    </div>
</template>

<script>
import TlTable from '@/components/TlTable/index';
import OptionsBar from '../common/OptionsBar';
export default {
    components: { TlTable, OptionsBar },
    data() {
        return {
            userId: '',
            loading: false,
            tableData: [],
            multipleSelection: [],
            editFlag: false,
            currentRow: {},
            // ? 根据表格内容填写
            rowTemplate: {
                type: '',
                time: '',
                name: '',
                content: '',
                isEditing: true,
                isCreate: true,
            },
            tableHeader: [
                {
                    prop: 'type',
                    label: '类别',
                    editType: 'select',
                    options: [
                        { ctName: '留学', ctCode: '0' },
                        { ctName: '定居', ctCode: '1' },
                    ],
                },

                {
                    prop: 'time',
                    label: '时间',
                    editType: 'startTime',
                    options: [],
                },

                {
                    prop: 'name',
                    label: '名称',
                    editType: 'input',
                    options: [],
                },

                {
                    prop: 'content',
                    label: '内容',
                    editType: 'input',
                    options: [],
                },
            ],
        };
    },
    created() {
        this.getTableData();
    },
    methods: {
        handleSelectionChange(arr) {
            this.multipleSelection = arr;
        },
        // todo
        getTableData() {
            this.tableData = [];
            for (let i = 0; i < 5; i++) {
                let row = {
                    id: i,
                    type: String(i),
                    time: '2020.4.5',
                    name: 'niu' + i,
                    content: String(i),
                    isEditing: false,
                };
                this.tableData.push(row);
            }
        },
        handleEdit() {
            if (this.multipleSelection.length !== 1) {
                this.$message.warning('请选择一条数据');
                return;
            }

            if (this.multipleSelection[0].isLock === '1') {
                this.$message.warning('该条数据流程已发起，暂时不允许操作');
                return;
            }
            this.currentRow = this.multipleSelection[0];
            this.editFlag = true;

            let rowIndex = -1;
            this.tableData.forEach((v, index) => {
                if (v.id === this.currentRow.id) {
                    rowIndex = index;
                }
            });

            if (rowIndex !== -1) {
                this.tableData[rowIndex].isEditing = true;
                this.currentRow['index'] = rowIndex;
            }
        },
        handleCancle() {
            // 新增
            if (this.currentRow.isCreate) {
                this.tableData.pop();
            } else {
                // 编辑
                this.getTableData();
            }
            this.editFlag = false;
        },
        handleCreate() {
            if (this.editFlag) {
                this.$message({
                    type: 'warning',
                    message: '请取消编辑状态',
                });
                return;
            }
            this.tableData.push(this.rowTemplate);
            this.currentRow = this.rowTemplate;
            this.editFlag = true;
        },
        handleSubmit() {
            // 新增
            if (this.currentRow.isCreate) {
                // this.add(this.currentRow);
                // this.operationProcess(this.currentRow, '01'); // 新增流程
                console.log(this.currentRow);
            } else {
                // 编辑
                let index = this.currentRow.index;
                let row = this.tableData[index];
                let data = { ...row };
                console.log(data);
                // this.update(data);
                // this.operationProcess(data, '03'); // 编辑流程
            }
            this.editFlag = false;
        },
        handleDelete() {
            if (this.multipleSelection.length !== 1) {
                this.$message({
                    type: 'warning',
                    message: '请选中一条数据',
                });
                return;
            }
            if (this.multipleSelection[0].isLock === '1') {
                this.$message.warning('该条数据流程已发起，暂时不允许操作');
                return;
            }
            let id = this.multipleSelection[0].id;

            this.$confirm('删除不可恢复, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    // this.deleteById(id);
                    // this.operationProcess({ id: id }, '02'); // 流程删除
                    // todo
                    console.log('删除操作', id);
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除',
                    });
                });
        },
    },
};
</script>

<style lang="less" scoped>
.majorIssues {
    overflow: auto;
    margin-right: 10px;
}
</style>

```



这里把上边的操作按钮也封装了一下。

OptionsBar.vue

```vue
<template>
    <div class="optionBar">
        <el-button type="text" icon="el-icon-delete" @click="handleDelete">
            删除
        </el-button>
        <span v-if="editFlag">
            <el-button
                type="text"
                icon="el-icon-circle-check"
                @click="handleSubmit"
            >
                确认
            </el-button>
            <el-button
                type="text"
                icon="el-icon-refresh"
                class="cancel-btn"
                @click="handleCancle"
            >
                取消
            </el-button>
        </span>
        <span v-else>
            <el-button type="text" icon="el-icon-plus" @click="handleCreate">
                新增
            </el-button>
            <el-button type="text" icon="el-icon-edit" @click="handleEdit">
                编辑
            </el-button>
        </span>
    </div>
</template>

<script>
export default {
    props: {
        editFlag: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        handleDelete() {
            this.$emit('handleDelete');
        },
        handleSubmit() {
            this.$emit('handleSubmit');
        },
        handleCancle() {
            this.$emit('handleCancle');
        },
        handleCreate() {
            this.$emit('handleCreate');
        },
        handleEdit() {
            this.$emit('handleEdit');
        },
    },
};
</script>

<style lang="less" scoped>
.optionBar {
    display: flex;
    flex-direction: row-reverse;
    padding-right: 10px;
}
</style>

```



由于业务需求，后续还需要添加对表格的拖动排序功能。



# 2020.9.14更新

添加表格拖拽排序功能。

使用sortablejs插件

```
import Sortable from 'sortablejs';
```



```vue
<tl-table
            v-loading="loading"
            :data="tableData"
            :tableHeader="tableHeader"
            fit
            border
            highlight-current-row
            show-index
            @selection-change="handleSelectionChange"
                  
            // 添加如下参数      
            is-sort
            ref="dragTable"
            :isSortChange="isSortChange"
            @updateSort="updateSort"
        />
```

js

```js
        // 回调
		updateSort() {
            console.log('updateSort');
        },
        // 初始化    
        setSort() {
            const el = this.$refs.dragTable.$el.querySelectorAll(
                '.el-table__body-wrapper > table > tbody'
            )[0];
            this.sortable = Sortable.create(el, {
                ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
                setData: function(dataTransfer) {
                    dataTransfer.setData('Text', '');
                },
                onEnd: evt => {
                    // 数据已经改变，不必手动更新了
                    // const targetRow = this.tableData.splice(evt.oldIndex, 1)[0];
                    // this.tableData.splice(evt.newIndex, 0, targetRow);
                    // const tempArr = this.tableData;
                    // this.tableData = [];
                    // this.tableData = tempArr;

                    // for show the changes, you can delete in you code
                    const tempIndex = this.newList.splice(evt.oldIndex, 1)[0];
                    this.newList.splice(evt.newIndex, 0, tempIndex);
                    // console.log(this.oldList, this.newList);
                },
            });
        },
        
        getTableData() {
            this.loading = true;
            const params = {
                mainInfoId: this.userId,
                type: 30,
            };
            query(params).then(res => {
                this.loading = false;
                const list = res.data;
                if (Array.isArray(list) && list.length > 0) {
                    this.tableData = list.map(v => {
                        v.startTime = this.myformatDate(v.startTime);
                        v.endTime = this.myformatDate(v.endTime);
                        v.isEditing = false;
                        return v;
                    });

                    this.oldList = this.tableData.map(v => v.id);
                    this.newList = this.oldList.slice();
                }
            });

            this.$nextTick(() => {
                this.setSort();
            });
        },            
```
