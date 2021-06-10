<template>
  <el-menu
    class="form-item-config"
    default-active="0"
    unique-opened
    :default-openeds="openItems"
  >
    <div class="form-item-config-button">
      <el-dropdown>
        <el-button type="primary" size="medium" plain @click="saveForm"
          >保存</el-button
        >
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="saveFormExit"
            >保存并返回</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
      <el-button type="success" size="medium" plain @click="viewForm"
        >预览</el-button
      >
    </div>
    <el-submenu index="0">
      <template slot="title">
        <i class="el-icon-s-order"></i>
        <span>表单属性</span>
      </template>
      <el-form :model="formObject" class="form-config" label-position="top">
        <el-form-item label="图标">
          <el-image
            style="width: 50px; height: 50px"
            src="/static/images/form/form-icon.png"
            fit="fill"
          >
          </el-image>
        </el-form-item>
        <el-form-item label="填报名称">
          <el-input v-model="formObject.name" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="绑定资产">
          <el-input v-model="formObject.collection" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="标签位置">
          <el-radio-group v-model="formObject.labelAlignMode" size="mini">
            <el-radio-button label="left">左对齐</el-radio-button>
            <el-radio-button label="right">右对齐</el-radio-button>
            <el-radio-button label="top">上面</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="标签宽度">
          <el-input-number
            v-model="formObject.labelWidth"
            :step="10"
            step-strictly
            size="mini"
            :min="10"
            :max="90"
            >%</el-input-number
          >
        </el-form-item>
        <el-form-item label="行内表单">
          <el-switch
            v-model="formObject.inline"
            @change="changeInline"
          ></el-switch>
        </el-form-item>
      </el-form>
    </el-submenu>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-set-up"></i>
        <span>组件属性</span>
      </template>
      <el-form :model="formItem" class="form-config" label-position="top">
        <el-form-item
          v-for="(config, index) of commonConfig"
          :key="index"
          :label="config.label"
        >
          <component
            :is="config.type"
            :value="formItem[config.prop]"
            @input="changeValue($event, config.prop)"
            size="mini"
            :disabled="config.disabled"
            :placeholder="config.placeholder"
          >
          </component>
        </el-form-item>
      </el-form>
    </el-submenu>

    <el-submenu index="2" v-if="haveDataConfig(formItem)">
      <template slot="title">
        <i class="el-icon-date"></i>
        <span>数据属性</span>
      </template>
      <data-config
        class="form-config"
        :dataConfig="formItem.dataConfig"
      ></data-config>
    </el-submenu>
  </el-menu>
</template>

<script>
import dataConfig from "./dataConfig.vue";

export default {
  name: "serviceMenu",
  data() {
    return {};
  },
  components: {
    "data-config": dataConfig,
  },
  computed: {
    haveDataConfig() {
      return function (item) {
        // console.log(item);
        if (item && item.type) {
          return this.$store.getters.formItem(item.type).data;
        }
        return false;
      };
    },
    commonConfig() {
      return this.$store.getters.commonConfig;
    },
    formItem() {
      var fieldId = this.$store.getters.selectedFieldId;
      if (fieldId === -1) {
        return {};
      }
      return this.formObject.formColumnList.find((f) => f.id === fieldId);
    },
    openItems() {
      return this.$store.getters.openItems;
    },
    formObject() {
      return this.$store.getters.formObject;
    },
  },
  methods: {
    changeValue(event, prop) {
      this.formItem[prop] = event;
    },
    changeInline(value) {
      if (value) {
        if (this.formObject.labelWidth < 20) {
          this.formObject.labelWidth = 20;
        }
      }
    },
    viewForm() {
      const { href } = this.$router.resolve({
        name: "form",
        params: {
          formId: this.formObject.id,
        },
      });
      window.open(href, "_blank");
    },
    saveFormExit() {
      this.saveForm();
      this.$router.go(-1);
    },
    saveForm() {
      if (this.$router.history.current.name === "formEdit") {
        this.$store.dispatch("updateForm");
      } else if (this.$router.history.current.name === "formAdd") {
        this.$store.dispatch("addForm");
        this.$router.replace({
          name: "formEdit",
          params: {
            formId: this.formObject.id,
          },
        });
      }
    },
  },
};
</script>

<style lang="scss">
.form-item-config {
  border-top: 0px solid #ebeef5;
  .is-opened {
    .el-submenu__title {
      color: #0454f2;
    }
  }
  .el-form-item__label {
    padding: 0;
    line-height: 20px;
  }
  .form-config {
    padding: 0 20px;
  }
  .form-item-config-button {
    padding: 30px 0px;
    text-align: center;
    .el-button--success {
      margin-left: 10px;
    }
  }
}
</style>
