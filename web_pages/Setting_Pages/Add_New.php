<?php
    switch($_SESSION["dataTypeToAdd"])
    {
        case "User":
            include "Forms/User_Form.php";
            break;
        case "Group":
            include "Forms/Group_Form.php";
            break;
        case "Device":
            include "Forms/Device_Form.php";
            break;
        case "Application":
            include "Forms/Application_Form.php";
            break;
    }
?>