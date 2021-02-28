<script>
  export default {
    props: ["beers"],

    methods: {
      sortBeers() {
        let beersFiltered = this.beers.filter(b => b.name);
        
        beersFiltered.sort((a, b) => {
          let nameA = a.name.toUpperCase();
          let nameB = b.name.toUpperCase();

          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          return 0;
        });

        return beersFiltered;
      }
    },

    computed: {
      leaderboard() {
        let result = [];
        let claimedBeers = this.sortBeers();

        //What is this question mark sorcery?
        let drinker = claimedBeers[0]?.name, count = 1;
        
        for (let b = 1; b < claimedBeers.length; b++) {
          if (claimedBeers[b].name === drinker) {
            count++;
          } else {
            result.push({drinker, count});
            drinker = claimedBeers[b].name;
            count = 1;
          }
        }

        result.push({drinker, count});

        result.sort((a, b) => b.count - a.count)
 
        return result;
      }
    }
  };
</script>

<template>
  <div class="wrapper">
    <div class="ticker">
      <div class="ticker-item" v-for="(drinker, i) in leaderboard" :key="drinker.drinker">
        {{i + 1}}. {{ drinker.drinker }}: {{ drinker.count }}
      </div>
    </div>
  </div>
</template>

<style scoped>
 .wrapper {
    width: 100%;
    overflow: hidden;
    padding-left: 100%;
    box-sizing: content-box; 
  }
  .ticker {
    display: inline-block;
    height: 4rem;
    white-space: nowrap;
    padding-right: 100%;
    box-sizing: content-box;
    animation: ticker;
    animation-duration: 30s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
  .ticker-item {
    display: inline-block;
    padding: 0 2rem;
    font-size: 2rem;
  }
  @keyframes ticker {
    0% {
      transform: translate3d(0, 0, 0);
      visibility: visible;
    }

    100% {
      transform: translate3d(-100%, 0, 0);
    }
  }
</style>
