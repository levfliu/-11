<template>
  <div class="input-login">
    <div class="input-wrapper" :class="{actived: actived}">
      <input
        :type="type"
        :value="value"
        @input="updateValue($event.target.value); handleValidate($event.target.value)"
        @focus="active(); handleValidate($event.target.value);"
        @blur="deActive"
        @keyup.enter="submit"
        :placeholder="placeholder"
      />
      <span class="slot">
        <slot></slot>
      </span>
    </div>
    <div class="error" v-if="innerErrors.length">
      <ul class="error-list">
        <li class="error-msg" v-for="(error, index) in innerErrors" :key="index">{{error.msg}}</li>
      </ul>
    </div>
    <div class="error" v-if="outerErrors.length">
      <ul class="error-list">
        <li class="error-msg" v-for="(error, index) in outerErrors" :key="index">{{error.msg}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
    name: 'LoginInput',
    props: {
        type: {
            type: String,
            default: 'text'
        },
        value: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        outerErrors: {
            type: Array,
            default: () => []
        },
        validators: {
            type: Array,
            default: () => []
        }
    },
    data () {
        return {
            actived: false,
            innerErrors: []
        }
    },
    computed: {
        valid () {
            return (
                !!this.value &&
                this.innerErrors.length === 0 &&
                this.outerErrors.length === 0
            )
        }
    },
    methods: {
        updateValue (value) {
            this.$emit('input', value)
        },
        active () {
            this.actived = true
        },
        deActive () {
            this.actived = false
        },
        handleValidate (value) {
            this.innerErrors = this.validators
                .filter(v => value && !v.pattern.test(value))
                .map(v => ({
                    name: v.name,
                    msg: v.msg
                }))
            this.outerErrors.length = 0
        },
        submit () {
            if (this.valid) {
                this.$emit('login')
            }
        }
    }
}
</script>
<style lang="scss" scoped>
$border-color: #cfdae6;

.input-login {
  height: 90px;

  .input-wrapper {
    line-height: 50px;
    width: 100%;
    height: 50px;
    border: 1px solid $border-color;
    border-radius: 100px;
    background: #fff;
    position: relative;

    webkit-transition: border-color 0.15s ease-in-out,
      box-shadow 0.15s ease-in-out;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    &.actived {
      box-shadow: 0 0 2px 1px #78aeda, inset 0 0 2px #78aeda;
      border-color: #66afe9;
    }

    &:hover {
      border-color: darken($border-color, 20%);
    }

    input {
      font-size: 18px;
      float: left;
      width: 70%;
      text-indent: 20px;
      border: none;
      border-radius: 100px;
      background-color: transparent;
      padding: 10px 0 0 0;
      margin: 4px 0 0 10px;
    }

    input:focus {
      outline: none;
    }

    .slot {
      font-size: 16px;
      padding-right: 20px;
      text-align: right;
      border-left: none;
      cursor: default;
      margin-top: 0px;
    }
  }
  .error {
    height: 20px;
    color: #f00;
    ul {
      list-style-type: none;
      li {
        float: left;

        &:nth-child(1) {
          margin-left: 5px;
        }
        &:not(:nth-child(1)) {
          margin-left: 20px;
        }
      }
    }
  }
}
</style>
