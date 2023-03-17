$("h1").addClass("big-title margin-50"); 

$(document).keydown(function(event) {
    $("h1").text(event.key); 
});
