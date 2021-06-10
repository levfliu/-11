<template>
  <div id="createApp" ref="createApp">
    <div class="title">
      <div class="left">
        <i class="back el-icon-back"></i>
        <i class="app el-icon-menu"></i>
        <span class="title_text">应用设计</span>
        <span class="vertical_line">|</span>
        <div class="device_choose">
          <span><i class="el-icon-mobile-phone"></i></span>
          <span><i class="el-icon-s-platform"></i></span>
        </div>
      </div>
      <div class="main">
        <a-dropdown>
          <a class="main_title" @click="(e) => e.preventDefault()">
            {{ nowPage.name }}<a-icon type="down" />
          </a>
          <a-menu slot="overlay" @click="pageChoose">
            <a-menu-item v-for="i in editApp.datappPages" :key="i._id">
              <i class="el-icon-document"></i>
              {{ i.name }}
            </a-menu-item>
            <a-menu-Divider></a-menu-Divider>
            <a-menu-item key="add" divided>新建页面</a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
      <div class="right"></div>
    </div>
    <div class="main">
      <a-layout id="components-layout-demo-custom-trigger" style="height: 100%">
        <a-layout-sider v-model="siderShow" collapsible :trigger="null">
          <a-menu theme="dark" mode="inline" :default-selected-keys="['1']">
            <a-menu-item
              key="show_or_hide"
              @click="() => (siderShow = !siderShow)"
            >
              <a-icon :type="siderShow ? 'menu-unfold' : 'menu-fold'" />
              <span>{{ siderShow ? "展开" : "收起" }}</span>
            </a-menu-item>

            <a-menu-item v-for="i in siderMenu" :key="i.icon">
              <div
                v-if="i.icon == 'layout' || i.icon == 'bg-colors'"
                class="line"
              ></div>
              <a-icon :type="i.icon" />
              <span>{{ i.name }}</span>
            </a-menu-item>
          </a-menu>
        </a-layout-sider>
        <a-layout>
          <a-layout-content>
            <div class="content">
              <div class="application_edit_page"></div>
              <div class="left_drawer">
                <a-drawer
                  title="Basic Drawer"
                  placement="left"
                  :closable="false"
                  :visible="leftDrawerShow"
                  :get-container="false"
                  :wrap-style="{ position: 'absolute' }"
                  @close="onLeftDrawerClose"
                >
                  <p>Some contents...</p>
                </a-drawer>
              </div>
              <div class="right_drawer"></div>
            </div>
          </a-layout-content>
        </a-layout>
      </a-layout>
    </div>
    <!-- 创建应用欢迎页 -->
    <div class="init_page">
      <a-modal
        :visible="initPageShow"
        :footer="null"
        :closable="false"
        :getContainer="createAppObject"
        :mask="true"
        class="init_page"
        width="924px"
      >
        <div class="left">
          <div class="new_app_info">
            <div class="new_app_info_name">应用名称：</div>
            <a-input placeholder="请输入应用名称"></a-input>
            <div class="new_app_info_name new_app_info_name_last_child">
              应用描述：
            </div>
            <a-textarea placeholder="请输入简要的应用描述"></a-textarea>
          </div>
          <div class="theme_color_text">
            <div>主题配色：</div>
          </div>
          <div class="theme_color">
            <div class="color_item">
              <div class="color" style="background: #397aff"></div>
            </div>
            <div class="color_item">
              <div class="color" style="background: #07255b"></div>
            </div>
            <div class="color_item">
              <div class="color" style="background: #17c29d"></div>
            </div>
            <div class="color_item">
              <div class="color" style="background: #197aff"></div>
            </div>
          </div>
          <div class="logo_text">应用LOGO：</div>
          <div class="app_logo">
            <input
              id="cloud-job-resume-file"
              type="file"
              accept="*"
              @change="fileChange($event)"
            />
          </div>
        </div>
        <div class="right">
          <div class="big_title">创建应用</div>
          <div class="little_title">
            如堆积积木那样简单，快速拖拽完成应用设计，为企业完成数字化转型
          </div>

          <div class="select-name">选择应用类型</div>
          <div class="select-item-wrap">
            <div class="item-app-type activeItem">
              <div class="center-ionc" style="margin-left: -47px">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAA4CAYAAABqtn+aAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAASmSURBVHgB7Zq/TxNhGMcfwNAFFtsFHCwOhcESDDBQTQSMwCAxBEPijwEYNPxFTR38kRgdjBqCidBBaiIwAAmCg2VpHSiDrQssrYH6fl/7Nsd5be/uhbu2vJ+kXOn9aPu557nned8rkUKhUJxfGiptEA6H/U1NTc/z+fwg1TENDQ1bR0dHE3Nzc0kr+zVW3KCx8UO9ywPsO/YgUMgiF0xs04M/z168pGw2S/WIp7mZZmemyU6gVIxAQb3KA9lcjuxiWqDCGCVQEiVQEjNFpCSPHtyn1tZWw3UHBwf06vUb09s7hdHnkkFFoCRSEWj1TJ7mma8WVARKogRKogRKogRKogRK4rrArs5Axd4Q67uDQapGpNoYWSBvaHCQN7fzCx/5Ug/k3R2/w5eYNVnf3KRqwjWBQt72zg51+P1ckl6ikAewXV9fL39eSiK2H2bHbG9vI7tEIpE8lmYnWF1JYSFvfWOTVlbXuDggIg1oIy+RSPLtIA4S+3t7DY87NnJbSp4WsxOsjkegVl58d5c6OvxcECRCGB6fYzEeSQDSICzH5uywD9IYEjGHh6jU4vP5+FJ28tfKBKvjAn+lM/zLXenwc5npTIYLFNfBfxLHT1wX8YBQj6eZ/Czd8X8imSz5HrKTv1YmWB1P4QwTBjEtLS08PRFhY6OjJ1JPX1Ti8V2ewsFCJS5VcNzAlSIiJCLapiYnizJEwTAqJt3Bq2WrtZa5J4/JKVzrA4VEpBuub+KaV64SV1PkCVztAyFxOfaFpfCIYXRpK/H8woJpeeHIU5LFbBS7OhKBmOuhgbLygCgibs9mG+GawHKpqV9n1CdWC64I1DfJpeShH/T5vMUIBdUm0RWBPq+32MJ0dweLIwutWFFYOgMBvu6sJHo8HpLBFYHo+dKsod5gIwtEGUYWN9i1UETeYjRq2CeKBhqvIzLNgu2n7k2SV7cPGvmH7E6h18Kx9LgjsK2NUvsp/tyoSRZDO7Q46BN93otM3iH1M9GY1oJ0bGMGyBsbGeHDwFssooUsyAuFQrS4tHTidas4LhDjTIxZPc0eVoFD/F6xUSXW94lopPtYqkMepJt9L0T19vcd/kO+T0tRLgvHwSMej1NXoJO+shOI4aOddHZcoLcw4Pf7L/PISiR/siiI0tt37//r87TDPhF5ZuUBjGlxCRBNOtIekYvow3ER+dlclkteWV21NYZ2vJHOpNO8Kc5kfpv6wEIivrwVeQKxD9IYz3EtFZGO9MZcpNUTo8VxgYiKVGrf0j6QiIdduLi2drqkk4fI+8HW2ZUHzsVNJaSskbxvbD4R02o1V4WdxMt6ztDAQLFhF/KQBYessovCUjNV2GlwzVtZY8XiT67Ya+4xeZ0sKjFBi6YeLc7wzUGyQ90LvMKKBIoVoi/ARjWoysusaKBwDBVmudFfonm3g+kigjfKZu3/ltgtkLLo9fZY4w5JooCJwoFhpMw8Y0WB7PZeDDdXZqenqRYp95O6uGQFBhVTmN0bnWGLLVIYUjECCzeWr1ENIG6KO4n6cZEkdSkQBU9uf/OTCq7eVDptzqDgVbz211UEnmbBYycidnx8PEEKhUKhUJwVfwGjXaGHKTwD3wAAAABJRU5ErkJggg=="
                /><span>WEB+移动端</span>
              </div>
            </div>
            <div class="item-app-type item-app-type-center">
              <div class="center-ionc">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAA4CAYAAABqtn+aAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAM9SURBVHgB7Zq9T1NRGMbfW0zvAou9CyzeOoCDJSTAIDqgCw4SQkhMNA7Axl/E5kdidDQGB8OgdVAHICEy0aV1uR1sHahLm7T1PKcccukH3utpeg7l/SWltPeU0F+fc973nl4ihmEYhmGYS4kTdeD29rY/MjLyotlsLtIQ4zjOYb1eX93a2ipEGZ+giCQSiXfDLg+I9ziDoEQdf42iM4Mfz1++omq1SsOIm0zS5sY6xQlK5AQqhlUeqNZqFJfYApnzsEBNWKAmcYpIT549fUJjY2Ndj1UqFXr95m3k8YOi2//1P3ACNelLAuN+kv345G2BE6gJC9SEBWrCAjVhgZpYI/DW1OQ/e0Mcn85kyCb60sboAnn3Fxdlc/t+54O8bwfyVpYfyXvsmuwdHJANGE+gkvfj6Eg+VpLCKHkA4+bmZml+dpZswKhAJW9v/4C+fvsu0wfCEsPJy+cLchzSZ4tEYwLD8o5zOUqn/bMpDCBtYmL8LHmQNj2dkdL2xWtUEk2vicbWwF+lstycvZn2pcxSuSwTpiRC3Mry8rl1EbcHQrrrJsn3W8LzhQKZxFgCy0IYxIyOjsrpiYQ9XFqSqVO0F5Xj45ycwpnT1PUqOIPE6BqoJCKJj9fWyEtdl8+radsuqNXG3L6wWg8a41U4LLEmvpPAFAXd5PUSaxIrGmlI/Jz9QqlUSj7uJQ/3n7JZa+QBKwRCzN2FO12nZjh5qoiY3s0OY1zgRVOz/Vi3PtE0RgW2N8m95GHael6qo0+0QaJRgZ5Y81QLo5pkEBarCsvU5KQ8ZptEowLR85VEQ40zC6QMZxb3xFqokvdxd7drn6gaaDyPZJrE6G7MxPg4BcVA/o4m2U26HcXk5KQihaJPbJ2N/KH501M4SMfUN4kxgdiS8jxPtDC/hbQFSvs3ZKLaK7HqEyER0xmNtJIH6aYxJjAl5AFfiIOkfOEnBUEgElnsuIApLNEmecCYwHKpJKTsyARGueJLScSaZ4s8YEwgLiULgmKs10AibjbBXyppwgI1YYGasEBNYgvEdvqw4rouxSVyFXYcJ4ur1zfX1+kKcBh1YOQE1uv1jTh/+LIiQpJtNBqrxDAMwzAMM9z8BewLwhBUeC1lAAAAAElFTkSuQmCC"
                /><span>Web应用</span>
              </div>
            </div>
            <div class="item-app-type">
              <div class="center-ionc">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAA4CAYAAABqtn+aAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAALXSURBVHgB7Zu/b1JRFMfPA8NbyuLDRJhgUQdpmlAHdaGdJU1HjYmUQcNfRHTwR2J0NEZnw6A4FJIGHITlvcW68Bx8LDR50Hdue19oSwnpze09ac4noT+4JJDPO+fc73sAAMMwDMNcEAs00Wg08slk8s10Oi2DQSzL2gvDcLter3uggQRoIpFIfDItD4lewxoeSNDENdDHGv54/fYdjMdjMIGdSkFtpwo6D6S2CpSYkiee++AAdKNd4FWHBSrCAhVhgYqwQEVYoCIsUBGdQVpQf/EcrjJcgYpor8DGy1dgEt0dwBWoCAtUhAUqwgIVYYGKsEBFSAm8c/uWuC1av1cqASW058BlQTkb5XL8/+/+YO66vMK92+kABUgIlHK+NZuQTqdjkVKiXN9td8D1PNiqPBL3U5BoXOCsvKHvQ/9Y2mw14t+u64nH9gcD+PzlKxmJxgWuRBWHb/7ksjkx395/+Ajt9pEUKRHlotj19ZIQ1+39Atu24f8oANMY30RQVrfXE9WFLbpVqUAul43f8Zfy5GOHQx8ePrh/4n6TkJiBsuI2N8rgR21cyOdhtVg8IwklFwp5MvIQMruwlIht7DjOXHlyVlKRh5DKgaPgaKadJw/R9mGeC0IuBy6qvHkRxzQkBOLMQzH7+3/nyvvR+glBMDoTcShIJNHCq8W7Ipqk0yuweSwnPvOIIg6u4w3BWYnZD9cWnfZdFiQE4qbheq4IyBhhMMrItsWIg62LZyBPnzwGJ+PEs3IK5jHewplMRoRi3/8XibwOf6I2xso6PQuxMrvdHtyIZFPajY0LzGZvit+16jNxoQBz4Gk5MuJgNsTP/HEOnGEUbQ7fWy2xgaC885ASg6h9KeVA4wJxti2LlEgJviKtCAtUhAUqwgIVYYGKsEBFtAu07RSYAs9wdKMtB1qW1cRvCNWqVSDAHmhCWwWGYbgDGl/4skQHsTmZTLaBYRiGYahxCCPJQdehyAlWAAAAAElFTkSuQmCC"
                /><span>移动应用</span>
              </div>
            </div>
          </div>
          <div class="select-name">选择页面布局</div>
          <div class="select-item-wrap">
            <div class="item-app-type activeItem">
              <div class="center-ionc">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAA4CAYAAABqtn+aAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGPSURBVHgB7dpNTsJAGMbxd/hoTVy71HAEjuAB3HCDwq4n6s6PE7jxAByBI1RcujaxlLYyJhpshMzLM03D5PktTAwvk/DPDJ8VISIiIjpLxnUwy7LJcDh8aJrmVgJljFlVVTVL0zR3vc/AeXAweA45nrV7fFO7STT3GSlmp/bP/eOTFEUhoYmjSBbzRLSbxHkH/ggxnlVsNnIKdUD6iwFBmufAg7K7C7m6PPyC/v7RSPry+fv/5OZaxuOx+FJut5K/rp3Xb88jvOzAY/H+u91nvO/1RiPV+u15BI8wiAFBDAhiQBADghgQxIAgBgQxIIgBQQwIYkAQA4IYEMSAoF4ClmUpPtkvSDXrt+cR/r5ZVMjXb9KlrtffxyMMYkBQL0dY+6NP1/OIXnag9kefrucRPMIgBgQxIIgBQQwIYkCQl4D24iHN7drPql3PI7y8Idq/8sqF9rNq1/MIHmEQA4LUAeM4khDFcSyncH4ONMYs7RXsiySRwK00w847sKqquXbxc7PbIMu6rmdCREREFL4vKreMBTUshMAAAAAASUVORK5CYII="
                /><span>默认导航</span>
              </div>
            </div>
            <div class="item-app-type item-app-type-center">
              <div class="center-ionc">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAA4CAYAAABqtn+aAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGJSURBVHgB7do9TsNAEAXgWf8iUVOCcoQcgQPQ5AZOOp/IHT8noOEAOUKOYEJJjYTj2CaLhAQF0m7exODV+4pU45XzNOv1SBYhIiIimiTjWlhV1SyO47thGK4lUMaYTdd1i7Isa9drIufCKHoMOTzr8P/mtkl8rkk8auf25/b+QZqmkdDkWSarZSG+TeLcgV9CDM9qdjs5hneA9BMDBPk8A39V3ZzJxbnzgf7nXt8GKZ/eRYNKB04pPEvzfrmFQQwQxABBKgHah/KUaN6vyimsdaJNEbcwiAGCVLbw7OpS0jQVLe1+L/Xz1nl9tB6h0oGa4X2ulyRe66P1CG5hEAMEMUAQAwQxQBADBKkE2LataLLvaT7ro/UIlReievsip+S7/qnv5ztuYRADBI0yC4892wY3C48923IWnhAGCGKAIAYIYoAgBggaZRYee7YNfhb+b/UIbmEQAwR5B5jnmYQoz3M5hvMz0Biztl+wr4pCArfxKXbuwK7rlr6LT82hQdZ93y+EiIiIKHwfXSapUyfDOnIAAAAASUVORK5CYII="
                /><span>顶部导航</span>
              </div>
            </div>
            <div class="item-app-type">
              <div class="center-ionc">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAA4CAYAAABqtn+aAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHASURBVHgB7drLbcJAEAbgMS9HyhFyTEQJlJACcqED4OYOCAWgdOBbHhXkkgIogRIIOQYfI8UY47BIiYIl0A4zluXV/x2Q0I5X5teMHxJEAAAAAJXk2RaGYdit1+tPWZbdkqM8z5unadoPgmBhe0zNurBWe3U5PGP3+3qmSTjHNBi1PfPx+PxCcRyTa/xWi0bDAXGbxLoDf7kYnhGv13QOdoBwCAEKca6BR4V3F3R1aX1DL93nV0bB2zdpUOnAKoVnaJ4vRlgIAQohQCGVAM1FuUo0z1flLqx1R6sijLAQAhRSGeGH6ZQ6nfbR9VUU0fh+8ve9e3NNzWaTtCSbDS3el9b75+slVDrwVHj79fbhumZ4+/0aDdb++XoJjLAQAhRCgEIIUAgBCiFAoVICTJKENJnnOs7++XoJvQcihsXyg4pU9P7/YYSFEKBQKSPMfVctul6ilA7kvqsWXS+BERZCgEIIUAgBCiFAIQQopBLgahWdXo8O17nvqkXXS6g8EI0nE1Y991216HoJjLAQAhRiB+j7LXKR7/t0DutroOd5M/MP9tFgQI6bc4qtOzBN0yF386rZNchsu932CQAAAMB9P6pamXUi0dYaAAAAAElFTkSuQmCC"
                /><span>融合导航</span>
              </div>
            </div>
          </div>
          <div class="btn-list">
            <button
              @click="initPageShow = false"
              type="button"
              class="ant-btn btn-close"
            >
              <span>关 闭</span>
            </button>
            <button type="button" class="ant-btn btn-new">
              <span>创 建</span>
            </button>
          </div>
        </div>
      </a-modal>
    </div>
  </div>
</template>

<script>
import uploadHelper from "@/util/upload.js";
export default {
  data() {
    return {
      nowPage: {
        _id: 0x1,
        name: "请选择",
      },
      createAppObject: () => this.$refs.createApp,
      initPageShow: false,
      loading: false,
      imageUrl: "",
      siderShow: false,
      leftDrawerShow: false,
    };
  },
  methods: {
    onLeftDrawerClose() {
      this.leftDrawerShow = false;
    },
    fileChange(ev) {
      const file = ev.target.files[0];
      if (!file) {
        return;
      }
      ev.target.value = ""; // 防止上传同一个文件时 不触发事件
      uploadHelper
        .uploadFile(file)
        .then((url) => {
          // 图片url
          console.log(url);
        })
        .catch(() => {
          // 失败
        });
    },
    pageChoose(id) {
      this.nowPage = this.editApp.datappPages.filter((i) => i._id == id.key)[0];
      if (id == "add") {
        // 新建页面
        this.nowPage = {
          _id: 0x1,
          name: "请选择",
        };
      }
    },
    handleChange(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl;
          this.loading = false;
        });
      }
    },
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        this.$message.error("You can only upload JPG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("Image must smaller than 2MB!");
      }
      return isJpgOrPng && isLt2M;
    },
  },
  computed: {
    editApp() {
      return this.$store.getters.editApp;
    },
    siderMenu() {
      return this.$store.getters.siderMenu;
    },
  },
  mounted() {
    setTimeout(() => {
      this.leftDrawerShow = true;
      this.initPageShow = true;
    }, 1000);
  },
};
</script>

<style lang="scss">
@import "./styles/createApp.scss";
</style>