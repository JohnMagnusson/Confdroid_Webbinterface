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
/* Checks if session variables are set*/
if(isset($_SESSION["dataObject"]) && isset($_SESSION["dataType"]))
{
    printJSONtoJS("dataObject",$_SESSION["dataObject"]);
    echo "<script>var dataType ='" . $_SESSION["dataType"] . "';\n</script>";
}
else
    echo "<script>window.close();</script>";
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Setting Page-Confdroid</title>
    <link rel="icon" href="../images/BrowserIcon.ico">
    <link rel="stylesheet" type="text/css" href="../css/Setting_Page.css">
    <script type="text/javascript" src="../javascript/jquery-3.2.0.min.js"></script>
    <script type="text/javascript" src="../javascript/jquery.cookie.js"></script>
    <script type="text/javascript" src="../javascript/Setting_Page_Info.js"></script>
    <script type="text/javascript" src="../javascript/Api_Calls.js"></script>
</head>
<body>

<header>
    <h1><?php echo $_SESSION["dataType"];?> settings</h1>
</header>

<nav>
    <ul id="menu">
        <?php
        if(!isset($_GET["hiddenMenu"]))
        {
            echo '<a href="Setting_Page_Info.php"><li class="activeLi">Information</li></a>';
            echo '<a href="Setting_Page_XML-SQL.php?settingType=SQL"><li>SQL/XML Settings</li></a>';
        }
        ?>
    </ul>
</nav>
<div id="sqlAndXmlMenu"></div>
<div id="container">
    <?php
    switch ($_SESSION["dataType"]) /*Depending of the dataType then shall the page look different. */
    {                              /*DataType is decided when the user clicks the setting icon.*/
        case"User";
            include 'Setting_Pages/User_Setting.php';
            break;
        case"Device";
            include 'Setting_Pages/Device_Setting.php';
            break;
        case"Group";
            include 'Setting_Pages/Group_Setting.php';
            break;
        case"Application";
            include 'Setting_Pages/Application_Setting.php';
            break;
        case"Variable";
            include 'Setting_Pages/Variable_Setting.php';
            break;
    }
    ?>
</div>
</body>
</html>



