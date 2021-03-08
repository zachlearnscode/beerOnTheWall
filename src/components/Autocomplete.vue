<template>
  <div>
    <v-text-field v-model="input" placeholder="Beer Name"></v-text-field>

    <v-list>
      <transition
        enter-active-class="animate__animated animate__fadeIn animate__faster"
        leave-active-class="animate__animated animate__fadeOut animate__faster"
      >
        <v-list-item-group v-if="suggestions">
          <v-list-item
            class="px-0"
            v-for="suggestion in suggestions"
            :key="suggestion"
            @click="input = makeProperNoun(suggestion)"
          >
            <template v-if="suggestion">
              {{ makeProperNoun(suggestion) }}
            </template>
          </v-list-item>
        </v-list-item-group>
      </transition>
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
    suggestions() {
      if (this.input) {
        let input = this.input.trim().toLowerCase();
        return this.beersByName
          .map((b) => b.toLowerCase())
          .filter((b) => b.includes(input) && b !== input);
        //.filter shows suggestions while b includes but !== input.
        //This logical and has the effect of closing the suggestions box
        //when user finishes inputting or chooses a suggestion, aka
        //the suggestion is no longer necessary.
      } else {
        return null;
      }
    },
  },

  methods: {
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