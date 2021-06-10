<template>
  <div class="content">
    <div>
      <div class="one-line size">
        <i>*</i>宽度<el-input size="small"></el-input> <i>*</i>高度<el-input
          size="small"
        ></el-input>
      </div>
      <div class="one-line">
        <i>*</i>响应地址
        <el-input size="small"></el-input>
      </div>
      <buttonparam :buttonParam="responseDetail.button_param"></buttonparam>
    </div>
  </div>
</template>

<script>
import buttonparam from "./button_param";
export default {
  data() {
    return {
      button_param: [],
    };
  },
  components: {
    buttonparam: buttonparam,
  },
  props: ["responseDetail"],
  methods: {},
  mounted() {},
};
</script>

<style lang="scss">
.content {
  background: #f3f3f3;
  padding: 20px 30px;
  margin: 30px 0 0 0;
  min-height: 350px;
  .one-line {
    margin: 0 0 20px 0;
    .el-input {
      width: 600px;
    }
    // .width-and-height {
    //   .el-input {
    //     width: 230px;
    //   }
    // }
  }
  .size {
    .el-input {
      width: 200px;
    }
  }
}
</style>