<template>
    <div>
        <el-tree class="service-menu"
            :data="treeData"
            node-key="id"
            default-expand-all
            :highlight-current="true"
            :check-on-click-node="true"
            :current-node-key="currentCatalogId"
            :expand-on-click-node="false"
            :props="defaultProps">
            <span class="custom-tree-node" slot-scope="{ node, data }"
                v-bind:class="{
                    'custom-tree-zero-level-node': data.level === 0,
                    'custom-tree-node-other-level-node': data.level !== 0}"
                @click="serviceCatalog(data)"    >
                <span>{{ node.label }}</span>
                <span v-if="data.level === 0">
                    <el-button plain size="medium" icon="el-icon-plus" @click.stop="addCatalog(data)"
                        class="catalog-level-button"></el-button>
                </span>
                <div v-if="data.level !== 0 && data.owner != 0">
                    <el-button plain size="small" icon="el-icon-delete" @click.stop="deleteCatalog(data)"
                        class="catalog-level-button"></el-button>
                    <el-button plain size="small" icon="el-icon-plus" @click.stop="addCatalog(data)"
                        class="catalog-level-button"></el-button>
                </div>
            </span>
        </el-tree>
        <el-dialog
            title="增加目录"
            :visible.sync="centerDialogVisible"
            width="30%"
            center>
            <el-form :model="catalogData">
                <el-form-item label="目录名称" :label-width="formLabelWidth">
                    <el-input v-model="catalogData.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="上级目录" :label-width="formLabelWidth">
                    <el-select v-model="catalogData.parentId" placeholder="请选择上级目录">
                        <el-option :label="catalogData.parentName"
                            :value="catalogData.parentId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="目录排序" :label-width="formLabelWidth">
                    <el-input v-model="catalogData.sort" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="目录描述" :label-width="formLabelWidth">
                    <el-input v-model="catalogData.description" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelAddCatalog()">取 消</el-button>
                <el-button type="primary" @click="configAddCatalog()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getPlusOne } from '../../util/func.js'

export default {
    name: 'serviceMenu',
    data () {
        return {
            formLabelWidth: '120px',
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            catalogData: {
                name: '',
                parentId: '',
                parentName: '',
                description: '',
                type: 0,
                sort: 0
            }
        }
    },
    components: {
    },
    computed: {
        currentCatalogId () {
            var catalog = this.$store.getters.serviceCatalog
            if (!catalog && this.$route.query.catalog !== null) {
                catalog = this.$route.query.catalog
            }
            return catalog
        },
        centerDialogVisible () {
            return this.$store.getters.centerDialogVisible
        },
        treeData () {
            var type = this.$store.getters.serviceType
            var service = this.$store.getters.serviceList.find(s => s.type === type)
            if (service && service.catalogs) {
                return service.catalogs
            } else {
                return []
            }
        }
    },
    methods: {
        serviceCatalog (data) {
            this.$store.commit('serviceCatalog', data.id)
            this.$router.push({
                name: 'service',
                query: {
                    catalog: data.id,
                    type: this.$store.getters.serviceType
                }
            })
            if (this.$store.getters.serviceType === 18) {
                this.$store.dispatch('getForms', this.$store.getters.serviceCatalog)
            }
            if (this.$store.getters.serviceType === 22) {
                console.log("获取应用列表");
                this.$store.dispatch("getApps","all")
            }
        },
        cancelAddCatalog () {
            this.$store.commit('centerDialogVisible', false)
        },
        configAddCatalog () {
            this.$store.dispatch('addCatalog', this.catalogData)
        },
        addCatalog (data) {
            this.catalogData.parentName = data.name
            this.catalogData.parentId = data.id
            this.catalogData.type = this.$store.getters.serviceType
            this.catalogData.sort = getPlusOne(data.children, 'sort')
            this.$store.commit('centerDialogVisible', true)
        },
        deleteCatalog (data) {
            this.$confirm('确认删除该目录?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.$store.dispatch('deleteCatalog', data)
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
        }
    },
    mounted () {
        if (!this.$route.query.catalog || this.$route.query.catalog === null) {
            this.$store.commit('serviceCatalog', 'defaultTeam')
        } else {
            this.$store.commit('serviceCatalog', this.$route.query.catalog)
        }

        var typeValue
        if (!this.$route.query.type || this.$route.query.type === null) {
            typeValue = 0
        } else {
            typeValue = parseInt(this.$route.query.type)
        }

        this.$store.commit('serviceType', typeValue)
        this.$store.dispatch('getCatalogs', {type: typeValue})
    }
}
</script>

<style lang="scss">
    .service-menu {
        padding-top: 20px;
        height: calc(100% - 20px);
        .el-icon-caret-right {
            font-size: 16px;
        }
        .el-tree-node__content {
            height: 40px !important;
        }
        .catalog-level-button {
            background: transparent;
            border: 0px solid #dcdfe6;
            margin: 0px !important;
            padding: 5px !important;
            width: 14px !important;
            height: 14px !important;
        }
        .catalog-level-button:hover {
            background: transparent;
        }
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
