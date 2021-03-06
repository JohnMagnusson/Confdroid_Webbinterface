/**
 * Logs in the administrator with password and username.
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

/**
 * Log in function.
 * Takes values from the html forms.
 */
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

            $.cookie("userName",username, { path: '/' });
            $.cookie("authCookie", admin.Token, { path: '/' });
            $.cookie("adminIdCookie", admin.id, { path: '/' });
            window.location.replace("web_pages/Admin_Interface.php?activeType=User");
        },
        error: function( jqXHR, textStatus, errorThrown) {
            switch(jqXHR["status"])
            {
                case 401:
                    $("#add_err").html("Wrong username or password");
                    $("#add_err").css('display', 'inline', 'important');
                    break;
                default:
                    console.log("Textstatus: " + textStatus + " ErrorThrown: " + errorThrown + " Status code: " + jqXHR["status"] + " Response text: " + jqXHR["responseText"]);
                    break;
            }
        }
    });
}