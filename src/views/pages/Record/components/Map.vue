<template>
  <div id="Map">
    <div id="container" style="transform: scale(0.43)">
      <img src="../../../../assets/bigScreenImgs/bigScreenMapBackground.png"  style="top:0px; left: 0px;"/>
      <img :class="{active: index === curIndex }" v-for="(it, index) in lands" :id="it.id" :style="{left: it.left +'px', top: it.top +'px'}" :src="it.name"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Map",
    data(){
      return {
        timer: {},
        indexes: {},
        curIndex: 0,
        lands:[
          {
            "left": "1036",
            "top": "541",
            "id": "21",
            name: require("../../../../assets/bigScreenImgs/1036-541-21.png")
          },
          {
            "left": "1051",
            "top": "357",
            "id": "6",
            name: require("../../../../assets/bigScreenImgs/1051-357-6.png")
          },
          {
            "left": "564",
            "top": "578",
            "id": "10",
            name: require("../../../../assets/bigScreenImgs/564-578-10.png")
          },
          {
            "left": "593",
            "top": "515",
            "id": "33",
            name: require("../../../../assets/bigScreenImgs/593-515-33.png")
          },
          {
            "left": "611",
            "top": "642",
            "id": "11",
            name: require("../../../../assets/bigScreenImgs/611-642-11.png")
          },
          {
            "left": "613",
            "top": "473",
            "id": "32",
            name: require("../../../../assets/bigScreenImgs/613-473-32.png")
          },
          {
            "left": "635",
            "top": "480",
            "id": "30",
            name: require("../../../../assets/bigScreenImgs/635-480-30.png")
          },
          {
            "left": "635",
            "top": "487",
            "id": "29",
            name: require("../../../../assets/bigScreenImgs/635-487-29.png")
          },
          {
            "left": "651",
            "top": "448",
            "id": "31",
            name: require("../../../../assets/bigScreenImgs/651-448-31.png")
          },
          {
            "left": "698",
            "top": "510",
            "id": "28",
            name: require("../../../../assets/bigScreenImgs/698-510-28.png")
          },
          {
            "left": "703",
            "top": "407",
            "id": "8",
            name: require("../../../../assets/bigScreenImgs/703-407-8.png")
          },
          {
            "left": "735",
            "top": "511",
            "id": "13",
            name: require("../../../../assets/bigScreenImgs/735-511-13.png")
          },
          {
            "left": "740",
            "top": "416",
            "id": "7",
            name: require("../../../../assets/bigScreenImgs/740-416-7.png")
          },
          {
            "left": "766",
            "top": "476",
            "id": "14",
            name: require("../../../../assets/bigScreenImgs/766-476-14.png")
          },
          {
            "left": "784",
            "top": "383",
            "id": "9",
            name: require("../../../../assets/bigScreenImgs/784-383-9.png")
          },
          {
            "left": "795",
            "top": "455",
            "id": "17",
            name: require("../../../../assets/bigScreenImgs/795-455-17.png")
          },
          {
            "left": "796",
            "top": "586",
            "id": "24",
            name: require("../../../../assets/bigScreenImgs/796-586-24.png")
          },
          {
            "left": "803",
            "top": "611",
            "id": "23",
            name: require("../../../../assets/bigScreenImgs/803-611-23.png")
          },
          {
            "left": "832",
            "top": "446",
            "id": "16",
            name: require("../../../../assets/bigScreenImgs/832-446-16.png")
          },
          {
            "left": "846",
            "top": "355",
            "id": "26",
            name: require("../../../../assets/bigScreenImgs/846-355-26.png")
          },
          {
            "left": "877",
            "top": "518",
            "id": "18",
            name: require("../../../../assets/bigScreenImgs/877-518-18.png")
          },
          {
            "left": "893",
            "top": "265",
            "id": "25",
            name: require("../../../../assets/bigScreenImgs/893-265-25.png")
          },
          {
            "left": "921",
            "top": "290",
            "id": "4",
            name: require("../../../../assets/bigScreenImgs/921-290-4.png")
          },
          {
            "left": "929",
            "top": "495",
            "id": "19",
            name: require("../../../../assets/bigScreenImgs/929-495-19.png")
          },
          {
            "left": "930",
            "top": "436",
            "id": "5",
            name: require("../../../../assets/bigScreenImgs/930-436-5.png")
          },
          {
            "left": "949",
            "top": "569",
            "id": "22",
            name: require("../../../../assets/bigScreenImgs/949-569-22.png")
          },
          {
            "left": "977",
            "top": "345",
            "id": "1",
            name: require("../../../../assets/bigScreenImgs/977-345-1.png")
          },
          {
            "left": "990",
            "top": "341",
            "id": "2",
            name: require("../../../../assets/bigScreenImgs/990-341-2.png")
          },
          {
            "left": "999",
            "top": "508",
            "id": "20",
            name: require("../../../../assets/bigScreenImgs/999-508-20.png")
          }
        ]
      }
    },
    methods:{
      carousel: function(){
        this.curIndex = (this.curIndex + 1) % this.lands.length;
        this.$emit("map_current_id", this.indexes[this.curIndex])
      }
    },
    beforeMount: function(){
      for(let i = 0; i < this.lands.length; i++){
        this.indexes[i] = this.lands[i].id;
      }
      this.timer = setInterval(this.carousel, 1000);
    }
  }
</script>

<style scoped>

  #container > img{
    position: absolute;
  }

  .active {
    filter: drop-shadow(4px 4px 4px #fce) hue-rotate(120deg);
    transform: scale(1.5);
  }
</style>
