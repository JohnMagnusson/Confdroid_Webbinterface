<?php
/**
 * On this page can the admin add an user, Device, App.
 */

if (isset($_GET['authToken']) && isset($_GET['id']))
{
    echo "<script>";
    echo "var token='" . $_GET["authToken"] . "';";
    echo "var id ='" . $_GET["id"] . "';";
    echo "</script>";
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
    <script src="javascript/jquery-3.2.0.min.js"></script>
    <script src="javascript/Admin_Interface.js"></script>
</head>

<body onload="authorizeCheck(token,id)">

<header>
    <h1 class="text_align_center"><a href="Admin_Interface.php" id="adminLink">Admin interface</a></h1>
</header>

<nav>
    <ul>
        <li><a href="Interface_Search.php" id="searchLink">Search</a></li>

        <li><a href="Interface_Add.php" id="addLink" class="current">Add</a></li>

        <li><a href="Interface_Delete.php" id="deleteLink">Delete</a></li>
    </ul>
</nav>
<div id="container">


</div>

<footer>

    <h1>Template text</h1>

</footer>

</body>

</html>

