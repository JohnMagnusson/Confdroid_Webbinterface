/**
 * Created by Elias on 2017-04-27.
 */
/**
 * User have a name and email.
 */

function ResultTemplate(title, data)
{
    this.title = title;
    this.data = data;
    createDiv();
}

function getTitle()
{
    return this.title;
}

function getData()
{
    return this.data;
}

function setData(data)
{
    this.data = data;
}

function setTitle(title)
{
    this.title = title;
}

function createDiv()
{
    this.div = document.createElement('div');
    this.div.id = "Template";
    this.div.addClass("clickable");
    this.div.innerHTML = this.title;
    var dataDiv = document.createElement('div');
    dataDiv.addClass("outer");
    this.div.appendChild(dataDiv);
    for(var i = 0; i < this.data.length; i++)
    {
        dataDiv.innerHTML += data[i]["name"];
    }
}

function getDiv()
{
    return this.div;
}

function removeDiv() {
    this.div.parentNode.removeChild(this.div);
}

function resetDiv()
{
    this.div.innerHTML = "";
}