<template>
  <div>
    <el-tree
      class="view-menu"
      :data="treeData"
      node-key="id"
      default-expand-all
      :highlight-current="true"
      :check-on-click-node="true"
      :current-node-key="currentTriggerId"
      :expand-on-click-node="false"
      :props="defaultProps"
    >
      <span
        class="custom-tree-node"
        slot-scope="{ node, data }"
        v-bind:class="{
          'custom-tree-zero-level-node': data.type === 'system',
          'custom-tree-node-other-level-node': data.type !== 'system',
        }"
        @click="openView(data)"
      >
        <span>{{ node.label }}</span>
        <span v-if="data.type === 'system'">
          <el-button
            type="text"
            size="medium"
            icon="el-icon-plus"
            @click.stop="addView()"
            class="catalog-level-button"
          ></el-button>
        </span>
        <span v-else>
          <el-button
            type="text"
            size="small"
            icon="el-icon-delete"
            @click.stop="deleteView(data)"
            class="catalog-level-two-button"
          ></el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
import { guid } from "../../util/func";

export default {
  name: "viewMenu",
  data() {
    return {
      formLabelWidth: "120px",
      defaultProps: {
        children: "children",
        label: "view_name",
      },
    };
  },
  components: {},
  computed: {
    currentTriggerId() {
      return "";
    },
    treeData() {
      var viewList = this.$store.getters.views;
      var treemenu = [
        {
          id: 1,
          view_name: "视图",
          type: "system",
          children: [],
        },
      ];
      treemenu[0].children = viewList;
      return treemenu;
    },
  },
  watch: {
    treeData(_new, old) {
      if (this.$route.name == "view") {
        // console.log(this.$route.params.id);
        // 处理直接由view路由打开页面的事件，需要先写完登录验证。
      }
    },
  },
  methods: {
    deleteView(data) {
      this.$confirm("确认删除该视图" + data.show_name, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("deleteView", data.id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    openView(data) {
      if (data.type === "system") {
        return;
      }
      console.log(data);
      this.$store.commit("editView", data);
      this.$store.commit("viewId", data.id);
      //   this.$router.push({
      //     name: "view",
      //     params: {
      //       id: data.id,
      //     },
      //     query: this.$route.query,
      //   });
    },
    addView() {
      const newView = {
        version: "v2.0",
        view_name: "新增视图",
        id: "e4f90c0a9d87427297388119c5283a37",
        objectId: "44eb5c42-fe24-4905-b4e3-1329ff565467",
        data_auth_type: "3",
        is_show: true,
        catalog_id: "default",
        show_name: "新增视图",
        is_show_page: true,
        follow_apply: false,
        formViewColumnMappingList: [],
        formViewDisplay: [],
        conditionList: [],
        has_article_source: false,
        view_detail_mode: "0",
        orders: [],
        modeColumnList: [],
        formViewConfigPlus: {},
        formViewDetailButtons: [],
        button_layout_type: 1,
        tree_parent_column: "",
        button_show_type: 1,
        filter_fill_line: false,
        order_number_display: false,
        appendList: [],
        export_encrypt_type: "0",
        form_width: 200,
        correlation_can_search: false,
        correlation_search_fields: "",
        correlation_search_fields_data_type: "0",
        card_group_switch: false,
        form_functionality: "0,1,2,7",
        fromViewColumns: [],
        view_list_mode: "1",
        calendar_content_config: "[1]",
        calendar_source: "1",
        calendar_content: "",
        calendar_component_id: "",
        timeline_content: "",
        information_display_type: 1,
        information_title_component: "",
        information_pic_switch: true,
        information_pic_component: "",
        information_content_switch: true,
        information_content_component: "",
        information_time_switch: true,
        information_time_component: "",
        information_keyword_switch: false,
        information_keyword_component: "",
        timeline_time_component: "",
        timeline_user_component: "",
        add_alias: "新增",
        edit_alias: "编辑",
        delete_alias: "删除",
        view_alias: "详情",
        variables: [],
        cal_condition: "{}",
        filter_location: "top",
        formViewCorrelationList: [],
        formViewAuths: [],
        diy_data_auth: [],
        formViewButtons: [],
        is_export_asset_property: [],
        listPage: false,
        formViewColumns:[],
        export_file_name_fixed_value:""
      };
      newView.id = guid();
      newView.objectId = this.$store.getters.objectId;
      this.$store.commit("pushView", newView);
      this.$store.commit("editView", newView);
      this.$store.commit("viewId", newView.id);
      //   this.$router.push({
      //     name: "view",
      //     params: {
      //       id: newView.id,
      //     },
      //     query: this.$route.query,
      //   });
    },
  },
  mounted() {
    if (this.$route.query.type && this.$route.query.formId) {
      this.$store.commit("objectId", this.$route.query.formId);
      this.$store.dispatch("getFields", this.$route.query.formId);
      this.$store.commit("viewType", this.$route.query.type);
    }
    this.$store.dispatch("getViews");
    // console.log(guid("_"));
  },
};
</script>

<style lang="scss">
.view-menu {
  padding-top: 20px;
  height: calc(100% - 20px);
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
