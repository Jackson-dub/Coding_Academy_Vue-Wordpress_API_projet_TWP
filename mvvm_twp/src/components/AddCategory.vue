<template>

<div class="bloc-modale">
          <div class="overlay">
          <div class="modale card">

<form @submit="onSubmit" class="mb-3 row">
  <h4 class="title">Create Category</h4>
  <div class="btndanger"><form  @submit="onSubmit"><button class="delete"></button></form></div>
  <div class="form-group">
      <label for="name" class="">Titre</label>
     <div class="col-sm-10">
      <input class="form-control" type="text" name="name" v-model="name">
    </div>
    <label for="description" class="">Note</label>
    <div class="col-sm-10">
      <textarea class="form-control" type="textarea" name="description" v-model="description"></textarea>
    </div>
  </div>
  <button class="button" type="submit" value="save note">New category</button>

</form>

</div>
</div>
</div>

</template>

<script>

export default{
    name: 'AddCategory',
    data(){
      return{
        name:'',
        description:'',
      }
    },

    methods:{

      onSubmit(e){

        e.preventDefault()

        // if(!this.name){
        //   alert('Please add a note')
        //   return
        //   }

          const newCat = {
            name : this.name,
            description : this.description,
          }

          this.$emit('add-category',newCat)
          this.name = '',
          this.description = ''
        },

    }

}


</script>