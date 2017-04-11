/**
 * Sends commands to the API to retrieve desired information.
 */

// function helloWorld()
// {
//     var name = document.getElementById("name").value;
//     alert("Hello " + name + " and HELLO WORLD!");
// }
//
// function searchName()
// {
//     var name = document.getElementById("name").value;
// }
//
// function checkFields() {
//
//     alert("g");
//     if (document.getElementById("username").value == '') {
//         document.getElementById("username").onfocus();
//         document.getElementById("LoginErrorTex").innerHTML = "Username field is empty";
//     }
//     if (document.getElementById("password").value == '') {
//         document.getElementById("password").onfocus();
//         document.getElementById("LoginErrorTex").innerHTML = "Password field is empty";
//     }

// }

$('document').ready(function(){
    $("#login").click(function(){
       var username=$("#username").val();
        var password=$("#password").val();
        $.ajax({
            type: "POST",
            url: "http://confdroid.localhost/api/admin/login.json",
            data: "username="+username+"&password="+password,
            success: function(html){
                console.log(html);

                if(html!="\"Failed login\"")
                {
                    $("#add_err").html("right username or password");
                    $("#add_err").css('display', 'inline', 'important');
                    var token = html.split("\"");
                    window.location.replace("http://localhost:63342/Confdroid_Webbinterface/Admin_Interface.php?authToken="+token[1]);
                }
                else
                {
                    $("#add_err").html("Wrong username or password");
                    $("#add_err").css('display', 'inline', 'important');
                }
            }
        });
        return false;
    });
});