<template>
  <div id="serviceList">
    <div class="apps" v-if="$store.getters.serviceType == 22">
      <div class="app" v-for="i in appList" :key="i.id">
        <div class="appimg">
          <img
            src="https://s3.sdata1010.cn/assets/img/defaultImage.ec685b21.png"
            alt=""
          />
        </div>
        <div class="line2">
          <div class="name">{{ i.name }}</div>
          <div class="edit_people">
            <i class="el-icon-s-custom"></i>
            {{ i.CreatedBy }}
          </div>
        </div>
        <div class="line3">
          <div class="line"></div>
        </div>
        <div class="line4">
          <div class="edit_time">{{ i.LastModifiedAt }}</div>
          <div class="icon_list">
            <div class="edit_icon every_icon">
              <i class="el-icon-edit"></i>
            </div>
            <div class="view_icon every_icon">
              <i class="el-icon-view"></i>
            </div>
            <el-popover
              class="more_wrapper"
              placement="top"
              trigger="hover"
              width="100"
            >
              <div
                style="text-align: center; margin: 0 0 6px 0; cursor: pointer"
              >
                发布
              </div>
              <div style="text-align: center; margin: 6px 0; cursor: pointer">
                复制
              </div>
              <div
                @click="deleteApp(i.id)"
                style="text-align: center; margin: 6px 0; cursor: pointer"
              >
                删除
              </div>
              <div
                style="text-align: center; margin: 6px 0 0 0; cursor: pointer"
              >
                逻辑配置
              </div>
              <div slot="reference" class="more_icon every_icon">
                <i class="el-icon-more"></i>
              </div>
            </el-popover>
          </div>
        </div>
      </div>
    </div>
    <el-table v-else class="service-list" :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="" width="40">
        <template slot-scope="scope">
          <img :src="scope.row.icon" class="system-navigation-icon" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" width="120"> </el-table-column>
      <el-table-column prop="userId" label="创建者" width="300">
      </el-table-column>
      <el-table-column prop="LastModifiedAt" label="最近更新">
      </el-table-column>
      <el-table-column label="操作" class="service-list-button">
        <template slot-scope="scope">
          <el-button
            class="service-list-button"
            type="text"
            @click="handleTrigger(scope.row)"
            >触发器</el-button
          >
          <el-button
            class="service-list-button"
            type="text"
            @click="handleDelete(scope.row)"
            >事件配置</el-button
          >
          <el-button
            class="service-list-button"
            type="text"
            @click="handleDelete(scope.row)"
            >逻辑配置</el-button
          >
          <el-button
            class="service-list-button"
            type="text"
            @click="handleManagerView(scope.row)"
            >视图列表</el-button
          >
          <el-button
            class="service-list-button"
            type="text"
            @click="handleDelete(scope.row)"
            >公开分享</el-button
          >
          <el-dropdown @command="handleCommand">
            <el-button
              class="service-list-button"
              type="text"
              @click="handleEdit(scope.row)"
              >编辑
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="{ type: 'delete', data: scope.row }"
                >删除</el-dropdown-item
              >
              <el-dropdown-item :command="{ type: 'view', data: scope.row }"
                >预览</el-dropdown-item
              >
              <el-dropdown-item :command="{ type: 'copy', data: scope.row }"
                >复制</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { guid } from "../../util/func";

export default {
  data() {
    return {
      appList: [],
    };
  },
  components: {},
  computed: {
    tableData() {
      var serviceType = this.$store.getters.serviceType;
      var catalog = this.$store.getters.serviceCatalog;
      if (!catalog) {
      }
      if (serviceType === 0) {
        var serviceRecords = [];
        for (var service of this.$store.getters.serviceList) {
          if (service.type === 0) {
            continue;
          }
          if (!service.serviceRecords) {
            continue;
          }
          serviceRecords = serviceRecords.concat(
            service.serviceRecords.map((record) => ({
              ...record,
              icon: service.icon,
            }))
          );
        }
        return serviceRecords;
      } else {
        var serviceObj = this.$store.getters.serviceList.find(
          (s) => s.type === serviceType
        );
        if (serviceObj && serviceObj.serviceRecords) {
          return serviceObj.serviceRecords.map((record) => ({
            ...record,
            icon: serviceObj.icon,
          }));
        } else {
          return [];
        }
      }
    },
  },
  mounted() {
    if (this.$store.getters.serviceType === 18) {
      this.$store.dispatch("getForms", this.$store.getters.serviceCatalog);
    }
    this.getApps();
  },
  methods: {
    getApps() {
      this.$store.dispatch("getApps", "all").then((resp) => {
        this.appList = resp;
      });
    },
    deleteApp(i) {
      console.log(i);
      this.$store
        .dispatch("deleteApp", i)
        .then((resp) => {
          this.$message({
            type: "success",
            message: "删除成功",
          });
          this.getApps();
        })
        .catch((err) => {
          this.$message({
            type: "warning",
            message: "删除失败：" + err,
          });
        });
    },
    handleManagerView(form) {
      this.$router.push({
        name: "view",
        params: {
          id: "list",
        },
        query: {
          type: "form",
          formId: form.id,
          formName: form.name,
        },
      });
    },
    handleTrigger(form) {
      this.$router.push({
        name: "trigger",
        params: {
          id: "list",
        },
        query: {
          type: "form",
          formId: form.id,
        },
      });
    },
    handleCommand(command) {
      this.$store.commit("formObject", command.data);
      if (command.type === "edit") {
        this.handleEdit(command.data);
      } else if (command.type === "delete") {
        this.handleDelete(command.data);
      } else if (command.type === "view") {
        this.handleView(command.data);
      } else if (command.type === "copy") {
        this.handleCopy(command.data);
      }
    },
    handleDelete(form) {
      this.$confirm("确认删除填报：" + form.name, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("deleteForm", form.id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleEdit(form) {
      this.$router.push({
        name: "formEdit",
        params: {
          formId: form.id,
        },
      });
    },
    handleView(form) {
      const { href } = this.$router.resolve({
        name: "form",
        params: {
          formId: form.id,
        },
      });
      window.open(href, "_blank");
    },
    handleCopy(form) {
      form.id = guid();
      this.$router.push({
        name: "formAdd",
        params: {
          formId: form.id,
        },
      });
    },
  },
  created() {},
};
</script>

<style lang="scss">
.apps {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .app {
    margin: 10px;
    width: 400px;
    height: 300px;
    background: #fafafa;
    padding: 5px;
    img {
      width: 390px;
    }
    .line2 {
      display: flex;
      flex-direction: row;
      color: #000;
      font-size: 14px;
      margin: 30px 10px 20px;
      justify-content: space-between;
      align-items: center;
      .edit_people {
        color: #666;
      }
      .name {
        font-size: 22px;
      }
    }
    .line3 {
      margin-left: 10px;
      width: 370px;
      height: 1px;
      background: #ccc;
    }
    .line4 {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      color: #999;
      font-size: 14px;
      margin: 30px 10px 20px;
      .icon_list {
        display: flex;
        flex-direction: row;
        .every_icon {
          margin: 0 10px;
          font-size: 18px;
          cursor: pointer;
        }
        .my_button {
          text-align: center;
          margin: 6px 0;
          cursor: pointer;
        }
      }
    }
  }
}
.service-list {
  padding: 0px 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  .service-list-button {
    font-size: 15px;
    color: #0454f2;
  }
  // .el-table__body-wrapper {
  //     overflow: hidden;
  //     display: flex;
  // }
  .el-table__body {
    // display: flex;
    // flex-direction: column;
    // overflow: auto;
    .el-table__row {
      width: 100%;
    }
  }
  .el-dropdown {
    margin-left: 10px;
  }
  .system-navigation-icon {
    width: 17px;
    height: 17px;
    margin-left: 10px;
    filter: invert(100%);
  }
}
</style>
