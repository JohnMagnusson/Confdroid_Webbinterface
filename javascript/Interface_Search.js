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
    document.getElementById("userContainer").innerHTML = " ";
    var searchType = document.getElementById("searchDropDown").value;
    var searchValue = document.getElementById("searchValue").value;
    $.ajax({
        type: "POST",
        url: "http://confdroid.localhost/Confdroid_Api/api/admin/search.json",
        data: "authToken="+authToken+"&id="+id+"&searchType="+searchType+"&searchValue="+searchValue,
        success: function(json){
            console.log(json);
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
    var users = [];
    for(i = 0; i < data.length; i++)
    {
        //Ledsen mattias dags att spara in allt igen. GL hf ;))))))
        users[i] = new User(data[i]["id"],data[i]["name"],data[i]["email"],null,null,data[i]["authToken"],data[i]["dateCreated"]);
    }


    //Backup code for show at meeting
    for(i = 0; i < data.length; i++) {
        document.getElementById("userContainer").innerHTML += "id: " + data[i]["id"] + "<br>name: " + data[i]["name"] + " <br>email: " + data[i]["email"]
            + "<br>authToken: " + data[i]["authToken"] + "<br>date created: " + data[i]["dateCreated"] + "<br><br>";
    }
    // document.getElementById("deviceContainer").innerHTML = "Device name: " + data[0]["devices"][0]["name"];
}
