/**
 * Created by Elias on 2017-05-09.
 */
$(document).ready(function(){
    document.getElementById(currentPage).classList.add("activeLi");
    if(document.getElementById('searchValue') != null) {
        document.getElementById('searchValue').addEventListener('keydown', function (e) {
            if (e.keyCode == 13) {
                e.preventDefault();
                addSearch();
            }
        }, false);
    }
});

function addSearch()
{
    $("#information").empty();
    var apiType;
    if(dataTypeToAdd == "SQL")
        apiType = "sqlsetting";
    else if(dataTypeToAdd == "XML")
        apiType = "xmlsetting";
    else
        apiType = dataTypeToAdd;
    getDataFromAPI(apiType, document.getElementById("searchValue").value, function (data) {
        showData("searchResult", data);
    });
}

function add()
{
    if(currentPage == "Add_New") {
        if (document.getElementById("id") == null)
            alert("Select!");
    }
    else {
        var type = dataType;
        type += "/";
        type += dataObject["id"];
        type += "/";
        if(dataTypeToAdd == "SQL" || dataTypeToAdd == "XML")        //If the datatype is sql or xml then we need to add settings to the string.
            type += dataTypeToAdd+"setting";
        else
            type += dataTypeToAdd;
        type += "/";
        type += document.getElementById("id").innerText.split(" ")[1];
        console.log(type);
        apiChangeData(type, "POST", null, function (status){
            printStatus(status);
        });
    }
}

function showData(infoParentId, data)
{
    $("#"+infoParentId).empty();
    for(var i = 0; i < data.length; i++)
    {
        var div = document.createElement("div");
        div.id = "dataDiv"+i;
        var p = document.createElement("p");
        p.id = i;
        p.innerHTML = data[i]["name"];
        div.appendChild(p);
        div.classList.add("templateText");
        document.getElementById(infoParentId).appendChild(div);
        p.onclick = function (e)
        {
            printInfoOfObject(data, e);
        };
    }
}

function printInfoOfObject(data, e)
{
    if(document.getElementsByClassName("selected")[0] != null) {
        document.getElementsByClassName("selected")[0].classList.remove("selected");
    }
    e.target.classList.add("selected");
    var h2 = document.createElement("h2");
    h2.id = "objectType";
    h2.style = "text-align:center";
    document.getElementById("information").appendChild(h2);
    var p = document.createElement("p");
    p.id = "name";
    document.getElementById("information").appendChild(p);
    $("#objectType").html(dataTypeToAdd);
    $("#name").html('<b>Name:</b> ' + data[e.target.id]["name"]);

    switch(dataTypeToAdd)
    {
        case "Group":
            printGroupInformation(data, e);
            break;
        case "Device":
            printDeviceInformation(data, e);
            break;
        case "Application":
            printApplicationInformation(data, e);
            break;
        case "User":
            printUserInformation(data, e);
            break;
        case "SQL":
            printSqlInformation(data, e);
            break;
        case "XML":
            printXmlInformation(data, e);
            break;
    }
}

function printGroupInformation(data, e)
{
    var p = document.createElement("p");
    p.id = "prio";
    document.getElementById("information").appendChild(p);
    var p = document.createElement("p");
    p.id = "id";
    document.getElementById("information").appendChild(p);
    $("#prio").html('<b>Prio:</b> ' + data[e.target.id]["prio"]);
    $("#id").html('<b>Id:</b> ' + data[e.target.id]["id"]);
}

function printDeviceInformation(data, e)
{
    var p = document.createElement("p");
    p.id = "nrOfApplications";
    document.getElementById("information").appendChild(p);
    var p = document.createElement("p");
    p.id = "createdDate";
    document.getElementById("information").appendChild(p);
    var p = document.createElement("p");
    p.id = "id";
    document.getElementById("information").appendChild(p);
    var p = document.createElement("p");
    p.id = "imei";
    document.getElementById("information").appendChild(p);
    $("#nrOfApplications").html('<b>Nr applications:</b> ' + data[e.target.id]["applications"].length);
    $("#createdDate").html('<b>Date created:</b> ' + data[e.target.id]["dateCreated"]);
    $("#id").html('<b>Id:</b> ' + data[e.target.id]["id"]);
    $("#imei").html('<b>Imei:</b> ' + data[e.target.id]["imei"]);
}

function printApplicationInformation(data, e)
{
    console.log(data);
    var p = document.createElement("p");
    p.id = "apkName";
    document.getElementById("information").appendChild(p);
    var p = document.createElement("p");
    p.id = "packageName";
    document.getElementById("information").appendChild(p);
    var p = document.createElement("p");
    p.id = "nrOfDevices";
    document.getElementById("information").appendChild(p);
    var p = document.createElement("p");
    p.id = "nrOfGroups";
    document.getElementById("information").appendChild(p);
    var p = document.createElement("p");
    p.id = "nrOfUsers";
    document.getElementById("information").appendChild(p);
    var p = document.createElement("p");
    p.id = "id";
    document.getElementById("information").appendChild(p);
    $("#apkName").html('<b>Apk Name:</b> ' + data[e.target.id]["apkName"]);
    $("#packageName").html('<b>Package Name:</b> ' + data[e.target.id]["packageName"]);
    $("#nrOfDevices").html('<b>Nr devices:</b> ' + data[e.target.id]["devices"].length);
    $("#nrOfGroups").html('<b>Nr groups in:</b> ' + data[e.target.id]["groups"].length);
    $("#nrOfUsers").html('<b>Nr users in:</b> ' + data[e.target.id]["users"].length);
    $("#id").html('<b>Id:</b> ' + data[e.target.id]["id"]);
}

function printUserInformation(data, e)
{
    var p = document.createElement("p");
    p.id = "email";
    document.getElementById("information").appendChild(p);
    var p = document.createElement("p");
    p.id = "nrOfDevices";
    document.getElementById("information").appendChild(p);
    var p = document.createElement("p");
    p.id = "nrOfGroups";
    document.getElementById("information").appendChild(p);
    var p = document.createElement("p");
    p.id = "createdDate";
    document.getElementById("information").appendChild(p);
    var p = document.createElement("p");
    p.id = "id";
    document.getElementById("information").appendChild(p);
    var p = document.createElement("p");
    p.id = "authToken";
    document.getElementById("information").appendChild(p);
    $("#email").html('<b>Email:</b> ' + data[e.target.id]["email"]);
    $("#nrOfDevices").html('<b>Nr devices:</b> ' + data[e.target.id]["devices"].length);
    $("#nrOfGroups").html('<b>Nr groups in:</b> ' + data[e.target.id]["groups"].length);
    $("#createdDate").html('<b>Date created:</b> ' + data[e.target.id]["dateCreated"]);
    $("#id").html('<b>Id:</b> ' + data[e.target.id]["id"]);
    $("#authToken").html('<b>Authtoken:</b> ' + data[e.target.id]["authToken"]);
}

function printSqlInformation(data, e)
{
    var p = document.createElement("p");
    p.id = "id";
    document.getElementById("information").appendChild(p);
    $("#id").html('<b>Id:</b> ' + data[e.target.id]["id"]);
}

function printXmlInformation(data, e)
{
    var p = document.createElement("p");
    p.id = "id";
    document.getElementById("information").appendChild(p);
    $("#id").html('<b>Id:</b> ' + data[e.target.id]["id"]);
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
            alert("Added succesfull")
            break;
        default:
            alert("Error, try again");
            break;
    }
}