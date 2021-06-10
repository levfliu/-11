<template>
  <div class="listField">
    <div class="row">
      <div class="col-1">列表字段</div>
      <div class="col-3">
        <div class="left-list-button">
          待选字段 <span @click="chooseAll">全部选择</span>
        </div>
        <draggable class="list-group" :list="list" group="people" @change="log">
          <div class="list-group-item" v-for="i in list" :key="i.value">
            {{ i.text }}
          </div>
        </draggable>
      </div>
      <i class="el-icon-sort jiaohuan"></i>
      <div class="col-3 right">
        <div class="left-list-button">
          在列表中显示 <span @click="removeAll">全部移除</span>
        </div>
        <draggable
          class="list-group"
          :list="show_list"
          group="people"
          @change="log"
        >
          <div class="list-group-item" v-for="i in show_list" :key="i.value">
            <el-input size="small" v-model="i.text"></el-input>
            隐藏提示
            <el-switch v-model="i.hide_hint" active-color="#13ce66">
            </el-switch>
            <el-input size="small" v-model="i.width"></el-input>
          </div>
        </draggable>
      </div>
    </div>
    <div class="table_wrapper">
      <div
        style="color: rgb(153, 153, 153); padding: 10px 0px; font-size: 14px"
      >
        预览效果（预览仅供参考字段宽度样式）
      </div>
      <el-table border style="width: 100%">
        <el-table-column
          v-for="i in show_list"
          :key="i.value"
          :prop="i.value"
          :label="i.text"
          :width="i.width"
        >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
const initialList = `[
      {"text":"单行文本","value":"el-input","hide_hint":false,"width":200},
      {"text":"多行文本","value":"multi_line_text","hide_hint":false,"width":200},
      {"text":"多选框","value":"el-checkbox-group","hide_hint":false,"width":200},
      {"text":"创建人","value":"CreatedBy","hide_hint":false,"width":200},
      {"text":"创建时间","value":"CreatedAt","hide_hint":false,"width":200},
      {"text":"最后修改人","value":"LastModifiedBy","hide_hint":false,"width":200},
      {"text":"最后修改时间","value":"last_change_time","hide_hint":false,"width":200},
      {"text":"创建人IP地址","value":"creater_IP","hide_hint":false,"width":200},
      {"text":"最后修改人IP地址","value":"last_modifier_IP","hide_hint":false,"width":200},
      {"text":"部门","value":"part","hide_hint":false,"width":200}
  ]`;
export default {
  name: "two-lists",
  display: "Two Lists",
  order: 1,
  components: {
    draggable,
  },
  data() {
    return {
      list: [],
      show_list: [],
    };
  },
  computed: {
    editView() {
      return this.$store.getters.editView;
    },
  },
  watch: {
    show_list: {
      handler(_new, old) {
        this.editView.formViewColumns = _new;
      },
      deep: true,
    },
  },
  methods: {
    chooseAll() {
      this.show_list = JSON.parse(initialList);
      this.list = [];
    },
    removeAll() {
      this.list = JSON.parse(initialList);
      this.show_list = [];
    },
    log: function (evt) {
      //   window.console.log(evt);
    },
  },
  mounted() {
    const editView = this.$store.getters.editView;
    this.show_list = editView.formViewColumns;
    this.list = JSON.parse(initialList).filter(
      (i) =>
        this.show_list
          .reduce((p, c) => p.concat(c.value), [])
          .indexOf(i.value) < 0
    );
  },
};
</script>
<style lang="scss">
.listField {
  .row {
    .jiaohuan {
      font-size: 42px;
      transform: rotate(90deg);
      width: 50px;
      height: 50px;
      margin: 180px 50px 0 20px;
      color: #ccc;
    }
    font-size: 14px;
    padding: 10px;
    display: flex;
    flex-direction: row;
    height: 500px;
    .col-1 {
      margin: 0 20px 0 0;
    }
    .col-3 {
      .left-list-button {
        height: 40px;
        display: flex;
        padding: 0 30px;
        justify-content: space-between;
        align-items: center;
        span {
          cursor: pointer;
          color: rgb(81, 130, 228);
        }
      }
      .list-group {
        height: 400px;
        overflow: auto;
      }
      .list-group-item {
        min-width: 100px;
        height: 40px;
        background: #d9e6ff;
        border: 1px solid #5182e4;
        border-radius: 4px;
        font-size: 14px;
        line-height: 40px;
        color: #5182e4;
        padding: 0 10px;
        margin: 6px 10px;
        cursor: grab;
        .el-input {
          width: 100px;
        }
      }
      width: 250px;
      margin: 0 20px 0 0;
      height: 500px;
      background: #f7f7f7;
    }
    .right {
      width: 460px;
    }
  }
  .table_wrapper {
    padding: 6px;
    width: 800px;
    background: #f7f7f7;
    margin: 20px 0 50px 76px;
  }
}
</style>