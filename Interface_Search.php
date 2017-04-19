<?php
/**
 * Admin can search on User, devices or apps.
 * When a match is found can the admin manage these objects.
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
    <link rel="stylesheet" type="text/css" href="css/Interface_Search.css">       <!-- Special css for search page -->
    <script src="javascript/jquery-3.2.0.min.js"></script>
    <script src="javascript/Admin_Interface.js"></script>
    <script src="javascript/Interface_Search.js"></script>                        <!-- Javascript file that contains search functions-->
</head>

<body onload="authorizeCheck(token,id)">

<header>
    <h1 class="text_align_center"><a href="Admin_Interface.php" id="adminLink">Admin interface</a></h1>
</header>

<nav>
    <ul>
        <li><a href="Interface_Search.php" id="searchLink" class="current">Search</a></li>

        <li><a href="Interface_Add.php" id="addLink">Add</a></li>

        <li><a href="Interface_Delete.php" id="deleteLink">Delete</a></li>
    </ul>
</nav>
<div id="container">

    <div id="searchContainer">

        <form id="searchForm">              <!-- Dont need post or action. We are using ajax to post-->

            <p>Search for user, device or application</p>

            <select name="searchDropDown" id="searchDropDown">  <!-- Use the id to get the value from the select-->
                <option>User</option>
                <option>Device</option>
                <option>Application</option>
            </select>

            <input type="search" id="searchValue" name="searchValue" placeholder="Search.." class="input">

            <input type="button" name="searchBtn" value="Search" onclick="search()">

        </form>

    </div>  <!-- End searchContainer-->

    <div id="resultContainer">

        <div id="userCotainer">

        </div>

        <div id="deviceContainer">

        </div>

        <div id="appContainer">

        </div>

        <div id="appSettingsContainer">

        </div>


    </div>

</div>

<footer>

    <h1>Template text</h1>

</footer>

</body>

</html>

