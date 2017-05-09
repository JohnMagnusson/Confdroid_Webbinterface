<?php
if(!isset($_SESSION))
{
    session_start();
}
if(isset($_POST["dataObject"]) && isset($_POST["dataType"]))
{
    $_SESSION["dataObject"] = json_decode($_POST["dataObject"],true);
    $_SESSION["dataType"] = $_POST["dataType"];
}
else
{
    var_dump($_POST["dataObject"]);
    var_dump($_POST["dataType"]);
}