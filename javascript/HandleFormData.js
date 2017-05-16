/**
 * Created by Elias on 2017-05-10.
 */

function handleForm()
{
    switch(dataTypeToAdd)
    {
        case "Group":
            createGroup();
            break;
        case "User":
            createUser();
            break;
        case "Application":
            createApplication();
            break;
        case "Device":
            createDevice();
            break;
        case "SQL":
            createSql();
            break;
        case "XML":
            createXml();
            break;
    }
}

function createGroup()
{
    var data = {};
    data["name"] = document.getElementById("name").value;
    data["prio"] = document.getElementById("prio").value;
    var myJson = JSON.stringify(data);
    console.log(myJson);
    apiChangeData("Group", "POST", myJson, function (status) {
        printStatus(status);
    });
}

function createUser()
{
    var data = {};
    data["name"] = document.getElementById("name").value;
    data["email"] = document.getElementById("email").value;
    var myJson = JSON.stringify(data);
    console.log(myJson);
    apiChangeData("User", "POST", myJson, function (status) {
        printStatus(status);
    });
}

function createApplication()
{
    var data = {};
    data["apkName"] = document.getElementById("apk_name").value;
    data["apkURL"] = document.getElementById("apk_url").value;
    // console.log(document.getElementById("force_install").checked);
    data["forceInstall"] = document.getElementById("force_install").checked;
    data["packageName"] = document.getElementById("package_name").value;
    data["dataDir"] = document.getElementById("data_dir").value;
    data["name"] = document.getElementById("friendly_name").value;
    var myJson = JSON.stringify(data);
    console.log(myJson);
    apiChangeData("Application", "POST", myJson, function (status) {
        printStatus(status);
    });
}

function createDevice()
{
    var data = {};
    data["name"] = document.getElementById("name").value;
    data["imei"] = document.getElementById("imei").value;
    var myJson = JSON.stringify(data);
    console.log(myJson);
    apiChangeData("Device", "POST", myJson, function (status) {
        printStatus(status);
    });
}

function createSql()
{
    var data = {};
    data["name"] = document.getElementById("settingName").value;
    data["dblocation"] = document.getElementById("dbLocationTxt").value;
    data["query"] = document.getElementById("queryTxt").value;
    var myJson = JSON.stringify(data);
    console.log(myJson);
    apiChangeData("sql", "POST", myJson, function (status) {
        printStatus(status);
    });
}

function createXml()
{
    var data = {};
    data["name"] = document.getElementById("settingName").value;
    data["fileLocation"] = document.getElementById("fileLocationTxt").value;
    data["regexp"] = document.getElementById("regexpTxt").value;
    data["replaceWith"] = document.getElementById("replaceWithTxt").value;
    var myJson = JSON.stringify(data);
    console.log(myJson);
    apiChangeData("sql", "POST", myJson, function (status) {
        printStatus(status);
    });
}

/**
 * Prints message depending on status call from API.
 * @param status
 */
function printStatus(status)
{
    switch(status)
    {
        case 200:
            alert("Created succesfully")
            break;
        default:
            alert("Error, try again");
            break;
    }
}