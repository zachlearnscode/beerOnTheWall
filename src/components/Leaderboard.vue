<script>
  export default {
    props: ["beers"],

    data() {
      return {
        opened: false
      };
    },

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
  <div v-if="leaderboard.length > 0">
    <v-simple-table>
      <thead>
        <tr>
          <th style="width: 1px;"></th>
          <th>Name</th>
          <th class="text-center">Beers</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(drinker, i) in leaderboard.slice(0, 3)" :key="drinker.drinker">
          <td>{{ i + 1 }}</td>
          <td>{{ drinker.drinker }}</td>
          <td class="text-center">{{ drinker.count }}</td>
        </tr>
      </tbody>
    </v-simple-table>

    <div class="text-center" v-if="leaderboard.length > 3">
      <v-btn color="primary" v-on:click="opened = true">More</v-btn>
    </div>

    <v-dialog
      v-model="opened"
      max-width="800"
    >
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Leaderboard
        </v-card-title>

        <v-card-text>
          <v-simple-table>
            <thead>
              <tr>
                <th style="width: 1px;"></th>
                <th>Name</th>
                <th class="text-center">Beers</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(drinker, i) in leaderboard" :key="drinker.drinker">
                <td>{{ i + 1 }}</td>
                <td>{{ drinker.drinker }}</td>
                <td class="text-center">{{ drinker.count }}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="opened = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
