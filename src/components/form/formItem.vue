<template>
  <div
    class="form-edit-item-wrapper"
    :style="formObject.inline ? '' : 'width: 100%'"
  >
    <el-form-item
      :label="item.label + ':'"
      class="form-edit-item"
      @click.native.stop="handleEditItem"
      v-bind:class="{
        'form-edit-selected': isEdit && isSelected(),
        'is-helper': isEdit && showHelper === item,
      }"
    >
      <component
        :is="item.type"
        @click.native.stop="handleEditData"
        :width="item.contentWidth"
        :placeholder="item.placeholder"
        :value="formData[item.name]"
        @input="changeValue($event, item.name)"
      >
        <div v-if="item.data">
          <component
            v-for="option in item.dataConfig.dataOptions"
            :key="option.value"
            :is="item.dataConfig.subType"
            :label="option.label"
            :value="option.value"
          >
          </component>
        </div>
      </component>
    </el-form-item>
    <div
      v-if="isEdit"
      class="form-edit-item-mask"
      @click.stop="handleEditItem"
      @mouseenter="handleMouseEnter(item)"
      @mouseleave="handleMouseLeave(item)"
    >
      <i
        class="el-icon-delete delete"
        v-if="isSelected()"
        @click.stop="handleDeleteItem"
      ></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValue: "",
      showHelper: null,
      dragging: false,
    };
  },
  props: ["item", "isEdit"],
  components: {},
  computed: {
    formData() {
      return this.$store.getters.formData;
    },
    formObject() {
      return this.$store.getters.formObject;
    },
  },
  methods: {
    handleMouseEnter(item) {
      if (this.dragging) return;
      this.showHelper = item;
    },
    handleMouseLeave(item) {
      this.showHelper = null;
    },
    changeValue(event, prop) {
      this.formData[prop] = event;
    },
    isSelected() {
      if (this.$router.history.current.name === "form") {
        return false;
      }
      return this.item.id === this.$store.getters.selectedFieldId;
    },
    handleEditData() {
      if (this.$store.getters.formItem(this.item.type).data) {
        this.$store.commit("openItems", ["" + 2]);
      } else {
        this.$store.commit("openItems", ["" + 1]);
      }
      this.$store.commit("selectedFieldId", this.item.id);
    },
    handleEditItem() {
      this.$store.commit("openItems", ["" + 1]);
      this.$store.commit("selectedFieldId", this.item.id);
    },
    handleDeleteItem() {
      this.$confirm("确认删除字段：" + this.item.name, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.commit("deleteField", this.item.id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  mounted() {
    if (this.item.type === "el-select") {
      this.inputValue = this.item.dataConfig.dataOptions[0].label;
    }
  },
  created() {},
};
</script>

<style lang="scss">
.form-edit-item-wrapper {
  flex: 1;
  z-index: 100;
  position: relative;
  .form-edit-item {
    z-index: 50;
    border: 2px dotted transparent;
  }
  .form-edit-item-mask {
    cursor: move;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 11;
    .delete {
      position: absolute;
      top: 20px;
      left: 10px;
      cursor: pointer;
    }
  }
  .form-edit-selected {
    border: 2px dotted #e6a23c;
    background: rgba(230, 162, 60, 0.2);
  }
  .is-helper {
    border: 2px dotted #67c23a !important;
    background: rgba(103, 194, 58, 0.2) !important;
  }
}
</style>
