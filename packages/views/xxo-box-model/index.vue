<template>
    <div class="box-model">
      <div ref="box-margin" class="box-margin style-all">
        <span class="box-text" @click="checkShowMargin('margin')">{{marginText}}</span>
        <input class="box-number box-top" type="number" v-model="margin.top"  @change="inputChange('margin','top')"/>
        <input class="box-number box-left" type="number" v-model="margin.left" @change="inputChange('margin','left')"/>
        <input class="box-number box-bottom" type="number" v-model="margin.bottom" @change="inputChange('margin','bottom')"/>
        <input class="box-number box-right" type="number" v-model="margin.right" @change="inputChange('margin','right')"/>
        <div ref="box-border" class="box-border style-all" >
          <span class="box-text" @click="checkShowMargin('border')">{{borderText}}</span>
          <input class="box-number box-top" type="number" v-model="border.top" @change="inputChange('border','top')"/>
          <input class="box-number box-left" type="number" v-model="border.left" @change="inputChange('border','left')"/>
          <input class="box-number box-bottom" type="number" v-model="border.bottom" @change="inputChange('border','bottom')"/>
          <input class="box-number box-right" type="number" v-model="border.right" @change="inputChange('border','right')"/>
          <div ref="box-padding" class="box-padding style-all" >
            <span class="box-text" @click="checkShowMargin('padding')">{{paddingText}}</span>
            <input class="box-number box-top" type="number" v-model="padding.top" @change="inputChange('padding','top')"/>
            <input class="box-number box-left" type="number" v-model="padding.left" @change="inputChange('padding','left')"/>
            <input class="box-number box-bottom" type="number" v-model="padding.bottom" @change="inputChange('padding','bottom')"/>
            <input class="box-number box-right" type="number" v-model="padding.right" @change="inputChange('padding','right')"/>
            <div ref="box-content" class="box-content style-all" >
              <input class="right ipt" type="text" v-model="x" @change="widthInput"> <span style="color:#000000">×</span>
              <input class="ipt" type="text" v-model="y" @change="heightInput">
            </div>
          </div>
        </div>
        <div class="mask-layer" @click="showMargin = false" v-show="showMargin"></div>
        <input ref="inputRef" class="enter-four-sides" v-model="enterModel" :style="{background:inputBackground}" type="number" @change="enterChange" :placeholder="placeholder" v-show="showMargin"/>
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
        checkShowMarginType:'',
        enterModel:'',
        inputBackground:'',
        marginText:'margin',
        paddingText:'padding',
        borderText:'border',
        placeholder:'',
        showMargin:false,
        widthEdit:false,
        heightEdit:false,
        borderEdit:false,
        marginEdit:false,
        paddingEdit:false,
        dom:null,
        defaultStyle:'',
        x:0,
        y:0,
        margin:JSON.parse(JSON.stringify(direction)),
        padding:JSON.parse(JSON.stringify(direction)),
        border:JSON.parse(JSON.stringify(direction)),
        styleArray,
        flag:false,
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
      enterChange(){
        const r = ['top','left','right','bottom']
        r.forEach(i=>{
          this[this.checkShowMarginType][i] = this.enterModel
          this.inputChange(this.checkShowMarginType,i)
        })
        this.showMargin = false
      },
      checkShowMargin(v){
        this.showMargin = true
        this.checkShowMarginType = v
        if(v === 'margin') this.inputBackground = '#f1c89d'
        if(v === 'padding') this.inputBackground = '#bdc785'
        if(v === 'border') this.inputBackground = '#f7d99a'
        this.enterModel = ''
        this.placeholder = `请输入${v}四边边距`
        this.$nextTick(()=> this.$refs.inputRef.focus())
      },
      init(){
        this.dom = document.getElementById(this.domId)
        if(!this.dom) {
          this.styleArray.forEach(i=> {this[i.type][i.name] = 0})
          this.x = 0;this.y = 0;
          setTimeout(() => {
            this.init()
          }, 2000);
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
      result(){
        if(!this.dom.attributes.style) return
        const arr = this.dom.attributes.style.nodeValue.split(';')
        let nodeValue = ''
        arr.forEach(i=>{
          if(i.indexOf('%') != -1 || !i ) return 
          var flag = i.indexOf('border-width') >= 0 
          || i.indexOf('border-top-width') >= 0 
          || i.indexOf('border-left-width') >= 0 
          || i.indexOf('border-right-width') >= 0 
          || i.indexOf('border-bottom-width') >= 0 
          if(this.widthEdit) flag = flag || i.indexOf('width') >= 0
          if(this.heightEdit) flag = flag || i.indexOf('height') >= 0
          if(this.borderEdit) flag = flag || i.indexOf('border:') >= 0
          if(this.marginEdit) flag = flag || i.indexOf('margin') >= 0
          if(this.paddingEdit) flag = flag || i.indexOf('padding') >= 0
          if(flag) nodeValue+= i + ';'
        })
        this.$emit('change',nodeValue + `flag:${this.flag};`)
        this.flag = !this.flag
      },
      setXAndY(that,dom){
        that.x = dom.offsetWidth - that.padding.left - that.padding.right - that.border.left - that.border.right
        that.y = dom.offsetHeight - that.border.bottom - that.border.top - that.padding.top - that.padding.bottom
        that.x < 0 ? that.x = 0 : null
        that.y < 0 ? that.y = 0 : null
        this.result()
      },
      widthInput(){
        this.dom.style.width = parseInt(this.x) + 'px'
        this.widthEdit = true
        this.result()
      },
      heightInput(){
        this.dom.style.height = parseInt(this.y) + 'px'
        this.heightEdit = true
        this.result()
      },
      inputChange(t,c){
        // 加判断条件 是否修改过 marign | padding | border
        this[`${t}Edit`] = true
        const n = c[0].toUpperCase() + c.substr(1)
        if(t === 'border'){
          if(this.dom.style.borderStyle) {
            this.dom.style[t + n + 'Width'] = this[t][c] + 'px'
            this.setXAndY(this,this.dom)
          }else{
            this[t][c] = 0
          }
        }else{
          this.dom.style[t + n] = this[t][c] + 'px'
          this.setXAndY(this,this.dom)
        }
      },
    },
  };
  </script>
  <style lang="scss" scoped>
  @import './index'
  </style>