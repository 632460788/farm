import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import NotFound from '@/views/404'
import Hello from '@/views/HelloWorld'
import api from '@/http/api'
import store from '@/store'
import Introduction from '@/views/Introduction'
import camera from "../views/pages/Intro/camera";
import Identification from "../views/pages/Intro/Identification";
import KnowledgeBase from "../views/pages/Intro/KnowledgeBase";
import ProductTracing from "../views/pages/Intro/ProductTracing";
import SoilTesting from "../views/pages/Intro/SoilTesting";
import AboutUs from "../views/pages/Intro/AboutUs";
import { getIFramePath, getIFrameUrl } from '@/utils/iframe'


Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: Home,
      children:[
        {
          path: '',
          name: '初始界面',
          component: Hello ,
          meta: {
            icon: 'fa fa-home fa-lg',
            index: 0
          }}
      ]
    },
    {
      path: '/login',
      name: '登录',
      component: Login,
      meta: {
        title: '后台管理系统'
      }
    },
    {
      path: '/404',
      name: 'notFound',
      component: NotFound
    },
    {
      path: '/introduction',
      name: 'Introduction',
      component: Introduction,
      meta: {
        title: '枳壳智慧种植-首页'
      }
    },
    {
      path: '/introduction/camera',
      name: 'camera',
      component: camera,
      meta: {
        title: '枳壳智慧种植-园区监控'
      }
    },
    {
      path: '/introduction/SoilTesting',
      name: 'SoilTesting',
      component: SoilTesting,
      meta: {
        title: '枳壳智慧种植-测土配方'
      }
    },
    {
      path: '/introduction/Identification',
      name: 'Identification',
      component: Identification,
      meta: {
        title: '枳壳智慧种植-病虫害识别'
      }
    },
    {
      path: '/introduction/ProductTracing',
      name: 'ProductTracing',
      component: ProductTracing,
      meta: {
        title: '枳壳智慧种植-产品追溯'
      }
    },
    {
      path: '/introduction/KnowledgeBase',
      name: 'KnowledgeBase',
      component: KnowledgeBase,
      meta: {
        title: '枳壳智慧种植-枳壳知识库'
      }
    },
    {
      path: '/introduction/AboutUs',
      name: 'AboutUs',
      component: AboutUs,
      meta: {
        title: ' 关于我们'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 登录界面登录成功之后，会把用户信息保存在会话
  // 存在时间为会话生命周期，页面关闭即失效。


  // let username = sessionStorage.getItem('user')
  //
  // if (to.path === '/login') {
  //   // 如果是访问登录界面，如果用户会话信息存在，代表已登录过，跳转到主页
  //   if(username) {
  //     next({ path: '/' })
  //   } else {
  //     next()
  //   }
  // } else {
  //   if (!username) {
  //     // 如果访问非登录界面，且户会话信息不存在，代表未登录，则跳转到登录界面
  //     console.error('跳转到这里了')
  //     next({ path: '/login' })
  //   } else {
  //     addDynamicMenuAndRoutes(username, to, from)
  //     next()
  //   }
  // }

  let username = sessionStorage.getItem('user')
  //跳转后修改页面标题
  if (to.meta.title) {
    document.title = to.meta.title
  }

  if(to.path === '/introduction/camera'){
    next()
  }
  else if(to.path === '/introduction/SoilTesting'){
    next()
  }
  else if(to.path === '/introduction/Identification'){
    next()
  }
  else if(to.path === '/introduction/ProductTracing'){
    next()
  }
  else if(to.path === '/introduction/KnowledgeBase'){
    next()
  }else if(to.path === '/introduction/AboutUs'){
    next()
  }
  else if(to.path === '/introduction'){
    next()
  }
  else if (to.path === '/login') {
    // 如果是访问登录界面，如果用户会话信息存在，代表已登录过，跳转到主页
    if(username) {
      next({ path: '/' })
    } else {
      next()
    }
  }
  else if (to.path === '/'){
    if(username) {
      addDynamicMenuAndRoutes(username, to, from)
      next()
    } else {
      next({ path: '/introduction' })
    }
  }
  else{
    addDynamicMenuAndRoutes(username, to, from)
    next()
  }







})

router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
});



/**
 * 加载动态菜单和路由
 */
function addDynamicMenuAndRoutes(userName, to, from) {
  // 处理IFrame嵌套页面
  handleIFrameUrl(to.path)
  //if(store.state.app.menuRouteLoaded) {
  //  console.log('动态菜单和路由已经存在.')
  //  return
  //}
  api.menu.findNavTree({'username':userName})
    .then(res => {
      // 添加动态路由
      let dynamicRoutes = addDynamicRoutes(res.data)
      // 处理静态组件绑定路由
      handleStaticComponent(router, dynamicRoutes)
      router.addRoutes(router.options.routes)
      // 保存加载状态
      store.commit('menuRouteLoaded', true)
      // 保存菜单树
      store.commit('setNavTree', res.data)
    })
    .catch(function(res) {
    })
}

/**
 * 处理路由到本地直接指定页面组件的情况
 * 比如'代码生成'是要求直接绑定到'Generator'页面组件
 */
function handleStaticComponent(router, dynamicRoutes) {
  for(let j=0;j<dynamicRoutes.length; j++) {
    // if(dynamicRoutes[j].name === '代码生成') {
    //   dynamicRoutes[j].component = Generator
    //   break
    // }
  }
  router.options.routes[0].children = router.options.routes[0].children.concat(dynamicRoutes)
}

/**
 * 处理IFrame嵌套页面
 */
function handleIFrameUrl(path) {
  // 嵌套页面，保存iframeUrl到store，供IFrame组件读取展示
  let url = path
  let length = store.state.iframe.iframeUrls.length
  for(let i=0; i<length; i++) {
    let iframe = store.state.iframe.iframeUrls[i]
    if(path != null && path.endsWith(iframe.path)) {
      url = iframe.url
      store.commit('setIFrameUrl', url)
      break
    }
  }
}

/**
 * 添加动态(菜单)路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */
function addDynamicRoutes (menuList = [], routes = []) {
  var temp = []
  for (var i = 0; i < menuList.length; i++) {
    if (menuList[i].children && menuList[i].children.length >= 1) {
      temp = temp.concat(menuList[i].children)
    } else if (menuList[i].url && /\S/.test(menuList[i].url)) {
      menuList[i].url = menuList[i].url.replace(/^\//, '')
      // 创建路由配置
      var route = {
        path: menuList[i].url,
        component: null,
        name: menuList[i].name,
        meta: {
          icon: menuList[i].icon,
          index: menuList[i].id
        }
      }
      let path = getIFramePath(menuList[i].url)
      if (path) {
        // 如果是嵌套页面, 通过iframe展示
        route['path'] = path
        route['component'] = resolve => require([`@/views/IFrame/IFrame`], resolve)
        // 存储嵌套页面路由路径和访问URL
        let url = getIFrameUrl(menuList[i].url)
        let iFrameUrl = {'path':path, 'url':url}
        store.commit('addIFrameUrl', iFrameUrl)
      } else {
        try {
          // 根据菜单URL动态加载vue组件，这里要求vue组件须按照url路径存储
          // 如url="sys/user"，则组件路径应是"@/views/sys/user.vue",否则组件加载不到
          let array = menuList[i].url.split('/')
          let url = ''
          for(let i=0; i<array.length; i++) {
            url += array[i].substring(0,1).toUpperCase() + array[i].substring(1) + '/'
          }
          url = url.substring(0, url.length - 1)
          // console.log(url)
          route['component'] = resolve => require([`@/views/pages/${url}`], resolve)
        } catch (e) {}
      }
      routes.push(route)
    }
  }
  if (temp.length >= 1) {
    addDynamicRoutes(temp, routes)
  } else {
    console.log('动态路由加载...')
    console.log('动态路由加载完成.')
  }
  return routes
}

export default router
