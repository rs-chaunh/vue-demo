<template>
  <section>
    <card>
      <h2>Register as a coach now!</h2>
      <form @submit.prevent="handlerRegister">
        <form-control
          :error="coach.firstName.error ? true : false"
          :id="'firstname'"
          :label="'Firstname'"
        >
          <input
            v-model="firstName"
            type="text"
            id="firstname"
            @blur="validateFirstName"
          />
          <p v-if="coach.firstName.error">
            {{ coach.firstName.error }}
          </p>
        </form-control>
        <form-control
          :error="coach.lastName.error ? true : false"
          :id="'lastname'"
          :label="'Listname'"
        >
          <input
            v-model="lastName"
            type="text"
            id="lastname"
            @blur="validateLastName"
          />
          <p v-if="coach.lastName.error">
            {{ coach.lastName.error }}
          </p>
        </form-control>
        <form-control
          :error="coach.description.error ? true : false"
          :id="'description'"
          :label="'Description'"
        >
          <textarea
            v-model="description"
            id="description"
            rows="5"
            @blur="validateDescription"
          ></textarea>
          <p v-if="coach.description.error">
            {{ coach.description.error }}
          </p>
        </form-control>
        <form-control
          :error="coach.hourlyRate.error ? true : false"
          :id="'hourlyRate'"
          :label="'Hourly Rate'"
        >
          <input
            v-model="hourlyRate"
            type="number"
            id="hourlyRate"
            @blur="validateHourlyRate"
          />
          <p v-if="coach.hourlyRate.error">
            {{ coach.hourlyRate.error }}
          </p>
        </form-control>
        <form-control
          :error="coach.areas.error ? true : false"
          :id="'areas'"
          :label="'Areas of Expertise'"
        >
          <filter-option
            v-for="area in dataAreas"
            :checked="false"
            :id="area.id"
            :label="area.name"
            :key="area.id"
            @change="toggleAreas(area.id)"
          ></filter-option>
          <p v-if="coach.areas.error">
            {{ coach.areas.error }}
          </p>
        </form-control>
        <p v-if="isHadError">Please fix the above errors and submit again.</p>
        <button-purple>Register</button-purple>
      </form>
    </card>
  </section>
</template>

<script>
import Card from "../commons/Card.vue";
import FormControl from "../commons/FormControl.vue";
import FilterOption from "../commons/FilterOption.vue";
import ButtonPurple from "../commons/Button/ButtonPurple.vue";

export default {
  components: { Card, FormControl, FilterOption, ButtonPurple },
  data() {
    return {
      firstName: this.coach.firstName.value,
      lastName: this.coach.lastName.value,
      description: this.coach.description.value,
      hourlyRate: this.coach.hourlyRate.value,
    };
  },
  props: {
    coach: {
      type: Object,
    },
    isHadError: {
      type: Boolean,
      default: false,
    },
    validateFirstName: {
      type: Function,
    },
    validateLastName: {
      type: Function,
    },
    validateDescription: {
      type: Function,
    },
    validateHourlyRate: {
      type: Function,
    },
    validateAreas: {
      type: Function,
    },
    handlerRegister: {
      type: Function,
    },
    setValueType: {
      type: Function,
    },
  },
  computed: {
    dataAreas() {
      return this.$store.getters.getDataAreas;
    },
  },
  methods: {
    toggleAreas(option) {
      this.$emit("toggleAreas", option);
    },
  },
  watch: {
    firstName() {
      this.$emit("setValueType", "firstName", this.firstName);
    },
    lastName() {
      this.$emit("setValueType", "lastName", this.lastName);
    },
    description() {
      this.$emit("setValueType", "description", this.description);
    },
    hourlyRate() {
      this.$emit("setValueType", "hourlyRate", this.hourlyRate);
    },
  },
};
</script>

<style lang="scss" scoped>
.form-control.error {
  input,
  textarea {
    border: 1px solid red;
  }
}
.filter-option {
  display: flex;
}
</style>