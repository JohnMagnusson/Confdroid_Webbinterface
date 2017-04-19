/**
 * Javascript function for the search page.
 */

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
                document.getElementById("userCotainer").innerHTML = data;
            }

        }
    });
}
