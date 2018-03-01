<template>
  <div class="header-box">
    <div class="header-left">
      <Button type="text" @click="toggleClick()">
        <Icon type="navicon" size="32"></Icon>
      </Button>
    </div>
    <div class="header-right">
      <Dropdown trigger="click" class="loginOut">
        <!--<img class="avatar" @error="avatarError" :src="userInfo.photo" alt="">-->
        <a href="javascript:void(0)" style="color: #fff">
          {{userInfo.nikeName || '未登录'}}
          <Icon type="ios-arrow-down"></Icon>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem><a href="javascript:;" @click="logout">切换账号</a></DropdownItem>
          <!--<DropdownItem>修改密码</DropdownItem>-->
          <DropdownItem divided><a href="javascript:;" @click="logout">退出登录</a></DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  </div>
</template>

<script>
  import {userLogout} from '@/api'
  export default {
    name: 'header',
    props:{
      toggleClick: {
        type: Function,
        require: true
      }
    },
    data() {
      return {
        userInfo: localStorage.getItem('tx-user') ? JSON.parse(localStorage.getItem('tx-user')) : {}
      }
    },
    methods: {
      logout () {
        userLogout().then(res => {
          localStorage.removeItem('tx-user');
          localStorage.removeItem('tx-st');
          this.$router.push('/login')
        })
      },
      avatarError (e) {
        this.userInfo.photo = require('@/assets/images/logo.png')
      }
    },
    computed: {

    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped type="text/less">
  .header-box {
    height: 60px;
    text-align: right;
    padding-right: 20px;
    background-color: #3f3f3f;
    line-height: 60px;
    /*overflow: hidden;*/
  }
  .header-left{
    float: left;
    Button{
      color: #ccc;
      &:hover{
        color: #fff;
      }
    }
  }
  .header-right{
    float: right;
  }
  .loginOut {
    text-align: center;
  }
  .avatar{
    width: 40px;
    height: 40px;
    display: inline-block;
    object-fit: cover;
    vertical-align: middle;
  }
</style>
