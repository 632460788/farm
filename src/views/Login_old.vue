
<!--旧登录页面-->

<template>
  <!--  <div class="login-container" style="background-color: #141a48;margin: 0; overflow: hidden;">-->


  <div id="container" class="bg-img container">
    <div style="margin-top:100px;background-color: #09153D;color:whitesmoke;text-shadow:5px 2px 6px #000;width:100%;bottom: 0;horiz-align: center;vertical-align: middle;padding-top: 50px;padding-bottom:50px;box-shadow: 0 0px 5px #FFFFFF;">
      <span style="width: 50px;font-size: 70px">
        智慧枳壳种植管理系统<br></span>
    </div>
    <el-form :model="loginForm" :rules="fieldRules" ref="loginForm" label-position="left" label-width="0px"
             class="card-box login-container">
      <h3 class="title">欢 迎 登 陆</h3>
      <el-form-item class="item-style" prop="account">
        <el-input type="text" v-model="loginForm.account" auto-complete="off" placeholder="用户名"
                  style="text-align: center;vertical-align: center">
          <i class="al-icon-firstuser" slot="prepend"></i>
        </el-input>
      </el-form-item>
      <el-form-item class="item-style" prop="password">
        <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码" >
          <i class="al-icon-firstkey" slot="prepend"></i>
        </el-input>
      </el-form-item>
      <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
      <el-form-item style="width:100%">
        <!--        <el-button type="primary" style="width:40%;" @click.native.prevent="register">注 册</el-button>-->
        <el-button type="primary" style="width:100%;" @click.native="login" >登 录</el-button>
        <!--        4.7更换button-->
        <!--        <button class="btn btn-pink btn-bubbles" style="width:40%;" @click="login">登 录</button>-->
        <!--        TODO ’忘记密码‘的点击事件
        <el-button type="text" style="font-size: 13px; width: 38%;color: #969696;" @click="">忘记密码？</el-button>-->
      </el-form-item>
    </el-form>
    <div style="width:100%;bottom: 0;horiz-align: center;vertical-align: middle;">
      <span style="width: 50px;font-size: 30px">
        <!--<img src="../assets/Hi.png" alt="" style="width:auto; height:50px;bottom: 0;">-->
        大连理工大学软件学院 大数据研究所<br></span>

      <span style="width: 50px;font-size: 30px">
        重庆丙丰生态农业有限公司</span>
      <p>©2019 All Rights Reserved. </p>
    </div>
  </div>

</template>

<script>
    import Cookies from "js-cookie";
    import mock from '@/mock/index.js'
    export default {
        name: 'Login',
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
                        {required: true, message: '请输入密码', trigger: 'blur', validator: validatePass}
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

<style lang="scss" scoped>

  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 80px auto;
    width: 350px;
    padding: 50px 60px 50px 60px;
    background: #09153D;
    border: 1px solid #eaeaea;
    box-shadow: 0 0px 1px #FFFFFF;
    text-align: center;

    .title {
      font-family: "Arial", "Microsoft YaHei UI Light", sans-serif;
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
      font-size: 30px;
    }

    .remember {
      margin: 0px 0px 35px 0px;
    }

    .item-style {
      width: 350px;
      font-size: 35px;
      height: 40px;
      text-align: center;
      horiz-align: center;
      vertical-align: middle;
    }

    .icon-img {
      position: fixed;
      height: 100%;
      width: 100%;
      /*background-color: #FFFAF0;*/
      background-image: url(../assets/login-farm.png);
      background-repeat: no-repeat;
      background-size: 100% 100%;
      /*opacity: 100%;*/
    }
  }


  .txt {
    font-family: "Arial", "Microsoft YaHei UI Light", sans-serif;
    font-size: 15px;
    color: #C9C9C9;
  }
  .container::-webkit-scrollbar {display:none}





  @function sample($list) {
    @return nth($list, random(length($list)));
  }

  @function bubbles($color, $count: 16) {
    $bubbles: ();
    // define your own bubbles here!
    $bubble-types: (
      radial-gradient(circle, $color 20%, transparent 20%),
      radial-gradient(circle, transparent 20%, $color 20%, transparent 30%)
    );
    @for $i from 1 through $count {
      $bubbles: append($bubbles, sample($bubble-types), comma);
    }
    @return $bubbles;
  }

  @function random_range($min, $max) {
    $rand: random();
    $random_range: $min + floor($rand * (($max - $min) + 1));
    @return $random_range;
  }

  @function random_sizes($count: 16) {
    $sizes: ();
    @for $i from 1 through $count {
      $sizes: append(
          $sizes,
            (random_range(10, 20) * 1%) (random_range(10, 20) * 1%),
          comma
      );
    }
    @return $sizes;
  }

  .btn {
    --hue: 190;
    --btn-bg-color: hsl(var(--hue), 100%, 50%);
    --btn-bg-color-darker: hsl(var(--hue), 100%, 45%);
    position: relative;
    padding: 0.75rem 1.5rem;
    margin: 1rem;
    font-size: 1rem;
    font-family: Lato, sans-serif;
    line-height: 1.5;
    color: white;
    text-decoration: none;
    background-color: var(--btn-bg-color);
    border: 1px solid var(--btn-bg-color);
    border-radius: 4px;
    box-shadow:
      0 0.1px 0.7px rgba(0, 127, 255, 0.14),
      0 0.1px 1.7px rgba(0, 127, 255, 0.202),
      0 0.3px 3.1px rgba(0, 127, 255, 0.25),
      0 0.4px 5.6px rgba(0, 127, 255, 0.298),
      0 0.8px 10.4px rgba(0, 127, 255, 0.359),
      0 2px 25px rgba(0, 127, 255, 0.5)
  ;
    outline: transparent;
    overflow: hidden;
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
    transition: 0.25s;

    &-pink {
      --hue: 210;
    }

    &-bubbles {
      overflow: visible;
      transition: transform ease-in 0.1s, background-color ease-in 0.1s,
      box-shadow ease-in 0.25s;

      &::before {
        position: absolute;
        content: "";
        left: -2em;
        right: -2em;
        top: -2em;
        bottom: -2em;
        transition: ease-in-out 0.5s;
        background-repeat: no-repeat;
        background-image: bubbles(var(--btn-bg-color));
        background-size: random_sizes();
        background-position: 18% 40%, 20% 31%, 30% 30%, 40% 30%, 50% 30%, 57% 30%,
        65% 30%, 80% 32%, 15% 60%, 83% 60%, 18% 70%, 25% 70%, 41% 70%, 50% 70%,
        64% 70%, 80% 71%;
        animation: bubbles ease-in-out 0.75s forwards;
      }

      &:active {
        transform: scale(0.95);
        background: var(--btn-bg-color-darker);

        &::before {
          // when the clicked mouse is up, trigger the animation.
          animation: none;
          background-size: 0;
        }
      }
    }
  }

  @keyframes bubbles {
    0% {
      background-position: 18% 40%, 20% 31%, 30% 30%, 40% 30%, 50% 30%, 57% 30%,
      65% 30%, 80% 32%, 15% 60%, 83% 60%, 18% 70%, 25% 70%, 41% 70%, 50% 70%,
      64% 70%, 80% 71%;
    }

    50% {
      background-position: 10% 44%, 0% 20%, 15% 5%, 30% 0%, 42% 0%, 62% -2%,
      75% 0%, 95% -2%, 0% 80%, 95% 55%, 7% 100%, 24% 100%, 41% 100%, 55% 95%,
      68% 96%, 95% 100%;
    }

    100% {
      background-position: 5% 44%, -5% 20%, 7% 5%, 23% 0%, 37% 0, 58% -2%, 80% 0%,
      100% -2%, -5% 80%, 100% 55%, 2% 100%, 23% 100%, 42% 100%, 60% 95%, 70% 96%,
      100% 100%;
      background-size: 0% 0%;
    }
  }


</style>



<!--新设计的登录页面-->

