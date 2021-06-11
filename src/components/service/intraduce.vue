<template>
  <div class="intraduce" ref="intraduce">
    <div>
      <el-checkbox label="下次登录时不显示此页" name="type"></el-checkbox>
    </div>
    <el-row :gutter="20" class="intraduce-detail">
      <el-col :span="10">
        <div class="intraduce-two-cards">
          <div class="intraduce-card el-row">
            <div>
              <div class="intraduce-card-title">数据构建</div>
              <span class="intraduce-card-span"></span>
              <div class="intraduce-card-content">
                无码化应用搭建能力，弹指间即完成数据从无到有的收集和使用，业务信息化就是如此简单
              </div>
              <el-button type="primary" round size="small">了解更多</el-button>
            </div>
            <div><img src="../../../static/images/card-left-top.png" /></div>
          </div>
          <div class="intraduce-card el-row intraduce-card-bottom">
            <div>
              <div class="intraduce-card-title">数据分析</div>
              <span class="intraduce-card-span"></span>
              <div class="intraduce-card-content">
                通过拖拽方式就能轻松的搭建多维度海量数据的统计分析、数据可视化
              </div>
              <el-button type="primary" round size="small">了解更多</el-button>
            </div>
            <div><img src="../../../static/images/card-left-bottom.png" /></div>
          </div>
        </div>
      </el-col>
      <el-col :span="4" style="position;relative">
        <div class="intraduce-center" ref="intraduceCenter">
          <img
            src="../../../static/images/inside-arrow.png"
            class="intraduce-cycle intraduce-cycle-inside"
            ref="insideCycle"
          />
          <img
            src="../../../static/images/outsite-arrow.png"
            class="intraduce-cycle intraduce-cycle-outside"
            ref="outsideCycle"
          />
          <img
            src="../../../static/images/grow-up.png"
            class="intraduce-cycle intraduce-cycle-arrow"
          />
        </div>

        <div class="down-icon">
          <a-icon type="down-circle" theme="twoTone" twoToneColor="#1890FF" />
        </div>
      </el-col>
      <el-col :span="10">
        <div class="intraduce-two-cards">
          <div class="intraduce-card el-row">
            <div><img src="../../../static/images/card-right-top.png" /></div>
            <div class="intraduce-card-right">
              <div class="intraduce-card-title intraduce-card-align-right">
                数据连接
              </div>
              <div class="intraduce-card-align-right">
                <span class="intraduce-card-span"></span>
              </div>
              <div class="intraduce-card-content intraduce-card-align-right">
                轻松融合不同类型、不同存储终端的海量数据，继而实现数据毫秒级传输速度，所接即所得，快得不可思议
              </div>
              <div class="intraduce-card-align-right">
                <el-button type="primary" round size="small"
                  >了解更多</el-button
                >
              </div>
            </div>
          </div>
          <div class="intraduce-card el-row intraduce-card-bottom">
            <div>
              <img src="../../../static/images/card-right-bottom.png" />
            </div>
            <div class="intraduce-card-right">
              <div class="intraduce-card-title intraduce-card-align-right">
                数据治理
              </div>
              <div class="intraduce-card-align-right">
                <span class="intraduce-card-span"></span>
              </div>
              <div class="intraduce-card-content intraduce-card-align-right">
                专业智能的数据处理、校验、优化，让冗杂的海量数据瞬间变得条理清晰井然有序，管理数据轻松简单
              </div>
              <div class="intraduce-card-align-right">
                <el-button type="primary" round size="small"
                  >了解更多</el-button
                >
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      outsiteRotate: 0,
      insiteRotate: 0,
    };
  },
  computed: {},
  methods: {
    startAnimation() {
      this.startCenterAnimation();
    },
    startCenterAnimation() {
      const timer = setInterval(() => {
        this.outsiteRotate = this.outsiteRotate + 1;
        if (this.outsiteRotate > 360) {
          this.outsiteRotate = 0;
        }
        this.insiteRotate = this.insiteRotate + 1.5;
        if (this.insiteRotate > 360) {
          this.insiteRotate = 0;
        }
        if (!this.$refs.insideCycle || !this.$refs.outsideCycle) {
          return;
        }
        this.$refs.insideCycle.style.setProperty(
          "transform",
          "rotate(" + this.insiteRotate + "deg)"
        );
        this.$refs.insideCycle.style.setProperty(
          "transform",
          "rotate(" + this.insiteRotate + "deg)"
        );
        this.$refs.outsideCycle.style.setProperty(
          "transform",
          "rotate(" + this.outsiteRotate + "deg)"
        );
        this.$refs.outsideCycle.style.setProperty(
          "transform",
          "rotate(" + this.outsiteRotate + "deg)"
        );
      }, 1e2);

      this.$once("hook:beforeDestroy", () => {
        clearInterval(timer);
      });
    },
  },
  created() {},
  mounted() {
    this.startAnimation();
  },
};
</script>

<style lang="scss">
.el-main {
  display: flex;
}
.intraduce {
  display: flex;
  flex-direction: column;
  flex-shrink: 1;
  flex-grow: 1;
  padding: 20px;
  background-image: url(../../../static/images/introduce-background.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .background-left-top {
    background: url(../../../static/images/up-left.png);
    background-repeat: no-repeat;
  }
  .intraduce-card-right {
    float: right;
  }
  .intraduce-card-bottom {
    margin-top: 20vh;
  }
  .intraduce-card-content {
    font-size: 14px;
    line-height: 24px;
    color: rgb(85, 85, 85);
  }
  .intraduce-card-align-right {
    text-align: right;
  }
  .intraduce-card-title {
    font-weight: 500;
    font-size: 30px;
    line-height: 42px;
    color: #5e605f;
  }
  .intraduce-two-cards {
    height: calc(100vh - 250px);
  }
  .intraduce-card {
    margin-bottom: 40px;
    .el-button {
      margin-top: 5vh;
    }
    .intraduce-card-span {
      margin-top: 20px;
      display: inline-block;
      width: 4.17vw;
      height: 0.42vw;
      margin-bottom: 20px;
      background: rgb(255, 187, 51);
    }
  }
  .intraduce-center {
    --outsiteRotate: 0;
    --insiteRotate: 0;
  }

  @keyframes bounceY {
    0% {
      bottom: 6px;
    }

    50% {
      bottom: 24px;
    }

    100% {
      bottom: 6px;
    }
  }

  .down-icon {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    animation-name: bounceY;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;

    .anticon {
      transform: scale(2);
    }
  }
  .intraduce-detail {
    align-items: center;
    margin-top: 20px;
  }
  .intraduce-cycle-outside {
    width: 26vw;
    height: 26vw;
    margin-left: -13vw;
    margin-top: -13vw;
    transform: rotate(var(--outsiteRotate) deg);
  }
  .intraduce-cycle-inside {
    width: 23vw;
    height: 23vw;
    margin-left: -11.5vw;
    margin-top: -11.5vw;
    transform: rotate(var(--insiteRotate) deg);
  }
  .intraduce-cycle-arrow {
    width: 15vw;
    height: 15vw;
    margin-left: -7.5vw;
    margin-top: -7.5vw;
  }
  .intraduce-cycle {
    position: absolute;
    left: 50%;
    top: 50%;
    border-radius: 50%;
  }
  .el-row {
    flex-grow: 1;
    display: flex;
    flex-direction: row;
  }
}
</style>
