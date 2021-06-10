<template>
  <el-drawer
    class="system-navigation"
    :visible.sync="drawer"
    :direction="direction"
    :show-close="false"
    size="1000px"
  >
    <template v-slot:title>
      <div class="system-navigation-close" @click="closeNavi()">
        <i class="el-icon-close"></i>
      </div>
    </template>
    <span class="function-navigation">功能导航</span>
    <div class="function-list">
      <div
        class="function-catalog"
        v-for="(menu, index) of menuItem"
        :key="index"
      >
        <div class="function-catalog-name">{{ menu.label }}</div>
        <div
          class="function-menu"
          v-for="(fmenu, findex) of menu.children || []"
          :key="findex"
        >
          <el-button
            class="bzk-head-menu-button"
            type="primary"
            @click="entryService(fmenu)"
          >
            <img :src="fmenu.icon" class="system-navigation-icon" />{{
              fmenu.name
            }}
          </el-button>
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<script>
export default {
  data() {
    return {
      direction: "ltr",
    };
  },
  computed: {
    drawer: {
      get() {
        return this.$store.getters.openNavi;
      },
      set(value) {
        this.$store.commit("openNavi", value);
      },
    },
    menuItem() {
      this.updateService();
      return this.$store.getters.sysFuncs;
    },
  },
  mounted() {
    this.$store.dispatch("getsysFuncs");
  },
  methods: {
    updateService() {
      var sysFuncList = this.$store.getters.sysFuncs;
      for (var funcList of sysFuncList) {
        if (funcList.children && funcList.children.length > 0) {
          for (var fun of funcList.children) {
            var serviceList = this.$store.getters.serviceList;
            if (fun.type === 0) {
              var serviceAll = serviceList.find((s) => s.type === 0);
              if (serviceAll) {
                serviceAll.name = "所有数据";
                this.$store.commit("addService", serviceAll);
              }
              continue;
            }
            var service = serviceList.find((s) => s.type === fun.type);
            if (service) {
              this.$store.commit("addService", fun);
            }
          }
        }
      }
    },
    entryService(service) {
      this.$store.commit("addService", service);
      this.$store.dispatch("getCatalogs", { type: service.type });
      if (service.type === 18) {
        this.$store.dispatch("getForms", this.$store.getters.serviceCatalog);
      }

      this.$router.push({
        name: "service",
        query: {
          catalog: this.$store.getters.serviceCatalog,
          type: service.type,
        },
      });
      this.$store.commit("serviceType", service.type);
      this.$store.commit("openNavi", false);
    },
    closeNavi() {
      this.$store.commit("openNavi", false);
    },
  },
};
</script>

<style lang="scss">
.system-navigation {
  .system-navigation-icon {
    width: 17px;
    height: 17px;
    margin-right: 3px;
  }
  .system-navigation-close {
    max-width: 80px;
    height: 80px;
    font-size: 30px;
    color: #cccccc;
    margin-top: -10px;
    i {
      width: 100%;
      height: 50px;
      padding-top: 30px;
    }
    :hover {
      background: #0454f2;
    }
    :before {
      padding-top: 25px;
      padding-left: 25px;
    }
  }
  .bzk-head-menu-button {
    color: #cccccc;
    background: #1e2940;
    border-color: #1e2940;
    font-size: 16px;
    :hover {
      color: #ffffff;
    }
  }
  .function-catalog-name {
    height: 32px;
    font-size: 20px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #fff;
    line-height: 32px;
    text-align: left;
    padding-left: 16px;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  .function-list {
    display: flex;
    flex-direction: row;
    margin-left: 30px;
    .function-catalog {
      display: flex;
      flex-direction: column;
      padding: 20px;
    }
  }
  .el-drawer {
    background: #1e2940;
  }
  .function-navigation {
    margin: 0 0 4vw 16px;
    font-size: 36px;
    line-height: 50px;
    color: #fff;
    font-weight: 300;
    font-family: PingFangSC-Light, PingFang SC;
  }
}
</style>
