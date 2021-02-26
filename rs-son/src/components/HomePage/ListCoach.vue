<template>
  <section>
    <item-card>
      <div class="controls">
        <item-button @click="handleRefresh()" class="outline">
          {{ $t("refresh") }}
        </item-button>

        <item-link v-if="getCheckCoach == -1 && getLocale == 'gb'" :linkTo="setLinkTo">
          {{ (textLink = setTokenId ? "" : "Login to" || "") }}
          {{ $t("regAsCoach") }}
        </item-link>

        <item-link v-if="getCheckCoach == -1 && getLocale == 'vn'" :linkTo="setLinkTo">
          {{ (textLink = setTokenId ? "" : "Đăng nhập để" || "") }}
          {{ $t("regAsCoach") }}
        </item-link>
      </div>
      <item-lazy-load v-if="$store.state.loading"></item-lazy-load>
      <ul v-else>
        <item-coach
          v-for="item in Object.entries(getData)"
          :key="item[0]"
          :itemList="item"
        >
        </item-coach>
      </ul>
    </item-card>
  </section>
</template>

<script>
import ItemButton from "../Common/ItemButton.vue";
import ItemCard from "../Common/ItemCard.vue";
import ItemLazyLoad from "../Common/itemLazyLoad.vue";
import ItemLink from "../Common/ItemLink.vue";
import ItemCoach from "./ItemCoach.vue";
import { mapState, mapGetters } from "vuex";

export default {
  components: { ItemCoach, ItemButton, ItemLink, ItemCard, ItemLazyLoad },
  data() {
    return {
      textLink: "",
    };
  },
  computed: {
    ...mapState(["coaches", "status", "temp", "areas"]),
    ...mapGetters(["getTokenId", "getLinkTo"]),
    getData() {
      if (this.coaches != null) {
        return this.coaches;
      } else {
        return "";
      }
    },
    setTokenId() {
      if (this.getTokenId != null) {
        return this.getTokenId;
      } else {
        return "";
      }
    },
    setLinkTo() {
      if (this.getLinkTo != null) {
        return this.getLinkTo;
      } else {
        return "/coaches";
      }
    },
    getResultPost() {
      if (this.status) {
        return this.status;
      } else {
        return "";
      }
    },
    getCheckCoach() {
      let arr = this.temp;
      let userId = this.getTokenId;
      let index = -1;
      if (userId != null && arr != null) {
        index = Object.keys(arr).findIndex((item) => item == userId.localId);
        localStorage.setItem("checkCoach", index);
      }
      return index;
    },
    getLocale() {
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
    getResultPost: function () {
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
