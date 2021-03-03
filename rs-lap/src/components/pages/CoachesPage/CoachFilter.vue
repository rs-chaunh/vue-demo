<template>
    <h2>{{ $t("common.labels.title") }}</h2>
    <span class="filter-option">
        <input
            @change="onChange"
            v-model="areas"
            type="checkbox"
            value="frontend"
            id="frontend"
        />
        <label for="frontend">
            Frontend
        </label>
    </span>
    <span class="filter-option">
        <input
            @change="onChange"
            v-model="areas"
            type="checkbox"
            value="backend"
            id="backend"
        />
        <label for="backend">
            Backend
        </label>
    </span>
    <span class="filter-option">
        <input
            @change="onChange"
            v-model="areas"
            type="checkbox"
            value="career"
            id="career"
        />
        <label for="career">
            Career
        </label>
    </span>
</template>

<script>
export default {
    data() {
        return {
            areas: ["frontend", "backend", "career"]
        };
    },
    methods: {
        onChange() {
            this.$store.commit("SET_FILTER_OPTION", this.areas);
        }
    }
};
</script>

<style lang="scss" scoped>
h2 {
    margin: 0.5rem 0;
}
.filter-option {
    margin-right: 1rem;
    input {
        margin: 3px 3px 3px 4px;
    }
    input,
    label {
        vertical-align: middle;
        cursor: pointer;
    }
    label {
        margin-left: 0.25rem;
        display: inline-block;
    }
}
</style>
