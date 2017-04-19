/**
 * User have a name and email.
 */

function User(name, email, devices, groups)
{
    this.name = name;
    this.email = email;
    this.devices = devices;
    this.groups = groups;
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
