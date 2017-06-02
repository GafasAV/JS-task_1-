//
//
//
var xhttp = new XMLHttpRequest();
var curFromElement = document.getElementById("cur_from");
var curToElement = document.getElementById("cur_to");
var curTextElement = document.getElementById("cur_amount");
var resultElement = document.getElementById("result");

// API URL for loading data...
var URL = "http://api.fixer.io/";
var data;

//function to Load() data from fixer.io...
function loadCurrency() {
    xhttp.open('GET', URL + "latest", true);

    xhttp.send();

    xhttp.onreadystatechange = function() {
        if (xhttp.readyState != 4) return;

        if (xhttp.status != 200) {
            alert(xhttp.status + ': ' + xhttp.statusText);
        } else {
            var response = JSON.parse(xhttp.responseText);
            data = response['rates'];
            var rates = Object.keys(data);

            $(rates).each( function (val, text) {
                $('#cur_from').append(
                    $('<option>').attr('value', text).text(text));
            });

            $(rates).each( function (val, text) {
                $('#cur_to').append(
                    $('<option>').attr('value', text).text(text));
            });

            $('#cur_from').change(function () {
                var cur_text = JSON.stringify(data);

                $('#cur_text').text(cur_text);
            });
        }
    }
}

//Calculate rates from user data input...
function getRates() {
    var from = data[curFromElement.value];
    var to = data[curToElement.value];
    var sum = curTextElement.value;

    if (!sum || sum <= 0){
        sum = 1;
        curTextElement.value = sum;
    }

    var res = Number((+sum * +to / +from).toFixed(4));

    resultElement.value = res;

    $('#cur_result').text(
        sum + " " + curFromElement.value + " = " + res + " " + curToElement.value
    );
}

// Load currency rates when page is loaded
window.onload = function() {
    (() => {
        loadCurrency();
        setInterval(loadCurrency, 1000 * 60);
    })();

    var btn = document.getElementById('run');
    btn.addEventListener("click", getRates);
};
