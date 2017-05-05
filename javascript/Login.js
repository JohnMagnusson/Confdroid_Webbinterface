/**
 * Logs in the administrator with password and username.
 * Returns on fail: Failed to login
 * Returns on succes: authToken in JSON
 */
$('document').ready(function(){
    $("#login").click(function(){
        var username=$("#username").val();
        var password=$("#password").val();
        $.ajax({
            type: "POST",
            url: "https://confdroid.brainstorm-labs.net/api/admin/login.json",
            data: "username="+username+"&password="+password,
            success: function(admin){
                console.log(admin);

                if(admin.Token!="Failed")
                {
                    $("#add_err").html("Correct username and password");
                    $("#add_err").css('display', 'inline', 'important');
                    $.cookie("userName",username);
                    $.cookie("authCookie", admin.Token);
                    $.cookie("adminIdCookie", admin.id);
                    window.location.replace("/Confdroid_Webbinterface/web_pages/Admin_Interface.php?activeType=User");
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