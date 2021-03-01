<template>
<div>    
    <form @submit.prevent="sendNewRequest(email, message)">
        <form-control :label="'Your E-mail'" :id="'email'">
            <input type="email" name="email" id="email" v-model="email"/>
        </form-control>
        <form-control :label="'Message'" :id="'message'">
            <textarea rows="5" name="message" id="message" v-model="message"></textarea>
        </form-control>
        <p class="error" v-if="error">Please enter a valid email and non-empty message.</p>
        <div class="actions">
            <custom-button type="purple">Send Message</custom-button>
        </div>
    </form>
</div>
</template>

<script>
import CustomButton from '../commons/CustomButton';
import FormControl from '../commons/FormControl.vue';

export default {
    components: { 
        CustomButton,
        FormControl,
    },
    data() {
        return {
            email: "",
            message: "",
        }
    },
    props: {
        sendNewRequest: {
            type: Function
        },
        error: {
            type: Boolean, 
            default: false
        }
    }
}
</script>

<style lang="scss" scoped>
    form {
        margin: 1rem;
        border: 1px solid #ccc;
        border-radius: 12px;
        padding: 1rem;

        .actions {
            justify-content: center;
        }

        .error {
            color: red;
            font-weight: bold;
        }
    }
</style>