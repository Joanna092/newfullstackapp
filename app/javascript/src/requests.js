import $ from 'jquery';

$.ajaxSetup({
  headers: {
    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
  }
});


export var indexTasks = function (successCB, errorCB) {
  var request = {
    type: 'GET',
    url: 'api/tasks?api_key=1',
    success: successCB,
    error: errorCB
  }

  $.ajax(request);
};

 
{/* 
 export var getAndDisplayAllTasks = function() {
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

*/}


export var postTask = function (content, successCB, errorCB) {
  var request = {
    type: 'POST',
    url: 'api/tasks?api_key=1',
    data: {
      task: {
        content: content
      }
    },
    success: successCB,
    error: errorCB
  }

  $.ajax(request);
};