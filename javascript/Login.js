/**
 * Logs in the administrator with password and username.
 * Returns on fail: Failed to login
 * Returns on success: authToken in JSON
 */
$(document).ready(function(){
    document.getElementById('password').addEventListener('keydown', function(e) {
        if(e.keyCode === 13)
        {
            e.preventDefault();
            logIn();
        }
    }, false);
});

function logIn()
{
    var username=$("#username").val();
    var password=$("#password").val();

    $.ajax({
        type: "POST",
        url: standardUrl+"admin/login.json",
        data: "username="+username+"&password="+password,
        success: function(admin){
            console.log(admin);

            if(admin.Token!=="Failed")
            {
                $("#add_err").html("Correct username and password");
                $("#add_err").css('display', 'inline', 'important');
                $.cookie("userName",username, { path: '/' });
                $.cookie("authCookie", admin.Token, { path: '/' });
                $.cookie("adminIdCookie", admin.id, { path: '/' });
                window.location.replace("web_pages/Admin_Interface.php?activeType=User");
            }
            else
            {
                $("#add_err").html("Wrong username or password");
                $("#add_err").css('display', 'inline', 'important');
            }
        }
    });
}