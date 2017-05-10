<?php
/*Display the Add info */
echo '
    <div id="searchField">
        <input type="search" id="searchValue" name="searchValue" placeholder="Search..">

        <input type="button" name="searchBtn" value="Search" onclick="addSearch()">
    </div>
    <div id="searchResultContainer">
        <h2 class="optionTitle">';echo $_SESSION["dataTypeToAdd"]; echo's</h2>
        <div id="searchResult">
        </div>
    </div>
    <div id="infoContainer">
        <h2 id="infoTitle" class="optionTitle">Information</h2>
        <div id="information">
        </div>
    </div>
    <button class="addButton" onclick="add()">Add</button>';
?>