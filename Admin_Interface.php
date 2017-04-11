<?php
/**
 * Interface for the admin to manage the system.
 */

session_start();
if(isset($_GET['authToken']) && isset($_GET['id']))
{
    echo authorizeCheck($_GET['authToken'], $_GET['id']);

}
else
    header("Location: http://localhost:63342/Confdroid_Webbinterface/Login.php");
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Welcome</title>
    <link rel="stylesheet" type="text/css" href="css/Admin_Interface.css">        <!-- Adds css file -->
</head>

<body>

<div id="container">

    <h1 class="text_align_center">Admin interface</h1>


<script src="javascript/jquery-3.2.0.min.js"></script>
<script src="javascript/Server_Communication.js"></script>

</body>

</html>



