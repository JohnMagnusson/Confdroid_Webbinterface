
<?php
/**
 * Interface for the admin to manage the system.
 */
if (isset($_COOKIE["authCookie"]) && isset($_COOKIE["adminIdCookie"]))
{
    echo "<script>";
    echo "var activeType ='" . $_GET["activeType"] . "';";
    echo "var urlData ='" . $_GET["data"] . "';";
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
    <link rel="icon" href="../images/BrowserIcon.ico">
    <link rel="stylesheet" type="text/css" href="../css/Admin_Interface.css">        <!-- Adds css file -->
    <script src="../javascript/jquery-3.2.0.min.js"></script>
    <script type="text/javascript" src="../javascript/jquery.cookie.js"></script>
    <script src="../javascript/General_Functions.js"></script>
    <script src="../javascript/Admin_Interface.js"></script>
    <script src="../javascript/Application_Result.js"></script>
    <script type="text/javascript" src="../javascript/Api_Calls.js"></script>
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

        <div id="templateContainer">
            <h2 class="optionTitle">Groups</h2>
            <div id="groupDiv" class="infoTemplate">
            </div>
            <div id="imgContainerGroup" class="divImgAdd">
                <img src="../images/Add-icon.png" alt="Add-icon" class="addIcon">
            </div>
        </div>

        <div id="templateContainer">
            <h2 class="optionTitle">Users</h2>
            <div id="userDiv" class="infoTemplate">
            </div>
            <div id="imgContainerGroup" class="divImgAdd">
                <img src="../images/Add-icon.png" alt="Add-icon" class="addIcon">
            </div>
        </div>

        <div id="templateContainer">
            <h2 class="optionTitle">Devices</h2>
            <div id="deviceDiv" class="infoTemplate extraRightBorder">
            </div>
            <div id="imgContainerGroup" class="divImgAdd extraRightBorder">
                <img src="../images/Add-icon.png" alt="Add-icon" class="addIcon">
            </div>
        </div>
    </div>

    <div id="infoContainer">            <!-- Static info container -->
        <h2 class="optionTitle">Information</h2>
        <div id="infoHolder">           <!-- All info is printed inside this div -->
            <h2 id="objectType" style="text-align:center"></h2>
            <p id="name"> </p>
            <p id="apkName"> </p>
            <p id="apkURL"> </p>
            <p id="packageName"> </p>
            <p id="dataDir"> </p>
            <p id="forceInstall"> </p>
            <p id="nrOfDevices"></p>
            <p id="nrOfGroups"></p>
            <p id="nrOfUsers"></p>
            <p id="id"></p>
        </div>
        <div id="settingsContainer" class="settingContainer">
            <img src="../images/Add-icon-big.png" alt="Add-icon-big" class="infoImg" id="addBtnInfo">
            <img src="../images/Settings-icon-big.png" alt="Settings-icon-big" class="infoImg" id="settingBtnInfo">
            <img src="../images/Trash-can-icon-big.png" alt="Trash-can-icon-big" class="infoImg" id="deleteBtnInfo">
        </div>
    </div>
</div>
</body>
</html>