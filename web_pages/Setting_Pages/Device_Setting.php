<?php
/*Display the Device settings */
echo '<div id="manageableData"> 
        <form id="formData">
            <p>Name:</p>
            <input type="text" id="name" value="';echo $_SESSION["dataObject"]["name"]; echo '"><br>
            <p>Imei:</p>
            <input type="text" id="imei" value="';echo $_SESSION["dataObject"]["imei"]; echo'"><br><br>
            <input type="button" value="Update information" onclick="changeObjectData()">
        </form>
    </div>
    <div id="staticData">
        <p id="nrDevices">Nr of applications: ';echo sizeof($_SESSION["dataObject"]["applications"]); echo '</p>
        <p id="dateJoined">Date joined: ';echo $_SESSION["dataObject"]["dateCreated"]; echo'</p>
        <p id="id">Id: ';echo $_SESSION["dataObject"]["id"]; echo'</p>
    </div>';
?>