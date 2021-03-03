<template>
  <transition appear name="open">
    <div>
      <section>
        <item-card>
          <h2>{{ getDataDetail.firstName }}</h2>
          <h3>${{ getDataDetail.hourlyRate }}/{{$t('hour')}} </h3>
        </item-card>
      </section>
      <section>
        <item-card>
          <header>
            <h2>{{$t('interested')}}!</h2>
            <item-link :linkTo="NotFound"> {{$t('contact')}} </item-link>
          </header>
          <item-form-contact></item-form-contact>
        </item-card>
      </section>
      <section>
        <item-card>
          <item-badge
            v-for="(itemArea, index) in getDataDetail.areas"
            :key="index"
            :class="itemArea"
          >
            {{ itemArea.toUpperCase() }}
          </item-badge>
          <p>{{ getDataDetail.description }}</p>
        </item-card>
      </section>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex';
import ItemFormContact from "../components/ContactPage/ItemFormContact.vue";

export default {
  components: { ItemFormContact },
  data() {
    return {
      NotFound: "/NotFound",
      detailCoach: "",
    };
  },
  created() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      this.id = this.$route.params.id;
      this.$store.dispatch({
        type: "coach/getDataDetail",
        id : this.id,
      });
    },
  },
  computed: {
    ...mapState(["coach"]),
    getDataDetail() {
      return this.coach.dataDetail;
    },
  },
  beforeRouteLeave() {
    console.log("GOODBYE");
  },
  beforeRouteEnter(to, from) {
    console.log("FROM", from.path);
    console.log("TO", to.path);
  },
};
</script>

<style scoped></style>
