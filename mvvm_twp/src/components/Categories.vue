<template>

<!-- <div class="cat" v-if="categories.length">
    <div class="card border-dark mb-3 flex-fill bd-highlight col-md-4 shadow  mb-5 rounded" style="max-width: 18rem;" >
     -->

<div class="catWrap" v-for="category in categories" :key="category.id">
  <div :class="[category.name == 'Terminé' ? 'done' : '', 'cat']"
 
  >
     <div class="cat-title">
    <h3 class="titi title is-4">
          {{ category.name }}<br>
        </h3>
       <button @click="$emit('delete-category',category.id)" class="delete"><i class="fas fa-times"></i></button> 
      <!-- <button class="btn btn-secondary"><router-link :to="{name: 'Catviewview', params: {id: category.id}}">Read More</router-link></button> --> 
    </div>
    
    {{getPost(category.id)}}
    {{computeComments()}}

    <Posts :posts="filteredPost"
          :catId="category.id"
        @delete-post="deletePost"
        @delete-comment="deleteComment"
        @update-post="updatePost"
    /> 
    
    <button :id="`${category.id}`" class="button is-dark addpost" @click="clickAction(category)">Add new post</button>
    <AddPost @add-post="addPost" v-if="currentCat == category.id" @hideForm="currentCat = false"/>
    
</div>

</div>

</template>

<script>
import AddPost from "../components/AddPost";
import Posts from "../components/Posts.vue";

export default {
  name: "Categories",
  props: {
    categories: Array,
  },
  components: {
    AddPost,
    Posts,
  },
  data() {
    return {
      filteredPosts: "",
      newPost: false,
      category: "",
      currentCat: "",
      done : ''
    };
  },

  mounted() {
    this.$store.dispatch("getPosts");
  },

  computed: {
    posts() {
      return this.$store.state.posts;
    },

    comments(){
      return this.$store.state.comments
    }
  },
  methods: {
    addPost(post) {
      post.categories = this.category;
      this.$store.dispatch("addNewPost", post);
    },

    getPost(id) {
      this.filteredPost = this.posts.filter((post) => post.categories[0] == id);
    },

    deletePost(id) {
      this.$store.dispatch("deletePost", id);
    },

    deleteComment(id) {
      this.$store.dispatch("deleteComment", id);
    },

    
    updatePost(id) {
      let post = this.posts.filter((post) => post.id == id);

      this.$store.dispatch("editPost", post);
    },
    clickAction(category) {
      this.newPost = true;
      this.category = category.id;
      this.currentCat = category.id;
    },
    computeComments(){
     let comments = this.comments;
    let posts=this.posts;
    let idArray=[]
  
     comments.forEach(function(comment){
       idArray.push(comment.post) 
     })
       idArray.forEach(function(id){
        let post = posts.find((post) => post.id == id);
        let listComments = comments.filter(comment => comment.post == id)
        post.comments = listComments
       })
    }
    // Test(id){
    //   let test = document.getElementById(`${id}`);
    //   test.nextElementSibling.style
    //   console.dir(test);
    // },
  },
};
</script>

<style scope>
.cat {
  background-color: rgb(235, 230, 230);
  border-radius: 5px;
  width: 100%;
  padding: 0.5rem 0.2rem;
  width:300px;
}

.cat-title {
  display: flex;
  justify-content: space-between;
  font-size: 1.4rem;
  font-weight: bold;
  color: black;
}

.cat-title h3 {
  flex: 1;
  text-align: center;
}

.done .drop-zone .postWrapper{
  border-bottom:10px solid green;
}

.titi{
  margin-left: 3px;
  margin-right: 150px;
}
</style>