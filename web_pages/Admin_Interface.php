<?php
/**
 * Interface for the admin to manage the system.
 */
if (isset($_COOKIE["authCookie"]) && isset($_COOKIE["adminIdCookie"]))
{
    echo "<script>";
    echo "var activeType ='" . $_GET["activeType"] . "';";
    echo "</script>";
    session_start();
}
else
    header("Location: Login.php?timedout=true");
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Welcome</title>
    <link rel="icon" href="../images/BrowserIcon2.ico">
    <link rel="stylesheet" type="text/css" href="../css/Admin_Interface.css">        <!-- Adds css file -->
    <script src="../javascript/jquery-3.2.0.min.js"></script>
    <script type="text/javascript" src="../javascript/jquery.cookie.js"></script>
    <script src="../javascript/Document_Ready.js"></script>
    <script src="../javascript/Admin_Interface.js"></script>
    <!-- Model files for javascript is now loaded-->
    <script src="../javascript/model/Application.js"></script>
    <script src="../javascript/model/Device.js"></script>
    <script src="../javascript/model/DeviceManagementPolicy.js"></script>
    <script src="../javascript/model/Group.js"></script>
    <script src="../javascript/model/SQL_Setting.js"></script>
    <script src="../javascript/model/User.js"></script>
    <script src="../javascript/model/XML_Setting.js"></script>
</head>
<body>
    <header>
        <h1 id="headerTitle"><a href="Admin_Interface.php?activeType=User">Confdroid</a></h1>

        <div id="searchField">
            <input type="search" id="searchValue" name="searchValue" placeholder="Search..">

            <input type="button" name="searchBtn" value="Search" onclick="search()">
        </div>
        <div id="usernameDisplay"><?php echo $_COOKIE["userName"];?></div>
    </header>

    <nav>
        <ul id="menu">
            <li class="activeNav" id="liUser" onclick="updateNav('liUser')">User</li>
            <li id="liGroup"  onclick="updateNav('liGroup')">Group</li>
            <li id="liDevice" onclick="updateNav('liDevice')">Device</li>
            <li id="liApplication" onclick="updateNav('liApplication')">Application</li>
        </ul>
        <input type="button" id="logout" name="logoutBtn" value="Logout" onclick="logOut()">
    </nav>

    <div id="container">

        <div id="resultContainer">          <!-- Result on searches will be displayed in here. In generated templates based on search-->
            <div id="previousContainer">
                <h2 id="previousTitle" class="optionTitle">Search Result</h2>
                <div id="previousInfo">
                </div>
                <div id="imgContainerGroup" class="divImgAdd extraRightBorder">
                    <img src="../images/Add-icon.png" alt="Add-icon" class="addIcon">
                </div>
            </div>
        </div>

    </div>

</body>

</html>



