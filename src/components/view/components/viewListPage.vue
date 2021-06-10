<template>
  <div>
    <el-table stripe :data="formItemList" border style="width: 100%">
      <el-table-column
        v-if="view.order_number_display"
        width="50"
        label="序号"
        type="index"
      >
      </el-table-column>
      <el-table-column
        v-for="i in view.formViewColumns"
        :key="i.value"
        :prop="i.value"
        :label="i.text"
        :width="i.width"
        sortable
      >
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope" v-if="scope.row">
          <el-button
            @click="handleClickDetail(scope.row)"
            type="text"
            size="small"
            >查看</el-button
          >
          <el-button
            @click="handleClickEdit(scope.row)"
            type="text"
            size="small"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: ["formItemList", "view"],
  methods: {
    handleClickDetail(i) {
      const url =
        window.location.href.split("#")[0] +
        "#/form/" +
        this.$route.query.objectId +
        "?type=detail&recordId=" +
        i.RecordId;
      window.open(url);
    },
    handleClickEdit(i) {
      const url =
        window.location.href.split("#")[0] +
        "#/form/" +
        this.$route.query.objectId +
        "?type=update&recordId=" +
        i.RecordId;
      window.open(url);
    },
  },
};
</script>

<style>
</style>