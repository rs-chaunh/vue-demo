<template>
    <li>
        <h3>{{ coach.firstName + " " + coach.lastName}}</h3>
        <h4>${{ coach.hourlyRate }}/{{ $t('common.unit_price') }}</h4>
        <div>
            <badge v-for="(area, index) of coach.areas" :area="area" :key="index" ></badge>
        </div>
        <coaches-action>
            <button-outline :href="'/coaches/' + coach.id + '/contact'">{{ $t('coach.buttons.contact') }}</button-outline>
            <button-purple :href="'/coaches/' + coach.id ">{{ $t('coach.buttons.view_details') }}</button-purple>
        </coaches-action>
    </li>
</template>

<script>
import CoachesAction from './CoachesAction.vue'
import Badge from '../commons/Badge.vue'
import ButtonOutline from '../commons/Button/ButtonOutline.vue'
import ButtonPurple from '../commons/Button/ButtonPurple.vue'
export default {
    components: { Badge, CoachesAction, ButtonOutline, ButtonPurple },
    props: {
        coach: {
            type: Object,
        }
    }
    
}
</script>

<style lang="scss" scoped>
    li {
        margin: 1rem 0;
        border: 1px solid #424242;
        border-radius: 12px;
        padding: 1rem;

        h3 {
            text-transform: capitalize;
            margin: .5rem 0;
            font-size: 1.5rem;
        }

        h4 {
            margin: .5rem 0;
        }

        div {
            margin: .5rem 0;
        }
    }
</style>