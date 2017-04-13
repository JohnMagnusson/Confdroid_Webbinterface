/**
 * Javascript function for the search page.
 */

function search(authToken, id)
{
    var searchType = document.getElementById("searchDropDown").value;
    var searchValue = document.getElementById("searchValue").value;
    $.ajax({
        type: "POST",
        url: "http://confdroid.localhost/api/admin/search.json",
        data: "authToken="+authToken+"&id="+id+"&searchType="+searchType+"&searchValue="+searchValue,
        success: function(json){
            var data = JSON.parse(json);

            console.log(data);
            document.getElementById("userCotainer").innerHTML = data;

        }
    });
}
