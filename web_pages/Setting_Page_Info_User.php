<?php
/**
 * Displays all the setting for either device, user, application
 * Also be able to change information.
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
    <div id="manageableData">
        <form id="formData">
            <p>Name:</p>
            <input type="text" id="name"><br>
            <p>E-mail:</p>
            <input type="text" id="email"><br>
            <input type="button" value="Save">
        </form>
    </div>
    <div id="staticData">
        <p id="nrDevices">Nr of devices registred:</p>
        <p id="nrGroups">Nr of groups in:</p>
        <p id="dateJoined">Date joined:</p>
        <p id="id">Id:</p>
        <p id="authToken">Authtoken:</p>
    </div>
</div>

</body>

</html>



