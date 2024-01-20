$.ajaxSetup({
    headers: {
      'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    }
  });

 $(document).ready(function() {

  var getAndDisplayAllTasks = function() {
      $.ajax({
          type: 'GET',
          url: 'api/tasks?api_key=1',
          dataType: 'json',
          success: function(response, textStatus) {
              $('#todo-list').empty();
              var filteredTasks = response.tasks.filter(function(task) {
                  return true;
              })
              filteredTasks.forEach(function(task) {
                  $('#todo-list').prepend('<div class="row d-flex"><div class="p-2"><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '></div><div class="p-2"><p class="col-xs-8">' + task.content + '</p></div><div class="ml-auto p-2"><button class="delete" data-id="' + task.id + '"><i class="fas fa-trash" aria-hidden="true"></i></button></div></div><hr>');
              });


              $("#all").click(function(event) {
                  event.preventDefault();
                  $('#todo-list').empty();
                  var filteredTasks = response.tasks.filter(function(task) {
                      return true;
                  })
                  filteredTasks.forEach(function(task) {
                      $('#todo-list').prepend('<div class="row d-flex"><div class="p-2"><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '></div><div class="p-2"><p class="col-xs-8">' + task.content + '</p></div><div class="ml-auto p-2"><button class="delete" data-id="' + task.id + '"><i class="fas fa-trash" aria-hidden="true"></i></button></div></div><hr>');
                  });
              });

              $("#completed").click(function(event) {
                  event.preventDefault();

                  $('#todo-list').empty();
                  var filteredTasks = response.tasks.filter(function(task) {
                      return task.completed === true;
                  })
                  filteredTasks.forEach(function(task) {
                      $('#todo-list').prepend('<div class="row d-flex"><div class="p-2"><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '></div><div class="p-2"><p class="col-xs-8">' + task.content + '</p></div><div class="ml-auto p-2"><button class="delete" data-id="' + task.id + '"><i class="fas fa-trash" aria-hidden="true"></i></button></div></div><hr>');
                  });
              });

              $("#active").click(function(event) {
                  event.preventDefault();
                  $('#todo-list').empty();
                  var filteredTasks = response.tasks.filter(function(task) {
                      return task.completed === false;
                  })
                  filteredTasks.forEach(function(task) {
                      $('#todo-list').prepend('<div class="row d-flex"><div class="p-2"><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '></div><div class="p-2"><p class="col-xs-8">' + task.content + '</p></div><div class="ml-auto p-2"><button class="delete" data-id="' + task.id + '"><i class="fas fa-trash" aria-hidden="true"></i></button></div></div><hr>');
                  });
              });


          },
          error: function(request, textStatus, errorMessage) {
              console.log(errorMessage);
          }
      });
  }

  var createTask = function() {
      $.ajax({
          type: 'POST',
          url: 'api/tasks?api_key=1',
          contentType: 'application/json',
          dataType: 'json',
          data: JSON.stringify({
              task: {
                  content: $('#new-task-content').val()
              }
          }),
          success: function(response, textStatus) {
              $('#new-task-content').val('');
              getAndDisplayAllTasks();
          },
          error: function(request, textStatus, errorMessage) {
              console.log(errorMessage);
          }
      });
  }

  $('#create-task').on('submit', function(e) {
      e.preventDefault();
      createTask();
  });

  getAndDisplayAllTasks();


  var deleteTask = function(id) {
      $.ajax({
          type: 'DELETE',
          url: 'api/tasks/' + id + '?api_key=1',
          success: function(response, textStatus) {
              getAndDisplayAllTasks();
          },
          error: function(request, textStatus, errorMessage) {
              console.log(errorMessage);
          }
      });
  }

  $(document).on('click', '.delete', function() {
      deleteTask($(this).data('id'));
  });

  var markTaskComplete = function(id) {
      $.ajax({
          type: 'PUT',
          url: 'api/tasks/' + id + '/mark_complete?api_key=1',
          dataType: 'json',
          success: function(response, textStatus) {
              getAndDisplayAllTasks();
          },
          error: function(request, textStatus, errorMessage) {
              console.log(errorMessage);
          }
      });
  }

  $(document).on('change', '.mark-complete', function() {
      if (this.checked) {
          markTaskComplete($(this).data('id'));
      } else {
          markTaskActive($(this).data('id'));

      }

  });

  var markTaskActive = function(id) {
      $.ajax({
          type: 'PUT',
          url: 'api/tasks/' + id + '/mark_active?api_key=1',
          dataType: 'json',
          success: function(response, textStatus) {
              getAndDisplayAllTasks();
          },
          error: function(request, textStatus, errorMessage) {
              console.log(errorMessage);
          }
      });
  }

});


