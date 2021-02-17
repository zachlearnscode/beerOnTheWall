<script>
  /*
    TODO
    - upload picture of beer
    - sweet animationy thing when all beers are drank
  */
  import Beer from './components/Beer.vue'
  import Leaderboard from './components/Leaderboard.vue'

  export default {
    name: 'App',

    components: {
      "beer": Beer,
      "leaderboard": Leaderboard,
    },

    filters: {
      suffixify(n) {
        let suffix = "th";

        let lastDigit = Number(String(n).substr(-1));

        if (n < 4 || n > 20) {
          if (lastDigit == 1) {
            suffix = "st";
          } else if (lastDigit == 2) {
            suffix = "nd";
          } else if (lastDigit == 3) {
            suffix = "rd";
          }
        }

        return n + suffix;
      }
    },

    data() {
      return {
        beers: [],
        dialog: false,
        name: "",
        beerName: "",

        selectedIndex: undefined,
      };
    },

     computed: {
      fullBeers: function() {
        return this.beers.filter(b => b.full);
      },
    },

    methods: {
      drinkBeer: function(index) {
        if (!this.beers[index].full) {
          return;
        }

        this.selectedIndex = index;
        this.dialog = true;
      },

      load() {
        fetch("http://localhost:80/beer")
          .then(response => response.json())
          .then(response => {
            this.beers = response.beers.map(b => {
              return {
                ...b,
                full: !b.date
              };
            });
          });
      },

      save() {
        fetch("http://localhost:80/beer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            index: this.selectedIndex,
            name: this.name,
            beerName: this.beerName
          })
        });

        this.dialog = false;

        this.$set(this.beers, this.selectedIndex, {
          name: this.name,
          beerName: this.beerName,
          full: false,
        });
      }
    },

    mounted() {
      this.load();
    }
  };
</script>

<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <h1>
        {{fullBeers.length}} Bottles of Beers on the Wall
      </h1>
    </v-app-bar>

    <v-main>
      <div>
        <leaderboard :beers="beers"></leaderboard>

        <div style="display: flex; flex-wrap: wrap;">
          <beer
            v-for="(beer, i) in beers"
            :key="i"
            v-bind="beer"
            v-on:drink="drinkBeer(i)"
          ></beer>
        </div>
      </div>
    </v-main>

    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title class="headline">
          You knocked the {{ fullBeers.length | suffixify }} beer off the wall!
        </v-card-title>

        <v-card-text>
          <v-text-field
            v-model="name"
            label="Your Name"
            required
          ></v-text-field>

          <v-text-field
            v-model="beerName"
            label="Beer Name"
            required
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="error"
            text
            @click="dialog = false"
          >
            Cancel
          </v-btn>

          <v-btn
            color="primary"
            @click="save"
            :disabled="name.trim().length == 0 || beerName.trim().length == 0"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>
