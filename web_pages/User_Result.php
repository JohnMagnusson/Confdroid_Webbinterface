<?php
/**
 * Interface for the admin to manage the system.
 */
if (isset($_COOKIE["authCookie"]) && isset($_COOKIE["adminIdCookie"]) && isset($_GET["data"]) && isset($_GET["activeType"]))
{
    echo "<script>";
    echo "var urlData ='" . $_GET["data"] . "';";
    echo "var activeType ='" . $_GET["activeType"] . "';";
    echo "</script>";
}
else
    header("Location: ../index.php?timedout=true");
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>User-Confdroid</title>
    <link rel="icon" href="../images/BrowserIcon.ico">
    <link rel="stylesheet" type="text/css" href="../css/Admin_Interface.css">        <!-- Adds css file -->
    <script src="../javascript/jquery-3.2.0.min.js"></script>
    <script type="text/javascript" src="../javascript/jquery.cookie.js"></script>
    <script src="../javascript/General_Functions.js"></script>
    <script src="../javascript/Admin_Interface.js"></script>
    <script src="../javascript/User_Result.js"></script>
    <script type="text/javascript" src="../javascript/Api_Calls.js"></script>
</head>
<body>
    <header>
        <h1 id="headerTitle"><a href="Admin_Interface.php?activeType=User">Confdroid</a></h1>

        <div id="searchField">
            <input type="search" id="searchValue" name="searchValue" placeholder="Search..">
            <button name="searchBtn" onclick="search()">Search</button>
        </div>
        <div id="usernameDisplay">
            <?php echo $_COOKIE["userName"];?>
            <img src="../images/admin-icon.png" alt="admin-icon">
        </div>
    </header>

    <nav>
        <ul id="menu">
            <li id="liUser" onclick="updateNav('liUser')">User</li>
            <li id="liGroup"  onclick="updateNav('liGroup')">Group</li>
            <li id="liDevice" onclick="updateNav('liDevice')">Device</li>
            <li id="liApplication" onclick="updateNav('liApplication')">Application</li>
        </ul>
        <button id="logout" name="logoutBtn" onclick="logOut()">Logout</button>
    </nav>

    <div id="container">

        <div id="resultContainer">          <!-- Result on searches will be displayed in here. In generated templates based on search-->
            <div id="templateContainer">
                <h2 class="optionTitle" templateType="Group">Groups</h2>
                <div id="groupDiv" class="infoTemplate">
                </div>
                <div id="imgContainerGroup" class="divImgAdd">
                    <img src="../images/Add-icon.png" alt="Add-icon" class="addIcon">
                </div>
            </div>

            <div id="templateContainer">
                <h2 class="optionTitle" templateType="Device">Devices</h2>
                <div id="deviceDiv" class="infoTemplate">
                </div>
                <div id="imgContainerGroup" class="divImgAdd">
                    <img src="../images/Add-icon.png" alt="Add-icon" class="addIcon">
                </div>
            </div>

            <div id="templateContainer">
                <h2 class="optionTitle" templateType="Application">Applications</h2>
                <div id="applicationDiv" class="infoTemplate">
                </div>
                <div id="imgContainerGroup" class="divImgAdd">
                    <img src="../images/Add-icon.png" alt="Add-icon" class="addIcon">
                </div>
            </div>

            <div id="templateContainer">
                <h2 class="optionTitle" templateType="Variable">Variables</h2>
                <div id="variableDiv" class="infoTemplate ">
                </div>
                <div id="imgContainerGroup" class="divImgAdd">
                    <img src="../images/Add-icon.png" alt="Add-icon" class="addIcon">
                </div>
            </div>

        </div>

        <div id="infoContainer">            <!-- Static info container -->
            <h2 class="optionTitle">Information</h2>
            <div id="infoHolder">           <!-- All info is printed inside this div -->
                <h2 id="objectType" style="text-align:center"></h2>
                <p id="name"> </p>
                <p id="email"></p>
                <p id="nrOfDevces"></p>
                <p id="nrOfGroups"></p>
                <p id="createdDate"></p>
                <p id="id"></p>
                <p id="authToken"></p>
            </div>
            <div id="settingsContainer" class="settingContainer">
                <img src="../images/Settings-icon-medium.png" alt="Settings-icon-medium" class="infoImg" id="settingBtnInfo">
                <img src="../images/Trash-can-icon-medium.png" alt="Trash-can-icon-medium" class="infoImg" id="deleteBtnInfo">
            </div>
        </div>
    </div>
</body>
</html>