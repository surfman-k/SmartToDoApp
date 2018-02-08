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

if (!localStorage.logged) {
    $('#newToDo').css('display', 'none');
    $('#logout').css('display', 'none');
} else {
    $('#loginB').css('display', 'none');
    $('#regB').css('display', 'none');
}

});