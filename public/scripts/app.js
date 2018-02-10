

$(document).ready(function() {

  const todos = [];

$(() => {
  $.ajax({
    method: "GET",
    url: "/api/todoList"
  }).done((todolist) => {
    for(let obj of todolist) {
      todos.push(obj);
      //console.log(obj);
   }
});

  console.log(todos);


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
    .done(localStorage.setItem("user", uname))
    .done(location.reload());
  });

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
    .done(localStorage.setItem("user", uname))
    .done(location.reload());
  });

   $('#logout').click(function(e) {
    e.preventDefault();
    localStorage.removeItem("user");
    location.reload();
  });


  function renderToDo(incoming) {
    for (let i = 1; i < 2; i++) {
      $(".movies .list-group").append(createToDoElement());
      $(".books .list-group").append(createToDoElement());
      $(".rest .list-group").append(createToDoElement());
      $(".product .list-group").append(createToDoElement());
    }

  }


  function createToDoElement(cb) {
    let $toDoMain = $("<a>").attr("href", "#")
                            .addClass("list-group-item list-group-item-action flex-column align-items-start");
    let $mainContainer = $("<div>").addClass("d-flex w-100 justify-content-between");

    $toDoMain.append($mainContainer);

    let $toDoTitle = $("<h5>").addClass("mb-1").text("To Do Item Works!");

    $mainContainer.append($toDoTitle);

    let $toDoBy = $("<small>").text("The due date will come here");

    $mainContainer.append($toDoBy);

    let $checkButton = $("<div>").addClass("btn-group").attr("data-toggle", "buttons");
    let $labelButton = $("<label>").addClass("btn btn-success active");
    let $inputButton = $("<input>").attr("type", "checkbox").attr("autocomplete", "off");
    let $buttonSpan = $("<span>").addClass("glyphicon glyphicon-ok");

    $mainContainer.append($checkButton);
    $checkButton.append($labelButton);
    $labelButton.append($inputButton);
    $labelButton.append($buttonSpan);

    let $comment = $("<p>").addClass("mb-1").text("Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit");

    $toDoMain.append($comment);

    let $creationDate = $("<small>").text("Date of creation here");

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

  // Login Validator

  renderToDo();

});
});

