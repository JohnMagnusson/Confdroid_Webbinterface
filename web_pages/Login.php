<!-- Login class. The Administrator enter username and password. -->
<?php



?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Login</title>
    <link rel="stylesheet" type="text/css" href="../css/Login.css">        <!-- Adds css file -->
</head>

<body>

    <div id="container">

        <h1 class="text_align_center">Login to interface</h1>

        <div id="loginContainer">

            <p id="add_err"></p>
            <form action="../" method="post">

                Username<br>
                <input type="text" name="username" id="username"><br><br>
                Password<br>
                <input type="password" name="password" id="password"><br>
                <input type="hidden" name="mysession" id="mysession">
                <input type="button" name="login" value="Login" id="login" >

            </form>
        </div>

    </div>

<script src="../javascript/jquery-3.2.0.min.js"></script>
<script type="text/javascript" src="../javascript/jquery.cookie.js"></script>
<script src="../javascript/Login.js"></script>
</body>
</html>
