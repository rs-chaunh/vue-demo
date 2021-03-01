<template>
  <section>
    <nav>
<<<<<<< HEAD
      <div class="card">
        <h2>Requests Received</h2>
        <ul v-if="listRequest">
=======
      <card>
        <h2>{{ $t('requests.title')}}</h2>
        <ul v-if="listRequest.length > 0">
>>>>>>> master
          <li v-for="(request, index) in listRequest" :key="index">
            <a :href="`mailto: ${request.email}`">{{ request.email }}</a>
            <p>{{ request.message }}</p>
          </li>
        </ul>
<<<<<<< HEAD
        <h3 v-else>You haven't received any requests yet!</h3>
      </div>
=======
        <h3 v-else>{{ $t('requests.not_requests')}}</h3>
      </card>
>>>>>>> master
    </nav>
  </section>
</template>

<script>
export default {
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