$(document).ready(function() {
  // Injects data into columns
  $.ajax({
    method: 'GET',
    url: '/api/todoList',
  }).done(todolist => {
    for (let obj of todolist) {
      if (obj.user == localStorage.getItem('user')) {
        if (obj.category === 1) {
          if (obj.checked === false) {
            $('.movies .list-group').prepend(renderToDoElement(obj, false));
          } else {
            $('.movies .done').prepend(renderToDoElement(obj, true));
          }
        }
        if (obj.category === 2) {
          if (obj.checked === false) {
            $('.books .list-group').prepend(renderToDoElement(obj, false));
          } else {
            $('.books .done').prepend(renderToDoElement(obj, true));
          }
        }

        if (obj.category === 3) {
          if (obj.checked === false) {
            $('.rest .list-group').prepend(renderToDoElement(obj, false));
          } else {
            $('.rest .done').prepend(renderToDoElement(obj, true));
          }
        }

        if (obj.category === 4) {
          if (obj.checked === false) {
            $('.product .list-group').prepend(renderToDoElement(obj, false));
          } else {
            $('.product .done').prepend(renderToDoElement(obj, true));
          }
        }
      }
    }
  });

  function renderToDoElement(data, boolean) {
    let $toDoMain = $('<a>')
      .attr('href', '#')
      .addClass(
        'list-group-item list-group-item-action flex-column align-items-start'
      )
      .attr('ident', data.id);
    let $mainContainer = $('<div>').addClass(
      'd-flex w-100 justify-content-between'
    );

    $toDoMain.append($mainContainer);

    let $toDoTitle = $('<h5>').addClass('mb-1').text(data.name);

    $mainContainer.append($toDoTitle);

    let $comment = $('<p>').addClass('mb-1').text(data.comment);

    $toDoMain.append($comment);

    let $creationDate = $('<small>').text(data.createdOn.substring(10, -1));

    $toDoMain.append($creationDate);

    if (boolean === true) {
      let $doneContainer = $('<div>');
      let $doneH3 = $('<h3>').text('Done:');
      let $doneDiv = $('<div>').addClass('.finished');

      $doneContainer.append($doneH3);
      $doneDiv.append($toDoMain);
      $doneContainer.append($doneDiv);

      return $doneContainer;
    }

    return $toDoMain;
  }

  let $newToDo = $('#loginB');
  $newToDo.on('click', function(event) {
    event.preventDefault();
  });

  if (!localStorage.user) {
    $('html').css('background-image', 'url(/image/bg3.png)');
    $('#newToDo').css('display', 'none');
    $('#logout').css('display', 'none');
    $('#main').css('opacity', '0');
  } else {
    $('html').css('background-image', 'url(/image/bg2.png)');
    $('#loginB').css('display', 'none');
    $('#regB').css('display', 'none');
  }

  $('.registerLink').on('click', function(event) {
    event.preventDefault();
    $('#id01').css('display', 'none');
    $('#id03').css('display', 'block');
    // $("#id04").css('display', 'block')
  });

  let uniqueElemId;

  $(document).on('click', '.list-group-item', function(event) {
    event.preventDefault();
    uniqueElemId = $(this).attr('ident');
    $('#id04').css('display', 'block');
  });

  //AJAX for login form
  $('.loginForm').submit(function(event) {
    event.preventDefault();
    let uname = $('#username').val();
    let psw = $('#inputPassword3').val();

    $.ajax({
      type: 'POST',
      url: '/login',
      async: true,
      data: { uname: uname, psw: psw },
    }).done(function(data) {
      if (Number.isInteger(data.id)) {
        localStorage.setItem('user', data.id);
        location.reload();
      } else {
        alert('Verify your credentials!');
      }
    });
  });

  //AJAX for registration form
  $('.regForm').submit(function(event) {
    event.preventDefault();
    let uname = $('#reguname').val();
    let psw = $('#passwordReg').val();

    $.ajax({
      type: 'POST',
      url: '/reg',
      async: true,
      data: { uname: uname, psw: psw },
    }).done(function(data) {
      if (Number.isInteger(data[0])) {
        localStorage.setItem('user', data[0]);
        location.reload();
      } else {
        alert('Username already exists!');
      }
    });
  });

  //AJAX for logout button
  $('#logout').click(function(event) {
    event.preventDefault();
    localStorage.removeItem('user');
    location.reload();
  });

  // AJAX for adding a ToDo Item
  $('.toDoForm').submit(function(event) {
    event.preventDefault();
    let tdname = $('#tdname').val();
    let todoUser = localStorage.getItem('user');
    let today = new Date();
    let dateCreated = `${today.getFullYear()}-${today.getMonth() +
      1}-${today.getDate()}`;
    let commentInput = $('#commentInput').val();

    $.ajax({
      type: 'POST',
      url: '/newToDo',
      async: false,
      data: {
        name: tdname,
        user: todoUser,
        category: 3,
        createdOn: dateCreated,
        comment: commentInput,
        checked: false,
      },
    }).done(location.reload());
  });

  let editCategory;
  $('#categoryChanger a').on('click', function(event) {
    event.preventDefault();
    editCategory = $(this).attr('value');
  });

  // AJAX for Edit Form
  $('#editSubmit').on('click', function(event) {
    event.preventDefault();
    let commentEdit = $('#commentEdit').val();

    $.ajax({
      type: 'POST',
      url: '/editToDo',
      async: false,
      data: { id: uniqueElemId, category: editCategory, comment: commentEdit },
    }).done(location.reload());
  });

  // AJAX for Delete
  $('#deleteElem').on('click', function(event) {
    event.preventDefault();

    $.ajax({
      type: 'POST',
      url: '/delete',
      async: false,
      data: { id: uniqueElemId },
    }).done(location.reload());
  });
});
