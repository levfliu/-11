<template>
  <el-form :model="dataConfig" class="data-config-wrapper" label-position="top">
    <el-form-item label="数据类型">
      <el-select
        class="data-config-type-select"
        v-model="dataConfig.dataType"
        placeholder="请选择"
        size="mini"
      >
        <el-option
          v-for="item in dataTypeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-table
        v-if="this.dataConfig.dataType === 'static'"
        :data="dataConfig.dataOptions"
        style="width: 100%"
      >
        <el-table-column label="值" prop="value"> </el-table-column>
        <el-table-column label="标签" prop="label"> </el-table-column>
        <el-table-column align="right">
          <template slot="header">
            <i class="el-icon-plus data-config-button" @click="handleAdd()"></i>
          </template>
          <template slot-scope="scope">
            <i
              class="el-icon-edit data-config-button"
              @click="handleEdit(scope.$index, scope.row)"
            ></i>
            <i
              class="el-icon-delete data-config-button"
              @click="handleDelete(scope.$index, scope.row)"
            ></i>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-dialog
      class="data-config-option-dialog"
      title="编辑选项"
      :visible.sync="dialogVisible"
      width="20%"
      :before-close="handleClose"
    >
      <el-form
        ref="form"
        :model="editOption"
        label-position="right"
        label-width="50px"
      >
        <el-form-item label="值:">
          <el-input v-model="editOption.value" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="标签:">
          <el-input v-model="editOption.label" size="mini"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="saveOption" size="mini"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      dataTypeOptions: [
        {
          value: "static",
          label: "静态数据",
        },
        {
          value: "dict",
          label: "字典数据",
        },
        {
          value: "asset",
          label: "资产数据",
        },
      ],
      value: "static",
      dialogVisible: false,
      editOption: {
        value: "1",
        label: "选项",
      },
    };
  },
  props: ["dataConfig"],
  components: {},
  computed: {},
  methods: {
    saveOption() {
      this.dialogVisible = false;
      var option = this.dataConfig.dataOptions.find(
        (o) => o.value === this.editOption.value
      );
      if (option) {
        option.label = this.editOption.label;
      } else {
        this.dataConfig.dataOptions.push(this.editOption);
      }
    },
    handleAdd() {
      this.dialogVisible = true;
    },
    handleEdit(index, option) {
      this.dialogVisible = true;
      this.editOption = option;
    },
    handleClose() {},
    handleDelete(index, array) {
      this.dataConfig.dataOptions.splice(index, 1);
    },
  },
  mounted() {},
  created() {
    this.dataConfig.dataType = "static";
  },
};
</script>

<style lang="scss">
.data-config-wrapper {
  .data-config-option-dialog {
    .el-form-item {
      display: flex;
      margin-bottom: 10px;
      align-items: center;
      .el-form-item__content {
        margin-left: 10px !important;
        flex: 1;
      }
    }
  }
  .data-config-type-select {
    width: 100%;
  }
  .data-config-button {
    color: #0454f2;
    cursor: pointer;
  }
}
</style>
