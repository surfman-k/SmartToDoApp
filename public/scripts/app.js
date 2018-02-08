// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(let user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });
// });

$(document).ready(function() {

  function renderToDo(incoming) {
    for (let i = 1; i < 10; i++) {
      // console.log($(".movies .list-group"));
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

  renderToDo();

});
