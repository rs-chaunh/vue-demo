<template>
  <register
    :coach="coach"
    :isHadError="isHadError"
    :isOpenModal="isOpenModal"
    :validateFirstName="validateFirstName"
    :validateLastName="validateLastName"
    :validateDescription="validateDescription"
    :validateHourlyRate="validateHourlyRate"
    :validateAreas="validateAreas"
    :handlerRegister="handlerRegister"
    :handlerCloseModal="handlerCloseModal"
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
      isOpenModal: false
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
        this.isOpenModal = true;

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
      checkErrors(
        this.coach.firstName,
        this.$t('register.errors.empty', {field: this.$t('register.labels.firstname')}),
        "isRequired"
      );
      checkErrors(
        this.coach.firstName,
        this.$t('register.errors.capitalize_letter', {field: this.$t('register.labels.firstname')}),
        "capitalizeText"
      );
    },
    validateLastName() {
      checkErrors(
        this.coach.lastName,
        this.$t('register.errors.empty', {field: this.$t('register.labels.lastname')}),
        "isRequired"
      );
      checkErrors(
        this.coach.lastName,
        this.$t('register.errors.min_length', {field: this.$t('register.labels.lastname'), number: 3}),
        "minLength",
        3
      );
    },
    validateDescription() {
      checkErrors(
        this.coach.description,
        this.$t('register.errors.empty', {field: this.$t('register.labels.description')}),
        "isRequired"
      );
      checkErrors(
        this.coach.description,
        this.$t('register.errors.max_length', {field: this.$t('register.labels.description'), number: 100}),
        "maxLength",
        100
      );
    },
    validateHourlyRate() {
      checkErrors(
        this.coach.hourlyRate,
        this.$t('register.errors.empty', {field: this.$t('register.labels.hourlyrate')}),
        "isRequired"
      );
      checkErrors(
        this.coach.hourlyRate,
        this.$t('register.errors.is_number', {field: this.$t('register.labels.hourlyrate')}),
        "isNumber"
      );
    },
    validateAreas() {
      checkErrors(
        this.coach.areas,
        this.$t('register.errors.selected'),
        "isRequired"
      );
    },
    toggleAreas(area) {
      const index = this.coach.areas.value.indexOf(area);
      this.coach.areas.error = "";
      if (index === -1) 
        this.coach.areas.value.push(area);
      else this.coach.areas.value.splice(index, 1);
    },
    setValueType(type, value) {
      this.coach[type].value = value;
    },
    handlerCloseModal() {
      this.isOpenModal = false;
      this.$store.commit("SET_IS_ERROR", false);
    },
  },
};
</script>