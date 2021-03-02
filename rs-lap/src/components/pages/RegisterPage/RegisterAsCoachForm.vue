<template>
    <h2>{{ $t("register.labels.title") }}</h2>
    <form @submit.prevent="registerAsCoach">
        <div :class="['form-control', { invalid: coach.firstName.error }]">
            <label for="firstname">{{ $t("register.labels.firstname") }}</label>
            <input
                v-model="coach.firstName.value"
                type="text"
                id="firstname"
                @blur="validateFirstName"
                @input="validateFirstName"
            />
            <p v-if="coach.firstName.error">{{ coach.firstName.error }}</p>
        </div>

        <div :class="['form-control', { invalid: coach.lastName.error }]">
            <label for="lastname">{{ $t("register.labels.lastname") }}</label>
            <input
                v-model="coach.lastName.value"
                type="text"
                id="lastname"
                @input="validateLastName"
                @blur="validateLastName"
            />
            <p v-if="coach.lastName.error">{{ coach.lastName.error }}</p>
        </div>

        <div :class="['form-control', { invalid: coach.description.error }]">
            <label for="description">{{
                $t("register.labels.description")
            }}</label>
            <textarea
                v-model="coach.description.value"
                id="description"
                rows="5"
                @input="validateDescription"
                @blur="validateDescription"
            >
            </textarea>
            <p v-if="coach.description.error">
                {{ coach.description.error }}
            </p>
        </div>

        <div :class="['form-control', { invalid: coach.hourlyRate.error }]">
            <label for="rate">{{ $t("register.labels.hourly_rate") }}</label>
            <input
                v-model="coach.hourlyRate.value"
                type="number"
                id="rate"
                @blur="validateHourlyRate"
                @input="validateHourlyRate"
            />
            <p v-if="coach.hourlyRate.error">{{ coach.hourlyRate.error }}</p>
        </div>

        <div :class="['form-control', { invalid: coach.areas.error }]">
            <h3>{{ $t("register.labels.areas_of_expertise") }}</h3>
            <div>
                <input
                    v-model="coach.areas.value"
                    type="checkbox"
                    id="frontend"
                    value="frontend"
                    @blur="validateAreas"
                    @change="validateAreas"
                />
                <label for="frontend">
                    Frontend Development
                </label>
            </div>
            <div>
                <input
                    v-model="coach.areas.value"
                    type="checkbox"
                    id="backend"
                    value="backend"
                    @blur="validateAreas"
                    @change="validateAreas"
                />
                <label for="backend">
                    Backend Development
                </label>
            </div>
            <div>
                <input
                    v-model="coach.areas.value"
                    type="checkbox"
                    id="career"
                    value="career"
                    @blur="validateAreas"
                    @change="validateAreas"
                />
                <label for="career">
                    Career Advisory
                </label>
            </div>
            <p v-if="coach.areas.error">{{ coach.areas.error }}</p>
        </div>
        <p v-if="checkError">{{ $t("register.errors.has_error") }}</p>
        <base-button>
            {{ $t("register.buttons.register") }}
        </base-button>
    </form>
</template>

<script>
import BaseButton from "../../commons/BaseButton";
export default {
    data() {
        return {
            coach: {
                firstName: {
                    value: "",
                    error: ""
                },
                lastName: {
                    value: "",
                    error: ""
                },
                hourlyRate: {
                    value: "",
                    error: ""
                },
                description: {
                    value: "",
                    error: ""
                },
                areas: {
                    value: [],
                    error: ""
                }
            }
        };
    },
    components: {
        BaseButton
    },
    computed: {
        checkError() {
            var keys = Object.keys(this.coach);
            for (let i = 0; i < keys.length; i++) {
                if (this.coach[keys[i]].error) {
                    return true;
                }
            }
            return false;
        },
        lang() {
            return this.$store.state.lang;
        }
    },
    watch: {
        lang(){
            let keys = Object.keys(this.coach);
            keys.forEach(e => {
                if(this.coach[e].error) {
                    let fn = "validate" + e[0].toUpperCase() + e.substr(1);
                    this[fn](); 
                }
            })
        }
    },
    methods: {
        registerAsCoach() {
            console.log(Object.keys(this.coach));
            this.validateAll();
            if (!this.checkError) {
                this.$store.dispatch("registerAsCoach", {
                    firstName: this.coach.firstName.value,
                    lastName: this.coach.lastName.value,
                    hourlyRate: this.coach.hourlyRate.value,
                    description: this.coach.description.value,
                    areas: this.coach.areas.value
                });
            }
        },
        validateAll() {
            this.validateFirstName();
            this.validateLastName();
            this.validateDescription();
            this.validateHourlyRate();
            this.validateAreas();
        },
        validateFirstName() {
            this.validate(
                "firstName",
                this.$t("register.errors.not_empty", {
                    field: this.$t("register.labels.firstname")
                }),
                "isRequired"
            );
            this.validate(
                "firstName",
                this.$t("register.errors.capital", {
                    field: this.$t("register.labels.firstname")
                }),
                "capitalize"
            );
        },
        validateLastName() {
            this.validate(
                "lastName",
                this.$t("register.errors.not_empty", {
                    field: this.$t("register.labels.lastname")
                }),
                "isRequired"
            );
            this.validate(
                "lastName",
                this.$t("register.errors.min_length", {
                    field: this.$t("register.labels.lastname"),
                    num: 3
                }),
                "minLength",
                3
            );
        },
        validateDescription() {
            this.validate(
                "description",
                this.$t("register.errors.not_empty", {
                    field: this.$t("register.labels.description")
                }),
                "isRequired"
            ),
                this.validate(
                    "description",
                    this.$t("register.errors.max_length", {
                        field: this.$t("register.labels.description"),
                        num: 100
                    }),
                    "maxLength",
                    100
                );
        },
        validateHourlyRate() {
            this.validate(
                "hourlyRate",
                this.$t("register.errors.not_empty", {
                    field: this.$t("register.labels.hourly_rate")
                }),
                "isRequired"
            );
            this.validate(
                "hourlyRate",
                this.$t("register.errors.is_number", {
                    field: this.$t("register.labels.hourly_rate")
                }),
                "isNumber"
            );
        },
        validateAreas() {
            this.validate(
                "areas",
                this.$t("register.errors.selected"),
                "isRequired"
            );
        },
        validate(field, message, rule, valueRule = "") {
            var valueInput = this.coach[field].value;
            var errorInput = this.coach[field].error;
            switch (rule) {
                case "isRequired":
                    {
                        if (valueInput.length == 0)
                            this.coach[field].error = message;
                        else this.coach[field].error = "";
                    }
                    break;
                case "minLength":
                    {
                        if (errorInput != message && errorInput != "") break;
                        if (valueInput.length < valueRule)
                            this.coach[field].error = message;
                        else this.coach[field].error = "";
                    }
                    break;
                case "maxLength":
                    {
                        if (errorInput != message && errorInput != "") break;
                        if (valueInput.length > valueRule)
                            this.coach[field].error = message;
                        else this.coach[field].error = "";
                    }
                    break;
                case "capitalize":
                    {
                        if (errorInput != message && errorInput != "") break;
                        if (
                            valueInput.substr(0, 1) !=
                            valueInput.substr(0, 1).toUpperCase()
                        )
                            this.coach[field].error = message;
                        else this.coach[field].error = "";
                    }
                    break;
                case "isNumber":
                    {
                        if (errorInput != message && errorInput != "") break;
                        if (valueInput <= 0) this.coach[field].error = message;
                        else this.coach[field].error = "";
                    }
                    break;
            }
        }
    }
};
</script>

<style scoped lang="scss">
p {
    color: red;
}
.form-control {
    &.invalid {
        input,
        textarea {
            border: 1px solid red;
        }
    }
    margin: 0.5rem 0;
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
        &:focus {
            background-color: #f0e6fd;
            outline: none;
            border-color: #3d008d;
        }
        &:active {
            outline: none;
        }
    }
    h3 {
        margin: 0.5rem 0;
        font-size: 1rem;
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
</style>
