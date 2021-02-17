<script>
  import beerImage from "../assets/beer.png";

  export default {
    props: {
      full: {
        type: Boolean,
        default: true
      },

      name: {},

      beerName: {},

      date: {}
    },

    data() {
      return {
        beerImage: beerImage
      }
    },

    computed: {
      tooltip() {
        // TODO: make these tooltips less lame
        if (this.full) {
          return "Drink this beer!";
        }

        return `${this.name} - ${this.beerName} - ${this.date}`;
      }
    },
  }
</script>

<template>
  <zoom-center-transition mode="out-in">
    <div :key="full" class="beer" :title="tooltip">
      <span
        :class="{
          'drank': !full
        }"
        style="font-size: 50px;"
        :style="full ? 'cursor: pointer;' : ''"
        v-on:click="$emit('drink')"
      >
        🍺
      </span>
    </div>
  </zoom-center-transition>
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
