/**
 * User can be in groups and have different settings depending on the groups set standard.
 */

function Group(groupId, groupName, priority)
{
    this.groupId = groupId;
    this.groupName = groupName;
    this.priority = priority;
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

function getPriority()
{
    return this.priority;
}