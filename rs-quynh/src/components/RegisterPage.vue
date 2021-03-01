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
      [
        this.validateFirstName,
        this.validateFirstName,
        this.validateDescription,
        this.validateHourlyRate,
        this.validateAreas,
      ].forEach((func) => func());

      if (!this.isHadError) {
        this.$store.dispatch("addNewCoach", {
          firstName: this.coach.firstName.value,
          lastName: this.coach.lastName.value,
          hourlyRate: this.coach.hourlyRate.value,
          description: this.coach.description.value,
          areas: this.coach.areas.value,
        });
      }
    },
    validateFirstName() {
<<<<<<< HEAD
      checkErrors(
        this.coach.firstName,
        "Firstname must not be empty.",
        "isRequired"
      );
      checkErrors(
        this.coach.firstName,
        "Firstname must capitalize the first letter",
=======
      this.checkErrors(
        "firstName",
        this.$t('register.errors.empty', {field: this.$t('register.labels.firstname')}),
        "isRequired"
      );
      this.checkErrors(
        "firstName",
        this.$t('register.errors.capitalize_letter', {field: this.$t('register.labels.firstname')}),
>>>>>>> master
        "capitalizeText"
      );
    },
    validateLastName() {
<<<<<<< HEAD
      checkErrors(
        this.coach.lastName,
        "Lastname must not be empty.",
        "isRequired"
      );
      checkErrors(
        this.coach.lastName,
        "Lastname must be over 3 characters.",
=======
      this.checkErrors(
        "lastName", 
        this.$t('register.errors.empty', {field: this.$t('register.labels.lastname')}),
        "isRequired");
      this.checkErrors(
        "lastName",
        this.$t('register.errors.min_length', {field: this.$t('register.labels.lastname'), number: 3}),
>>>>>>> master
        "minLength",
        3
      );
    },
    validateDescription() {
<<<<<<< HEAD
      checkErrors(
        this.coach.description,
        "Description must not be empty.",
        "isRequired"
      );
      checkErrors(
        this.coach.description,
        "Description must be less than 100 characters.",
=======
      this.checkErrors(
        "description",
        this.$t('register.errors.empty', {field: this.$t('register.labels.description')}),
        "isRequired"
      );
      this.checkErrors(
        "description",
        this.$t('register.errors.max_length', {field: this.$t('register.labels.description'), number: 100}),
>>>>>>> master
        "maxLength",
        100
      );
    },
    validateHourlyRate() {
<<<<<<< HEAD
      checkErrors(
        this.coach.hourlyRate,
        "Hourly Rate must not be empty.",
        "isRequired"
      );
      checkErrors(
        this.coach.hourlyRate,
        "Hourly Rate must be greater than 0.",
=======
      this.checkErrors(
        "hourlyRate",
        this.$t('register.errors.empty', {field: this.$t('register.labels.hourlyrate')}),
        "isRequired"
      );
      this.checkErrors(
        "hourlyRate",
        this.$t('register.errors.is_number', {field: this.$t('register.labels.hourlyrate')}),
>>>>>>> master
        "isNumber"
      );
    },
    validateAreas() {
<<<<<<< HEAD
      checkErrors(
        this.coach.areas,
        "At least one expertise must be selected.",
=======
      this.checkErrors(
        "areas",
        this.$t('register.errors.selected'),
>>>>>>> master
        "isRequired"
      );
    },
    toggleAreas(area) {
      const index = this.coach.areas.value.indexOf(area);
<<<<<<< HEAD
      if (index === -1) this.coach.areas.value.push(area);
=======
      this.coach.areas.error = "";
      if (index === -1) 
        this.coach.areas.value.push(area);
>>>>>>> master
      else this.coach.areas.value.splice(index, 1);
    },
    setValueType(type, value) {
      this.coach[type].value = value;
    },
  },
};
</script>