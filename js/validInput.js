document.addEventListener("DOMContentLoaded", function() {
let form = document.getElementById("dataForm");
let inputs = form.querySelectorAll("input");

inputs.forEach(function(input, index) {
    input.addEventListener("keypress", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        let nextIndex = index + 1;
        if (nextIndex < inputs.length) {
        inputs[nextIndex].focus();
        } else {
        inputs[0].focus();
        }
    }
    });
});
});

document.querySelectorAll('input[data-autotab]').forEach(function(input) {
    input.addEventListener('keyup', function() {
        if (this.getAttribute('maxlength')) {
            if (this.value.length >= parseInt(this.getAttribute('maxlength'))) {
                var inputs = document.querySelectorAll('input');
                var index = Array.prototype.indexOf.call(inputs, this);
                inputs[index + 1].focus();

            }
        }
    });
});

// function ajouterLigneSurEntree(event) {
//     if (event.key === "Enter") {
//         ajouterLigne();
//     }
// }

// document.addEventListener("keydown", ajouterLigneSurEntree);

