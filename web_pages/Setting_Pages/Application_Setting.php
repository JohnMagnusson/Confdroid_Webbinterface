<?php
//*Display the Application settings */
echo '<div id="manageableData"> 
        <p>Name:</p>
        <input type="text" id="name" value="';echo $_SESSION["dataObject"]["name"]; echo '"><br>
        <p>Apk Name:</p>
        <input type="text" id="apkName" value="';echo $_SESSION["dataObject"]["apkName"]; echo'"><br><br>
        <p>Apk Url:</p>
        <input type="text" id="apkURL" value="';echo $_SESSION["dataObject"]["apkURL"]; echo'"><br><br>
        <p>Package name:</p>
        <input type="text" id="packageName" value="';echo $_SESSION["dataObject"]["packageName"]; echo'"><br><br>
        <p>Dara dir:</p>
        <input type="text" id="dataDir" value="';echo $_SESSION["dataObject"]["dataDir"]; echo'"><br><br>
        <p>Force install:</p>
        <input type="text" id="forceInstall" value="';echo $_SESSION["dataObject"]["forceInstall"]; echo'"><br><br>
        <p id="errorField"></p>
        <button value="Update information" onclick="changeObjectData()">Update information</button>
    </div>
    <div id="staticData">
        <p id="nrOfDevices">Nr of devices: ';echo sizeof($_SESSION["dataObject"]["devices"]); echo '</p>
        <p id="nrOfGroups">Nr of groups: ';echo sizeof($_SESSION["dataObject"]["groups"]); echo '</p>
        <p id="nrOfUsers">Nr of users: ';echo sizeof($_SESSION["dataObject"]["users"]); echo '</p>
        <p id="id">Id: ';echo $_SESSION["dataObject"]["id"]; echo'</p>
    </div>';


