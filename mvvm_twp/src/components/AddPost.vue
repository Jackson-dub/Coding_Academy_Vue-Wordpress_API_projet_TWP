<template>

<form @submit="onSubmit" class="mb-3 row">
  <div class="field">
      <label for="name" class="title is-6 mt-6">Title</label>
     <div class="col-sm-10">
      <input class="input" type="text" name="name" v-model="title">
    </div>
    <label for="description" class="title is-6">Note</label>
    <div class="col-sm-10">
      <textarea class="textarea mb-5" type="textarea" name="description" v-model="content"></textarea>
    </div>
   
  </div>
  <button id="savePost"  class="button" type="submit">Save post</button>

</form>

</template>

<script>

export default{
    name: 'AddPost',
    data(){
      return{
        title:'',
        content:'',
        status: 'publish',
        categories: '',
        
      }
    },

    methods:{

      onSubmit(e){

        e.preventDefault()

       
          const newTask = {
            title : this.title,
            content : this.content,
            status : this.status,
            categories : this.categories
          }
          this.$emit('hideForm')
          this.$emit('add-post',newTask)
          this.title = '',
          this.content = '',
          this.status = '',
          this.categories = ''
        }
      }
}


</script>