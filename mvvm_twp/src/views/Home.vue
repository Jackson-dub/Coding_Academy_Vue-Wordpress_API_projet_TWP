<template>
  <div class="containerA">
   
    <Categories
      :categories="categories"
      @delete-category="deleteCategory"
    />
   <Button text="Add Category" color="green" @toggle-add-cat="toggleAddCat"/>

    <AddCategory @add-category="addCategory" v-if="showAddCat"/>
    <transition  name="slide" mode="out-in"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Categories from "../components/Categories";
import AddCategory from "../components/AddCategory";
import Button from "../components/Button";

export default {
  name: "Home",
  components: {
    Categories,
    AddCategory,
    Button
  },
  data(){
    return{
      showAddCat : false,
    }

  },
  mounted() {
       this.$store.dispatch("getCategories");
        this.$store.dispatch("getComments"); 
  },
  computed: {
  categories(){
      return this.$store.state.categories
    },
  
  },

  methods: {

    addCategory(category){
        this.$store.dispatch('addNewCategory', category)
      },
    deleteCategory(id) {
      this.$store.dispatch('deleteCategory',id)
    },
    toggleAddCat(){
      this.showAddCat = !this.showAddCat
    },
    editCategory(id){
      let category = this.categories.filter((category) => category._id == id);
      this.$store.dispatch('editCategory', category)
    },

  }, 

};
</script>

<style>

  .catWrap{
    display:flex;
    flex-flow:column;
    min-height:100%;
    margin:0 0.5rem;
  }

  .containerA{
    display:flex;
    min-height:100vh;
    overflow-x: scroll;
    padding-top:2rem; 
  }


</style>