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
        <coaches-action>
            <button-purple>Send Message</button-purple>
        </coaches-action>
    </form>
</div>
</template>

<script>
import ButtonPurple from '../commons/Button/ButtonPurple.vue';
import FormControl from '../commons/FormControl.vue';
import CoachesAction from './CoachesAction.vue';

export default {
    components: { 
        ButtonPurple,
        FormControl,
        CoachesAction,
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