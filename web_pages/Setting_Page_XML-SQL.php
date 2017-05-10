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

if(isset($_SESSION["dataObject"]) && isset($_SESSION["dataType"]))
{
    printJSONtoJS("dataObject",$_SESSION["dataObject"]);
    echo "<script>var dataType ='" . $_SESSION["dataType"] . "';\n</script>";
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

    <script type="text/javascript" src="../javascript/Setting_Page_XmlSql.js"></script>

    <script>
        function hej() {
            console.log(dataObject);
        }

    </script>
</head>
<body onload="hej()">

<header>
    <h1>Confdroid Settings</h1>
</header>

<nav>
    <ul id="menu">
        <li><a href="Setting_Page_Info.php">Information</a></li>
        <li class="activeLi"><a href="Setting_Page_XML-SQL.php">SQL/XML Settings</a></li>
    </ul>
</nav>

<div id="sqlAndXmlMenu">                    <!--sqlAndXmlMenu meunu-->
    <ul>
        <li id="liSQL" class="activeSqlXml">SQL</li>
        <li id="liXML">XML</li>
    </ul>
</div>
<div id="container">                            <!--Contains all-->
    <div id="settingMenu">                      <!--Contains left side which is setting side-->
        <div id="applicationContainer">         <!--All application is displayed here-->
            <?php
                if(sizeof($_SESSION["dataObject"]["applications"]) >= 1)        /*Checks if the object have applications */
                {
                    for ($i = 0; $i < sizeof($_SESSION["dataObject"]["applications"]); $i++)
                    {
                        echo '<p id="appName' . $i . '" class="textSettingMenu" onclick="updateSqlXmlMenu(\'SQL\',dataObject["applications"])">';
//                        echo '<p id="appName' . $i . '" class="textSettingMenu" onclick="updateSqlXmlMenu(\'SQL\','.$_SESSION["dataObject"]["applications"][$i].')">';
                        echo $_SESSION["dataObject"]["applications"][$i]["name"];
                        echo '</p>';
                    }
                }
                else
                {
                    echo "This "; echo $_SESSION["dataType"]; echo  " have no applications";
                }
            ?>
        </div>
        <div id="settingContainer">             <!--Which setting to choose -->

        </div>
    </div>

    <div id="textAreaContainer">                <!--TextArea container-->
        <textarea id="textArea"></textarea>
    </div><div id="settingMenuBtnDiv">
        <input type="button" value="Save">
    </div>


</div>

</body>

</html>



