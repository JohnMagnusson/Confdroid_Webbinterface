<?php
/**
 * Created by IntelliJ IDEA.
 * User: Elias
 * Date: 2017-05-09
 * Time: 14:59
 */
/*Starts session if not already started */
if(!isset($_SESSION))
{
    session_start();
}
if(isset($_SESSION["dataObject"]) && isset($_SESSION["dataType"]))
{
//    var_dump($_SESSION["dataObject"]["name"]);
//    var_dump($_SESSION["dataObject"]);
//    var_dump($_SESSION["dataType"]);
}


?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Welcome</title>
    <link rel="icon" href="../images/BrowserIcon2.ico">
    <link rel="stylesheet" type="text/css" href="../css/Add_Page.css">
    <script type="text/javascript" src="../javascript/jquery-3.2.0.min.js"></script>
    <script type="text/javascript" src="../javascript/jquery.cookie.js"></script>
    <script type="text/javascript" src="../javascript/Add_Page.js"></script>
</head>
<body>

<header>
    <h1>Confdroid Settings</h1>
    <div id="searchField">
        <input type="search" id="searchValue" name="searchValue" placeholder="Search..">

        <input type="button" name="searchBtn" value="Search" onclick="search()">
    </div>
</header>

<div id="container">
    <?php include 'Setting_Pages/Add.php';?>
</div>

</body>

</html>



