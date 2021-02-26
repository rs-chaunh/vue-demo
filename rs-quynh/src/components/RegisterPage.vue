<template>
  <register
    :coach="coach"
    :isHadError="isHadError"
    :validateFirstName="validateFirstName"
    :validateLastName="validateLastName"
    :validateDescription="validateDescription"
    :validateHourlyRate="validateHourlyRate"
    :validateAreas="validateAreas"
    :handlerRegister="handlerRegister"
    @toggleAreas="toggleAreas"
    @setValueType="setValueType"
  ></register>
</template>

<script>
import Register from "../views/Register/Register.vue";
import { checkErrors } from "../assets/js/validate";

export default {
  components: { Register },
  data() {
    return {
      coach: {
        firstName: {
          value: "",
          error: "",
        },
        lastName: {
          value: "",
          error: "",
        },
        hourlyRate: {
          value: "",
          error: "",
        },
        description: {
          value: "",
          error: "",
        },
        areas: {
          value: [],
          error: "",
        },
      },
    };
  },
  computed: {
    isHadError() {
      var keys = Object.keys(this.coach);
      for (let i = 0; i < keys.length; i++) {
        if (this.coach[keys[i]].error) {
          return true;
        }
      }
      return false;
    },
  },
  methods: {
    handlerRegister() {
      this.validateFirstName();
      this.validateLastName();
      this.validateDescription();
      this.validateHourlyRate();
      this.validateAreas();

      if (!this.isHadError) {
        this.$store.dispatch("addNewCoach", {
          firstName: this.coach.firstName.value,
          lastName: this.coach.lastName.value,
          hourlyRate: this.coach.hourlyRate.value,
          description: this.coach.description.value,
          areas: this.coach.areas.value,
        });
      } else {
        console.log(this.isHadError);
      }
    },
    validateFirstName() {
      checkErrors(
        this.coach.firstName,
        "Firstname must not be empty.",
        "isRequired"
      );
      checkErrors(
        this.coach.firstName,
        "Firstname must capitalize the first letter",
        "capitalizeText"
      );
    },
    validateLastName() {
      checkErrors(
        this.coach.lastName,
        "Lastname must not be empty.",
        "isRequired"
      );
      checkErrors(
        this.coach.lastName,
        "Lastname must be over 3 characters.",
        "minLength",
        3
      );
    },
    validateDescription() {
      checkErrors(
        this.coach.description,
        "Description must not be empty.",
        "isRequired"
      );
      checkErrors(
        this.coach.description,
        "Description must be less than 100 characters.",
        "maxLength",
        100
      );
    },
    validateHourlyRate() {
      checkErrors(
        this.coach.hourlyRate,
        "Hourly Rate must not be empty.",
        "isRequired"
      );
      checkErrors(
        this.coach.hourlyRate,
        "Hourly Rate must be greater than 0.",
        "isNumber"
      );
    },
    validateAreas() {
      checkErrors(
        this.coach.areas,
        "At least one expertise must be selected.",
        "isRequired"
      );
    },
    toggleAreas(area) {
      const index = this.coach.areas.value.indexOf(area);
      if (index === -1) this.coach.areas.value.push(area);
      else this.coach.areas.value.splice(index, 1);
    },
    setValueType(type, value) {
      this.coach[type].value = value;
    },
  },
};
</script>