<template>
  <!--  TODO 路由监控：网关拓扑图，网关存活时间，网关基本信息 .... 致命错误-->
  <div class="echartLayout">
      <div id="deviceContain" style="width:100%; height:100%; overflow:hidden;"></div>
  </div>

</template>

<script>
  import echarts from 'echarts'
  import 'echarts/lib/chart/graph'
  import imgSrc from '../../../assets/live_node.png'
  import imgBase from '../../../assets/base.png'
  import imgMesh from '../../../assets/mesh_point.png'
  import imgMesh_off from '../../../assets/mesh_point_offline.png'
  import imgPoint_off from '../../../assets/offline_node.png'
  //import echarts from 'vue-echarts'
  //import '../../../store/modules/echarts'

  //import VePie from 'v-charts/lib/pie.common'
  import {mapState} from "vuex";


  export default {
    name: "RouteLive",

    data() {
      return {
        deviceGraph: null,
        nodeData: [],
        linkData: []
      }
    },
    mounted() {
      this.loadDeviceRelation();
      this.drawRelationGraph();

      // 定时获取拓扑参数
      //if (this.timer) {
      //  clearInterval(this.timer);
      //} else {
      //  this.timer = setInterval(() => {
       //   this.loadDeviceRelation();
       //   this.drawRelationGraph();
      //  }, 10 * 60 * 1000)
      //}// 29分钟发送一次：29 * 60 * 1000
    },

    methods: {
      loadDeviceRelation() {

        console.log("请求拓扑数据")
        this.$api.device.getDeviceTopo(null).then((res) => {
          if (res.code === 200) {
            //this.deviceGraph.hideLoading()
            let deviceData = res.data.deviceList
            let topoData = res.data.topoList

            console.log(topoData)
            console.log(deviceData)

            //替换设备json数据的键
            let deviceNode = deviceData.map(function (item) {
              return {
                itemStyle: {
                  // 径向渐变，前三个参数分别是圆心 x, y 和半径，取值同线性渐变
                  color: {
                    type: 'radial',
                    x: 0.5,
                    y: 0.5,
                    r: 0.5,
                    colorStops: [{
                      offset: 0, color: 'red' // 0% 处的颜色
                    }, {
                      offset: 1, color: 'blue' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                  }
                },
                name: item.id,
                value: item.online,
                symbol: 'circle',
                symbolSize: 100,//item.symbolSize,
                label: {
                  show: 10 > 1 //item.symbolSize > 1
                }
              }
            });




            var i=0;
            for(i=0;i<deviceNode.length;i++){
              deviceNode[i].id = (i+1).toString();
            }
            console.log(deviceNode)

            //替换设备json数据的键
            let topoEdge = topoData.map(function (item) {
              return {
                source: item.from, // 小仇啊 from  不是 form
                target: item.to
              }
            });


            this.nodeData = deviceNode
            this.linkData = topoEdge

            //this.drawRelationGraph()
          }
        }).catch((res) => {
          this.$notify.error({
            title: '错误',
            message: '设备关系图获取失败，请稍后重试'
          })
          console.error(res)
        })


      },
      // 绘制拓扑图
      drawRelationGraph() {

        let dom = document.getElementById("deviceContain");
        this.deviceGraph = echarts.init(dom);
        //this.deviceGraph.showLoading();

        /*
        let option = {
          //animationDuration: 1500,
          //animationEasingUpdate: 'quinticInOut',
          series: [{
            type: 'graph',
            layout: 'force',
            data: this.nodeData,
            links: this.linkData,
            roam: true,
            focusNodeAdjacency: true,
            //focusNodeAdjacency: true,//是否在鼠标移到节点上的时候突出显示节点、节点的边和邻接节点
            itemStyle: {
              normal: {
                borderColor: '#fff',
                borderWidth: 1,
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.3)'
              }
            },
            label: {
              position: 'top',
              formatter: '{b}',
              normal: {
                show: true
              }
            },
            symbol: `image://${imgSrc}`,
            symbolSize:86,
            lineStyle: {
              type: 'curve',
              color: 'rgb(110,197,75)',
              curveness: 0.3
            },
            emphasis: {
              lineStyle: {
                width: 10
              }
            }
          }]
        };
        */

        //this.nodeData  = this.nodeData.slice(0,7)
        this.nodeData = this.dataEChart();
        this.linkData = this.linkEChart();

        let option = {
          tooltip:{
            show:false
          },
          series: [
            {
              edgeLabel: {
                normal: {
                  formatter:"{c}",
                  show:true
                }
              },
              edgeSymbol:'circle',
              force:{
                repulsion:2000
              },
              layout:'force',
              roam:true,
              draggable:true,
              itemStyle:{
                normal:{
                  color: '#6495ED'
                },
                //鼠标放上去有阴影效果
                emphasis: {
                  shadowColor: '#ffff00',
                  //shadowColor: '#3721db',
                  shadowOffsetX: 0,
                  shadowOffsetY: 0,
                  shadowBlur: 40,
                },
              },
              label:{
                normal:{
                  show:true,
                  position: 'bottom',
                  color: '#444444',
                }
              },
              //头像
              symbol: `image://${imgSrc}`,
              symbolSize:40,
              type:'graph',
              links: this.linkData,
              data:this.nodeData
            }
          ]
        };

        console.log("绘制拓扑图")

        console.log(this.linkData)
        console.log(this.nodeData)

        try {
          this.deviceGraph.setOption(option);
          this.deviceGraph.on('click', function (params) {
            console.log(params.data)//获取点击的头像的数据信息
          });
        } catch (e) {
          this.$notify.error({
            title: '错误',
            message: '拓扑图绘制失败，请检查数据'
          })
          console.error(e)
        }

      },
      /**
       * 数据集合
       */
      dataEChart(){
        let data = [
          {
            name: '00:04:ff',
            symbolSize: 40,
            symbol: `image://${imgMesh_off}`,
            id: '1',
            label:{
              normal:{
                show:true,
                position: 'bottom',
                formatter: '中继节点\n{b}'
              }
            },
          },
          {
            name: '00:10:c4',
            symbolSize: 40,
            symbol: `image://${imgMesh}`,
            id: '2',
            label:{
              normal:{
                show:true,
                position: 'bottom',
                formatter: '中继节点\n{b}'
              }
            },
          },
          {
            name: '00:13:f5',
            id: '3',
            symbolSize: 60,
            symbol: `image://${imgBase}`,
            label:{
              normal:{
                show:true,
                position: 'bottom',
                formatter: '主站\n{b}'
              }
            },
          },
          {
            name: '023d',
            id: '4',
          },
          {
            name: '1141',
            id: '5',
          },
          {
            name: '1152',
            id: '6',
          },
          {
            name: '118c',
            id: '7',
            symbol: `image://${imgPoint_off}`,
          },
          {
            name: '119a',
            id: '8',
          },
          {
            name: '11a1',
            id: '9',
          },
          {
            name: '11a2',
            id: '10',
          },
          {
            name: '11a9',
            id: '11',
          },
          {
            name: '11aa',
            id: '12',
          },
          {
            name: '11ac',
            id: '13',
          },
          {
            name: '11e7',
            id: '14',
          },
          {
            name: '11e8',
            id: '15',
          },
          {
            name: '103a',
            id: '16',
          },
        ];
        return data;
      },
      /**
       * 关系数据集合
       */
      linkEChart(){
        let dataLink=[
          {value: "",source: "6",target: "2"},

          {value: "",source: "13",target: "2"},

          {value: "",source: "5",target: "2"},

          {value: "",source: "15",target: "3"},
          {value: "",source: "14",target: "3"},
          {value: "",source: "3",target: "3"},

          {value: "",source: "10",target: "2"},

          {value: "",source: "8",target: "3"},
          {value: "",source: "4",target: "2"},
          {value: "",source: "7",target: "2"},
          {value: "",source: "9",target: "3"},


          {value: "",source: "12",target: "3"},
          {value: "",source: "16",target: "3"},

          {value: "中继链路",source: "2",target: "3"},
          {value: "",source: "1",target: "3"},

          {value: "",source: "11",target: "3"},
          //{value: "",source: "10",target: "3"},




        ];
        return dataLink;
      },
    }
  }
</script>

<style scoped>
  .echartLayout {
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
</style>
