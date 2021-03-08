<template>
  <div>
    <v-text-field v-model="input"></v-text-field>
    <v-list>
      <v-list-item-group v-if="inputMatchesEntry">
        <v-list-item v-for="suggestion in inputMatchesEntry" :key="suggestion">
          <template v-if="suggestion">
            {{ suggestion | makeProperNoun }}
          </template>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
export default {
  props: ["beersByName"],

  data() {
    return {
      input: "",
    };
  },

  computed: {
    inputMatchesEntry() {
      if (this.input) {
        let input = this.input.trim().toLowerCase();
        return this.beersByName
          .map((b) => b.toLowerCase())
          .filter((b) => b.includes(input));
      } else {
        return null;
      }
    },
  },

  filters: {
    makeProperNoun(beerName) {
      let beerNameWords = beerName.split(" ");

      return beerNameWords
        .map((beerNameWord) => {
          return beerNameWord[0].toUpperCase() + beerNameWord.slice(1);
        })
        .join(" ");
    },
  },
};
</script>

<style>
</style>