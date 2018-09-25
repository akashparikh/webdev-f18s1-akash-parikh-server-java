(function ()
{
    var $usernameFld,$passwordFld;
    var $removeBtn,$editBtn,$createBtn,$updateBtn,$searchBtn;
    var $firstNameFld,$lastNameFld;
    var $userRowTemplate,$tbody;
    var $roleFld;
    var userService = new AdminUserServiceClient();
    $(main);

    function main()
    {
        findAllUsers();
        $usernameFld = $('#usernameFld');
        $passwordFld = $('#passwordFld');
        $editBtn=$('#updateBtn');
        $createBtn= $('#createBtn');
        $firstNameFld= $("#firstNameFld");
        $lastNameFld= $("#lastNameFld");
        $roleFld=$("#roleFld");
        $userRowTemplate=$(".wbdv-template.wbdv-user");
        $tbody=$(".wbdv-tbody");
        $searchBtn=$('#searchBtn');
        $createBtn.click(createUser);
        $editBtn.click(updateUser);
        $searchBtn.click(findUserById);
        renderUsers(userService.findAllUsers());
    }

    function createUser()
    {
        var username = $usernameFld.val();
        $usernameFld.val("");
        var timestamp = (new Date()).getTime();
        var password = $passwordFld.val();
        $passwordFld.val("");
        var firstName= $firstNameFld.val();
        $firstNameFld.val("");
        var lastName= $lastNameFld.val();
        $lastNameFld.val("");
        var role= $roleFld.val();
        $roleFld.val("");
        var newUser = $userRowTemplate.clone();
        newUser.removeClass("wbdv-hidden");
        newUser.attr("id",timestamp);
        newUser.find(".wbdv-username").html(username);
        newUser.find(".wbdv-password").html(password);
        newUser.find(".wbdv-first-name").html(firstName);
        newUser.find(".wbdv-last-name").html(lastName);
        newUser.find(".wbdv-role").html(role);
        newUser.find(".wbdv-remove").attr("id",timestamp).click(deleteUser);
        newUser.find(".wbdv-edit").attr("id",timestamp).click(selectUser);
        $tbody.append(newUser);
        $usernameFld.removeAttr("disabled");
    }

    function findAllUsers()
    {
        return fetch('users.json').then(function(response){
            return response.json();
        });
    }

    function findUserById()
    {
        username = new RegExp($usernameFld.val());
        password = new RegExp($passwordFld.val());
        firstname = new RegExp($firstNameFld.val());
        lastname = new RegExp($lastNameFld.val());
        role = new RegExp($roleFld.val());

        var users = $('.wbdv-tbody tr');
        users.hide();

        users.filter(function ()
        {
            var Queryresult;
            Queryresult=username.test($(this).text());
            Queryresult=Queryresult && password.test($(this).text());
            Queryresult=Queryresult && firstname.test($(this).text());
            Queryresult=Queryresult && lastname.test($(this).text());
            return Queryresult;
        }).show();

    }
    function deleteUser(event)
    {
        var button=$(event.currentTarget);
        var tr=button.parents(".wbdv-template");
        tr.remove();
    }
    function selectUser()
    {
        var button=$(event.currentTarget);
        var data=button.parents(".wbdv-template");
        var username=data.find(".wbdv-username").html();
        var password=data.find(".wbdv-password").html();
        var firstName=data.find(".wbdv-first-name").html();
        var lastName=data.find(".wbdv-last-name").html();
        var role=data.find(".wbdv-role").html();

        //console.log(id);
        $usernameFld.val(username);
        $passwordFld.val(password);
        $firstNameFld.val(firstName);
        $lastNameFld.val(lastName);
        $roleFld.val(role);

        //var name=nm.find(".wbdv-username");
        //console.log(mn);
        var tr=button.parents(".wbdv-template");
        $usernameFld.attr("disabled","disabled");

        //$editBtn.click(console.log("hi"));
        //$editBtn.click(createUser());
        tr.remove();
    }
    function updateUser(event)
    {
        var username = $usernameFld.val();
        $usernameFld.val("");
        var timestamp = (new Date()).getTime();
        var password = $passwordFld.val();
        $passwordFld.val("");
        var firstName= $firstNameFld.val();
        $firstNameFld.val("");
        var lastName= $lastNameFld.val();
        $lastNameFld.val("");
        var role= $roleFld.val();
        $roleFld.val("");
        var newUser = $userRowTemplate.clone();
        newUser.removeClass("wbdv-hidden");
        newUser.attr("id",timestamp);
        newUser.find(".wbdv-username").html(username);
        newUser.find(".wbdv-password").html(password);
        newUser.find(".wbdv-first-name").html(firstName);
        newUser.find(".wbdv-last-name").html(lastName);
        newUser.find(".wbdv-role").html(role);
        newUser.find(".wbdv-remove").attr("id",timestamp).click(deleteUser);
        newUser.find(".wbdv-edit").attr("id",timestamp).click(selectUser);
        $tbody.append(newUser);
        $usernameFld.removeAttr("disabled");
    }
    function renderUser(user)
    {
        var id=user.id;
        var username = user.username;
        $usernameFld.val("");
        var password = user.password;
        $passwordFld.val("");
        var firstName= user.firstName;
        $firstNameFld.val("");
        var lastName= user.lastName;
        $lastNameFld.val("");
        var role= user.role;
        $roleFld.val("");
        var newUser = $userRowTemplate.clone();
        newUser.removeClass("wbdv-hidden");
        newUser.attr("id",id);
        newUser.find(".wbdv-username").html(username);
        newUser.find(".wbdv-password").html(password);
        newUser.find(".wbdv-first-name").html(firstName);
        newUser.find(".wbdv-last-name").html(lastName);
        newUser.find(".wbdv-role").html(role);
        newUser.find(".wbdv-remove").click(deleteUser);
        newUser.find(".wbdv-edit").click(selectUser);
        $tbody.append(newUser);
    }
    function renderUsers(users)
    {
        users.then(function (value) {
            for(var i=0;i<value.length;i++)
            {
                renderUser(value[i]);
            }
        });
    }
})();

