<template>
  <el-menu class="form-menu" :default-openeds="['0', '1', '2', '3']">
    <div class="form-menu-search">
      <el-input
        placeholder="请输入查询内容"
        prefix-icon="el-icon-search"
        v-model="search"
      >
      </el-input>
    </div>
    <el-submenu
      v-for="(submenu, subindex) of formItems"
      :key="subindex"
      :index="subindex + ''"
    >
      <template slot="title">
        <i :class="submenu.icon"></i>
        <span>{{ submenu.label }}</span>
      </template>
      <div
        draggable="true"
        class="form-item-container"
        v-for="(item, index) of submenu.items"
        :key="index"
        @dragstart="dragstart($event, item)"
        @dragend="dragend"
      >
        <el-button plain size="small"
          ><img
            :src="'/static/images/form/' + item.name + '.png'"
            class="system-navigation-icon"
          />{{ item.label }}</el-button
        >
      </div>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "serviceMenu",
  data() {
    return {
      formId: this.$router.history.current.params.formId,
      search: "",
    };
  },
  components: {},
  computed: {
    formItems() {
      return this.$store.getters.formItems;
    },
    formObject() {
      return this.$store.getters.formObject;
    },
  },
  methods: {
    dragend(event) {
      event.dataTransfer.clearData();
    },
    dragstart(event, item) {
      event.dataTransfer.setData("form-item", item.name);
    },
  },
};
</script>

<style lang="scss">
.form-menu {
  border-top: 0px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
  .is-opened {
    .el-submenu__title {
      color: #0454f2;
    }
  }
  .form-menu-search {
    margin: 20px;
  }
  .el-form-item__label {
    padding: 0px;
  }
  .el-form-item {
    margin-bottom: 5px;
  }
  .form-item-container {
    min-width: 45%;
    max-width: 48%;
    .el-button {
      cursor: move;
      margin: 5px;
      width: 90%;
    }
    span {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    img {
      margin-right: 10px;
    }
  }
  .el-submenu__title {
    border-top: 1px solid #dcdfe6;
  }
  .el-menu {
    padding: 5px;
    display: flex;
    flex-wrap: wrap;
  }
  .el-menu-item {
    border-bottom: 1px solid #dcdfe6;
  }
  .is-active {
    color: #5182e4;
    font-weight: 600 !important;
  }
  .el-collapse-item__wrap {
    border-bottom: 0px solid #ebeef5;
  }
  .el-collapse-item {
    padding: 10px;
    border-top: 1px solid #ebeef5;
  }
  .el-collapse-item__header {
    border-bottom: 0px solid #ebeef5;
    font-weight: 500;
    font-size: 16px;
  }
}
</style>
