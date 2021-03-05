<script>
  export default {
    props: ["beers"],

    data() {
      return {
        dialog: false,
        hidden: true
      };
    },

    methods: {
      remove(index) {
        fetch("https://ryandeba.com/beer", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            index: index,
          }),
        })
        .then(() => {
          this.$emit("data-changed");
        });
      }
    },

    mounted() {
      if (window.location.search.toLowerCase().indexOf("admin") > -1) {
        this.hidden = false;
      }
    }
  };
</script>

<template>
  <div v-if="!hidden" class="text-center pa-4">
    <v-btn color="primary" v-on:click="dialog = true">
      <v-icon>mdi-cog</v-icon>
      Admin
    </v-btn>

    <v-dialog v-model="dialog" max-width="600" scrollable>
      <v-card>
        <v-card-title>
          Admin
        </v-card-title>

        <v-card-text>
          <div
            v-for="(beer, index) in beers.filter(b => !b.full)"
            :key="index"
            class="pa-3 d-flex"
          >
            <v-btn
              color="error"
              class="mr-2"
              icon
              v-on:click="remove(index)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
      
            {{ index }}
            {{ beer }}
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="error" text @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
