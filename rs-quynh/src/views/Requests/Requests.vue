<template>
  <section>
    <nav>
      <card>
        <h2>Requests Received</h2>
        <ul v-if="listRequest">
          <li v-for="(request, index) in listRequest" :key="index">
            <a :href="`mailto: ${request.email}`">{{ request.email }}</a>
            <p>{{ request.message }}</p>
          </li>
        </ul>
        <h3 v-else>You haven't received any requests yet!</h3>
      </card>
    </nav>
  </section>
</template>

<script>
import Card from "../commons/Card.vue";
export default {
  components: { Card },
  props: {
    listRequest: {
      type: Array,
    },
  },
};
</script>

<style lang="scss" scoped>
h2,
h3 {
  text-align: center;
}

ul {
  list-style-type: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
  
  li {
    margin: 1rem 0;
    border: 1px solid #ccc;
    padding: 1rem;
    a {
      color: #3d008d;
      text-decoration: none;
      font-weight: 700;

      &:hover {
        color: #8d007a;
      }
    }

    p {
      margin: 0.5rem 0 0 0;
    }
  }
}
</style>