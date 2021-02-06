<template>
  <div class="card-coaches">
    <h3>{{ firstName }} {{ lastName }}</h3>
    <h4>${{ hourlyRate }}/hour</h4>
    <div>
      <coach-badge
        v-for="area in areas"
        :key="area.id"
        :color="area"
        :title="area"
      >
        {{ area }}
      </coach-badge>
    </div>

    <div class="btn-more">
      <coach-button link :to="linkToContact" background="light">
        Contact
      </coach-button>
      <coach-button link :to="linkToDetail" background="">
        View Details
      </coach-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id", "firstName", "lastName", "hourlyRate", "areas"],
  computed: {
    linkToContact() {
      return this.$route.path + "/" + this.id + "/contact";
    },
    linkToDetail() {
      // if (this.$router.params.id != this.id) {
      //   console.log("hello");
      //   return;
      // }
      return this.$route.path + "/" + this.id;
    },
  },
};
</script>

<style scoped>
.card-coaches {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

.card-coaches h3 {
  font-size: 1.5rem;
}

.card-coaches h4 {
  margin: 10px 0;
}
.card-coaches .job {
  text-transform: uppercase;
  background-color: #3d008d;
  color: #fff;
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  display: inline-block;
  margin-right: 0.5rem;
}

.btn-more {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
