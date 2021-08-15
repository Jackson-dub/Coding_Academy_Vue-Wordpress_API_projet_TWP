import {
  createStore
} from 'vuex'

export default createStore({
  state: {
    categories: [],
    posts: [],
    comments: []
  },
  mutations: {
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
    },

    SET_POSTS(state, posts) {
      state.posts = posts;
    },

    SET_COMMENTS(state, comments) {
      state.comments = comments;
    },

    REMOVE_CATEGORY(state, category) {
      state.categories = state.categories.filter(item => {
        item._id !== category.id
      })
    },

    REMOVE_POST(state, post) {
      state.posts = state.posts.filter(item => {
        item._id !== post.id
      })
    },

     REMOVE_COMMENT(state,comment){
        state.comments = state.comments.filter(item => {item._id !== comment.id})
      },

    NEW_POST(state, post) {
      state.posts.unshift(post)
    },

    NEW_CAT(state, category) {
      state.categories.unshift(category)
    },

    UPDATE_POST(state, post) {
      const index = state.posts.findIndex(post => post._id === post._id);
      if (index !== -1) {
        state.posts.splice(index, 1, post);
      }
    },

    NEW_COMMENT(state, comment) {
      state.comments.unshift(comment)
    }

  },
  actions: {
    async getCategories({
      commit
    }) {
      var WPAPI = require('wpapi');
      var wp = new WPAPI({
        endpoint: 'http://localhost/blog/index.php/wp-json'
      });
      wp.categories().order('asc').orderby('id').get()
        .then(function (data) {
          commit('SET_CATEGORIES', data);
        })
        .catch(function (err) {
          console.log(err)
        });
    },
    async getPosts({
      commit
    }) {
      var WPAPI = require('wpapi');
      var wp = new WPAPI({
        endpoint: 'http://localhost/blog/index.php/wp-json'
      });
      wp.posts().perPage(100).order('asc').orderby('date').get()
        .then(function (data) {
          data.forEach(function (elm) {
            elm.content.rendered = elm.content.rendered.slice(3, -5)
          })
          commit('SET_POSTS', data);
        })
        .catch(function (err) {
          console.log(err)
        });
    },

    async getComments({
      commit
    }) {
      var WPAPI = require('wpapi');
      var wp = new WPAPI({
        endpoint: 'http://localhost/blog/index.php/wp-json'
      });
      wp.comments().get()
        .then(function (data) {
          console.log(data);
          data.forEach(function (elm) {
            elm.content.rendered = elm.content.rendered.slice(3, -5)

            let ts = Date.parse(elm.date)
            let arg = new Date(ts)
            var date = new Date(arg);
            elm.date = date.toDateString();
          })
          commit('SET_COMMENTS', data);
        })
        .catch(function (err) {
          console.log(err)
        });
    },

    async editNewPost({
      commit
    }, post) {
      var WPAPI = require('wpapi');
      var wp = new WPAPI({
        endpoint: 'http://localhost/blog/index.php/wp-json',
        // This assumes you are using basic auth, as described further below
        username: 'jackson.medilien@gmail.com',
        password: 'zxcvbn'
      });
      wp.posts().id(post.id).update({
        title: post.title,
        content: post.content,
        status: 'publish'
      }).then(function (response) {
        commit('UPDATE_POST', response);
      }).then(location.reload())
    },

    async deleteCategory({
      commit
    }, id) {
      var WPAPI = require('wpapi');
      var wp = new WPAPI({
        endpoint: 'http://localhost/blog/index.php/wp-json',
        // This assumes you are using basic auth, as described further below
        username: 'jackson.medilien@gmail.com',
        password: 'zxcvbn'
      });
      wp.categories().id(id).delete({
          force: true
        })
        .then(function (data) {
          commit('REMOVE_CATEGORY', data);
        }).then(location.reload())
        .catch(function (err) {
          console.log(err)
        });
    },

    async deletePost({
      commit
    }, id) {
      var WPAPI = require('wpapi');
      var wp = new WPAPI({
        endpoint: 'http://localhost/blog/index.php/wp-json',
        // This assumes you are using basic auth, as described further below
        username: 'jackson.medilien@gmail.com',
        password: 'zxcvbn'
      });
      wp.posts().id(id).delete({
          force: true
        })
        .then(function (data) {
          commit('REMOVE_POST', data);
        }).then(location.reload())
        .catch(function (err) {
          console.log(err)
        });
    },

    async deleteComment({commit}, id){   
      var WPAPI = require( 'wpapi' );
      var wp = new WPAPI({
        endpoint: 'http://localhost/blog/index.php/wp-json',
        // This assumes you are using basic auth, as described further below
        username: 'jackson.medilien@gmail.com',
        password: 'zxcvbn'
    });
      wp.comments().id(id).delete({
        force:true
      })
          .then(function( data ) {
            commit('REMOVE_COMMENT', data);
          }).then(location.reload())
          .catch(function( err ) {
              console.log(err)
          });
    },

    async addNewPost ({commit}, post) {
      var WPAPI = require('wpapi');
      var wp = new WPAPI({
        endpoint: 'http://localhost/blog/index.php/wp-json',
        // This assumes you are using basic auth, as described further below
        username: 'jackson.medilien@gmail.com',
        password: 'zxcvbn'
      });
      wp.posts().create({
        title: post.title,
        content: post.content,
        status: 'publish',
        categories: post.categories
      }).then(function (response) {
        commit('NEW_POST', response);
      }).then(location.reload())
    },

    async editPost({
      commit
    }, post) {
      var WPAPI = require('wpapi');
      var wp = new WPAPI({
        endpoint: 'http://localhost/blog/index.php/wp-json',
        // This assumes you are using basic auth, as described further below
        username: 'jackson.medilien@gmail.com',
        password: 'zxcvbn'
      });
      wp.posts().id(post[0].id).update({
        title: post[0].title.rendered,
        content: post[0].content.rendered,
        status: 'publish'
      }).then(function (response) {
        commit('UPDATE_POST', response);
      }).then(location.reload())
    },

    async dragPost({
      commit
    }, post) {
      var WPAPI = require('wpapi');
      var wp = new WPAPI({
        endpoint: 'http://localhost/blog/index.php/wp-json',
        // This assumes you are using basic auth, as described further below
        username: 'jackson.medilien@gmail.com',
        password: 'zxcvbn'
      });
      wp.posts().id(post.id).update({
        title: post.title.rendered,
        content: post.content.rendered,
        categories: post.categories,
        status: 'publish'
      }).then(function (response) {
        commit('UPDATE_POST', response);
      }).then(location.reload())
    },

    async addNewCategory({
      commit
    }, category) {
      var WPAPI = require('wpapi');
      var wp = new WPAPI({
        endpoint: 'http://localhost/blog/index.php/wp-json',
        username: 'jackson.medilien@gmail.com',
        password: 'zxcvbn'
      });
      wp.categories().create({
        name: category.name,
        description: category.description,
      }).then(function (response) {
        commit('NEW_CAT', response)
      }).then(location.reload())
    },

    async addComment({
      commit
    }, comment) {
      var WPAPI = require('wpapi');
      var wp = new WPAPI({
        endpoint: 'http://localhost/blog/index.php/wp-json',
        username: 'jackson.medilien@gmail.com',
        password: 'zxcvbn'
      });
      wp.comments().create({
        post: comment.post,
        content: comment.content,
        status: comment.status,
        author_name: comment.author_name,
        type: comment.type,
        author_email: comment.author_email
      }).then(function (response) {
        console.log(response)
        commit('NEW_COMMENT', response)
      })
    },

    async updateComment({
      commit
    }, comment) {
      var WPAPI = require('wpapi');
      var wp = new WPAPI({
        endpoint: 'http://localhost/blog/index.php/wp-json',
        //This assumes you are using basic auth, as described further below
        username: 'jackson.medilien@gmail.com',
        password: 'zxcvbn'
      });
      wp.comments().id(comment.id).update({
          content: comment.content.rendered,
        }).then(function (response) {
          commit('UPDATE_POST', response);
        }).then(location.reload())
        .catch(function (err) {
          console.log(err)
        });
    },

  },
  modules: {}

})