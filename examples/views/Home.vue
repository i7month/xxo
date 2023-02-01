<template>
  <div class="home">
    <div style="margin:20px;padding:10px 54px 4px 3px;border: 3px solid #000; background:red;" id="text-model"></div>
    <!-- <lButton @click="send"/>
    <l-input></l-input> -->
    <xxo-box-model dom-id="text-model" v-model="getStyle"></xxo-box-model>
    {{ getStyle }}
  </div>
</template>

<script>
export default {
  name: 'Home',
  data(){
    return {
      getStyle:'',
    }
  },
  methods: {
    send (e) {
      console.log(e);
    }
  }
}
</script>
