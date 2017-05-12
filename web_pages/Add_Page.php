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
/**
 * Creates a javascriptObject from PhpJsonObject
 * @param $jsVarName
 * @param $phpObject
 */
function printJSONtoJS($jsVarName, $phpObject)
{
    echo "<script>";
    $javascriptJson = json_encode($phpObject);
    $javascriptJson = str_replace( "\0", "\\u0000", addcslashes( $javascriptJson, "\t\r\n\"\\" ) );
    echo "var decodedData = '" . $javascriptJson . "';\n";
    echo "var $jsVarName =JSON.parse(decodedData);\n";
    echo "</script>";
}
if(isset($_SESSION["dataObject"]) && isset($_SESSION["dataType"]))
{
    printJSONtoJS("dataObject",$_SESSION["dataObject"]);
    echo "<script>";
    echo "var dataType ='" . $_SESSION["dataType"] . "';";
    echo "var dataTypeToAdd ='" . $_SESSION["dataTypeToAdd"] . "';";
    echo "var currentPage ='" . $_GET["pageName"] . "';";
    echo "</script>";
}
else if(isset($_GET["pageName"]) && isset($_SESSION["dataTypeToAdd"]))
{
    echo "<script>";
    echo "var dataTypeToAdd ='" . $_SESSION["dataTypeToAdd"] . "';";
    echo "var currentPage ='" . $_GET["pageName"] . "';";
    echo "</script>";
}


?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Welcome</title>
    <link rel="icon" href="../images/BrowserIcon.ico">
    <link rel="stylesheet" type="text/css" href="../css/Add_Page.css">
    <script type="text/javascript" src="../javascript/jquery-3.2.0.min.js"></script>
    <script type="text/javascript" src="../javascript/jquery.cookie.js"></script>
    <script type="text/javascript" src="../javascript/Add_Page.js"></script>
    <script type="text/javascript" src="../javascript/HandleFormData.js"></script>
    <script type="text/javascript" src="../javascript/Admin_Interface.js"></script>
    <script type="text/javascript" src="../javascript/Api_Calls.js"></script>
</head>
<body>

    <header>
        <h1>Confdroid Settings</h1>
    </header>

    <nav>
        <ul id="menu" class="<?php print_r($_GET["hidden"])?>">
            <a href="Add_Page.php?pageName=Add_Existing"><li id="Add_Existing">Add existing <?php print_r($_SESSION["dataTypeToAdd"]." to ".$_SESSION["dataObject"]["name"])?></li></a>
            <a href="Add_Page.php?pageName=Add_New"><li id="Add_New">Add new <?php print_r($_SESSION["dataTypeToAdd"]." to ".$_SESSION["dataObject"]["name"])?></li></a>
        </ul>
    </nav>

    <div id="container">
        <?php include 'Setting_Pages/'.$_GET["pageName"].'.php';?>
    </div>

</body>

</html>



