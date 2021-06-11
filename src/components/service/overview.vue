<template>
    <div class="overview animate__animated animate__slideInUp">
        <el-row :gutter="20" class="overview-detail">
            <el-col :span="6" v-for="(func, index) of systemFunction" :key="index">
                <div class="overview-function-card" v-show="func.showDetail" @mouseover="showList(index)">
                    <div class="overview-function-title">{{func.title}}</div>
                    <div class="overview-function-content">{{func.content}}</div>
                    <div class="overview-function-images">
                        <img src="../../../static/images/function-arrow.png" />
                        <img :src="'../../../static/images/' + func.img + '.png'" />
                    </div>
                </div>
                <div class="overview-function-list" v-show="!func.showDetail" @mouseleave="closeList(index)">
                    <div class="overview-function-button" v-for="(subfunc, subindex) of func.subFunction" :key="subindex">{{subfunc.label}}</div>
                </div>
            </el-col>
        </el-row>
        <div class="overview-create">
            <div class="overview-create-detail">
                <div class="overview-my-application">我的应用</div>
                <div class="overview-no-application">暂无应用！快速搭建自己的应用吧</div>
                <div class="overview-no-code">零代码大数据应用构建，像堆积木般简单</div>
                <el-button type="primary" size="150">创建应用</el-button>
            </div>
            <img src="../../../static/images/create-application.png" />
        </div>
    </div>
</template>

<script>

export default {
    data () {
        return {
            outsiteRotate: 0,
            insiteRotate: 0
        }
    },
    computed: {
        systemFunction () {
            return this.$store.getters.systemFunction
        }
    },
    methods: {
        showList (index) {
            this.$store.commit('showOverviewList', index)
        },
        closeList (index) {
            this.$store.commit('closeOverviewList', index)
        }
    },
    created () {
    }
}
</script>

<style lang="scss">
    .overview {
        // height: 100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        .overview-function-button {
            flex: 1 1 0%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 18px;
            color: rgb(255, 255, 255);
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }
        .overview-function-list {
            height: 75%;
            display: flex;
            flex-direction: column;
            background: rgb(4, 84, 242);
            padding: 27px 90px;
            overflow: hidden;
            margin-bottom: 30px;
            border-radius: 16px;
        }
        .overview-no-code {
            color: #999;
            font-weight: 300;
            font-size: 18px;
            line-height: 25px;
            padding-bottom: 56px;
        }
        .overview-no-application {
            padding-top: 80px;
            color: #213764;
            font-weight: 600;
            font-size: 24px;
            line-height: 34px;
            padding-bottom: 8px;
        }
        .overview-my-application {
            margin-right: 32px;
            color: rgb(12, 13, 14);
            font-weight: 600;
            font-size: 20px;
        }
        .overview-function-images {
            flex: 1;
            display: flex;
            flex-direction: row;
            img {
                flex: 1;
                overflow: hidden;
            }
        }
        .overview-function-title {
            font-weight: 500;
            font-size: 28px;
            line-height: 39px;
            color: rgb(255, 255, 255);
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            padding-bottom: 0.833vw;
            margin-bottom: 0.833vw;
        }
        .overview-function-content {
            font-size: 14px;
            line-height: 20px;
            color: rgba(255, 255, 255, 0.7);
            z-index: 2;
        }
        .overview-function-card {
            background: rgb(4, 84, 242);
            padding: 30px;
            border-radius: 16px;
            overflow: hidden;
            margin-bottom: 30px;
        }
        .overview-detail {
            flex: 1;
            overflow: hidden;
            margin-bottom: 30px;
            .el-col {
                flex: 1;
                height: 100%;
            }
        }
        .overview-create {
            display: flex;
            flex-direction: row;
            flex: 1;
            padding: 30px;
            background: #fff;
            overflow: hidden;
            border-radius: 16px;
            .overview-create-detail {
                flex: 1;
            }
            img {
                flex: 1;
                overflow: hidden;
            }
        }
    }

</style>
