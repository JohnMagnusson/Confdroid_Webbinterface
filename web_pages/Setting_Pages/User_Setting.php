<?php
/*Display the User settings */
echo '<div id="manageableData"> 
        <form id="formData">
            <p>Name:</p>
            <input type="text" id="name" value="';echo $_SESSION["dataObject"]["name"]; echo '"><br>
            <p>E-mail:</p>
            <input type="text" id="email" value="';echo $_SESSION["dataObject"]["email"]; echo'"><br><br>
            <input type="button" value="Update information" onclick="alert()">
        </form>
    </div>
    <div id="staticData">
        <p id="nrDevices">Nr of devices registred: ';echo sizeof($_SESSION["dataObject"]["devices"]); echo '</p>
        <p id="nrGroups">Nr of groups in: ';echo sizeof($_SESSION["dataObject"]["groups"]); echo'</p>
        <p id="dateJoined">Date joined: ';echo $_SESSION["dataObject"]["dateCreated"]; echo'</p>
        <p id="id">Id: ';echo $_SESSION["dataObject"]["id"]; echo'</p>
        <p id="authToken">Authtoken: ';echo $_SESSION["dataObject"]["authToken"]; echo'</p>
    </div>';
?>