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
    }
}

function createGroup()
{
    var data = {};
    data["name"] = document.getElementById("name").value;
    data["prio"] = document.getElementById("prio").value;
    var myJson = JSON.stringify(data);
    console.log(myJson);
    apiChangeData("Group", "POST", myJson);
}

function createUser()
{
    var data = {};
    data["name"] = document.getElementById("name").value;
    data["email"] = document.getElementById("email").value;
    var myJson = JSON.stringify(data);
    console.log(myJson);
    apiChangeData("User", "POST", myJson);
}

function createApplication()
{
    var data = {};
    data["apkName"] = document.getElementById("apk_name").value;
    data["apkURL"] = document.getElementById("apk_url").value;
    data["forceInstall"] = document.getElementById("force_install").value;
    data["packageName"] = document.getElementById("package_name").value;
    data["dataDir"] = document.getElementById("data_dir").value;
    data["name"] = document.getElementById("friendly_name").value;
    var myJson = JSON.stringify(data);
    console.log(myJson);
    apiChangeData("Application", "POST", myJson);
}