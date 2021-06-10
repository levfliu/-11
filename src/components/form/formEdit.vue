<template>
  <div class="form-edit" @click="openConfigItem(0)">
    <div class="form-header">
      <el-image
        style="width: 50px; height: 50px"
        src="/static/images/form/form-icon.png"
        fit="fill"
      ></el-image>
      <div class="form-name">{{ formObject.name }}</div>
    </div>
    <el-form
      v-bind="formData"
      :model="formData"
      :label-position="formObject.labelAlignMode"
      :inline="formObject.inline"
      :label-width="formObject.labelWidth + '%'"
      class="form-edit-form"
    >
      <div
        class="form-edit-area"
        ref="formArea"
        @drop="drop"
        @dragover="dragover"
        v-bind:class="{
          'form-edit-background': isEdit,
        }"
        :style="
          formObject.inline ? 'flex-direction: row;' : 'flex-direction: column;'
        "
      >
        <bzy-form-item
          v-for="(item, index) in formObject.formColumnList"
          :key="index"
          :item="item"
          :isEdit="isEdit"
        >
        </bzy-form-item>
      </div>
      <el-divider></el-divider>
      <el-form-item class="form-commit-bottons" v-if="formType !== 'detail'">
        <el-button type="primary" @click="onSubmit" :disabled="isEdit"
          >提交</el-button
        >
        <el-button @click="onReset" :disabled="isEdit">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import emptyContent from "../system/emptyContent";
import draggable from "vuedraggable";
import Sortable from "sortablejs";
import { guid } from "../../util/func";
import formItem from "./formItem.vue";
import defaultFields from "./defaultFields";

export default {
  data() {
    return {
      formType: "",
    };
  },
  components: {
    "empty-content": emptyContent,
    draggable,
    Sortable,
    "bzy-form-item": formItem,
  },
  computed: {
    formObject() {
      return this.$store.getters.formObject;
    },
    formData() {
      return this.$store.getters.formData;
    },
    isEdit() {
      var routerName = this.$router.history.current.name;
      if (routerName === "formEdit" || routerName === "formAdd") {
        return true;
      }
      return false;
    },
  },
  methods: {
    openConfigItem(index) {
      this.$store.commit("openItems", ["" + index]);
    },
    dragover(event) {
      event.preventDefault();
    },
    removeItem(item) {
      this.$store.commit("setEditField", null);
      this.$store.commit("removeField", item);
    },
    drop(event) {
      var type = event.dataTransfer.getData("form-item");
      if (type) {
        const defaultName = `${type}_${new Date().getTime()}`;
        const formItemConfig = this.$store.getters.formItem(type);
        const newDefaultFields = JSON.parse(JSON.stringify(defaultFields));
        newDefaultFields.assetColumnList[0].name = defaultName;
        newDefaultFields.assetColumnList[0].label = type;
        const newItem = {
          ...newDefaultFields,
          ...formItemConfig,
          id: guid(),
          type: type,
          name: defaultName,
        };
        this.$store.commit("addField", newItem);
      }
      event.preventDefault();
    },
    onSubmit() {
      if (this.isEdit) {
        return;
      }
      if (this.formType == "update") {
        this.$store.dispatch("formUpdate", this.$route.query.recordId);
        return;
      }
      this.$store.dispatch("formSubmit");
    },
    onReset() {
      if (this.isEdit) {
        return;
      }
      Object.keys(this.$store.getters.formData).forEach(
        (key) => (this.$store.getters.formData[key] = "")
      );
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  mounted() {
    this.formObject.id = this.$router.history.current.params.formId;
    this.$store.dispatch("getForm").then((i) => {
      this.formType = this.$route.query.type;
      this.$store.dispatch("formItemDetail", this.$route.query.recordId);
    });
    var thisObj = this;
    if (!this.isEdit) return;
    setTimeout(() => {
      let isAdd = false;
      thisObj.sortable = Sortable.create(thisObj.$refs.formArea, {
        group: "component",
        animation: 200,
        onStart: () => {
          thisObj.dragging = true;
          thisObj.showHelper = null;
        },
        onEnd: (e) => {
          thisObj.dragging = false;
        },
        onSort: (e) => {
          // 添加也会触发onSort， 用个变量去来区分
          if (!isAdd) {
            // thisObj.$store.commit("sortFields", e);
          }
          isAdd = false;
        },
        onAdd: (e) => {
          const item = e.item.__item__;
          if (item) {
            isAdd = true;
            thisObj.handleDrop(item, e.newIndex);
          }
          thisObj.$nextTick(() => {
            e.item.parentNode.removeChild(e.item);
          });
        },
      });
    }, 1000);
  },
  created() {},
};
</script>

<style lang="scss">
.form-edit {
  flex: 1;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  .form-header {
    background-color: white;
    display: flex;
    padding: 20px;
    align-items: center;
  }

  .form-edit-area {
    min-height: 100px;
    padding: 30px;
    display: flex;
    justify-items: center;
    align-items: center;
    .el-form-item {
      width: calc(100% - 60px);
      padding: 10px;
      //   border: 2px dotted transparent;
    }
    // .form-edit-item:hover {
    //   border: 2px dotted #67c23a !important;
    //   background: rgba(103, 194, 58, 0.2) !important;
    // }
  }
  .el-divider--horizontal {
    margin: 10px 0px;
  }
  .form-edit-background {
    background-image: url("../../../static/images/form-edit-background.svg");
  }
  .form-edit-form {
    background-color: white;
    margin-top: 10px;
    position: relative;
    .form-edit-form-mask {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 99;
    }
  }
  .form-commit-bottons {
    padding: 30px;
  }
  .form-name {
    margin-left: 20px;
  }
  .el-page-header__content {
    flex: 1;
    display: flex;
    align-items: center;
  }
  .el-page-header {
    padding: 0px 20px;
    height: 80px;
    background-color: white;
    line-height: 80px;
    box-shadow: rgb(6 35 90 / 7%) 0px 0px 16px;
  }
}
</style>
