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
    <viewListPage
      :objectId="objectId"
      :viewId="viewId"
      :formName="formName"
    ></viewListPage>
  </div>
</template>

<script>
import viewListPage from "./components/viewListPage";
export default {
  data() {
    return {
      objectId: "",
      viewId: "",
      formName: "",
      formItemList: [],
      view: {},
    };
  },
  components: { viewListPage },
  computed: {},
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
    this.objectId = this.$route.query.objectId;
    this.viewId = this.$route.query.viewId;
    this.formName = this.$route.query.formName;
    // this.$store.commit("objectId", this.$route.query.objectId);
    // const formObject = this.$store.getters.formObject;
    // formObject.id = this.$route.query.objectId;
    // formObject.name = this.$route.query.formName;
  },
};
</script>

<style>
</style>