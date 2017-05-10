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
    $_SESSION["dataObject"] = json_encode($_SESSION["dataObject"]);
    echo "<script>";
    echo "var dataType ='" . $_SESSION["dataType"] . "';";
    echo "var dataTypeToAdd ='" . $_SESSION["dataTypeToAdd"] . "';";
    echo "var dataObject ='" . $_SESSION["dataObject"] . "';";
    echo "</script>";
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
    <script type="text/javascript" src="../javascript/Admin_Interface.js"></script>
</head>
<body>

    <header>
        <h1>Confdroid Settings</h1>
    </header>

    <nav>
        <ul id="menu">
            <li class="activeLi"><a href="Add_Page_Info.php">Add existing <?php print_r($_SESSION["dataTypeToAdd"]." to ".$_SESSION["dataType"])?></a></li>
            <li><a href="Setting_Page_XML-SQL.php">Add new <?php print_r($_SESSION["dataTypeToAdd"]." to ".$_SESSION["dataType"])?></a></li>
        </ul>
    </nav>

    <div id="container">
        <?php include 'Setting_Pages/Add.php';?>
    </div>

</body>

</html>



