<?php
/*Display the Group settings */
echo '<div id="manageableData"> 
        <p>Name:</p>
        <input type="text" id="name" value="';echo $_SESSION["dataObject"]["name"]; echo '"><br>
        <p>Prio:</p>
        <input type="text" id="prio" value="';echo $_SESSION["dataObject"]["prio"]; echo'"><br><br>
        <button value="Update information" onclick="changeObjectData()">Update information</button>
        <p id="errorField"></p>
    </div>
    <div id="staticData">
        <p id="nrDevices">Nr of users in group: ';echo sizeof($_SESSION["dataObject"]["users"]); echo '</p>
        <p id="nrDevices">Nr of applications: ';echo sizeof($_SESSION["dataObject"]["applications"]); echo '</p>
        <p id="id">Id: ';echo $_SESSION["dataObject"]["id"]; echo'</p>
    </div>';