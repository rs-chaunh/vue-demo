<template>
    <h2>Register as a coach now!</h2>
    <form @submit.prevent="registerAsCoach">
        <div :class="['form-control', { invalid: coach.firstName.error }]">
            <label for="firstname">Firstname</label>
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
            <label for="lastname">Lastname</label>
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
            <label for="description">Description</label>
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
            <label for="rate">Hourly Rate</label>
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
            <h3>Areas of Expertise</h3>
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
        <p v-if="checkError">Please fix the above errors and submit again.</p>
        <base-button>
            Register
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
        }
    },
    methods: {
        registerAsCoach() {
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
                "Firstname must not be empty.",
                "isRequired"
            );
            this.validate(
                "firstName",
                "Firstname must capitalize the first letter",
                "capitalize"
            );
        },
        validateLastName() {
            this.validate(
                "lastName",
                "Lastname must not be empty.",
                "isRequired"
            );
            this.validate(
                "lastName",
                "Lastname must be over 3 characters.",
                "minLength",
                3
            );
        },
        validateDescription() {
            this.validate(
                "description",
                "Description must not be empty.",
                "isRequired"
            ),
            this.validate(
                "description",
                "Description must be less than 100 characters long.",
                "maxLength",
                100
            );
        },
        validateHourlyRate() {
            this.validate(
                "hourlyRate",
                "Rate must not be empty.",
                "isRequired"
            );
            this.validate(
                "hourlyRate",
                "Rate must be greater than 0.",
                "isNumber"
            );
        },
        validateAreas() {
            this.validate(
                "areas",
                "At least one expertise must be selected.",
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
