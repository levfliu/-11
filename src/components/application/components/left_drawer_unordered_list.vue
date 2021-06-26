<template>
  <div id="left_drawer_unordered_list">
    <div class="scroll_wrapper">
      <div class="head">
        <span
          v-bind:class="{ 'active-item': choosed == 'left' }"
          class="head-item"
          @click="choosed = 'left'"
          >表单列表</span
        >
        <span
          v-bind:class="{ 'active-item': choosed == 'right' }"
          class="head-item"
          @click="choosed = 'right'"
          >系统列表</span
        >
      </div>
      <div class="search">
        <a-input-search placeholder="搜索…" enter-button @search="onSearch" />
      </div>
      <div class="tree">
        <el-tree
          :data="treeData_"
          :props="defaultProps"
          node-key="id"
          :highlight-current="true"
          :check-on-click-node="true"
          :expand-on-click-node="false"
        >
          <span
            slot-scope="{ node, data }"
            v-bind:class="{
              'custom-tree-zero-level-node': data.level === 0,
              'custom-tree-node-other-level-node': data.level !== 0,
            }"
            @click="serviceCatalog(data)"
          >
            <i class="anticon icon-wenjianjia-kai2"></i> {{ node.label }}
          </span>
        </el-tree>
      </div>
      <div class="loading">
        <a-spin v-if="loading" />
      </div>
      <div class="view_list">
        <div
          v-for="i in viewList"
          :key="i.id"
          class="ant-list-item-meta item-list"
          @click="chooseOne(i)"
        >
          <div class="ant-list-item-meta-avatar">
            <span
              class="
                ant-avatar ant-avatar-lg ant-avatar-square ant-avatar-image
              "
              ><img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAEJElEQVRYhe2YW0ybVRzAf+frhVKg6QqUlrtORuLMXJeIuA00bOLYpiwLiYuRuIwHk5n4aFzwRU0WF/c6n5YZIl6WGRc3ybKL0Ti3LNNkkTiHMgJ0jBYKWHqBrxe+z4cuDQTphQLlYb+3fud/zvnlnP93/l+PONp3AqAG+ATYDZjILj7gGvA+0K8FaoFbgDmbVvMwAQeBJqBeAo6zfuTmYwaOS8S2db3SLJH9nEtEvpRtg2Q8FswUbbIAgWBP4Qs0mh2YtHkZTaagMiKP8c3YVYZl18oI7rbUsb9oJ6MhD/dnRzIS1AiJTcZK3q14nY8HT+ONBjIXbDQ7GJZdnBzuRkHNSBCgLMfKserDNJgdXJy4njQ+aQ5adCacsntF5AAehsaRlRAWXWqnW9IVXNRBaGgwO9AJTcp9hmQX/8w4FzwTiNTmS8sOKNFbaLM2pdXnXnBokWCqpC34MOThw8HTGCR9yn3Gw1PpThMnbcFMJ0yXZQnqJR3aBDkYViJE1bllS81nWTnYWX0EjVj6APBHgxwb+Ax1iTdfVdUl2zIWnI4GuO69g1Ys3dU3F0gocN7zM+7w5OoIykqYc+M/Jo3L0xgo1m1ABcbCk8hKON52c7o35fmWlYOJ2GSspKVwOzXGivhZp6gKf80M0jNxA6fsTmu8FROUEBywvkTThucQgFN2MzA7gkDwZG4Zz+Rt5GnjE/ww+SuXJ2+traAA2u17qTNtZiLi5euxK/QFhxbE1BgraLft5bWiRgySnu89v6Q09op8D7YUbqfOtBmn7Oak88u4XJXBjj2nCID+mQd8OvwFoyEPzZZ6dpqfXRvBjbnltBTtwBP+l1Mj5/BHgwAcKmnmvap2Pqg+wr6iHQD452Y4NfIt09EAbdZd2PWFqysoCYk3bK8ggDOuiwTmZgEwafNoMG+NxzVb6uMHuzfqp9t9CZ3QcsjWvLqCiqowEfEiEFQZbPHnshImokbjv2eV0ILKUp5jBcAT9q6uIMDZsavMzMm0WXdRY6wEYqXuK/dlZpUQvmiQbvelePyW/Kd4tbgRbzTAec9PScfP+C2eivjocvfwdtlB3ilvo8vVwx3/39z23eU3390F9cRRUMtb9n0oqsLnoxcIzslJx0+6glMRH5UGG1KCD8w/AwOcHbuCVmjoKG2lo7SVykdbLoAKQwmH7fvpKG1FIDgzeiHl/zfiaN+JhFX7ZcvzHCh+EVdoAtf/1M++4BA3pv8AYEt+DW/a9pCnyQWI56HuUd2eivjocvVwf/ZBSnKQwhZfm7qNVmhoNDvYVlC7qF1AXLA30M9HgyM0mrextaAGq96CqqoMhVz87rvHzeleQvNqciokXcFss+5vFh4LZopE7E54vRKQiF1Yr1euSEAnkLworj1eoFMC+oB64DvAn1WlGH5iLvVA339RS3W8JIufVwAAAABJRU5ErkJggg=="
              />
            </span>
          </div>
          <div class="ant-list-item-meta-content">
            <h4 class="ant-list-item-meta-title">
              <span title="test视图3">{{ i.view_name }}</span>
            </h4>
            <div class="ant-list-item-meta-description">
              最后更新于{{ i.LastModifiedAt.substr(0, 10) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      choosed: "left",
      viewList: [],
      defaultProps: {
        children: "children",
        label: "name",
      },
      treeData_: [],
    };
  },
  watch: {
    choosed(val) {
      if (val == "left") {
        this.treeData_ = this.treeData;
        this.viewList = [];
      } else {
        this.treeData_ = [];
        this.viewList = [];
      }
    },
    treeData(val) {
      if (this.choosed == "left") {
        this.treeData_ = val;
        this.viewList = [];
      } else {
        this.treeData_ = [];
        this.viewList = [];
      }
    },
  },
  computed: {},
  props: ["treeData"],
  methods: {
    chooseOne(i) {
      console.log(i);
      this.$emit("chooseOne", i);
    },
    onSearch() {},
    serviceCatalog(i) {
      this.viewList = [];
      this.loading = true;
      if (i.id == "defaultTeam") i.id = "default";
      this.$store.dispatch("applicationGetViews", i.id).then((i) => {
        this.loading = false;
        this.viewList = i;
      });
    },
  },
  mounted() {
    this.viewList = [];
  },
};
</script>

<style lang="scss">
#left_drawer_unordered_list {
  height: 100%;
  width: 100%;
  background-color: #242526;
  .scroll_wrapper {
  }
  .head {
    height: 60px;
    width: 100%;
    display: flex;
    text-align: center;
    span {
      flex: 1;
      color: #fff;
      font-size: 14px;
      background-color: #1e1f20;
      color: hsla(0, 0%, 100%, 0.5);
    }
    .head-item {
      display: inline-block;
      height: 40px;
      cursor: pointer;
      text-align: center;
      line-height: 40px;
      background-color: #1e1f20;
      border-top: 2px solid #000;
    }
    .active-item {
      background-color: #242526;
      border-top: 2px solid #0454f2;
    }
  }
  .search {
    height: 40px;
    width: 100%;
    padding: 0 16px;
    .ant-btn-primary {
      color: #fff;
      background-color: #242526;
      border-color: #242526;
      text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
      -webkit-box-shadow: 0 2px 0 rgb(0 0 0 / 5%);
      box-shadow: 0 2px 0 rgb(0 0 0 / 5%);
    }
    .ant-input {
      color: #fff;
      background-color: #333;
      border: none;
      box-shadow: none;
      outline: none;
    }
  }
  .tree {
    padding: 0 16px;
    .el-tree {
      background: transparent;
      color: #fff;
      .el-tree--highlight-current {
        background-color: #a15;
      }
      .el-tree-node {
        background-color: #777;
      }
      .is-current {
      }
      .el-tree-node__content {
        background-color: #242526;
        height: 26px !important;
      }
    }
  }
  .loading {
    width: 100%;
    text-align: center;
  }
  .view_list {
    padding: 0 16px;
    color: #000;
    .item-list {
      width: 100%;
      padding: 12px 16px;
      border-radius: 4px;
      border: none;
      cursor: pointer;
      background: #2f3031;
      margin-top: 8px;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      .ant-list-item-meta-content {
        -webkit-box-flex: 1;
        -ms-flex: 1 0;
        flex: 1 0;
        width: 0;
        color: #5e605f;
      }
      .ant-list-item-meta-title {
        width: 100%;
        height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #999;
      }
      .ant-list-item-meta-description {
        font-size: 12px;
        color: #555;
      }
    }
  }
}
</style>