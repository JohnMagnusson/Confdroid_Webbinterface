/**
 * Device class can be a phone, tablet etc.
 * The device have applications on it and policies that it should follow.
 */

function Device()
{
    this.applications = new Array();
    this.policies = new Array();
}

function getApplications()
{
    return this.applications;
}

function getPolicies()
{
    return this.policies;
}