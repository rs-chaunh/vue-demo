//TODO ở đây cũng chia folder tương tự như ở folder components, page của coach thì sẽ gồm những page nào, em để detail này làm sao biết detail của cái gì
<template>
  <transition appear name="open" id="detail">
    <div v-if="getDataDetail">
      <section>
        <item-card>
          <h2>{{ getDataDetail.firstName }}</h2>
          <h3>${{ getDataDetail.hourlyRate }}/ {{$t('hour')}} </h3>
        </item-card>
      </section>
      <section>
        <item-card>
          <header>
            <h2>{{$t('interested')}} </h2>
            <item-link
              :linkTo="{
                name: 'Contact',
              }"
              >{{$t('contact')}}</item-link
            >
          </header>
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

export default {
  data() {
    return {
      detailCoach: "",
      id: "",
      LinkToContact: "/contact",
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    this.$store.dispatch({
      type: "coach/getDataDetail",
      id : this.id ,
    });
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

<style scoped>
.action {
  text-align: center;
}
</style>
