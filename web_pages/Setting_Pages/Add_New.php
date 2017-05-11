<?php
    switch($_SESSION["dataTypeToAdd"])
    {
        case "Group":
            include "Forms/Group_Form.php";
            break;
        case "User":
            include "Forms/User_Form.php";
            break;
    }
?>