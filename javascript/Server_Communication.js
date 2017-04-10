/**
 * Sends commands to the API to retreive deisred information.
 */

/**
 * Simple hello world
 */
function helloWorld()
{
    var name = document.getElementById("name").value;
    alert("Hello " + name + " and HELLO WORLD!");
}

function searchName()
{
    var name = document.getElementById("name").value;
}

function checkFields() {

    alert("g");
    if (document.getElementById("username").value == '') {
        document.getElementById("username").onfocus();
        document.getElementById("LoginErrorTex").innerHTML = "Username field is empty";
    }
    if (document.getElementById("password").value == '') {
        document.getElementById("password").onfocus();
        document.getElementById("LoginErrorTex").innerHTML = "Password field is empty";
    }

}