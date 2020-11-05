import Vue from 'vue';

new Vue({
  el: "#app",

  template: `
    <div>
      <h1>{{fullBeers.length}} Bottles of Beers on the Wall</h1>
      <beer v-for="(beer, i) in beers" v-bind="beer"
      v-on:remove="emptyBeer(i)"
      ></beer>    
    </div>
  `,

  data: {
    beers: new Array(99)
      .fill("")
      .map(() => { return {full: true}; })
  },

  computed: {
    fullBeers: function() {
      return this.beers.filter(b => b.full);
    }
  },

  components: {
    beer:require("./beer.js").default
  },

  methods: {
    emptyBeer: function(index) {
      this.beers[index].full = false;
    }
  }
})