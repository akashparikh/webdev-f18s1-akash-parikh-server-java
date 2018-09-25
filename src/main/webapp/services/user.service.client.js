function AdminUserServiceClient()
{
    this.createUser = createUser;
    this.findAllUsers = findAllUsers;
    this.findUserById = findUserById;
    this.deleteUser = deleteUser;
    this.updateUser = updateUser;
    var self = this;

    function createUser(user, callback)
    {
        return userJson;
    }

    function findAllUsers(callback)
    {
        return fetch('users.json').then(function(response){
            return response.json();
        });
    }

    function findUserById(userId, callback)
    {
        return fetch('users.json').then(function(response){
            return response.json();
        });
    }
    function updateUser(userId, user, callback)
    {
        return fetch('users.json').then(function(response){
            return response.json();
        });
    }

    function deleteUser(userId, callback)
    {
        return fetch('users.json').then(function(response){
            return response.json();
        });
    }
}
