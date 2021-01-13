<script>
  import beerImage from "../assets/beer.png";

  export default {
    props: {
      full: {
        type: Boolean,
        default: true
      },

      order: {
        type: Number,
        default: 1
      }
    },

    data() {
      return {
        beerImage: beerImage
      }
    },
  }
</script>

<template>
  <zoom-center-transition mode="out-in">
    <div :key="full" class="beer">
      <span
        :class="{
          'drank': !full
        }"
        style="font-size: 50px;"
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
