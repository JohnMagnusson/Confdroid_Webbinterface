<?php
/**
 * The admin can delete things. Maybe not needed
 */
if (isset($_GET['authToken']) && isset($_GET['id']))
{
    echo "<script>";
    echo "var token='" . $_GET["authToken"] . "';";
    echo "var id ='" . $_GET["id"] . "';";
    echo "</script>";
}
else
    header("Location:http://web.localhost/Login.php");
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

        <li><a href="Interface_Add.php" id="addLink">Add</a></li>

        <li><a href="Interface_Delete.php" id="deleteLink" class="current">Delete</a></li>
    </ul>
</nav>
<div id="container">


</div>

<footer>

    <h1>Template text</h1>

</footer>

</body>

</html>

