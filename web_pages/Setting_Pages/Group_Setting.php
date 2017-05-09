<?php
/*Display the Group settings */
echo '<div id="manageableData"> 
        <form id="formData">
            <p>Name:</p>
            <input type="text" id="name" value="';echo $_SESSION["dataObject"]["name"]; echo '"><br>
            <p>Prio:</p>
            <input type="text" id="email" value="';echo $_SESSION["dataObject"]["prio"]; echo'"><br><br>
            <input type="button" value="Update information" onclick="alert()">
        </form>
    </div>
    <div id="staticData">
        <p id="nrDevices">Nr of users in group: ';echo sizeof($_SESSION["dataObject"]["users"]); echo '</p>
        <p id="nrDevices">Nr of applications: ';echo sizeof($_SESSION["dataObject"]["applications"]); echo '</p>
        <p id="id">Id: ';echo $_SESSION["dataObject"]["id"]; echo'</p>
    </div>';
?>