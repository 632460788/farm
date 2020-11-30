// 获取路由节点
export function getDeviceTopo() {
  let deviceTopo = {
    'deviceList': [
      {
        'id': '1152',
        'online': 0,
        'deviceSize':1
      },
      {
        'id': '023d',
        'online': 1,
        'deviceSize':2
      },
      {
        'id': '1137',
        'online': 1,
        'deviceSize':1
      }
    ],
    'topology': [
      {
        'from': '1152',
        'to': '023d'
      },
      {
        'from': '023d',
        'to': '1137'
      }
    ]
  }
  return {
    // isOpen: false,
    url: 'device/topo',
    method: 'get',
    data: deviceTopo
  }
}
