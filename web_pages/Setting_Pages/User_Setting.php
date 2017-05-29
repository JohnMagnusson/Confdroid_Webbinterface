<?php
/*Display the User settings */
echo '<div id="manageableData"> 
        <p>Name:</p>
        <input type="text" id="name" value="';echo $_SESSION["dataObject"]["name"]; echo '"><br>
        <p>E-mail:</p>
        <input type="text" id="email" value="';echo $_SESSION["dataObject"]["email"]; echo'"><br>
        ';
            for($i = 0; $i < sizeof($_SESSION["dataObject"]["variables"]); $i++)
            {
                $variable = $_SESSION["dataObject"]["variables"][$i];
                echo'
                <p>'; echo $variable["name"]; echo'</p>
                <input type="text" id="';echo $variable["name"];echo'" value="';echo $variable["value"]; echo'"><br>';
            }
        echo'
        <br>
        <button value="Update information" onclick="changeObjectData()">Update information</button>
        <p id="errorField"></p>
    </div>
    <div id="staticData">
        <p id="nrDevices">Nr of devices registered: ';echo sizeof($_SESSION["dataObject"]["devices"]); echo '</p>
        <p id="nrGroups">Nr of groups in: ';echo sizeof($_SESSION["dataObject"]["groups"]); echo'</p>
        <p id="dateCreated">Date created: ';echo $_SESSION["dataObject"]["dateCreated"]; echo'</p>
        <p id="id">Id: ';echo $_SESSION["dataObject"]["id"]; echo'</p>
        <p id="authToken">Authtoken: ';echo $_SESSION["dataObject"]["authToken"]; echo'</p>
    </div>';