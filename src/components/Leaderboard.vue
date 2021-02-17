<script>
  // TODO: make this better
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

        let drinker = claimedBeers[0]?.name, count = 1;
        for (let b = 1; b < claimedBeers.length; b++) {
          if (claimedBeers[b].name === drinker) {
            count++;
          } else {
            result.push({drinker, count})
            drinker = claimedBeers[b].name;
            count = 1;
          }
        }

        result.sort((a, b) => b.count - a.count)

        return result;
      }
    }

  };
</script>

<template>
  <div>
    <div>
      Leaderboard:
    </div>
    <div v-for="(drinker, i) in leaderboard" :key="i">
      <div>
        <span>{{ drinker.drinker }}: </span><span>{{ drinker.count }}</span>
      </div>
    </div>
  </div>
</template>
