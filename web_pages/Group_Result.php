
<?php
/**
 * Interface for the admin to manage the system.
 */
if (isset($_COOKIE["authCookie"]) && isset($_COOKIE["adminIdCookie"]))
{
    echo "<script>";
    echo "var token='" . $_COOKIE["authCookie"] . "';";
    echo "var adminId ='" . $_COOKIE["adminIdCookie"] . "';";
    echo "var data ='" . $_GET["data"] . "';";
    echo "var activeType ='" . $_GET["activeType"] . "';";
    echo "</script>";
}
else
    header("Location: Login.php?timedout=true");
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Welcome</title>
    <link rel="icon" href="images/BrowserIcon2.ico">
    <link rel="stylesheet" type="text/css" href="../css/Admin_Interface.css">        <!-- Adds css file -->
    <link rel="stylesheet" type="text/css" href="../css/UserResult.css">             <!-- Unique css for this page-->
    <script src="../javascript/jquery-3.2.0.min.js"></script>
    <script type="text/javascript" src="../javascript/jquery.cookie.js"></script>
    <script src="../javascript/Admin_Interface.js"></script>
    <script src="../javascript/Group_Result.js"></script>
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
    <h1 id="headerTitle"><a href="Admin_Interface.php">Confdroid</a></h1>

    <div id="searchField">
        <input type="search" id="searchValue" name="searchValue" placeholder="Search..">

        <input type="button" name="searchBtn" value="Search" onclick="search(token,adminId)">
    </div>
    <div id="usernameDisplay"><?php echo $_COOKIE["userName"];?></div>
</header>

<nav>
    <ul id="menu">
        <li id="liUser" onclick="updateNav('liUser')">User</li>
        <li id="liGroup"  onclick="updateNav('liGroup')">Group</li>
        <li id="liDevice" onclick="updateNav('liDevice')">Device</li>
        <li id="liApplication" onclick="updateNav('liApplication')">Application</li>
    </ul>
    <input type="button" id="logout" name="logoutBtn" value="Logout" onclick="logOut(token,adminId)">
</nav>

<div id="container">

    <div id="resultContainer">          <!-- Result on searches will be displayed in here. In generated templates based on search-->

        <div id="templateContainer">
            <h2 class="optionTitle">Previous</h2>
            <div id="prevDiv" class="infoTemplate">

            </div>
        </div>

        <div id="templateContainer">
            <h2 class="optionTitle">Users</h2>
            <div id="userDiv" class="infoTemplate">

            </div>

        </div>

        <div id="templateContainer">
            <h2 class="optionTitle">Applications</h2>
            <div id="applicationDiv" class="infoTemplate extraRightBorder">

            </div>
        </div>
    </div>

    <div id="infoContainer">            <!-- Static info container -->
        <h2 class="optionTitle">Information</h2>
        <div id="infoHolder">           <!-- All info is printed inside this div -->

        </div>
    </div>
</div>
</body>
</html>