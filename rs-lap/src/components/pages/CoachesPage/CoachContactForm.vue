<template>
    <form @submit.prevent="sendRequest">
        <div class="form-control">
            <label for="email"> {{$t('coach_item.form_contact.labels.email') }} </label>
            <input v-model.trim="request.email" type="email" id="email" />
        </div>
        <div class="form-control">
            <label for="message"> {{$t('coach_item.form_contact.labels.message') }} </label>
            <textarea
                v-model.trim="request.message"
                rows="5"
                id="message"
            ></textarea>
        </div>
        <p v-if="isError" class="errors">
            {{ $t('coach_item.form_contact.error') }}
        </p>
        <!---->
        <div class="actions">
            <base-button>
                {{ $t("coach_item.buttons.send_message") }}
            </base-button>
        </div>
    </form>
</template>

<script>
import BaseButton from "../../commons/BaseButton";
export default {
    data() {
        return {
            request: {
                email: "",
                message: ""
            },
            isError: false
        };
    },
    components: {
        BaseButton
    },
    methods: {
        sendRequest() {
            if (
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                    this.request.email
                ) == false ||
                this.request.email.length == 0 ||
                this.request.message.length == 0
            )
                this.isError = true;
            else {
                this.$store.dispatch("sendRequest", {
                    id: this.$route.params.id,
                    request: this.request
                });
            }
        }
    }
};
</script>

<style lang="scss" scoped>
form {
    margin: 1rem;
    border: 1px solid #ccc;
    border-radius: 12px;
    padding: 1rem;
    .form-control {
        margin: 0.5rem 0;
        label {
            font-weight: 700;
            margin-bottom: 0.5rem;
            display: block;
        }
        input,
        textarea {
            display: block;
            width: 100%;
            font: inherit;
            border: 1px solid #ccc;
            padding: 0.15rem;
            &:focus {
                border-color: #3d008d;
                background-color: #faf6ff;
                outline: none;
            }
        }
    }
    .errors {
        font-weight: 700;
        color: red;
    }
    .actions {
        justify-content: center !important;
    }
}
</style>
