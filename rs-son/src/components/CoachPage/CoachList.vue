//TODO đặt folder là CoachPage sẽ dễ bị hiểu nhầm, vì đây chỉ là component, còn coach page em đã bỏ trong folder views rồi
<template>
  <section>
    <item-card>
      <div class="controls">
        <item-button @click="handleRefresh()" class="outline">
          {{ $t("refresh") }}
        </item-button>

        <item-link v-if="isCheckCoach == -1 && locale == 'gb'" :linkTo="linkTo">
          {{ (textLink = tokenId ? "" : "Login to" || "") }}
          {{ $t("regAsCoach") }}
        </item-link>

        <item-link v-if="isCheckCoach == -1 && locale == 'vn'" :linkTo="linkTo">
          {{ (textLink = tokenId ? "" : "Đăng nhập để" || "") }}
          {{ $t("regAsCoach") }}
        </item-link>
      </div>
      <item-lazy-load v-if="$store.state.coach.loading"></item-lazy-load>
      <ul v-else>
        <coach-detail
          v-for="item in Object.entries(dataCoachDefault)"
          :key="item[0]"
          :itemList="item"
        >
        </coach-detail>
      </ul>
    </item-card>
  </section>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import CoachDetail from "./CoachDetail";

export default {
  components: { CoachDetail },
  data() {
    return {
      textLink: "",
    };
  },
  computed: {
    ...mapState(["auth", "coach"]),
    dataCoachDefault() {
      if (this.coach.coaches != null) {
        return this.coach.coaches;
      } else {
        return "";
      }
    },
    tokenId() {
      if (this.auth.tokenId != null) {
        return this.auth.tokenId;
      } else {
        return "";
      }
    },
    linkTo() {
      if (this.$store.getters["auth/getLinkTo"] != null) {
        return this.$store.getters["auth/getLinkTo"];
      } else {
        return "/coaches";
      }
    },
    resultPost() {
      if (this.auth.status) {
        return this.status;
      } else {
        return "";
      }
    },
    isCheckCoach() {
      let coachArr = this.coach.coachesTemp; // FIXED
      let userId = this.auth.tokenId;
      let index = -1;
      if (userId != null && coachArr != null) {
        index = Object.keys(coachArr).findIndex((item) => item == userId.localId);
        localStorage.setItem("checkCoach", index);
      }
      return index;
    },
    locale() {
      return this.auth.locale;
    },
  },
  mounted() {
    this.$store.commit("coach/SET_LOADING_COACH", true);
    this.$store.dispatch("coach/getDefaultData");
  },
  methods: {
    ...mapMutations(["coach"]),
    handleRefresh() {
      this.$store.commit("coach/SET_LOADING_COACH",true);
      setTimeout(() => {
        this.$store.commit("coach/SET_LOADING_COACH",false);
      }, 300);
      this.$store.dispatch({
        type: "coach/getDatafilter",
        listFilter: this.coach.areas,
      });
    },
  },
  watch: {
    resultPost: function () {
      this.$store.dispatch("coach/getDefaultData");
    },
  },
};
</script>

<style scoped lang="scss">
.controls {
  display: flex;
  justify-content: space-between;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
