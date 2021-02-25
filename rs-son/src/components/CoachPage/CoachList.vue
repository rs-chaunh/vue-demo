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
      <item-lazy-load v-if="$store.state.loading"></item-lazy-load>
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
import ItemButton from "../Common/ItemButton";
import ItemCard from "../Common/ItemCard";
import ItemLazyLoad from "../Common/ItemLazyLoad";
import ItemLink from "../Common/ItemLink";
import CoachDetail from "./CoachDetail";
import { mapState, mapGetters } from "vuex";

export default {
  components: { CoachDetail, ItemButton, ItemLink, ItemCard, ItemLazyLoad },
  data() {
    return {
      textLink: "",
    };
  },
  computed: {
    ...mapState(["coaches", "status", "coachesTemp", "areas","tokenId"]),
    ...mapGetters(["getLinkTo"]),
    dataCoachDefault() {
      if (this.coaches != null) {
        return this.coaches;
      } else {
        return "";
      }
    },
    tokenId() {
      if (this.tokenId != null) {
        return this.tokenId;
      } else {
        return "";
      }
    },
    linkTo() {
      if (this.getLinkTo != null) {
        return this.getLinkTo;
      } else {
        return "/coaches";
      }
    },
    resultPost() {
      if (this.status) {
        return this.status;
      } else {
        return "";
      }
    },
    isCheckCoach() {
      let coachArr = this.coachesTemp; // FIXED
      let userId = this.tokenId;
      let index = -1;
      if (userId != null && coachArr != null) {
        index = Object.keys(coachArr).findIndex((item) => item == userId.localId);
        localStorage.setItem("checkCoach", index);
      }
      return index;
    },
    locale() {
      return this.$store.state.locale;
    },
  },
  mounted() {
    this.$store.commit("SET_LOADING", true);
    this.$store.dispatch("getDefaultData");
  },
  methods: {
    handleRefresh() {
      this.$store.commit("SET_LOADING", true);
      setTimeout(() => {
        this.$store.commit("SET_LOADING", false);
      }, 300);
      this.$store.dispatch({
        type: "getDatafilter",
        listFilter: this.areas,
      });
    },
  },
  watch: {
    resultPost: function () {
      this.$store.dispatch("getDefaultData");
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
