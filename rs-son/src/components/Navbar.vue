<template>
  <header>
    <nav class="nav">
      <h1>
        <router-link to="/" class="header__logo"> Find a Coach </router-link>
      </h1>
      <ul>
        <li>
          <router-link :active="isActive" to="/coaches">
            {{ $t("allCoaches") }}
          </router-link>
        </li>
        <li v-if="getTokenId != null && getTokenId != ''">
          <router-link to="/requests" @click.prevent="deleteNotification">
            {{ $t("request") }}
            <sup class="text__note">
            {{ notificaiton.length > 0 ? `+${notificaiton.length}` : "" }}
            </sup>
          </router-link>
        </li>
        <li v-if="getTokenId != null && getTokenId != ''">
          <item-button @click="handleLogout()">{{ $t("logout") }}</item-button>
        </li>
        <li v-else>
          <router-link to="/auth"> {{ $t("login") }} </router-link>
        </li>

        <li>
          <flag :iso="language" />
        </li>
        <select v-model="language" id="language">
          <option value="vn">Vietnamese</option>
          <option value="gb">English</option>
        </select>
      </ul>
    </nav>
  </header>
</template>

<script>
import ItemButton from "./Common/ItemButton";
import firebase from "firebase/app";

export default {
  components: { ItemButton },
  data() {
    return {
      checkLogin: "",
      language: localStorage.getItem("lang") ? localStorage.getItem("lang") : "gb",
      notificaiton: [],
    };
  },
  methods: {
    handleLogout() {
      const db = firebase.firestore();
      let CoachLogin = this.$store.getters.getTokenId;
      if (CoachLogin) {
        localStorage.clear();
        this.$store.commit("SET_TOKEN_ID", "");
        this.$store.commit("SET_LOADING", false);
        this.$router.push({ path: "/coaches" });
        db.collection("user")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              if (doc.data().idCoachLogin == CoachLogin.localId) {
                db.collection("user").doc(`${doc.id}`).delete();
              }
            });
          });
      }
    },
    // GET NOTIFICATION FROM FIRESTORE
    getNotification() {
      const db = firebase.firestore();
      let CoachLogin = this.$store.getters.getTokenId;
      db.collection("message")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (CoachLogin) {
              if (doc.data().content.idCoach == CoachLogin.localId) {
                this.notificaiton.push(doc);
              }
            }
          });
        });
    },
    // DEL NOTIFICATION FROM FIRESTORE WHEN CLICK VIEW REQUEST
    deleteNotification() {
      const db = firebase.firestore();
      this.notificaiton.forEach((item) => {
        db.collection("message").doc(`${item.id}`).delete();
        // SET TO 0
        this.notificaiton = [];
      });
      this.$router.push("/requests");
    },
  },
  computed: {
    getTokenId() {
      return this.$store.getters.getTokenId;
    },
    isNotification(){
      return this.$store.state.isNotification;
    }
  },
  watch: {
    language: function () {
      localStorage.setItem("lang", this.language);
      this.$i18n.locale = this.language;
      this.$store.commit("SET_LOCALE", this.language);
    },
  },
  mounted() {
    this.getNotification();
  },
};
</script>

<style scoped lang="scss">
header {
  width: 100%;
  height: 5rem;
  background-color: #3d008d;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  nav {
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  a {
    text-decoration: none;
    color: #f391e3;
    display: inline-block;
    padding: 0.75rem 1.5rem;
    border: 1px solid transparent;
    text-align: center;
  }
  a.header__logo {
    color: #fff;
    margin: 0;
  }
  .nav {
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      li {
        margin: 0 0.5rem;
        a.router-link-active,
        a.router-link-active:active,
        a:hover:not(.header__logo) {
          border: 1px solid #f391e3;
        }
        .flag-icon.flag-icon-squared {
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 50%;
        }
      }
      #language {
        padding: 5px;
        background: #3d008d;
        color: #fff;
        outline: none;
      }
    }
  }
}
</style>
