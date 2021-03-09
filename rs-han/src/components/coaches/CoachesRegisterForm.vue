<template>
  <form @submit.prevent="register">
    <div :class="['form-control', { error: dataValidate.firstName.error }]">
      <label>{{ $t("register.inputText.firstName") }}</label>
      <input
        type="text"
        id="firstName"
        v-model="dataValidate.firstName.value"
        @blur="validateRegister('firstName')"
      />
      <p v-if="dataValidate.firstName.error">
        {{ dataValidate.firstName.errorMess }}
      </p>
    </div>
    <div :class="['form-control', { error: dataValidate.lastName.error }]">
      <label>{{ $t("register.inputText.lastName") }}</label>
      <input
        type="text"
        id="lastName"
        v-model="dataValidate.lastName.value"
        @blur="validateRegister('lastName')"
      />
      <p v-if="dataValidate.lastName.error">
        {{ dataValidate.lastName.errorMess }}
      </p>
    </div>
    <div :class="['form-control', { error: dataValidate.description.error }]">
      <label>{{ $t("register.inputText.description") }}</label>
      <textarea
        id="description"
        rows="5"
        v-model="dataValidate.description.value"
        @blur="validateRegister('description')"
      ></textarea>
      <p v-if="dataValidate.description.error">
        {{ dataValidate.description.errorMess }}
      </p>
    </div>
    <div :class="['form-control', { error: dataValidate.hourlyRate.error }]">
      <label>{{ $t("register.inputText.hourlyRate") }}</label>
      <input
        type="number"
        id="rate"
        v-model="dataValidate.hourlyRate.value"
        @blur="validateRegister('hourlyRate')"
      />
      <p v-if="dataValidate.hourlyRate.error">
        {{ dataValidate.hourlyRate.errorMess }}
      </p>
    </div>
    <div :class="['form-control', { error: dataValidate.areas.error }]">
      <h3>{{ $t("register.inputText.areas") }}</h3>
      <div class="card__option">
        <input
          type="checkbox"
          class="card__option-item"
          value="frontend"
          v-model="dataValidate.areas.value"
          @blur="validateRegister('areas')"
        />
        <label>{{ $t("register.inputText.frontendDev") }}</label>
      </div>
      <div class="card__option">
        <input
          type="checkbox"
          class="card__option-item"
          value="backend"
          v-model="dataValidate.areas.value"
          @blur="validateRegister('areas')"
        />
        <label>{{ $t("register.inputText.backendDev") }}</label>
      </div>
      <div class="card__option">
        <input
          type="checkbox"
          class="card__option-item"
          value="fullstack"
          v-model="dataValidate.areas.value"
          @blur="validateRegister('areas')"
        />
        <label>{{ $t("register.inputText.fullstackDev") }}</label>
      </div>
      <p v-if="dataValidate.areas.error">{{ dataValidate.areas.errorMess }}</p>
      <p v-if="dataValidate.general.error">
        {{ $t("register.error.validate.general") }}
      </p>
    </div>
    <button class="my-button">{{ $t("register.button.register") }}</button>
  </form>
</template>

<script>
export default {
  name: "CoachesRegisterForm",
  data() {
    return {
      dataValidate: {
        firstName: {
          error: false,
          errorMess: "",
          value: "",
        },
        lastName: {
          error: false,
          errorMess: "",
          value: "",
        },
        description: {
          error: false,
          errorMess: "",
          value: "",
        },
        hourlyRate: {
          error: false,
          errorMess: "",
          value: null,
        },
        areas: {
          error: false,
          errorMess: "",
          value: [],
        },
        general: {
          error: false,
        },
      },
    };
  },
  computed: {
    language() {
      return this.$store.state.common.lang;
    },
    i18n() {
      return this.$i18n.messages[this.language].register.error.validate;
    },
  },
  watch: {
    language() {
      var errors = {
        firstName: this.dataValidate.firstName.error,
        lastName: this.dataValidate.lastName.error,
        description: this.dataValidate.description.error,
        hourlyRate: this.dataValidate.hourlyRate.error,
        areas: this.dataValidate.areas.error,
      };
      Object.values(errors).forEach((e, i) => {
        if (e) {
          this.validateRegister(Object.keys(errors)[i]);
        }
      });
    },
  },
  methods: {
    register() {
      Object.keys(this.dataValidate).forEach((e) => {
        this.validateRegister(e);
      });
      if (
        !this.dataValidate.firstName.error &&
        !this.dataValidate.lastName.error &&
        !this.dataValidate.description.error &&
        !this.dataValidate.hourlyRate.error &&
        !this.dataValidate.areas.error
      ) {
        this.dataValidate.general.error = false;
        this.$store.dispatch("coaches/registerCoaches", {
          id: localStorage.getItem("userID"),
          areas: this.dataValidate.areas.value,
          description: this.dataValidate.description.value,
          firstName: this.dataValidate.firstName.value,
          lastName: this.dataValidate.lastName.value,
          hourlyRate: this.dataValidate.hourlyRate.value,
        });
      } else {
        this.dataValidate.general.error = true;
      }
    },
    validateRegister(name) {
      switch (name) {
        case "firstName":
          if (this.dataValidate.firstName.value == "") {
            this.dataValidate.firstName.error = true;
            this.dataValidate.firstName.errorMess = this.i18n.nonValue.firstName;
          } else {
            let firstCharactersAscii = this.dataValidate.firstName.value
              .split("")[0]
              .charCodeAt(0);
            if (firstCharactersAscii >= 97 && firstCharactersAscii <= 122) {
              this.dataValidate.firstName.error = true;
              this.dataValidate.firstName.errorMess = this.i18n.wrongFormat.firstName;
            } else {
              this.dataValidate.firstName.error = false;
            }
          }
          break;
        case "lastName":
          if (this.dataValidate.lastName.value == "") {
            this.dataValidate.lastName.error = true;
            this.dataValidate.lastName.errorMess = this.i18n.nonValue.lastName;
          } else {
            if (this.dataValidate.lastName.value.length <= 3) {
              this.dataValidate.lastName.error = true;
              this.dataValidate.lastName.errorMess = this.i18n.wrongFormat.lastName;
            } else {
              this.dataValidate.lastName.error = false;
            }
          }
          break;

        case "description":
          if (this.dataValidate.description.value == "") {
            this.dataValidate.description.error = true;
            this.dataValidate.description.errorMess = this.i18n.nonValue.description;
          } else {
            if (this.dataValidate.description.value.length >= 100) {
              this.dataValidate.description.error = true;
              this.dataValidate.description.errorMess = this.i18n.wrongFormat.description;
            } else {
              this.dataValidate.description.error = false;
            }
          }
          break;

        case "hourlyRate":
          if (this.dataValidate.hourlyRate.value <= 0) {
            this.dataValidate.hourlyRate.error = true;
            this.dataValidate.hourlyRate.errorMess = this.i18n.nonValue.hourlyRate;
          } else {
            this.dataValidate.hourlyRate.error = false;
          }
          break;

        case "areas":
          if (this.dataValidate.areas.value.length == 0) {
            this.dataValidate.areas.error = true;
            this.dataValidate.areas.errorMess = this.i18n.nonValue.areas;
          } else {
            this.dataValidate.areas.error = false;
          }
          break;
      }
    },
  },
};
</script>

<style scoped>
form {
  display: block;
  margin-top: 0em;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: 700;
  display: block;
  margin-bottom: 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.card__option {
  margin-right: 1rem;
}
.card__option > input + label {
  vertical-align: middle;
}

.card__option > input {
  display: inline;
  width: auto;
  border: none;
}

.card__option > label {
  font-weight: 400;
  display: inline;
  margin: 0 0 0 0.5rem;
}

p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}

.error > input,
.error > textarea {
  border: 1px solid red;
}

.error > label,
.error > div > label {
  color: red;
}
</style>
