var filters = {
  all: function(todos) {
    return todos;
  },
  incompleted: function(todos) {
    return todos.filter(todo => {
      return !todo.completion;
    });
  },
  completed: function(todos) {
    return todos.filter(todo => {
      return todo.completion;
    });
  }
}

var todosApp = new Vue({
  el: '#todosApp',
  data: {
    input: null,
    todos: todoStorage.fetch() ,
    filterFlag: 'all',
    currentUser: userStorage.getCurrentUser()
  },
  methods: {
    addTodo: function() {
      this.input = this.input && this.input.trim();
      if (!this.input) {
        return;
      }

      var todo = {id:this.todos.length, message:this.input, completion: false,
                  createdDate: new Date(), updatedDate: new Date()};
      this.todos.push(todo);
      this.input = '';
    },
    removeTodo: function(_id) {
      todosApp.todos.splice(_id, 1);
    },
    toggleCompletion: function(_id) {
      todosApp.todos[_id].completion = !todosApp.todos[_id].completion;
    },
    signOut: function() {
      userStorage.flushCurrentUser();
      window.location.href = '/';
    },
    signInPage: function() {
      if(userStorage.getCurrentUser().name)
        return;
      window.location.href = '/login';
    }
  },
  computed: {
    filteredTodos: function() {
      return filters[this.filterFlag](this.todos);
    }
  },
  watch: {
    todos: {
      deep: true,
      handler: todoStorage.save
    }
  }
});
