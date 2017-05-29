<?php
/*Display the Variable settings */
echo '<div id="manageableData"> 
        <p>Name:</p>
        <input type="text" id="name" value="';echo $_SESSION["dataObject"]["name"]; echo '"><br>
        <button onclick="changeObjectData()">Update information</button>
        <p id="errorField"></p>
    </div>
    <div id="staticData">
        <p id="nrUsers">Nr of users with this variable: ';echo sizeof($_SESSION["dataObject"]["userValues"]); echo '</p>
    </div>';