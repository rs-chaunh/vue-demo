<template>
    <span class="filter-option">
        <input type="checkbox" :id="id" :checked="checked"/>
        <label :for="id"> {{ label }}</label>
    </span>
</template>

<script>
export default {
    props: {
        label: {
            type: String
        },
        id: {
            type: String,
            required: true
        }, 
        checked: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang='scss' scoped>
    .filter-option {
        margin-right: 1rem;
        display: inline-flex;
        align-items: center;
        
        input {
            width: auto;
            cursor: pointer;
            margin: 3px 3px 3px 4px;
        }

        label {
            margin-left: .25rem;
            cursor: pointer;
        }
    }
</style>