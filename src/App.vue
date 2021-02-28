<script>
/*
    TODO
    - upload picture of beer
    - sweet animationy thing when all beers are drank
  */
import Beer from "./components/Beer.vue";

export default {
  name: "App",

  components: {
    beer: Beer,
    leaderboard: require("./components/Leaderboard.vue").default,
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
    },
  },

  data() {
    return {
      beers: [],
      dialog: false,
      name: "",
      beerName: "",

      selectedIndex: undefined,
      loading: false,
    };
  },

  computed: {
    fullBeers: function () {
      return this.beers.filter((b) => b.full);
    },
  },

  watch: {
    name() {
      localStorage.setItem("name", this.name);
    }
  },
  
  methods: {
    drinkBeer: function (index) {
      if (!this.beers[index].full) {
        return;
      }

      this.selectedIndex = index;
      this.dialog = true;
    },

    load() {
      this.loading = true;
      fetch("https://ryandeba.com/beer") // TODO: this should be based on the environment...
        .then((response) => response.json())
        .then((response) => {
          this.beers = response.beers.map((b) => {
            return {
              ...b,
              full: !b.date,
            };
          });
        })
        .then(() => {
          return new Promise((r) => setTimeout(r, 750));
        })
        .finally(() => (this.loading = false));
    },

    save() {
      fetch("https://ryandeba.com/beer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          index: this.selectedIndex,
          name: this.name,
          beerName: this.beerName,
        }),
      });

      this.dialog = false;
      this.beerName = "";

      this.$set(this.beers, this.selectedIndex, {
        name: this.name,
        beerName: this.beerName,
        full: false,
      });
    },
  },

  beforeMount() {
    this.name = localStorage.getItem("name") || "";
    this.load();
  },
};
</script>

<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="headline">
        {{ fullBeers.length }} Bottles of Beers on the Wall
      </div>
    </v-app-bar>

    <v-main>
      <v-fade-transition mode="out-in">
        <div :key="loading">
          <div
            v-if="loading"
            class="d-flex justify-center align-center"
            style="height: 90vh"
          >
            <v-progress-circular
              indeterminate
              color="primary"
              size="100"
              width="15"
            >
            </v-progress-circular>
          </div>

          <template v-else>
            <leaderboard :beers="beers"></leaderboard>

            <div style="display: flex; flex-wrap: wrap; justify-content: space-evenly;">
              <beer
                v-for="(beer, i) in beers"
                :key="i"
                v-bind="beer"
                v-on:drink="drinkBeer(i)"
              ></beer>
            </div>
          </template>
        </div>
      </v-fade-transition>
    </v-main>

    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title class="headline" style="word-break: break-word;">
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

          <v-btn color="error" text @click="dialog = false"> Cancel </v-btn>

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
