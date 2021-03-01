<template>
  <form @submit.prevent="onRegister">
    <div class="input-group" :class="{ invalid: !firstName.isValid }">
      <label for="firstname">{{ $t("firstName") }}:</label>
      <input
        type="text"
        id="firstname"
        v-model.trim="firstName.value"
        @blur="onBlur('firstName')"
      />
      <p class="error-message" v-if="!firstName.isValid">
        {{ $t("errorFirst") }}
      </p>
    </div>
    <div class="input-group" :class="{ invalid: !lastName.isValid }">
      <label for="lastname">{{ $t("lastName") }}:</label>
      <input
        type="text"
        id="lastname"
        v-model.trim="lastName.value"
        @blur="onBlur('lastName')"
      />
      <p class="error-message" v-if="!lastName.isValid">
        {{ $t("errorLast") }}
      </p>
    </div>
    <div class="input-group" :class="{ invalid: !description.isValid }">
      <label for="description"> {{ $t("description") }} :</label>
      <textarea
        id="description"
        rows="5"
        v-model.trim="description.value"
        @blur="onBlur('description')"
      ></textarea>
      <p class="error-message" v-if="!description.isValid">
        {{ $t("errorDescription") }}
      </p>
    </div>
    <div class="input-group" :class="{ invalid: !hourlyRate.isValid }">
      <label for="hourlyRate"> {{ $t("hourlyRate") }} :</label>
      <input
        type="number"
        id="hourlyRate"
        v-model.number="hourlyRate.value"
        @blur="onBlur('hourlyRate')"
      />
      <p class="error-message" v-if="!hourlyRate.isValid">
        {{ $t("errorHourlyRate") }}
      </p>
    </div>
    <div class="select-group" :class="{ invalid: !areas.isValid }">
      <h3>{{ $t("area") }} :</h3>

      <div>
        <input
          type="checkbox"
          id="frontend"
          value="frontend"
          v-model="areas.value"
          @blur="onBlur('areas')"
        />
        <label for="frontend">{{ $t("frontendDev") }}</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="backend"
          value="backend"
          v-model="areas.value"
          @blur="onBlur('areas')"
        />
        <label for="backend">{{ $t("backendDev") }}</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="career"
          value="career"
          v-model="areas.value"
          @blur="onBlur('areas')"
        />
        <label for="career">{{ $t("careerDev") }}</label>
      </div>
      <p class="error-message" v-if="!areas.isValid">
        {{ $t("errorArea") }}
      </p>
    </div>
    <coach-button>Register</coach-button>
  </form>
</template>
<script>
export default {
  emits: ["register-coach"],
  data() {
    return {
      firstName: {
        value: "",
        isValid: true,
      },
      lastName: {
        value: "",
        isValid: true,
      },
      description: {
        value: "",
        isValid: true,
      },
      hourlyRate: {
        value: null,
        isValid: true,
      },
      areas: {
        value: [],
        isValid: true,
      },
      formIsValid: true,
    };
  },
  methods: {
    onBlur(x) {
      this[x].isValid = true;
    },
    checkCapitalize(word) {
      return /^[A-Z]/.test(word);
    },
    validate() {
      if (
        this.firstName.value === "" ||
        !this.checkCapitalize(this.firstName.value)
      ) {
        this.firstName.isValid = false;
        this.formIsValid = false;
      }
      if (this.lastName.value === "" || this.lastName.value.length < 3) {
        this.lastName.isValid = false;
        this.formIsValid = false;
      }
      if (
        this.description.value === "" ||
        this.description.value.length > 100
      ) {
        this.description.isValid = false;
        this.formIsValid = false;
      }
      if (this.hourlyRate.value < 0 || !this.hourlyRate.value) {
        this.hourlyRate.isValid = false;
        this.formIsValid = false;
      }
      if (this.areas.value.length === 0) {
        this.areas.isValid = false;
        this.formIsValid = false;
      }
    },
    onRegister() {
      this.formIsValid = true;
      this.validate();
      if (!this.formIsValid) {
        return;
      }
      const formData = {
        first: this.firstName.value,
        last: this.lastName.value,
        des: this.description.value,
        hour: this.hourlyRate.value,
        areas: this.areas.value,
      };
      this.$emit("register-coach", formData);
    },
  },
};
</script>
<style scoped>
.input-group {
  margin: 10px 0;
}
.input-group label,
.input-group h3 {
  font-weight: 700;
  margin-bottom: 0.5rem;
  display: block;
  text-align: left;
}

.input-group input {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

.input-group textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

.select-group {
  text-align: left;
  margin-bottom: 10px;
}

.error-message {
  color: red;
  font-weight: bolder;
  text-align: left;
  margin: 0;
  padding: 5px 0;
}

.input-group.invalid input,
.input-group.invalid textarea {
  border-color: red;
}
</style>
