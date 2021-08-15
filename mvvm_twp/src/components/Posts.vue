<template>
  <div
    class="drop-zone"
    :id="catId"
    @drop="onDrop($event)"
    @dragenter.prevent
    @dragover.prevent
  >
    <div
      class="postWrapper"
      style="max-width: 18rem"
      v-for="post in posts"
      :key="post.id"
      draggable="true"
      @dragstart="startDrag($event, post)"
    >
      <div class="card-body text-dark">
        <h3 class="card-title title is-5" @click="currentPost = post">
          {{ post.title.rendered }}<br />
        </h3>
        <button
          @click="$emit('delete-post', post.id)"
          class="delete is-small deleteee"
        ></button>
      </div>
    </div>
    <div v-if="currentPost" class="current-post">
      <div class="bloc-modale">
        <div class="overlay">
          <div class="modale card">
            <div class="btndanger">
              <form @submit="onSubmit"><button class="delete"></button></form>
            </div>
            <h3 class="titleA title is-4 is-small">
              {{ currentPost.title.rendered }}
            </h3>
            <form @submit="onSubmit">
                <input
                  type="text"
                  name="title"
                  class="input is-small mb-1"
                  v-model="currentPost.title.rendered"
                />
                <textarea
                  class="textarea is-small"
                  type="textarea"
                  name="content"
                  v-model="currentPost.content.rendered"
                ></textarea>
                <input
                  @click="$emit('update-post', currentPost.id)"
                  type="submit"
                  value="Update"
                  class="button is-small mt-1 mb-1"
                /> 
            </form>
            <button class="button mt-1 mb-6y h2"><h2 class="title is-4" @click="toggleAddComment">Add a comment</h2></button>
            <AddComment v-if="newComment" :postID="currentPost.id" @add-comment="addComment" />
              <div v-for="(comment, index) in currentPost.comments" :key="index">

                 <div class="comment">
                  <div class="contcom">
                <button
              @click="$emit('delete-comment', comment.id)"
              class="delete del"
              ></button>
              </div>
              <p>{{ comment.content.rendered }}</p>
              <div class="cont-wrap">
              <div class="cont-date">
                  <p class="date"><span>Date : </span>{{ comment.date }}</p>
              </div>

              <div class="cont-author">
                <p class="author"><span>Author : </span>{{ comment.author_name }}</p>
              </div>
              </div>
           
              <button class="button is-small" @click="currentComment == comment ? currentComment = '' : currentComment = comment">Edit content</button>
              </div>

                 <form v-if="currentComment.id == comment.id" @submit="updatePost">
                <textarea
                class="textarea"
                  type="text"
                  name="content"
                  v-model="currentComment.content.rendered"
                ></textarea>
                <button
                  id="saveComment"
                  class="button mt-1 mb-6y"
                  type="submit" @click="updateComment(currentComment)"
                >
                  Save comment
                </button>
              </form>
             
            
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddComment from "../components/AddComment";

export default {
  name: "Posts",
  props: {
    posts: Array,
    catId: Number,
  },
  components: {
    AddComment,
  },
  data() {
    return {
      currentPost: "",
      content:'',
      currentComment : '',
      newComment : false
    };
  },

  methods: {
    onSubmit(e) {
      e.preventDefault();

      this.currentPost = null;
    },
    startDrag(event, post) {
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("postID", post.id);
    },
    onDrop(event) {
      const itemID = event.dataTransfer.getData("postID");
      const post = this.$store.state.posts.find((post) => post.id == itemID);
      let path = event.path;
      console.log(post);
      let category;
      for (let i = 0; i < path.length; i++) {
        if (path[i].className == "drop-zone") {
          category = path[i].id;
        }
        if (path[i].className == "cat") {
          let catName = path[i].children[0].firstChild.firstChild.data;
          if (catName === "Terminé") {
            path[i].classList.add("done");
            console.log(path[i]);
          }
        }
      }
      post.categories = category;
      this.$store.dispatch("dragPost", post);
    },
    addComment(comment) {
      this.$store.dispatch("addComment", comment);
    },
    
    updateComment(comment){
            console.log(comment)
          this.$store.dispatch('updateComment', comment)
          this.content = '',
          this.mail='',
          this.currentComment = ''
        },
        
    toggleAddComment(){
      this.newComment = ! this.newComment
    }

  },

};
</script>

<style scope>


.h2{

margin:2rem 0 !important;

}

.cont-wrap{
  display: flex;
  justify-content: space-between;
  
}
.cont-wrap div{
  flex: 1;
}

.cont-wrap div p span{
  font-weight: bold;

}

.cont-author p{
  text-align: right;
  width: 100%;
}

.deleteee {
  margin-right: 230px;
  bottom: 43px;
}

.del{
  margin-top: 5px;
}

.comment,.postWrapper {
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 1px 1px 2px rgba(8, 8, 8, 0.7);
  padding: 1rem;
  margin: 1rem 0;

}

.date{
  font-size: 0.8rem;
  color: rgb(124, 124, 124);
}

.author{
  font-size: 0.8rem;
  color: rgb(124, 124, 124);
  text-align: right !important;
}

.contcom{
  display: flex;
  flex: 1 1 100%;

  justify-content: flex-end;
}

.comment{
display: flex;
  margin: 1rem 0;
  width: 100%;
  flex-flow: row wrap;
  justify-content: center;
}  

.comment p{
  flex: 1 1 100%;
  text-align: left;
  padding: 0.5rem;
  margin: 0.5rem 0;
}

.comment div{
  flex: 1 1 100%;
}


 

.drop-zone {
  padding: 0 0.5rem;
  min-height: 85px;
}

.card-title {
  font-size: 1.4rem;
  /* margin-top: 20px; */
}

.bloc-modale {
  
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.overlay {
  background-color: rgb(0, 0, 0, 0, 3);
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 1000;
}

.modale {
  background-color: #F4F5F7;
  color: rgb(48, 45, 45);
  padding: 100px;
  position: fixed;
  top: 2%;
  left: 26%;
  z-index: 1000;
  width:800px;
}

.btndanger {
  position: absolute;
  top: 10px;
  right: 10px;
  color: rgb(255, 255, 255);
  padding: 3px;
  z-index: 1000;
}

.titleA {
  position: absolute;
  top: 1px;
  left: 10px;
  padding: 10px;
  z-index: 1000;
  font-weight: bold;
}

.activity {
  /* left: 50px; */
  /* padding: 3px; */
  z-index: 1000;
}
</style>