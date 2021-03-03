<template>
  <section>
      <card>
          <h2>Page not found</h2>
          <p>This page could not be found - maybe check out all our <router-link :to="'/coaches'">coaches</router-link>.</p>
      </card>
  </section>
</template>

<script>
import Card from '../commons/Card.vue'
export default {
  components: { Card },
}
</script>

<style>

</style>