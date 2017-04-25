/**
 * User have a name and email.
 */

function User(id,name, email, devices, groups, authToken, dateCreated)
{
    this.id = id;
    this.name = name;
    this.email = email;
    this.devices = devices;
    this.groups = groups;
    this.authToken = authToken;
    this.dateCreated = dateCreated;
}

function getName()
{
    return name;
}

function getEmail()
{
    return email;
}

function getDevices()
{
    return this.devices;
}

function getGroups()
{
    return this.groups;
}

function getAuthToken()
{
    return this.authToken;
}

function getDateCreated()
{
    return this.dateCreated;
}