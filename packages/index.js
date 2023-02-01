import COMPONENTS from './views' // components 组件
console.log(COMPONENTS);

const install = function (Vue, options) {
  // 按需引入
  if(options && options.components){
    const { components } = options
    components.forEach(component => {
      COMPONENTS.forEach(COMPONENT => {
        if(component === COMPONENT.name){
          Vue.component(COMPONENT.name,COMPONENT)
        }
      })
    })
  }else{ 
    // 全局引入
    COMPONENTS.forEach(COMPONENT =>{
      console.log(COMPONENT.name);
      Vue.component(COMPONENT.name,COMPONENT)
    })
  }
  // 原型方法
}

export default install