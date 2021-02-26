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
import ItemBadge from "../components/Common/ItemBadge";
import ItemCard from "../components/Common/ItemCard";
import ItemLink from "../components/Common/ItemLink";
import ItemFormContact from "../components/ContactPage/ItemFormContact.vue";
// import axios from "axios";

export default {
  components: { ItemCard, ItemLink, ItemFormContact, ItemBadge },
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
        type: "getDataDetail",
        url: `https://coaches-project-8d77f-default-rtdb.firebaseio.com/coaches/${this.id}.json/`,
      });
      // this.id = this.$route.params.id;
      // axios
      //   .get(
      //     `https://coaches-project-8d77f-default-rtdb.firebaseio.com/coaches/${this.id}.json/`
      //   )
      //   .then((res) => {
      //     this.detailCoach = res.data;
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    },
  },
  computed: {
    getDataDetail() {
      return this.$store.state.dataDetail;
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
