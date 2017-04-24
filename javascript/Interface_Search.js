/**
 * Javascript function for the search page.
 */

$(document).ready(function(){
    document.getElementById('searchValue').addEventListener('keydown', function(e) {
        if(e.keyCode == 13)
        {
            e.preventDefault();
            search(token, adminId);
        }
    }, false);
});

function search(authToken, id)
{
    var searchType = document.getElementById("searchDropDown").value;
    var searchValue = document.getElementById("searchValue").value;
    $.ajax({
        type: "POST",
        url: "http://confdroid.localhost/Confdroid_Api/api/admin/search.json",
        data: "authToken="+authToken+"&id="+id+"&searchType="+searchType+"&searchValue="+searchValue,
        success: function(json){
            var data = JSON.parse(json);
            if(data[0] == "Failed")
            {
                console.log("Didn't get any users");

            }
            else if(data[0] == "Not Authorized")
            {
                console.log("Not authorized");
            }
            else
            {
                console.log(data);
                storeData(data);
            }
        }
    });
}

/**
 * The data received from the server is split into objects.
 * @param data
 */
function storeData(data)
{
    console.log(data);
    var user = new User("john","emaidl","device","group");

    //Backup code
    document.getElementById("userCotainer").innerHTML = "id: " + data[0]["id"] + "<br>name: " + data[0]["name"] + " <br>email: " + data[0]["email"]
        + "<br>authToken: " + data[0]["authToken"] + "<br>date created: " + data[0]["dateCreated"];

    document.getElementById("deviceContainer").innerHTML = "Device name: " + data[0]["devices"][0]["name"];
}
