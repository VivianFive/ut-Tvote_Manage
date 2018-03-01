<style scoped>
  #login{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .login-iframe{
    width: 100%;
    height: 100%;
  }
  .login-box{
    width: 300px;
    text-align: center;
  }
  .logo{
    padding: 20px 0;
  }
  .login-mask{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,.7);
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .iframe-box{
    width: 420px;
    height: 100%;
    max-height: 700px;
    display: inline-block;
    vertical-align: middle;
    margin: 0 auto;
    text-align: left;
    background-color: #FFF;
    position: relative;
  }
  .scale-enter-active, .scale-leave-active {
    transition: all .3s ease;
  }
  .scale-enter, .scale-leave-to {
    transform: scale(1.3);
    opacity: 0;
  }
  .loginBoxArea{
    width: 100%;
    height: 100%;
    padding: 22% 10px;
    box-sizing: border-box;
  }
  .login-logo{
    text-align: center;
    font-family: "微软雅黑","Microsoft Yahei","Hiragino Sans GB",tahoma,arial,"宋体";
    color: #333;
  }
  .loginPop{
    border: #ddd solid 1px;
    border-bottom: 0;
    margin-top: 2px;
  }
  .login-row{
    height: 70px;
    padding-bottom: 1px;
    padding-top: 1px;
    position: relative;
    border-bottom: #ddd solid 1px;;
  }
  .login-input{
    background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
    border: 0 none;
    display: block;
    font-size: 14px;
    height: 26px;
    left: 0;
    line-height: 26px;
    margin: 0;
    /*padding: 10px 15px;*/
    position: relative;
    top: 18px;
    width: 245px;
    padding-left: 38px;
    outline: none;
  }
  .pass-label {
    float: left;
    height: 16px;
    left: 12px;
    position: absolute;
    top: 20px;
    width: 15px;
    z-index: 2;
  }

</style>
<style>
  #login .ivu-form-item-error-tip{
    top: 45px;
    left:10px;
  }
  #login .ivu-form-item{
margin-bottom: 0px;
  }
  #login .ivu-btn{
    width: 100%;
    height: 40px;
    margin-top: 50px;
    border-radius: 0;
    font-size: 14px;
  }
</style>
<template>
  <div id="login">
    <div class="login-box">
      <div class="logo">
        <img :src="require('@/assets/images/logo.png')" alt="">
      </div>
      <div>
        <h1>剃投管理系统</h1>
        <Icon type="log-in"></Icon> <a href="javascript:;" @click="toggleLogin"> 登 录 </a>
      </div>
    </div>
    <transition name="scale">
      <div class="login-mask" v-if="maskShow">
        <div class="iframe-box">
          <!--<iframe ref="iframe" @load="iframeLoaded" v-show="!spinShow" class="login-iframe" :src="apiUrl+'/authorize?directType=0&redirectUrl='+originUrl+'/static/login-authorize.html'" frameborder="0"></iframe>
          <Spin size="large" fix v-if="spinShow"></Spin>-->
          <!--借用iframe-->
          <div class="loginBoxArea">
            <div class="login-logo">
              <img style="width: 100px;height: 100px;" src="../assets/images/logo.png">
            </div>
            <div style="margin-top: 10%;">
              <div style="width: 80%;margin:0 auto">
                <Form ref="formInline" :model="formInline" :rules="ruleInline">
                  <div class="loginPop">
                  <FormItem prop="user" class="login-row">
                    <div class="pass-label"><img src="../assets/images/icons-1.png" ></div>
                    <input class="login-input" type="text" v-model="formInline.user" placeholder="请输入您的手机号或用户名" name="username" id="username">
                  </FormItem>
                  <FormItem prop="password" class="login-row">
                    <div class="pass-label"><img src="../assets/images/icons-2.png" ></div>
                    <input class="login-input" type="password" v-model="formInline.password" placeholder="请输入密码" name="password" id="password">
                  </FormItem>
                  </div>
                  <FormItem>
                    <Button class="btnSubmit" type="primary" @click="handleSubmit('formInline')">登  录</Button>
                  </FormItem>
                </Form>
              </div>

            </div>
          </div>

        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import {userInput} from '@/api'
    export default {
      data () {
        return {
          apiUrl: process.env.BASE_API,
          originUrl: process.env.APP_ORIGIN,
          maskShow: false,
//          spinShow: true
          formInline: {
            user: '',
            password: ''
          },
          ruleInline: {
            user: [
              { required: true, message: '请填写手机号或用户名！', trigger: 'blur' }
            ],
            password: [
              { required: true, message: '请填写密码！', trigger: 'blur' },
              { type: 'string', min: 6, message: '密码不能少于6位数！', trigger: 'blur' }
            ]
          }
        }
      },
      created () {
       /* window.showWarning = (msg) => {
          this.maskShow = false;
          this.$Modal.warning({
            title: '提示',
            content: msg
          });
        }*/
      },
      methods: {
        toggleLogin () {
          this.maskShow = !this.maskShow;
          this.spinShow = true;
        },
//        借用ifram
        /*iframeLoaded () {
          this.spinShow = false
        }*/
        handleSubmit(name) {
          this.$refs[name].validate((valid) => {
            if (valid) {
              userInput({userName:this.formInline.user,password:this.formInline.password}).then(res =>{
                if(res.code === 200){
                  this.maskShow = !this.maskShow;
                  this.$Message.success('登录成功!');
                  localStorage.setItem('tx-user', JSON.stringify(res.data));
                  localStorage.setItem('tx-st',res.data.st);
                  parent.location.href = '/'
                }else{
                  alert(res.message);
                  parent.location.reload();
                }

              })
            }
          })
        }
      }
    }
</script>
