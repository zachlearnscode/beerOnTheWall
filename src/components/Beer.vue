<script>
import moment from "moment";
import beerImage from "../assets/beer.png";

export default {
  filters: {
    friendlyDate(date) {
      return new moment(date).fromNow();
    },
  },

  props: {
    full: {
      type: Boolean,
      default: true,
    },

    name: {},

    beerName: {},

    date: {},
  },

  data() {
    return {
      beerImage: beerImage,
    };
  },
};
</script>

<template>
  <v-tooltip top z-index="1">
    <template v-slot:activator="{ on, attrs }">
      <div class="beer" v-bind="attrs" v-on="on">
        <span
          :class="{
            drank: !full,
          }"
          style="font-size: 50px"
          :style="full ? 'cursor: pointer;' : ''"
          v-on:click="$emit('drink')"
        >
          🍺
        </span>
      </div>
    </template>

    <span>
      <template v-if="full"> Drink this beer! </template>

      <template v-else>
        <strong>{{ name }}</strong> drank <strong>{{ beerName }}</strong>
        {{ date | friendlyDate }}
      </template>
    </span>
  </v-tooltip>
</template>

<style scoped>
.beer {
  display: flex;
  width: 50px;
  margin: 16px;
}

.drank {
  filter: grayscale(1);
}
</style>
