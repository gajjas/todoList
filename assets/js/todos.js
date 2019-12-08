var storedTodos = JSON.parse(localStorage.getItem("todos"));
var newTodoList = [];
count = 0;

function Todo() {
    this.input = "";
}

if (storedTodos != null) {
    storedTodos.forEach(function (todo, index) {
        count++;
        newTodoList.push(todo);
        $("ul").append("<li><span id='" + index + "'><i class='fas fa-trash-alt'></i></span> " + todo.input + "</li>")
        $(this).val("");
    });
}


//Check off todos by clicking
$("ul").on("click", "li", function () {
    $(this).toggleClass('completed');
});

//Delete TODO
$("ul").on("click", "span", function (event) {
    $(this).parent().fadeOut('500', function () {
        var index = parseInt($(this).attr("id"));
        newTodoList.splice(index, 1);
        $(this).remove();
    });
    event.stopPropagation();
});

//Creation of New Todos
$("input[type='text']").keypress(function (event) {
    if (event.which === 13) {
        var t = new Todo();
        var inputText = $(this).val();
        t.input = inputText;
        newTodoList.push(t);
        count++;
        $("ul").append("<li><span id='" + count + "'><i class='fas fa-trash-alt'></i></span> " + inputText + "</li>")
        $(this).val("");
    }
});

// Fading Input Bar In or Out
$(".fa-pencil-alt").click(function () {
    $("input[type='text']").fadeToggle();
});

window.addEventListener('beforeunload', function (e) {
    localStorage.setItem("todos", JSON.stringify(newTodoList));
    e.preventDefault();
    e.returnValue = '';
});