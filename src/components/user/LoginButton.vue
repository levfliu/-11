<template>
  <div class="btn-login" @click="click" :class="{ 'disabled': disabled }">
    {{name}}
  </div>
</template>
<script>
export default {
    name: 'LoginButton',
    props: {
        name: {
            type: String
        },
        disabled: {
            type: Boolean
        }
    },
    data () {
        return {}
    },
    methods: {
        click () {
            if (!this.disabled) {
                this.$emit('btn-click', {})
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    $primary-color: #00aaef;
    $disabled-color: #b3b7bd;
    .btn-login {
        font-size: 20px;
        line-height: 50px;
        width: 100%;
        height: 50px;
        color: #fff;
        cursor: pointer;
        border-radius: 100px;
        text-align: center;
        background-color: $primary-color;

        &:hover {
            background-color: darken($primary-color, 10%);
        }
    }

    .btn-login.disabled {
        cursor: not-allowed;
        background-color: $disabled-color;
    }
</style>
