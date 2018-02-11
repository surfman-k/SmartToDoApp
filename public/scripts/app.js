$(document).ready(function() {

    // Injects data into columns
   $.ajax({
    method: "GET",
    url: "/api/todoList"
  }).done((todolist) => {
    for(let obj of todolist) {
      if(obj.user == localStorage.getItem("user")){
        if (obj.category === 1) {
          if(obj.checked === false ) {
            $(".movies .list-group").prepend(renderToDoElement(obj, false));
          } else {
            $(".movies .done" ).prepend(renderToDoElement(obj, true));
          }
        }
          if (obj.category === 2) {
            if(obj.checked === false ) {
              $(".books .list-group").prepend(renderToDoElement(obj, false));
            } else {
              $(".books .done" ).prepend(renderToDoElement(obj, true));
            }
          }

          if (obj.category === 3) {
            if(obj.checked === false ) {
              $(".rest .list-group").prepend(renderToDoElement(obj, false));
            } else {
              $(".rest .done" ).prepend(renderToDoElement(obj, true));
            }
          }

          if (obj.category === 4) {
            if(obj.checked === false ) {
              $(".product .list-group").prepend(renderToDoElement(obj, false));
            } else {
              $(".product .done" ).prepend(renderToDoElement(obj, true));
            }
          }
        }
      }
    });

  function renderToDoElement(data, boolean) {

    let $toDoMain = $("<a>").attr("href", "#")
                            .addClass("list-group-item list-group-item-action flex-column align-items-start")
                            .attr("ident", data.id);
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

    if (boolean === true) {

      let $doneContainer = $("<div>");
      let $doneH3 = $("<h3>").text("Done:");
      let $doneDiv = $("<div>").addClass(".finished");

      $doneContainer.append($doneH3);
      $doneDiv.append($toDoMain);
      $doneContainer.append($doneDiv);

      return $doneContainer;
    }

    // Edit buttons
      // let $editButton = $("<button>").attr({
      // type: 'submit',
      // class: 'btn btn-default btn-sm'})
      // .text("update")
      // .addClass('Testing');

      // let $testDiv = $("<div>").addClass('testingDiv')

      // $testDiv.append($editButton).hide();
      // $toDoMain.append($testDiv);

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
    $('#main').css('opacity', '0');
  } else {
    $('html').css("background-image", "url(/image/bg2.png)");
    $('#loginB').css('display', 'none');
    $('#regB').css('display', 'none');
  }


  $(".registerLink").on("click", function(event) {
    event.preventDefault();
    $("#id01").css('display', 'none');
    $("#id03").css('display', 'block');
    // $("#id04").css('display', 'block')
  });

  $(document).on("click", ".list-group-item", function(event) {
    event.preventDefault();
    console.log("BOO!");
    $("#id04").css('display', 'block')
  });


  // Edit comment

  // $("p .mb-1").on("click", function() {
  //     let $this = $(this);
  //     let $input = $('<input>', {
  //         value: $this.text(),
  //         type: 'text',
  //         blur: function() {
  //            $this.text(this.value);
  //         },
  //         keyup: function(e) {
  //            if (e.which === 13) $input.blur();
  //         }
  //     }).appendTo($this.empty()).focus();
  // });


  // //Expand element
  // $(document).on("click", ".list-group-item", function(event) {

  //   if ($(this).height() !== 250) {
  //         $(this).animate({ height: 250 }, 1000 );
  //         $('.TestingDiv').show();
  //   event.preventDefault();
  //       }
  //   else {
  //         $( this ).animate({ height: 124.5 }, 1000 );
  //       }
  // });

  // $("#regB").on("click", function(event) {
  //   event.preventDefault();
  //   $("id03").modal('hide');
  // });

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
  $('.loginForm').submit(function(event) {
    event.preventDefault();
    let uname = ($('#username').val());
    let psw = ($('#inputPassword3').val());

    $.ajax({
    type: "POST",
    url: "/login",
    async: true,
    data: {uname: uname, psw: psw}
    })
    .done(function(data){
      if(Number.isInteger(data.id)){
        localStorage.setItem('user', data.id);
        location.reload();
      } else {
        alert("Verify your credentials!");
      }
    });
  });

  //AJAX for registration form
   $('.regForm').submit(function(event) {
    event.preventDefault();
    let uname = ($('#reguname').val());
    let psw = ($('#passwordReg').val());

    $.ajax({
    type: "POST",
    url: "/reg",
    async: true,
    data: {uname: uname, psw: psw}
    })
    .done(function(data){
      if(Number.isInteger(data[0])){
        localStorage.setItem("user", data[0]);
        location.reload();
      } else {
        alert('Username already exists!');
      }
    });
  });

  //AJAX for logout button
   $('#logout').click(function(event) {
    event.preventDefault();
    localStorage.removeItem("user");
    location.reload();
  });


  // AJAX for adding a ToDo Item
   $('.toDoForm').submit(function(event) {
    event.preventDefault();
    let tdname = ($('#tdname').val());
    let todoUser = localStorage.getItem("user");
    let today = new Date();
    let dateCreated = (`${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`);
    let commentInput = $("#commentInput").val();

    $.ajax({
    type: "POST",
    url: "/newToDo",
    async: false,
    data: {name: tdname, user: todoUser, category: 3, createdOn: dateCreated, completeBy: dateCreated, comment: commentInput, checked: false}
    })
    .done(location.reload());
  });

   //


});
