<template>
  <form @submit="handleSubmit" method="post" novalidate="true">
    <div class="form-control" :class="dataCoach.firstname.err == '' ? '' : 'error'">
      <label for="firstname">{{ $t("firstname") }}</label>
      <input
        type="text"
        v-model="dataCoach.firstname.value"
        id="firstname"
        @keyup="handleCheckErrItem('firstname', dataCoach.firstname)"
      />
      <p v-if="dataCoach.firstname.err">{{ dataCoach.firstname.err }}</p>
    </div>
    <div class="form-control" :class="dataCoach.lastname.err == '' ? '' : 'error'">
      <label for="lastname">{{ $t("lastname") }}</label>
      <input
        type="text"
        v-model="dataCoach.lastname.value"
        id="lastname"
        @keyup="handleCheckErrItem('lastname', dataCoach.lastname)"
      />
      <p v-if="dataCoach.lastname.err">{{ dataCoach.lastname.err }}</p>
    </div>
    <div class="form-control" :class="dataCoach.description.err == '' ? '' : 'error'">
      <label for="description">{{ $t("description") }}</label>
      <textarea
        type="text"
        v-model="dataCoach.description.value"
        id="description"
        rows="5"
        @keyup="handleCheckErrItem('description', dataCoach.description)"
      ></textarea>
      <p v-if="dataCoach.description.err">{{ dataCoach.description.err }}</p>
    </div>
    <div class="form-control" :class="dataCoach.hRate.err == '' ? '' : 'error'">
      <label for="hRate">{{ $t("hRate") }}</label>
      <input
        type="number"
        v-model="dataCoach.hRate.value"
        id="hRate"
        @keyup="handleCheckErrItem('hRate', dataCoach.hRate)"
      />
      <p v-if="dataCoach.hRate.err">{{ dataCoach.hRate.err }}</p>
    </div>
    <div class="form-control">
      <h3>{{ $t("areasOf") }}</h3>
      <div :class="dataCoach.areas.err == '' ? '' : 'error'">
        <input
          type="checkbox"
          v-model="dataCoach.areas.value"
          value="frontend"
          id="frontend"
          @change="handleCheckErrItem('areas', dataCoach.areas)"
        />
        <label for="frontend">{{ $t("devF") }}</label>
      </div>
      <div :class="dataCoach.areas.err == '' ? '' : 'error'">
        <input
          type="checkbox"
          v-model="dataCoach.areas.value"
          value="backend"
          id="backend"
          @change="handleCheckErrItem('areas', dataCoach.areas)"
        />
        <label for="backend">{{ $t("devB") }}</label>
      </div>
      <div :class="dataCoach.areas.err == '' ? '' : 'error'">
        <input
          type="checkbox"
          v-model="dataCoach.areas.value"
          value="career"
          id="career"
          @change="handleCheckErrItem('areas', dataCoach.areas)"
        />
        <label for="career">{{ $t("devC") }}</label>
      </div>
      <p v-if="dataCoach.areas.err">{{ dataCoach.areas.err }}</p>
      <p v-if="errNote">{{ errNote }}</p>
    </div>
    <item-button @click.prevent="handleSubmit()" type="submit"> Register </item-button>
  </form>
</template>

<script>
// import axios from 'axios';
import ItemButton from "../Common/ItemButton.vue";
export default {
  components: { ItemButton },
  data() {
    return {
      dataCoach: {
        firstname: {
          value: "",
          err: "",
        },
        lastname: {
          value: "",
          err: "",
        },
        description: {
          value: "",
          err: "",
        },
        hRate: {
          value: "",
          err: "",
        },
        areas: {
          value: [],
          err: "",
        },
      },

      check: "",
      errNote: "",
      locale: this.$store.state.locale,
    };
  },
  methods: {
    handleSubmit() {
      this.handleCheckAll();
      Object.keys(this.dataCoach).forEach((elm) => {
        if (this.dataCoach[elm].err != "") {
          this.check = false;
        }
      });
      if (this.check) {
        let user = JSON.parse(localStorage.getItem("checkLogin"));
        let dataCoach = {
          areas: this.dataCoach.areas.value,
          description: this.dataCoach.description.value,
          firstName: this.dataCoach.firstname.value,
          hourlyRate: this.dataCoach.hRate.value,
          lastName: this.dataCoach.lastname.value,
        };
        // console.log(dataCoach);
        this.$store.dispatch({
          type: "handlePostDataCoach",
          url: `https://coaches-project-8d77f-default-rtdb.firebaseio.com/coaches/${user.localId}.json?auth=${user.idToken}`,
          data: dataCoach,
        });
        this.$router.push("/coaches");
      } else {
        this.errNote = this.$i18n.messages[this.getLocale].errNote;
      }
    },
    handleCheckAll() {
      Object.keys(this.dataCoach).forEach((elm) => {
        this.handleCheckErrItem(elm, this.dataCoach[elm]);
      });
    },
    handleCheckErrItem(item, key) {
      let locale = this.getLocale;
      switch (item) {
        case "firstname":
          if (key.value == "") {
            key.err = this.$i18n.messages[locale].errfirstname_1;
            this.check = false;
          } else {
            if (key.value.charAt(0).toUpperCase() !== key.value.charAt(0)) {
              key.err = this.$i18n.messages[locale].errfirstname_2;
              this.check = false;
            } else {
              key.err = "";
              this.check = true;
            }
          }
          break;
        case "lastname":
          if (key.value == "") {
            this.check = false;
            key.err = this.$i18n.messages[locale].errlastname_1;
          } else {
            if (key.value.length < 3) {
              this.check = false;
              key.err = this.$i18n.messages[locale].errlastname_2;
            } else {
              key.err = "";
              this.check = true;
            }
          }
          break;
        case "description":
          if (key.value.length == 0) {
            this.check = false;
            key.err = this.$i18n.messages[locale].errdescription_1;
          } else {
            if (key.value.length > 100) {
              this.check = false;
              key.err = this.$i18n.messages[locale].errdescription_2;
            } else {
              (key.err = ""), (this.check = true);
            }
          }
          break;
        case "hRate":
          if (key.value.length == 0) {
            this.check = false;
            key.err = this.$i18n.messages[locale].errhRate_1;
          } else {
            if (key.value < 0) {
              this.check = false;
              key.err = this.$i18n.messages[locale].errhRate_2;
            } else {
              (key.err = ""), (this.check = true);
            }
          }
          break;
        case "areas":
          if (key.value.length == 0) {
            this.check = false;
            key.err = this.$i18n.messages[locale].errareasOf;
          } else {
            key.err = "";
            this.check = true;
          }
          break;
        default:
          this.check;
      }
    },
  },
  computed: {
    getLocale() {
      return this.$store.state.locale;
    },
  },
  watch: {
    getLocale: function () {
      this.handleSubmit();
    },
  },
};
</script>

<style scoped lang="scss">
.form-control {
  margin: 0.5rem 0;
  label {
    font-weight: 700;
    margin-bottom: 0.5rem;
    display: block;
  }
  input,
  textarea {
    display: block;
    width: 100%;
    font: inherit;
    border: 1px solid #ccc;
    padding: 0.15rem;
  }
  input[type="checkbox"] {
    display: inline;
    width: auto;
    border: none;
  }
  input[type="checkbox"] + label {
    font-weight: 400;
    display: inline;
    margin: 0 0 0 0.5rem;
  }
}

.error {
  input,
  textarea {
    border: 1px solid red;
  }
  label {
    color: red;
    font-weight: 600;
  }
}
</style>
