<template>
  <div class="db-container">
    <div class="flex-container">
      <div class="item one" @click="clickChart('1')" style="transform: translate(-32.4%,-33.5%) scale(0.4,0.33)">
        <ve-line :data="chartDataForLine.chartData" :settings="chartDataForLine.chartSettings" class="line"></ve-line>
      </div>
      <div class="item two" @click="clickChart('2')" style="transform: translate(-32.4%,0.5%) scale(0.4,0.33)">
        <ve-histgram :data="chartDataForHistgram" class="histgram"></ve-histgram>
      </div>
      <div class="item three" @click="clickChart('3')" style="transform: translate(-32.4%,34.5%) scale(0.4,0.33)">
        <ve-pie :data="chartDataForPie.chartData" :settings="chartDataForPie.chartSettings" class="pie"></ve-pie>
      </div>
      <div class="item four active" @click="clickChart('4')" style="transform: translate(43.7%, 0) scale(1)">
        <ve-radar :data="chartDataForRadar.chartData" :settings="chartDataForRadar.chartSettings"
                  class="radar"></ve-radar>
      </div>
    </div>
  </div>
</template>

<script>
  import VeLine from 'v-charts/lib/line.common'
  import VePie from 'v-charts/lib/pie.common'
  import VeRadar from 'v-charts/lib/radar.common'
  import VeHistgram from 'v-charts/lib/histogram.common'

  export default {
    name: 'Dashboard',
    components: {
      VeLine,
      VePie,
      VeRadar,
      VeHistgram
    },
    data() {
      return {
        chartDataForLine: {
          chartSettings: {
            axisSite: {right: ['下单率']},
            yAxisType: ['KMB', 'percent'],
            yAxisName: ['数值', '比率'],
            area: true
          },
          chartData: {
            columns: ['日期', '访问用户', '下单用户', '下单率'],
            rows: [
              {'日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32},
              {'日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26},
              {'日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76},
              {'日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49},
              {'日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323},
              {'日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78}
            ]
          }
        },
        chartDataForHistgram: {
          columns: ['日期', '访问用户', '下单用户', '下单率'],
          rows: [
            {'日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32},
            {'日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26},
            {'日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76},
            {'日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49},
            {'日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323},
            {'日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78}
          ]
        },
        chartDataForPie: {
          chartSettings: {limitShowNum: 5},
          chartData: {
            columns: ['日期', '访问用户'],
            rows: [
              {'日期': '1/1', '访问用户': 1393},
              {'日期': '1/2', '访问用户': 3530},
              {'日期': '1/3', '访问用户': 2923},
              {'日期': '1/4', '访问用户': 1723},
              {'日期': '1/5', '访问用户': 3792},
              {'日期': '1/6', '访问用户': 4593}
            ]
          }
        },
        chartDataForRadar: {
          chartSettings: {
            dimension: ['日期'],
            metrics: ['访问用户', '下单用户', '下单率'],
            dataType: {'下单率': 'percent'},
            labelMap: {
              '日期': 'date',
              '访问用户': 'PV',
              '下单用户': 'Order',
              '下单率': 'orderRate'
            }
          },
          chartData: {
            columns: ['日期', '访问用户', '下单用户', '下单率'],
            rows: [
              {'日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32},
              {'日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26},
              {'日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76},
              {'日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49},
              {'日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323},
              {'日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78}
            ]
          }
        }
      }
    },
    mounted() {
      this._init()
    }
    ,
    methods: {
      _init() {
        this.items = document.querySelectorAll('.flex-container .item');
        for (let i = 0; i < this.items.length; i++) {
          this.items[i].dataset.order = i + 1;
        }
      }
      ,
      clickChart(clickIndex) {
        let activeItem = document.querySelector('.flex-container .active');
        let activeIndex = activeItem.dataset.order;
        let clickItem = this.items[clickIndex - 1];
        if (activeIndex === clickIndex) {
          return
        }
        activeItem.classList.remove('active');
        clickItem.classList.add('active');
        this._setStyle(clickItem, activeItem)
      }
      ,
      _setStyle(el1, el2) {
        let transform1 = el1.style.transform;
        el1.style.transform = el2.style.transform;
        el2.style.transform = transform1;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .db-container {
    box-sizing: border-box;
    position: relative;
    margin: 0;
    vertical-align: middle;
    horiz-align: center;
    /*padding: 5% 0 0;*/
    .flex-container {
      position: relative;
      height: 97%;
      width: 90%;
      overflow: hidden;
      box-sizing: content-box;
      vertical-align: middle;
      margin: auto;
      padding: 5px;
      .item {
        padding: 0;
        margin: 0;
        width: 68%;
        height: 100%;
        position: absolute;
        transform: scale(0.33,0.33);
        text-align: center;
        vertical-align: middle;
        transition: all 0.8s;
        /*background: rgba(32, 32, 35, 0.5);*/
      }
      .line, .radar, .histgram, .pie {
        height: 100% !important;
        width: 100% !important;
        background: #F0F0F0;
      }
      .active {
        height: 100%;
        width: 69%;
        line-height: 300px;
        background-color: #FAFAD2;
      }
    }
  }




</style>
