<template>
    <div class="box-model">
      <div ref="box-margin" class="box-margin style-all">
        <span class="box-text">margin</span>
        <input class="box-number box-top" v-model="margin.top"  @change="inputChange('margin','top')"/>
        <input class="box-number box-left" v-model="margin.left" @change="inputChange('margin','left')"/>
        <input class="box-number box-bottom" v-model="margin.bottom" @change="inputChange('margin','bottom')"/>
        <input class="box-number box-right" v-model="margin.right" @change="inputChange('margin','right')"/>
        <div ref="box-border" class="box-border style-all" >
          <span class="box-text">border</span>
          <input class="box-number box-top" v-model="border.top" @change="inputChange('border','top')"/>
          <input class="box-number box-left" v-model="border.left" @change="inputChange('border','left')"/>
          <input class="box-number box-bottom" v-model="border.bottom" @change="inputChange('border','bottom')"/>
          <input class="box-number box-right" v-model="border.right" @change="inputChange('border','right')"/>
          <div ref="box-padding" class="box-padding style-all" >
            <span class="box-text">padding</span>
            <input class="box-number box-top" v-model="padding.top" @change="inputChange('padding','top')"/>
            <input class="box-number box-left" v-model="padding.left" @change="inputChange('padding','left')"/>
            <input class="box-number box-bottom" v-model="padding.bottom" @change="inputChange('padding','bottom')"/>
            <input class="box-number box-right" v-model="padding.right" @change="inputChange('padding','right')"/>
            <div ref="box-content" class="box-content style-all" >
              <input class="right ipt" type="text" v-model="x" @change="widthInput"> <span style="color:#000000">×</span>
              <input class="ipt" type="text" v-model="y" @change="heightInput">
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name:'xxo-box-model',
    props:['domId','styleAll'],
    model:{
      prop:'styleAll',
      event:'change'
    },
    watch:{
      domId:function(v){
        this.init()
      },
    },
    data() {
      return {
        dom:null,
        defaultStyle:'',
        x:0,
        y:0,
        margin:{
          top:'0',
          left:'0',
          right:'0',
          bottom:'0',
        },
        padding:{
          top:'0',
          left:'0',
          right:'0',
          bottom:'0',
        },
        border:{
          top:'0',
          left:'0',
          right:'0',
          bottom:'0',
        },
        styleArray:[{
          type:'border',
          name:'top',
          style:'borderTopWidth',
        },{
          type:'border',
          name:'left',
          style:'borderLeftWidth',
        },{
          type:'border',
          name:'right',
          style:'borderRightWidth',
        },{
          type:'border',
          name:'bottom',
          style:'borderBottomWidth',
        },{
          type:'margin',
          name:'left',
          style:'marginLeft',
        },{
          type:'margin',
          name:'right',
          style:'marginRight',
        },{
          type:'margin',
          name:'bottom',
          style:'marginBottom',
        },{
          type:'margin',
          name:'top',
          style:'marginTop',
        },{
          type:'padding',
          name:'top',
          style:'paddingTop',
        },{
          type:'padding',
          name:'left',
          style:'paddingLeft',
        },{
          type:'padding',
          name:'right',
          style:'paddingRight',
        },{
          type:'padding',
          name:'bottom',
          style:'paddingBottom',
        },]
      };
    },
    mounted(){
      this.init()
      const that = this
      window.onresize = function() {
        that.setXAndY(that,that.dom)
      }
    },
    methods: {
      init(){
        this.dom = document.getElementById(this.domId)
        if(!this.dom) {
          this.styleArray.forEach(i=> this[i.type][i.name] = 0)
          this.x = 0;this.y = 0;
          setTimeout(() => {
            this.init()
          }, 1000);
          return console.log('dom-id不存在')
        }
    
        this.styleArray.forEach(i=>{
          this[i.type][i.name] = parseInt(this.getstyle(this.dom, i.style))
        })
        this.setXAndY(this,this.dom)
      },
      getstyle(obj,name){
        if(window.getComputedStyle){
          return getComputedStyle(obj,null)[name];
        }else{
          return obj.currentSytle.name
        };
      },
      setXAndY(that,dom){
        that.x = dom.offsetWidth - that.padding.left - that.padding.right - that.border.left - that.border.right
        that.y = dom.offsetHeight - that.border.bottom - that.border.top - that.padding.top - that.padding.bottom
        if(!this.dom.attributes.style) return
        this.$emit('change',this.dom.attributes.style.nodeValue)
      },
      widthInput(){
        this.dom.style.width = parseInt(this.x) + 'px'
        if(!this.dom.attributes.style) return
        this.$emit('change',this.dom.attributes.style.nodeValue)
      },
      heightInput(){
        this.dom.style.height = parseInt(this.y) + 'px'
        if(!this.dom.attributes.style) return
        this.$emit('change',this.dom.attributes.style.nodeValue)
      },
      inputChange(t,c){
        const n = c[0].toUpperCase() + c.substr(1)
        if(['left','right'].includes(c)){
          this.dom.style.width = this[t][c].length + '0px'
        }
        t === 'border' ?  this.dom.style[t + n + 'Width'] = this[t][c] + 'px' : this.dom.style[t + n] = this[t][c] + 'px'
        this.setXAndY(this,this.dom)
      },
    },
  };
  </script>
  <style lang="scss" scoped>
  .box-model{
    font-size: 13px;
    input{
      text-align: center
    }
    .style-all{
      text-align: left;
      position: relative;
      opacity: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .ipt{
      border:none;
      background: transparent;
      outline-style: none;
      // width: 40px;
      text-align: left;
    }
    .right{
      text-align: right;
    }
    .box-text{
      position: absolute;
      z-index: 2;
      left: 10px;
      top: 2px;
      font-weight: 500;
    }
    .box-number{
      position: absolute;
      background: transparent;
      border: none;
      outline-style: none;
      width: auto;
      max-width: 24px;
      z-index: 2;
    }
    .box-top{
      top: 2px;
      left: 0;
      right: 0;
      margin: auto;
      max-width: 100px;
      text-align: center;
    }
    .box-left{
      left: 2px;
      top: 0;
      bottom: 0;
      margin: auto;
    }
    .box-bottom{
      bottom: 2px;
      left: 0;
      right: 0;
      margin: auto;
      max-width: 100px;
      text-align: center;
    }
    .box-right{
      right: 2px;
      top: 0;
      bottom: 0;
      margin: auto;
    }
    .box-margin {
      background: #f1c89d;
      border: 2px dashed #000;
      width: 270px;
      height: 200px;
      .box-border {
        background: #f7d99a;
        border: 2px solid #000;
        width: 210px;
        height: 140px;
        .box-padding {
          background: #bdc785;
          border: 1px dashed #000;
          width: 150px;
          height: 90px;
          .box-content {
            background: #88aab6;
            border: 1px solid #000;
            width: 80px;
            height: 30px;
          }
        }
      }
    }
  }
  </style>