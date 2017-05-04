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
            url: "https://confdroid.tutus.se/api/admin/login.json",
            data: "username="+username+"&password="+password,
            success: function(admin){
                console.log(admin);

                if(admin.Token!="Failed")
                {
                    $("#add_err").html("Correct username and password");
                    $("#add_err").css('display', 'inline', 'important');
                    $.cookie("authCookie", admin.Token);
                    $.cookie("adminIdCookie", admin.id);
                    window.location.replace("/Confdroid_Webbinterface/Admin_Interface.php");
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