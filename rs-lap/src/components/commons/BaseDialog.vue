<template>
    <dialog open>
        <header>
            <slot name="header"></slot>
        </header>
        <section>
            <slot name="content"></slot>
        </section>
        <menu>
            <slot name="action"></slot>
        </menu>
    </dialog>
</template>

<script>
export default {}
</script>

<style lang="scss">
dialog {
    width: 40rem;
    position: fixed;
    top: 20vh;
    left: calc(50% - 20rem);    
    z-index: 100;
    border-radius: 12px;
    border: none;
    box-shadow: 0 2px 8px #00000042;
    padding: 0;
    margin: 0;
    overflow: hidden;
    background-color: #fff;
    header {
        background-color: #3a0061;
        color: #fff;
        width: 100%;
        padding: 1rem;
        h2 {
            margin: 0;
        }
    }
    section {
        padding: 1rem;
    }
    menu {
        padding: 1rem;
        display: flex;
        justify-content: flex-end;
        margin: 0;
    }
}
</style>
