<?php
/**
 * Displays XML and SQL Setting for the choosen element
 */
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
/* Checks if sessions variables are set and necessary get variables*/
if(isset($_SESSION["dataObject"]) && isset($_SESSION["dataType"]) && $_GET["settingType"])
{
    printJSONtoJS("dataObject",$_SESSION["dataObject"]);
    echo "<script>var dataType ='" . $_SESSION["dataType"] . "';\n</script>";
    echo "<script>var settingType ='" . $_GET["settingType"] . "';\n</script>";
}

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
    <script type="text/javascript" src="../javascript/Setting_Page_XmlSql.js"></script>
    <script type="text/javascript" src="../javascript/Api_Calls.js"></script>
</head>
<body>

<header>
    <h1><?php echo $_GET["settingType"];?> Settings</h1>
</header>

<nav>
    <ul id="menu">
        <a href="Setting_Page_Info.php"><li>Information</li></a>
        <a href="Setting_Page_XML-SQL.php?settingType=SQL"><li class="activeLi">SQL/XML Settings</li></a>
    </ul>
</nav>
<div id="sqlAndXmlMenu">                    <!--sqlAndXmlMenu menu-->
    <ul>
        <a href="Setting_Page_XML-SQL.php?settingType=SQL"><li id="liSQL">SQL</li></a>
        <a href="Setting_Page_XML-SQL.php?settingType=XML"><li id="liXML">XML</li></a>
    </ul>
</div>
<div id="container">                            <!--Contains all-->
    <div id="settingMenu">                      <!--Contains left side which is setting side-->
        <div id="applicationContainer">         <!--All application is displayed here-->
            <?php
                if($_SESSION["dataType"] == "Application")
                {
                    echo '<p id="app0" class="textSettingMenu" onclick="updateSqlXmlMenu(event, \''.$_GET["settingType"].'\',dataObject)">';
                    echo '<script>$(\'document\').ready(function(){$(\'#app0\').click()});</script>';
                    echo $_SESSION["dataObject"]["name"];
                    echo '</p>';
                }
                else
                {
                    if (sizeof($_SESSION["dataObject"]["applications"]) >= 1)        /*Checks if the object have applications */ {
                        for ($i = 0; $i < sizeof($_SESSION["dataObject"]["applications"]); $i++) {
                            echo '<p id="app' . $i . '" class="textSettingMenu" onclick="updateSqlXmlMenu(event, \'' . $_GET["settingType"] . '\',dataObject[\'applications\'][' . $i . '])">';
                            echo $_SESSION["dataObject"]["applications"][$i]["name"];
                            echo '</p>';
                        }
                    }
                    else
                    {
                        echo "This ";
                        echo $_SESSION["dataType"];
                        echo " have no applications";
                    }
                }
            ?>
        </div>
        <div id="settingContainer">             <!--Which setting to choose -->
        </div>
    </div>
    <div id="textAreaContainer">                <!--TextArea container-->
        <?php
            if($_GET["settingType"] == "SQL")   /*Includes diffrent forms depending on which settingType the user want*/
            {
                include 'Setting_Pages/Sql_Setting.php';
            }
            else
                include 'Setting_Pages/Xml_Setting.php';
        ?>
    </div>
    <div id="settingMenuBtnDiv">                <!--Container for the save button -->
        <img src="../images/Add-icon.png" alt="Add-icon" class="addIcon" id="addBtn" style="visibility: hidden" onclick="redirectToAddPage('<?php echo $_GET["settingType"]; ?>')">
        <p id="errorField"></p>
        <button style="visibility: hidden" id="updateBtn" onclick="updateSetting()">Save</button>
    </div>
</div>
</body>
</html>



