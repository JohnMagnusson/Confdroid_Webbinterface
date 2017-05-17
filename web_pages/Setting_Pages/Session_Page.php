<?php
/**
 * Session_Page.php acts as a middle hand to cast $_Post to $_Session. This is needed to move dataObjects in an easy way.
 */
if(!isset($_SESSION))
{
    session_start();
}
if(isset($_POST["dataObject"]) && isset($_POST["dataType"]))
{
    $_SESSION["dataObject"] = json_decode($_POST["dataObject"],true);
    $_SESSION["dataType"] = $_POST["dataType"];
    var_dump($_SESSION["dataObject"]);
    if(isset($_POST["dataTypeToAdd"]))
    {
        $_SESSION["dataTypeToAdd"] = $_POST["dataTypeToAdd"];
    }
    if(isset($_POST["applicationId"]))                          /*Used when User,Device,Group shall add a sql/xml setting one of their applications.*/
        $_SESSION["applicationId"] = $_POST["applicationId"];
    else
        unset($_SESSION["applicationId"]);                      /*If not used unset it*/
}
else
{
    var_dump($_POST["dataObject"]);
    var_dump($_POST["dataType"]);
}