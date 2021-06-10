<template>
    <div class="trigger">
        <empty-content v-if="triggerId === 'list'"
            content="请新增触发器"></empty-content>
        <div v-if="triggerId !== 'list' && addTrigger">
            <el-form :model="addTrigger" label-width="180px">
                <el-form-item label="名称">
                    <el-input v-model="addTrigger.name"></el-input>
                </el-form-item>
                <el-form-item label="事件触发时机">
                    <el-select v-model="addTrigger.action" placeholder="请选择">
                        <el-option label="插入前" value="insert-before"></el-option>
                        <el-option label="插入后" value="insert-after"></el-option>
                        <el-option label="修改前" value="modify-before"></el-option>
                        <el-option label="修改后" value="modify-after"></el-option>
                        <el-option label="删除前" value="delete-before"></el-option>
                        <el-option label="删除后" value="delete-after"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="addTrigger.description"></el-input>
                </el-form-item>
                <el-form-item label="脚本">
                    <el-input type="textarea" :rows="5" v-model="addTrigger.script"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">保存</el-button>
                    <el-button @click="onCancel">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import emptyContent from '../system/emptyContent'

export default {
    data () {
        return {
        }
    },
    components: {
        'empty-content': emptyContent
    },
    computed: {
        triggerId () {
            return this.$store.getters.triggerId
        },
        addTrigger () {
            return this.$store.getters.addTrigger
        }
    },
    methods: {
        onCancel () {
            this.$router.push({
                name: 'service',
                query: {
                    catalog: this.$store.getters.serviceCatalog,
                    type: this.$store.getters.serviceType
                }
            })
        },
        onSubmit () {
            this.$store.dispatch('updateTrigger')
        }
    },
    created () {
    }
}
</script>

<style lang="scss">
    .trigger {
        width: 100%;
        padding: 50px;
        background-color: white;
    }
</style>
