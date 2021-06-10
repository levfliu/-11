<template>
  <div>
    <div class="content">
      <span style="margin: 0 20px 0 0"><i>*</i>更新数据</span>
      <div>
        <div class="one-line" v-for="(i, id) in query" :key="id">
          <el-select v-model="i.col_name" size="small">
            <el-option
              v-for="j in idToLabel"
              :key="j.id"
              :label="j.label"
              :value="j.id"
            ></el-option>
          </el-select>
          <el-input
            v-if="
              i.col_name == 'aea00dac5303bd57a3ed03503f867f7b' ||
              i.col_name == '369c1be146a42e180e3cb0ef9fe1ef81' ||
              i.col_name == '3cd89e5496991c5a5f191321e1450229' ||
              i.col_name == '3cd89e5496991c5a5f191321e1450229' ||
              i.col_name == '19a58cf04ae34050c3da0ec2d0ce4582' ||
              i.col_name == '8970573e78e9a6050c61efbdaa682bcf' ||
              i.col_name == 'fe66e59a1479764b8fc3fa4c93486bb6' ||
              i.col_name == 'f816e31d3220838ce5a5fc83e00afb5a' ||
              i.col_name == 'e4dd5133d5fdeafd16c05a9253e0e838'
            "
            size="small"
          ></el-input>
          <el-checkbox-group
            v-model="column"
            v-if="i.col_name == 'fc6d8f68267190e7228346e6f94f355f'"
          >
            <el-checkbox label="选项1"></el-checkbox>
            <el-checkbox label="选项2"></el-checkbox>
            <el-checkbox label="选项3"></el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      responseDetailData: {},
      idToLabel: [
        { id: "aea00dac5303bd57a3ed03503f867f7b", label: "单行文本" },
        { id: "369c1be146a42e180e3cb0ef9fe1ef81", label: "多行文本" },
        { id: "fc6d8f68267190e7228346e6f94f355f", label: "多选框" },
        { id: "e5e2ac7000677b9ace23f4af6291644b", label: "创建人" },
        { id: "6ef5ed7a892ff6165fa5da7396559bd6", label: "创建时间" },
        { id: "589c0813c41e863bc82ff4d0a9c9878d", label: "最后修改人" },
        { id: "dd78e825e299f3902a0bcdb5d2666515", label: "最后修改时间" },
        { id: "3cd89e5496991c5a5f191321e1450229", label: "创建人IP地址" },
        { id: "19a58cf04ae34050c3da0ec2d0ce4582", label: "最后修改人IP地址" },
        { id: "e0f24061b0beb3092d869473ec1fe1df", label: "部门" },
        { id: "8970573e78e9a6050c61efbdaa682bcf", label: "流程名称" },
        { id: "cdadbd9dea7ade6c07adc32a61547239", label: "流程实例名称" },
        { id: "5eb44fe160f7e850f944938ed3f53095", label: "业务状态" },
        { id: "fe66e59a1479764b8fc3fa4c93486bb6", label: "流程状态" },
        { id: "f816e31d3220838ce5a5fc83e00afb5a", label: "经办人" },
        { id: "e4dd5133d5fdeafd16c05a9253e0e838", label: "流程实例ID" },
      ],
      query: [
        {
          col_value: "rrr",
          col_name: "aea00dac5303bd57a3ed03503f867f7b",
          asset_id: "e8cd852b5640416eba558bc9726561d3",
          col_datatype: 0,
        },
        {
          col_value: "www",
          col_name: "369c1be146a42e180e3cb0ef9fe1ef81",
          asset_id: "e8cd852b5640416eba558bc9726561d3",
          col_datatype: 0,
        },
        {
          col_value: '["2"]',
          col_name: "fc6d8f68267190e7228346e6f94f355f",
          asset_id: "e8cd852b5640416eba558bc9726561d3",
          col_datatype: 0,
        },
      ],
      column: [],
    };
  },
  props: ["responseDetail"],
  mounted() {
    // this.responseDetailData = JSON.parse(this.responseDetail);
    console.log(this.responseDetailData);
  },
};
</script>

<style lang="scss">
.content {
  display: flex;
  flex-direction: row;

  .one-line {
    .el-input {
      width: 260px;
    }
    .el-checkbox-group {
      width: 260px;
      display: inline-block;
    }
  }
}
</style>