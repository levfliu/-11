<template>
  <div class="parameter">
    <div class="title">
      <span>参数名称</span>
      <span>参数类型</span>
      <span>参数值</span>
    </div>
    <div
      class="parameter-content flex-row align-center"
      v-for="(i, id) in button_param"
      :key="id"
    >
      <el-input v-model="i.name" size="small"></el-input>
      <el-select v-model="i.type" size="small" @change="i.value = ''">
        <el-option label="固定值" value="fixed_value"></el-option>
        <el-option label="资产字段" value="assetColumn"></el-option>
        <el-option label="变量" value="variabe"></el-option>
      </el-select>

      <el-select v-if="i.type == 'fixed_value'" size="small" v-model="i.value">
        <el-option label="表单主键" value="data_id"></el-option>
        <el-option label="表单id" value="form_id"></el-option>
      </el-select>
      <el-select
        v-else-if="i.type == 'assetColumn'"
        size="small"
        v-model="i.value"
      >
        <el-option
          v-for="i in assetColumn"
          :key="i"
          :label="i"
          :value="i"
        ></el-option>
      </el-select>
      <el-select v-else size="small" v-model="i.value"> </el-select>
      <i
        @click="deleteParam(id)"
        class="el-icon-remove"
        style="color: red; font-size: 28px"
      ></i>
    </div>
    <el-button
      @click="addParam()"
      style="margin: 20px 0 0 0"
      type="primary"
      size="small"
      >+ 添加</el-button
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      button_param: [],
      assetColumn: [
        "单行文本",
        "多行文本",
        "多选框",
        "创始人",
        "创建时间",
        "最后修改人",
        "最后修改时间",
        "创建人IP地址",
        "最后修改人IP地址",
        "部门",
        "流程名称",
        "流程实例名称",
        "业务状态",
        "流程状态",
        "经办人",
        "流程实例ID",
      ],
    };
  },
  props: ["buttonParam"],
  methods: {
    deleteParam(i) {
      this.button_param.splice(i, 1);
    },
    addParam() {
      this.button_param.push({
        name: "请输入",
        type: "fixed_value",
        value: "data_id",
      });
    },
  },
  mounted() {
    this.button_param = JSON.parse(this.buttonParam);
  },
};
</script>

<style lang="scss">
.parameter {
  position: absolute;
  margin: 20px 0 0 0;
  .title {
    span {
      margin: 20px 160px 30px 0;
    }
  }
  .el-input {
    width: 200px;
    margin: 0 20px 0 0;
  }
  .parameter-content {
    position: relative;
    margin: 20px 0 0 0;
  }
}
</style>