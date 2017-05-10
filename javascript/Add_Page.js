/**
 * Created by Elias on 2017-05-09.
 */
$(document).ready(function(){
    document.getElementById('searchValue').addEventListener('keydown', function(e) {
        if(e.keyCode == 13)
        {
            e.preventDefault();
            addSearch();
        }
    }, false);
});

function addSearch()
{
    $("#information").empty();
    getDataFromAPI(dataTypeToAdd, document.getElementById("searchValue").value, function (data) {
        showData("searchResult", data);
    });
}

function add()
{
    // "user/authtoken/group/id"
    var type = dataType;
    type += "/";
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
    $("#objectType").html(dataType);
    $("#name").html('<b>Name:</b> ' + data[e.target.id]["name"]);

    switch(dataType)
    {
        case "User":
            printUserInformation(data, e);
            break;
        case "Group":
            printGroupInformation(data, e)
            break;
        case "Device":
            printDeviceInformation(data, e);
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

function printUserInformation(data, e)
{
    var p = document.createElement("p");
    p.id = "email";
    document.getElementById("information").appendChild(p);
    var p = document.createElement("p");
    p.id = "nrOfDevices";
    document.getElementById("information").appendChild(p);
    $("#email").html('<b>Email:</b> ' + user["email"]);
    $("#nrOfDevices").html('<b>Nr devices:</b> ' + user["devices"].length);
    $("#nrOfGroups").html('<b>Nr groups in:</b> ' + user["groups"].length);
    $("#createdDate").html('<b>Date created:</b> ' + user["dateCreated"]);
    $("#id").html('<b>Id:</b> ' + user["id"]);
    $("#authToken").html('<b>Authtoken:</b> ' + user["authToken"]);
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