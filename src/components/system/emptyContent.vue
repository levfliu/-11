<template>
    <div class="empty-content">
        <i class="el-icon-receiving"></i>
        <div>{{this.content}}</div>
    </div>
</template>
<script>
export default {
    name: 'Top',
    data () {
        return {
        }
    },
    props: ['content']
}
</script>

<style lang="scss">
    .empty-content {
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #d4d8e6;
        font-size: 14px;
        line-height: 1.5715;
        text-align: center;
        .el-icon-receiving {
            font-size: 40px;
        }
    }
</style>
