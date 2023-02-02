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
  import {styleArray,direction} from './index'
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
        margin:JSON.parse(JSON.stringify(direction)),
        padding:JSON.parse(JSON.stringify(direction)),
        border:JSON.parse(JSON.stringify(direction)),
        styleArray,
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
          this.styleArray.forEach(i=> {this[i.type][i.name] = 0})
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
  @import './index'
  </style>