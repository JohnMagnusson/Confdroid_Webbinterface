<!-- Login class. The Administrator enter username and password. -->
<?php

?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Login</title>
    <link rel="stylesheet" type="text/css" href="css/Login.css">        <!-- Adds css file -->
</head>

<body>

    <div id="container">

        <h1 class="text_align_center">Login to interface</h1>

        <div id="loginContainer">

        <p id="LoginErrorTex"></p>
        <form action="http://confdroid.localhost/api/admin/login.json" method="post">

            Username<br>
            <input type="text" name="username" ><br><br>
            Password<br>
            <input type="password" name="password"><br>
            <input type="submit" name="login" value="Login" >

        </form>

        </div>

    </div>


</body>

</html>
