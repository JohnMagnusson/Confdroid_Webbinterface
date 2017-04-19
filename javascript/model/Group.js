/**
 * User can be in groups and have different settings depending on the groups set standard.
 */

function Groups(groupName, groupId)
{
    this.groupName = groupName;
    this.groupId = groupId;
}

function setGroupName(name)
{
    this.groupName = name;
}

function getGroupName()
{
    return this.groupName;
}

function getGroupId()
{
    return this.groupId;
}