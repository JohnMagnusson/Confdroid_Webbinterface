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
            url: "http://confdroid.localhost/api/admin/login.json",
            data: "username="+username+"&password="+password,
            success: function(json){
                console.log(json);
                var user = JSON.parse(json);
                // console.log(user.Token);

                if(user.Token!="Failed")
                {
                    $("#add_err").html("right username or password");
                    $("#add_err").css('display', 'inline', 'important');
                    window.location.replace("http://web.localhost/Admin_Interface.php?authToken="+user.Token+"&id="+user.id);
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