<template>



<form @submit="onSubmit">
       <label for="author_name" class="label mt-4">Enter your name :</label>
      <input type="text" class="input is-small" name="author_name" v-model="author_name">
      <label for="mail" class="label">Enter a valid e-mail : </label>
      <input type="text" class="input is-small" name="mail" v-model="mail">
       <label for="content" class="label">Your comment :</label>
      <textarea type="text" class="textarea is-small" name="content" v-model="content"></textarea>
      <button id="saveComment" class="button is-small mt-1" type="submit">
                Add new comment
      </button>
</form>
    
</template>

<script>

export default {
      name:'AddComment',
  props:{
    postID:Number
  },
   data(){
         return{
      content:'', 
      post : '',
      author_name:'',
      status: 'approved',
      type:'comment',
      mail: ''
         }

   },
   methods:{

          onSubmit(e){

        e.preventDefault()

          const newComment = {
            post: this.postID,
            content : this.content,
            status : this.status,
            author_name : this.author_name,
            type : this.type,
            author_email : this.mail
          }
      
          this.$emit('add-comment',newComment)
          this.author_name = '',
          this.content = '',
          this.mail=''
        },   

   } 
}
</script>

<style scoped>

</style>
