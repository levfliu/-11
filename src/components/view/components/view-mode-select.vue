<template>
  <div id="view-mode-select">
    <span>模式选择</span>
    <ul>
      <li
        v-for="(i, id) in list"
        v-bind:key="id"
        v-bind:class="{ choosed: id == choosed, disabled: i.disabled }"
        @click="onClick(id)"
      >
        {{ i.text }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["list", "choosed"],
  methods: {
    onClick(i) {
      if (i.disabled) {
        this.$emit("onClick", i);
      }
    },
  },
  watch: {
    choosed(_new, old) {
      console.log(_new);
    },
  },
};
</script>

<style lang="scss">
#view-mode-select {
  display: flex;
  flex-direction: row;
  align-items: center;
  span {
    color: #333;
    margin-right: 12px;
  }
  ul {
    display: flex;
    flex-direction: row;
    padding: 0;
    margin: 0;
    list-style: none;
    min-height: 34px;
  }
  li {
    color: #5e605f;
    font-size: 14px;
    display: flex;
    list-style: none;
    padding: 6px 26px;
    position: relative;
    padding: 6px 26px;
    margin-right: 10px;
    background: #fff;
    border: 1px solid #dcdddd;
    border-radius: 2px;
    box-shadow: 0 2px 0 rgb(0 0 0 / 2%);
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: pointer;
    position: relative;
  }
  .choosed {
    border: 2px solid #5182e4;
    font-weight: 700;
    color: #5182e4;
    &:before {
      position: absolute;
      display: inline-block;
      content: "";
      height: 0;
      width: 0;
      border-left: 16px solid #5182e4;
      border-top: 16px solid transparent;
      border-bottom: 16px solid transparent;
      right: -3px;
      top: -11px;
      transform: rotate(-45deg);
    }
    &:after {
      position: absolute;
      content: "";
      display: block;
      border-left: 2px solid #fff;
      border-bottom: 2px solid #fff;
      height: 5px;
      width: 9px;
      background: transparent;
      right: 0;
      top: 0;
      transform: rotate(-45deg);
    }
  }
  .disabled {
    border-color: #ebeef5;
    cursor: not-allowed;
    color: #c0c4cc;
  }
}
</style>