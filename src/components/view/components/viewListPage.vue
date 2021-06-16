<template>
  <div>
    <button @click="tip">test</button>

    <div v-if="loading" class="loading">
      <a-spin />
    </div>
    <el-table v-else stripe :data="formItemList" border style="width: 100%">
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
  props: ["objectId", "viewId", "formName"],
  data() {
    return {
      formItemList: [],
      view: {},
      loading: true,
    };
  },
  watch: {
    objectId(_new, old) {
      this.change();
    },
    viewId(_new, old) {
      this.change();
    },
    formName(_new, old) {
      this.change();
    },
  },
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
    change() {
      this.loading = true;
      this.$store.dispatch("getViews", this.objectId).then((views) => {
        const view = views.filter((i) => this.viewId == i.id);
        if (view.length == 0) this.view = {};
        else this.view = view[0];

        const _object = {
          id: this.viewId,
          name: this.formName,
        };
        this.$store
          .dispatch("formItemListDetailFromItem", _object)
          .then((j) => {
            var formItemList = j;
            for (var item in formItemList) {
              for (var key in formItemList[item]) {
                let _key = key.split("_")[0];
                formItemList[item][_key] = formItemList[item][key];
              }
            }
            this.formItemList = formItemList;
            this.loading = false;
          });
      });
    },
    tip() {
      console.log(this.view);
      console.log(this.formItemList);
      console.log(this.objectId);
      console.log(this.viewId);
    },
  },
  mounted() {
    this.change();
  },
};
</script>

<style>
.loading {
  text-align: center;
}
</style>