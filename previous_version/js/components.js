
//import Vue from 'vue';

//import Com1 from '../vue/components.vue';



var glbCounter = 0 ;




const NewComponent1 = {
  name: 'NewComponent1',
  data() {
    return {
      nowyKolor:{
        color:'#fab',
      },
    }
  },
  template: 
  `
  <div>
<h2 :style="nowyKolor">Nowy element h2</h2>
<label for = "color"> Zmien kolor </label>
<input name="color" id="color" v-model="nowyKolor.color"/>
</div>
  `,
}


var APP1 = new Vue (
  {
    el:"#app1",
    components: {
      NewComponent1,
    },
    data:{
      jakisInput:' World', 
      myColor: {
        color: "red",
      }
      //message: 'Hello Vue!',
    },
    methods: {
      handleClick() {
        glbCounter ++;
        this.jakisInput = ' New ' + glbCounter;
        console.clear();
        console.log('Byl klik' , glbCounter);
      }
    },
    template: 
      `
        <div>
        <p v-bind:style="myColor">Hello {{ jakisInput }}</p> 
        <button v-on:click="handleClick">clik me</button>
        <NewComponent1 />
        <NewComponent1 />
        </div>
      `
  }
);
//lub  v-bind:style="myColor" === :style="myColor"
//v-on:click === @click="handleClick"

var app2 = new Vue({
  el: '#app-2',
  data: {
    message: 'You loaded this page on ' + new Date().toLocaleString()
  }
})
