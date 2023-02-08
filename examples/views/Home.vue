<template>
  <div class="home">
    <div id="text-model" style="border-radius: 0;margin:1px;padding:1px 1px 1px 1px;border: 1px solid #000;width:18%; background:green;"></div>
    <div id="text-model1" style="margin:1px;padding:1px 1px 1px 1px;border: 1px solid #000; background:green;" ></div>
    <xxo-box-model :dom-id="dd" v-model="getStyle"></xxo-box-model>
    {{ getStyle }}
    <button @click="sned">test</button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data(){
    return {
      getStyle:'',
      dd:'text-model'
    }
  },
  methods: {
    sned () {
      this.dd = 'text-model1'
    }
  }
}
</script>
