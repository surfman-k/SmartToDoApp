$(document).ready(function() {

    // Injects data into columns
   $.ajax({
    method: "GET",
    url: "/api/todoList"
  }).done((todolist) => {
    for(let obj of todolist) {
      if (obj.category === 1) {
        if(obj.checked === false ) {
          $(".movies .list-group").prepend(renderToDoElement(obj));
        } else {
          console.log("this works :)")
          $(".movies .done" ).prepend(renderToDoElement(obj));
          console.log("finding?" + $(".list-group .movies .done" ));
        }
      }

      if (obj.category === 2) {
        if(obj.checked === false ) {
          $(".books .list-group").prepend(renderToDoElement(obj));
        } else {
          $(".books .done" ).prepend(renderToDoElement(obj));
        }
      }

      if (obj.category === 3) {
        if(obj.checked === false ) {
          $(".rest .list-group").prepend(renderToDoElement(obj));
        } else {
          $(".rest .done" ).prepend(renderToDoElement(obj));
        }
      }

      if (obj.category === 4) {
        if(obj.checked === false ) {
          $(".product .list-group").prepend(renderToDoElement(obj));
        } else {
          $(".product .done" ).prepend(renderToDoElement(obj));
        }
      }
    }
  });

  // function renderToDoDone(data) {


  //   }

  // }




  function renderToDoElement(data) {



    let $toDoMain = $("<a>").attr("href", "#")
                            .addClass("list-group-item list-group-item-action flex-column align-items-start");
    let $mainContainer = $("<div>").addClass("d-flex w-100 justify-content-between");

    $toDoMain.append($mainContainer);

    let $toDoTitle = $("<h5>").addClass("mb-1").text(data.name);

    $mainContainer.append($toDoTitle);

    let $toDoBy = $("<small>").text(data.completeBy);

    $mainContainer.append($toDoBy);

    let $checkButton = $("<div>").addClass("btn-group").attr("data-toggle", "buttons");
    let $labelButton = $("<label>").addClass("btn btn-success active");
    let $inputButton = $("<input>").attr("type", "checkbox").attr("autocomplete", "off");
    let $buttonSpan = $("<span>").addClass("glyphicon glyphicon-ok");

    $mainContainer.append($checkButton);
    $checkButton.append($labelButton);
    $labelButton.append($inputButton);
    $labelButton.append($buttonSpan);

    let $comment = $("<p>").addClass("mb-1").text(data.comment);

    $toDoMain.append($comment);

    let $creationDate = $("<small>").text(data.createdOn);

    $toDoMain.append($creationDate);

    return $toDoMain;
  }


  let $newToDo = $("#loginB");
  $newToDo.on("click", function(event) {
    event.preventDefault();

  });

  $("#datepicker").datepicker();



  if (!localStorage.user) {
    $('html').css("background-image", "url(/image/bg3.png)");
    $('#newToDo').css('display', 'none');
    $('#logout').css('display', 'none');
  } else {
    $('html').css("background-image", "url(/image/bg2.png)");
    $('#loginB').css('display', 'none');
    $('#regB').css('display', 'none');
  }


  $(".registerLink").on("click", function(event) {
    event.preventDefault();
    $("#id01").css('display', 'none');
    $("#id03").css('display', 'block');
  });

  $("#regB").on("click", function(event) {
    event.preventDefault();
    $("id03").modal('hide');
  });

  //Registration validator

  // $("#registerButton").on("click", function(event) {
  //   event.preventDefault();
  //     let $passwordReg = $("#passwordReg").val();
  //     let $confirmPass = $("#passwordConfirm").val();

  //     if (($passwordReg.length || $confirmPass.length) === 0) {
  //       $.flash("nothing entered")
  //     } else if ($passwordReg !== $confirmPass) {
  //       $.flash("Passwords do not match :(")
  //     } else {
  //       alert("Woo. A match!");
  //     }

  // });

  //AJAX for login form
  $('.loginForm').submit(function(e) {
    e.preventDefault();
    let uname = ($('#username').val());
    let psw = ($('#inputPassword3').val());

    $.ajax({
    type: "POST",
    url: "/login",
    async: true,
    data: {uname: uname, psw: psw}
    })
    .done(function(data){
      if(data.length > 120){
        localStorage.setItem("user", uname);
      } else {
        alert('Please Verify your Credentials!');
      }
    })
    .done(location.reload());
  });

  //AJAX for registration form
  $('.regForm').submit(function(e) {
    e.preventDefault();
    let uname = ($('#reguname').val());
    let psw = ($('#passwordReg').val());

    $.ajax({
    type: "POST",
    url: "/reg",
    async: true,
    data: {uname: uname, psw: psw}
    })
    .done(function(data){
      if(data.length > 120){
        localStorage.setItem("user", uname);
      } else {
        alert('Username already exists!');
      }
    })
    .done(location.reload());
  });

  //AJAX for logout button
  $('#logout').click(function(e) {
    e.preventDefault();
    localStorage.removeItem("user");
    location.reload();
  });


  //AJAX for adding a ToDo Item
  $('.toDoForm').submit(function(e) {
    e.preventDefault();
    let uname = ($('#reguname').val());
    let psw = ($('#passwordReg').val());

    $.ajax({
    type: "POST",
    url: "/newToDo",
    async: true,
    data: {uname: uname, psw: psw}
    })
    .done(localStorage.setItem("user", uname))
    .done(location.reload());
  });




});

