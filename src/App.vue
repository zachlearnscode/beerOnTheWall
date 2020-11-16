<script>
  import Beer from './components/Beer.vue'

  export default {
    name: 'App',

    components: {
      "beer": Beer
    },

    data() {
      return {
        order: 0,
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
        this.order++;

        this.beers[index].full = false;
        this.beers[index].order = this.order;
      }
    },
  };
</script>

<template>
  <div>
    <h1>{{fullBeers.length}} Bottles of Beers on the Wall</h1>
    <div style="display: flex; flex-wrap: wrap;">
      <beer
        v-for="(beer, i) in beers"
        :key="i"
        v-bind="beer"
        v-on:remove="emptyBeer(i)"
      ></beer>
    </div>
  </div>
</template>
