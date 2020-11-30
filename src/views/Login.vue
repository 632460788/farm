
<template>
  <div id="login">
    <img src="../assets/login_background-3.png" alt="" class="background_img" style="display:block;margin: 0;">
    <div class="container">
      <!--        左侧图片-->
      <div class="pic">
        <!--            这里将position改为absolute，img的位置为何会改变
                        max-height用百分数做单位，组件的大小变化尚不清楚-->
        <img src="../assets/login_left.png" style="max-width: 87%;max-height: 62.5%;top: 23.8%;left: 11%;position: relative">
      </div>
      <!--        右侧组件-->
      <div class="login">
        <!--            title文字-->

        <!--            用户名和密码输入框-->
        <!--        <div class="name">-->
        <!--          <img src="img/user.png" style="height:35px;width: auto;top: 17.5px;left:5px ;position: absolute">-->
        <!--        </div>-->
        <!--        <div class="password">-->
        <!--          <img src="img/password.png" style="height:35px;width: auto;top: 17.5px;left:5px ;position: absolute">-->
        <!--        </div>-->
        <span class="title" >枳壳智慧种植管理系统</span>

        <div class="form" style="top: 40%;position: relative">
          <el-form :model="loginForm" :rules="fieldRules" ref="loginForm"  style="position:relative;" >

            <el-form-item class="item-style" prop="account"  style="width:70%;left:10%;position: relative;display: block">
              <el-input type="text" v-model="loginForm.account" auto-complete="off" placeholder="用户名"
                        style="text-align: center;vertical-align: center">
                <i class="al-icon-firstuser" slot="prepend"></i>
              </el-input>
            </el-form-item>


            <el-form-item class="item-style" prop="password" style="width:70%;left:10%;position: relative">
              <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码" >
                <i class="al-icon-firstkey" slot="prepend"></i>
              </el-input>
            </el-form-item>

            <el-form-item style="width:20%;left:60%;position: relative" >
              <el-button type="primary" style="width:100%" @click.native="login" >登 录</el-button>
            </el-form-item>

          </el-form>
        </div>

        <span style="display: block;bottom: 10%;left:23%;position: absolute">重庆市玮益生态农业科技有限公司</span>
        <span style="font-size:0.8em;display: block;bottom: 7%;left:28%;position: absolute">©2019-2020 All Rights Reserved.</span>
      </div>
    </div>
  </div>
</template>

<script>
    import Cookies from "js-cookie";
    import mock from '@/mock/index.js'
    export default {
        name: 'login',
        data() {
            const validateEmail = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error('账号不能为空'));
                } else {
                    callback();
                }
            };
            const validatePass = (rule, value, callback) => {
                if (value.length < 6) {
                    callback(new Error('密码不能小于6位'));
                } else {
                    callback();
                }
            };
            return {
                loginForm: {
                    account: '',
                    password: ''
                },
                fieldRules: {
                    account: [
                        {required: true, message: '请输入账号', trigger: 'blur', validator: validateEmail}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                      //由于当前的规则主要用于登录，所以只要密码不为空就满足规则，故将validator清除
                      // {required: true, message: '请输入密码', trigger: 'blur', validator: validatePass}
                    ]
                },
                checked: false,
                loading: false,
                showDialog: false
            };
        },
        methods: {
            login() {
                let userInfo = {username: this.loginForm.account, password: this.loginForm.password};
                let userInfoQS = this.$qs.stringify({
                    username: this.loginForm.account,
                    password: this.loginForm.password
                })
                this.$api.login.login(userInfo).then((res) => {
                    console.error(res)

                    let { msg, code, data } = res;
                    if (code !== 200) {
                        this.$message({
                            message: "账号或密码错误",
                            type: 'error'
                        });
                    } else {
                        //sessionStorage.setItem('user', JSON.stringify(user));
                        //this.$router.push({ path: '/table' });
                        Cookies.set('token', res.data.token);// 放置token到Cookie
                        sessionStorage.setItem('user', userInfo.username);// 保存用户到本地会话
                        sessionStorage.setItem('avatar', res.data.avatar);
                        sessionStorage.setItem('role', res.data.role);
                        sessionStorage.setItem('registerInfo', res.data.registerInfo);
                        //this.$router.push('/')  // 登录成功，跳转到主页

                        if (this.$route.query.redirect == location.hostname)
                        {this.$router.go(-1);
                        } else {
                            this.$router.push('/');
                        }

                    }


                }).catch(function (res) {
                    alert(res);
                });
            }
        },
        //实现回车键登录
        created() {
            let that = this;
            document.onkeydown =function(e){
                e = window.event || e;
                if(that.$route.path==='/login'&&(e.code==='Enter'||e.code==='enter')){//验证在登录界面和按键是回车键enter
                    that.login();//登录函数
                }
            }
        }
    }
</script>

<style scoped>
  #login{
    width: 1920px;
    height: 1080px;
    position: absolute;

  }
  .background_img{
    /*width: 1200px;*/
    /*height: 1200px;*/
    overflow: hidden;
  }
  .container {
    border-radius: 30px;
    background-color: rgb(255, 255, 255);
    position: absolute;
    left: 17.4%;
    top: 18.5%;
    width: 62.5%;
    height: 72.2%;
    z-index: 1;
  }
  .pic{
    width: 50%;
    height: 100%;
    float: left;
  }
  .login{
    width: 50%;
    height: 100%;
    float: left;
    position: relative;
  }
  .login .title{
    float: none;
    display: block;
    top: 20%;
    left: 25%;
    size: auto;
    position: absolute;
    font-size: 1.5em;
    /*color: rgb(114,175,255);*/
    letter-spacing: 0.1em;
  }
  .login .name{
    width: 360px;
    height: 70px;
    left:20%;
    top: 30%;
    position: absolute;
    border-bottom: 0.5px solid rgba(169,169,169,0.5);
  }
  .login .password{
    width: 360px;
    height: 70px;
    left:20%;
    top: 50%;
    position: absolute;
    border-bottom: 0.5px solid rgba(169,169,169,0.5);
  }





</style>
