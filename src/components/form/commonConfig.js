export default [
    {
        label: '字段名',
        type: 'el-input',
        prop: 'name',
        disabled: true,
        required: true
    }, {
        label: '标签文本',
        type: 'el-input',
        prop: 'label'
    }, {
        label: '输入框宽度',
        type: 'el-input',
        prop: 'contentWidth',
        placeholder: '百分比或者像素，例：20%、20px'
    }, {
        label: '占位提示',
        type: 'el-input',
        prop: 'placeholder'
    }, {
        label: '独占行',
        type: 'el-switch',
        prop: 'block'
    }
]
