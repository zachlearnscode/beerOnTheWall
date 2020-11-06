<script>
  import Beer from './components/Beer.vue'

  export default {
    name: 'App',

    components: {
      "beer": Beer
    },

    data() {
      return {
        beers: new Array(99)
          .fill("")
          .map(() => { return {full: true}; })
      };
    },

     computed: {
      fullBeers: function() {
        return this.beers.filter(b => b.full);
      }
    },

    methods: {
      emptyBeer: function(index) {
        this.beers[index].full = false;
      }
    },
  };
</script>

<template>
  <div>
    <h1>{{fullBeers.length}} Bottles of Beers on the Wall</h1>
    <beer
      v-for="(beer, i) in beers"
      :key="i"
      v-bind="beer"
      v-on:remove="emptyBeer(i)"
    ></beer>
  </div>
</template>
