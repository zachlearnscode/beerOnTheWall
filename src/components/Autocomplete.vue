<template>
  <div>
    <v-text-field v-model="input" placeholder="Beer Name"></v-text-field>

    <v-list>
      <v-list-item-group v-if="suggestions">
        <v-list-item
          class="px-0"
          v-for="suggestion in suggestions"
          :key="suggestion"
          @click="input = makeProperNoun(suggestion)"
          style="border-bottom: thin solid rgba(0, 0, 0, 0.12);"
        >
          <template>
            {{ makeProperNoun(suggestion) }}
          </template>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
export default {
  props: ["beersByName", "dialogOpen"],

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
    }
  },

  watch: {
    input: function() {
      return this.$emit("beer-name-updated", this.input);
    },

    //Clears input when dialog is cancelled
    dialogOpen: function() {
      if (!this.dialogOpen)  {
        return this.input = '';
      }
    }
  },

  methods: {
    //Capitalizes beer names after suggestions()
    //makes everything lowecase for matching purposes
    makeProperNoun(beerName) {
      let beerNameWords = beerName.split(" ");

      return beerNameWords
        .map((beerNameWord) => {
          return beerNameWord[0].toUpperCase() + beerNameWord.slice(1);
        })
        .join(" ");
    },
  }
};
</script>