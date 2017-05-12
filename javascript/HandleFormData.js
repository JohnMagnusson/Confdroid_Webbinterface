/**
 * Created by Elias on 2017-05-10.
 */

function handleForm()
{
    switch(dataTypeToAdd)
    {
        case "Group":
            createGroup();
            // addGroupToObject();
            break;
        case "User":
            createUser();
            // addGroupToObject();
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
    apiChangeData("Group", "POST", myJson);
}

function addGroupToObject()
{

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