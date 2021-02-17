<script>
  // TODO: make this better
  export default {
    props: ["beers"],

    computed: {
      countsByName() {
        let result = {};

        this.beers
          .filter(b => b.name)
          .forEach(b => {
            result[b.name] = result[b.name] || 0;
            result[b.name]++;
          });

        return result;
      }
    }
  };
</script>

<template>
  <div>
    Leaderboard: {{ countsByName }}
  </div>
</template>
