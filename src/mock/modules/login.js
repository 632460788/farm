// 模拟后端，用来给前端返回数据
// 登录接口
export function login() {
  const loginData = {
    'msg': 'success',
    'code': 0,
    'data': {
      'username': 'admin',
      'avatar': '',
      'role': "管理员",
      'registerInfo': "2019/05/10 10:23:30",
      'token': '4344323121398'
    }
  }
  return {
    // isOpen: false,
    url: 'login',
    type: 'post',
    data: loginData
  }
}

// 登出接口
export function logout() {
  const logoutData = {
    "code": 200,
    "msg": null,
    "data": {
    }
  }
  return {
    url: 'logout',
    type: 'get',
    data: logoutData
  }
}
