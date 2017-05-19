<?php
/*Display the Add info */
echo '
    <div id="searchField">
        <input type="search" id="searchValue" name="searchValue" placeholder="Search..">

       <button name="searchBtn" onclick="addSearch()">Search</button>
    </div>
    <div id="searchResultContainer">
        <h2 class="optionTitle">';echo $_SESSION["dataTypeToAdd"]; echo's</h2>
        <div id="searchResult">
        </div>
    </div>
    ';
    if($_SESSION["dataTypeToAdd"] !== "Variable") {
        echo '
            <div id = "infoContainer" >
                <h2 id = "infoTitle" class="optionTitle" > Information</h2 >
                <div id = "information" >
                </div>
            </div >
            <button class="addButton" onclick = "add()" > Add</button>
        ';
    }
    else
    {
        echo '
            <form style="margin-top:2%;margin-left:28%;">
                <p>Value:</p>
                <input id="variableValue">
            </form>
            <button class="addButtonVariable" onclick = "addVariable()" >Add</button>
        ';
    }