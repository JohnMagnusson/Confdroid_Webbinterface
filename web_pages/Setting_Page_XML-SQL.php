<?php
/**
 * Displays XML and SQL Setting for the choosen element
 */
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
</head>
<body>

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
        <li id="liSQL">SQL</li>
        <li id="liXML">XML</li>
    </ul>
</div>
<div id="container">                            <!--Contains all-->
    <div id="settingMenu">                      <!--Displays button that controls which setting that should be shown -->W

    </div>

    <div id="textAreaContainer">                <!--TextArea container-->
        <textarea id="textArea"></textarea>
    </div><div id="settingMenuBtnDiv">
        <input type="button" value="Save">
    </div>


</div>

</body>

</html>



