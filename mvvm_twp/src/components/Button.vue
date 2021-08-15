<template>

    <button @click="$emit('toggle-add-cat')" :style="{background: color}" class="button is-light mr-2 pr-1 p-1 btn">
        {{text}}
    </button>

</template>

<script>

export default {
    name :'Button',
    props:{
        text:String,
        // color:String
    } 
}
</script>

<style scope>

.btn{

    padding: 0 0.2rem !important; 
    
}

</style>