/**
 * Device class can be a phone, tablet etc.
 * The device have applications on it and policies that it should follow.
 */

function Device(name, imei, dateCreated, applications)
{
    this.name = name;
    this.imei = imei;
    this.dateCreated = dateCreated;
    this.applications = applications;
}

function getName()
{
    return this.name;
}

function getImei()
{
    return this.imei;
}

function getDateCreated()
{
    return this.dateCreated;
}

function getApplications()
{
    return this.applications;
}

