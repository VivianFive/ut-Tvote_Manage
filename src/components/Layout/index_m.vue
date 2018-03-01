<style scoped lang="less">
  .layout {
    background: #f5f7f9;
    position: relative;
    overflow: hidden;
    height: 100%;
  }

  .layout-content {
    min-height: 200px;
    padding: 15px;
    overflow: auto;
    background: #fff;
    border-radius: 4px;
    flex: auto;
  }

  .layout-menu-left {
    background: #464c5b;
  }

  .rightContent {
    display: flex;
    flex-direction: column;
    flex: auto;
    height: 100%;
  }

  .layout-breadcrumb {
    padding: 10px 15px 10px;
    flex: 0 0 auto;
  }
  .layout-logo-left{
    width: 90%;
    margin: 20px auto;
    text-align: center;
    color: #fff;
    font-size: 18px;
    img{
      width: 60px;
      height: 60px;
      display: block;
      margin:0 auto 10px;
    }
  }
  .ivu-col{
    transition: width .2s ease-in-out;
  }
</style>
<template>
  <div id="layout" class="layout">
    <Row type="flex" style="height:100%">
      <Col :span="spanLeft" class="layout-menu-left" style="min-width: 150px">
        <div class="layout-logo-left">
          <img class="c5-icon logo" src="../../assets/images/logo.png">
          <h2 class="c5-icon title" v-if="titleDisplay">剃投管理系统</h2>
        </div>
        <v-menu :spanSize="spanLeft"/>
      </Col>
      <Col :span="spanLeft" class="rightContent">
        <v-header :toggleClick="toggleClick"/>
      <div class="layout-breadcrumb">
        <nav-bar></nav-bar>
      </div>
      <div class="layout-content">
        <transition name="fade" mode="out-in">
          <router-view :key="key"></router-view>
        </transition>
      </div>

      </Col>
    </Row>
  </div>
</template>
<script>
  import VHeader from './Header'
  import VMenu from './Menu'
  import NavBar from './navBar'

  export default {
    components: {
      VHeader,
      VMenu,
      NavBar
    },
    data() {
      return {
        spanLeft: 3,
        spanRight: 19
      }
    },
    computed: {
      key() {
        return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date();
      },
      titleDisplay () {
        return this.spanLeft == 2 ? false : true
      }
    },
    methods: {
      toggleClick () {
        if (this.spanLeft === 3) {
          this.spanLeft = 2;
          this.spanRight = 22;
        } else {
          this.spanLeft = 3;
          this.spanRight = 19;
        }
      }
    }
  }
</script>
