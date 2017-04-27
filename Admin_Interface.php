
<?php
/**
 * Interface for the admin to manage the system.
 */
if (isset($_GET['authToken']) && isset($_GET['id']))
{
    echo "<script>";
    echo "var token='" . $_GET["authToken"] . "';";
    echo "var id ='" . $_GET["id"] . "';";
    echo "</script>";
}
else
    header("Location: Login.php");
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Welcome</title>
    <link rel="stylesheet" type="text/css" href="css/Admin_Interface.css">        <!-- Adds css file -->
    <script src="javascript/jquery-3.2.0.min.js"></script>
    <script src="javascript/Admin_Interface.js"></script>
    <script src="javascript/Interface_Search.js"></script>                        <!-- Javascript file that contains search functions-->
    <!-- Model files for javascript is now loaded-->
    <script src="javascript/model/Application.js"></script>
    <script src="javascript/model/Device.js"></script>
    <script src="javascript/model/DeviceManagementPolicy.js"></script>
    <script src="javascript/model/Group.js"></script>
    <script src="javascript/model/SQL_Setting.js"></script>
    <script src="javascript/model/User.js"></script>
    <script src="javascript/model/XML_Setting.js"></script>
</head>

<body onload="updateLinks(token,id)">

<header>

    <h1 id="headerTitle"><a href="Admin_Interface.php">Confdroid</a></h1>

    <div id="searchField">

        <input type="search" id="searchValue" name="searchValue" placeholder="Search.." class="input">

        <input type="button" name="searchBtn" value="Search" onclick="search(token,adminId)">

    </div>

</header>

<nav>
    <ul id="menu">
        <li class="activeNav">User</li>
        <li>Group</li>
        <li>Device</li>
        <li>Application</li>
    </ul>
</nav>

<div id="container">

    <div id="resultContainer">

        <div id="userContainer">

        </div>

        <div id="deviceContainer">

        </div>

        <div id="appContainer">

        </div>

        <div id="appSettingsContainer">

        </div>

    </div>
</div>

</body>

</html>



