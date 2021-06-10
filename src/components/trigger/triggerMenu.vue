<template>
    <div>
        <el-tree class="trigger-menu"
            :data="treeData"
            node-key="id"
            default-expand-all
            :highlight-current="true"
            :check-on-click-node="true"
            :current-node-key="currentTriggerId"
            :expand-on-click-node="false"
            :props="defaultProps">
            <span class="custom-tree-node" slot-scope="{ node, data }"
                v-bind:class="{
                    'custom-tree-zero-level-node': data.type === 'system',
                    'custom-tree-node-other-level-node': data.type !== 'system'}"
                @click="openTrigger(data)"    >
                <span>{{ node.label }}</span>
                <span v-if="data.type === 'system'">
                    <el-button type="text" size="medium" icon="el-icon-plus" @click.stop="addTrigger()"
                        class="catalog-level-button"></el-button>
                </span>
                <span v-else>
                    <el-button type="text" size="small" icon="el-icon-delete" @click.stop="deleteTrigger(data)"
                        class="catalog-level-two-button"></el-button>
                </span>
            </span>
        </el-tree>
    </div>
</template>

<script>
import { guid } from '../../util/func'

export default {
    name: 'serviceMenu',
    data () {
        return {
            formLabelWidth: '120px',
            defaultProps: {
                children: 'children',
                label: 'name'
            }
        }
    },
    components: {
    },
    computed: {
        currentTriggerId () {
            return ''
        },
        treeData () {
            var triggerList = this.$store.getters.triggers
            var treemenu = [{
                id: 1,
                name: '触发器',
                type: 'system',
                children: []
            }]
            treemenu[0].children = triggerList
            return treemenu
        }
    },
    methods: {
        deleteTrigger (trigger) {
            this.$confirm('确认删除该触发器：' + trigger.name, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.$store.dispatch('deleteTrigger', trigger.id)
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
        },
        openTrigger (trigger) {
            if (trigger.type === 'system') {
                return
            }
            this.$store.commit('addTrigger', trigger)
            this.$store.commit('triggerInfo', {
                triggerId: trigger.id,
                triggerType: this.$route.query.type,
                triggerFormId: this.$route.query.formId
            })
            this.$router.push({
                name: 'trigger',
                params: {
                    id: trigger.id
                },
                query: this.$route.query
            })
        },
        addTrigger () {
            var trigger = {
                objectId: this.$route.query.formId,
                id: guid(),
                name: '',
                action: '',
                description: '',
                script: ''
            }
            this.$store.commit('addTrigger', trigger)
            this.$store.commit('triggerInfo', {
                triggerId: trigger.id,
                triggerType: this.$route.query.type,
                triggerFormId: this.$route.query.formId
            })
            this.$router.push({
                name: 'trigger',
                params: {
                    id: trigger.id
                },
                query: this.$route.query
            })
        }
    },
    mounted () {
        if (this.$route.query.type && this.$route.query.formId) {
            this.$store.commit('triggerInfo', {
                triggerId: this.$route.params.id,
                triggerType: this.$route.query.type,
                triggerFormId: this.$route.query.formId
            })
        }
        this.$store.dispatch('getTriggers')
    }
}
</script>

<style lang="scss">
    .trigger-menu {
        padding-top: 20px;
        height: calc(100% - 20px);
        .custom-tree-zero-level-node {
            margin-left: 6px;
            padding-right: 15px;
            color: rgb(81, 130, 228);
            font-weight: 600;
            font-size: 16px;
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .custom-tree-node-other-level-node {
            padding-right: 15px;
            font-size: 14px;
            color: #333;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }
</style>
