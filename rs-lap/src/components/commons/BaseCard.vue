<template>
    <div class="card">
        <slot></slot>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.card {
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    padding: 1rem;
    margin: 2rem auto;
    max-width: 40rem;
    .actions {
        display: flex;
        justify-content: flex-end;
    }
    .controls {
        display: flex;
        justify-content: space-between;
    }
}
</style>
