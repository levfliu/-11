<template>
  <div>
    <div style="height:40px;margin">
      <el-button
        v-bind:style="{
          float: view.button_layout_type == 1 ? 'left' : 'right',
        }"
        type="primary"
        @click="addOneLine"
        >+ &nbsp;新增</el-button
      >
    </div>
    <br />
    <viewListPage :view="view" :formItemList="formItemList"></viewListPage>
  </div>
</template>

<script>
import viewListPage from "./components/viewListPage";
export default {
  data() {
    return {
      objectId: "",
    };
  },
  components: { viewListPage },
  computed: {
    view() {
      const view = this.$store.getters.views.filter(
        (i) => this.$route.query.viewId == i.id
      );
      if (view.length == 0) return {};
      else return view[0];
    },
    formItemList() {
      var formItemList = JSON.parse(
        JSON.stringify(this.$store.getters.formItemList)
      );
      for (var item in formItemList) {
        for (var key in formItemList[item]) {
          let _key = key.split("_")[0];
          formItemList[item][_key] = formItemList[item][key];
        }
      }
      if (this.view.filter_fill_line && formItemList.length < 10) {
        formItemList.push(...new Array(10 - formItemList.length));
        console.log(formItemList);
      }
      return formItemList;
    },
  },
  methods: {
    addOneLine() {
      const url =
        window.location.href.split("#")[0] +
        "#/form/" +
        this.$route.query.objectId;
      window.open(url);
    },
  },
  watch: {
    view(_new) {},
  },
  mounted() {
    this.$store.commit("objectId", this.$route.query.objectId);
    const formObject = this.$store.getters.formObject;
    formObject.id = this.$route.query.objectId;
    formObject.name = this.$route.query.formName;
    this.$store.dispatch("getViews").then((i) => {
      this.$store.dispatch("formItemListDetail");
    });
  },
};
</script>

<style>
</style>