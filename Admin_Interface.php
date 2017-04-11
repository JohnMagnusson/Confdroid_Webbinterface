<?php
/**
 * Interface for the admin to manage the system.
 */

session_start();
if(isset($_GET['authToken']))
{
    $_SESSION['authToken'] = $_GET['authToken'];
}
else
    header("Location: http://localhost:63342/Confdroid_Webbinterface/Login.php");

var_dump($_SESSION['authToken']);
?>