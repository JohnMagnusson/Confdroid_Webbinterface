<?php
/**
 * Displays all the setting for either device, user, application
 * Also be able to change information.
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
    <link rel="stylesheet" type="text/css" href="../css/Setting_Page.css">
    <script type="text/javascript" src="../javascript/jquery-3.2.0.min.js"></script>
    <script type="text/javascript" src="../javascript/jquery.cookie.js"></script>
    <script type="text/javascript" src="../javascript/Setting_Page.js"></script>
</head>
<body>

<header>
    <h1>Confdroid Settings</h1>
</header>

<nav>
    <ul id="menu">
        <li class="activeLi"><a href="Setting_Page_Info_User.php">Information</a></li>
        <li><a href="Setting_Page_XML-SQL.php">SQL/XML Settings</a></li>
    </ul>
</nav>

<div id="container">
    <?php include 'Setting_Pages/User_Setting.php';?>
</div>

</body>

</html>



