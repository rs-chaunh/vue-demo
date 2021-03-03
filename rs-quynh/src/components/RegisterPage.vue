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
      this.checkErrors(
        "firstName",
        this.$t('register.errors.empty', {field: this.$t('register.labels.firstname')}),
        "isRequired"
      );
      this.checkErrors(
        "firstName",
        this.$t('register.errors.capitalize_letter', {field: this.$t('register.labels.firstname')}),
        "capitalizeText"
      );
    },
    validateLastName() {
      this.checkErrors(
        "lastName", 
        this.$t('register.errors.empty', {field: this.$t('register.labels.lastname')}),
        "isRequired");
      this.checkErrors(
        "lastName",
        this.$t('register.errors.min_length', {field: this.$t('register.labels.lastname'), number: 3}),
        "minLength",
        3
      );
    },
    validateDescription() {
      this.checkErrors(
        "description",
        this.$t('register.errors.empty', {field: this.$t('register.labels.description')}),
        "isRequired"
      );
      this.checkErrors(
        "description",
        this.$t('register.errors.max_length', {field: this.$t('register.labels.description'), number: 100}),
        "maxLength",
        100
      );
    },
    validateHourlyRate() {
      this.checkErrors(
        "hourlyRate",
        this.$t('register.errors.empty', {field: this.$t('register.labels.hourlyrate')}),
        "isRequired"
      );
      this.checkErrors(
        "hourlyRate",
        this.$t('register.errors.is_number', {field: this.$t('register.labels.hourlyrate')}),
        "isNumber"
      );
    },
    validateAreas() {
      this.checkErrors(
        "areas",
        this.$t('register.errors.selected'),
        "isRequired"
      );
    },
    checkErrors(type, message, rule, valueRule = "") {
      const value = this.coach[type].value;

      switch (rule) {
        case "isRequired":
          {
            if (value.length === 0) this.coach[type].error = message;
            else this.coach[type].error = "";
          }
          break;
        case "capitalizeText":
          {
            if (value.length !== 0) {
              if (this.capitalizeFirstLetter(value) !== value)
                this.coach[type].error = message;
              else this.coach[type].error = "";
            }
          }
          break;
        case "minLength":
          {
            if (value.length !== 0) {
              if (value.length <= valueRule) this.coach[type].error = message;
              else this.coach[type].error = "";
            }
          }
          break;
        case "maxLength":
          {
            if (value.length !== 0) {
              if (value.length >= valueRule) this.coach[type].error = message;
              else this.coach[type].error = "";
            }
          }
          break;
        case "isNumber":
          {
            if (value.length !== 0) {
              if (value <= 0) this.coach[type].error = message;
              else this.coach[type].error = "";
            }
          }
          break;
      }
    },
    capitalizeFirstLetter(string) {
      const arrayWords = string.split(" ");
      const uppercaseArrayWords = arrayWords.map(
        (item) => item.charAt(0).toUpperCase() + item.slice(1)
      );
      return uppercaseArrayWords.join(" ");
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
    }
  },
};
</script>

<style>
</style>