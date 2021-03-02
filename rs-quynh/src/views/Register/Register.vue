<template>
  <section>
    <div class="card">
      <h2>{{ $t('register.title') }}</h2>
      <form @submit.prevent="handlerRegister">
        <form-control
          :error="coach.firstName.error"
          :id="'firstname'"
          :label="$t('register.labels.firstname') "
        >
          <input
            v-model="firstName"
            type="text"
            id="firstname"
            @blur="validateFirstName"
          />
        </form-control>
        <form-control
          :error="coach.lastName.error"
          :id="'lastname'"
          :label="$t('register.labels.lastname')"
        >
          <input
            v-model="lastName"
            type="text"
            id="lastname"
            @blur="validateLastName"
          />
        </form-control>
        <form-control
          :error="coach.description.error"
          :id="'description'"
          :label="$t('register.labels.description')"
        >
          <textarea
            v-model="description"
            id="description"
            rows="5"
            @blur="validateDescription"
          ></textarea>
        </form-control>
        <form-control
          :error="coach.hourlyRate.error"
          :id="'hourlyRate'"
          :label="$t('register.labels.hourlyrate')"
        >
          <input
            v-model="hourlyRate"
            type="number"
            id="hourlyRate"
            @blur="validateHourlyRate"
          />
        </form-control>
        <form-control
          :error="coach.areas.error"
          :id="'areas'"
          :label="$t('register.labels.areas')"
        >
          <filter-option
            v-for="area in dataAreas"
            :checked="false"
            :id="area.id"
            :label="area.name"
            :key="area.id"
            @change="toggleAreas(area.id)"
          ></filter-option>
        </form-control>
        <p v-if="isHadError">{{ $t('register.errors.all') }}</p>
        <custom-button type="purple">{{ $t('register.buttons.submit') }}</custom-button>
      </form>
    </div>
  </section>
</template>

<script>
import FormControl from "../commons/FormControl.vue";
import FilterOption from "../commons/FilterOption.vue";
import CustomButton from "../commons/CustomButton.vue";

export default {
  components: { FormControl, FilterOption, CustomButton },
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