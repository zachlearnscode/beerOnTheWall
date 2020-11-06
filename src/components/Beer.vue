<script>
  export default {
    props: {
      full: {
        type: Boolean,
        default: true
      }
    },
  }
</script>

<template>
  <span v-on:click="$emit('remove')" v-show="full">
    <i class="fas fa-beer" style="font-size:30px"></i>
  </span>
</template>
