
var userListData = [];

$(document).ready(function() {

    // Populate the user table on initial page load
    populateTable();
       // Username link click
    $('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);
	// Add User button click
    $('#btnAddUser').on('click', addUser);
	 // Delete User link click
    $('#userList table tbody').on('click', 'td a.linkdeleteuser', deleteUser);
});




function populateTable() {

   
    var tableContent = '';

    
    $.getJSON( '/users/userlist', function( data ) {

    userListData = data;
       
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '" title="Show Details">' + this.username + '</a></td>';
            tableContent += '<td>' + this.email + '</td>';
			tableContent += '<td>' + this.organization + '</td>';
            tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

       
        $('#userList table tbody').html(tableContent);
    });
};
// Show User Info
function showUserInfo(event) {

    event.preventDefault();
    var thisUserName = $(this).attr('rel');
    var arrayPosition = userListData.map(function(arrayItem) { return arrayItem.username; }).indexOf(thisUserName);
	var thisUserObject = userListData[arrayPosition];

    //Populate Info Box
	$('#userInfoName').text(thisUserObject.username);
	$('#userInfoEmail').text(thisUserObject.email);
	$('#userInfoOrganization').text(thisUserObject.organization);
    $('#userInfoComments').text(thisUserObject.comments);

};
// Delete User
function deleteUser(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this user?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/users/deleteuser/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateTable();

        });

    }
    else {

        
        return false;

    }

};


// Add User
function addUser(event) {
    event.preventDefault();

    var errorCount = 0;
    $('#addUser input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    if(errorCount === 0 || errorCount === 1 ) {

        var newUser = {
	        '_id': $('#addUser fieldset input#inputUserEmail').val(),
            'username': $('#addUser fieldset input#inputUserName').val(),
            'email': $('#addUser fieldset input#inputUserEmail').val(),
            'organization': $('#addUser fieldset input#inputUserOrganisation').val(),
            'comments': $('#addUser fieldset input#inputUserComments').val()
        }

       
        $.ajax({
            type: 'POST',
            data: newUser,
            url: '/users/adduser',
            dataType: 'JSON'
        }).done(function( response ) {

            
            if (response.msg === '') {
               alert('Success: Thanks for the confirmation!');
                // Clear the form inputs
                $('#addUser fieldset input').val('');

                // Update the table
                populateTable();

            }
            else {
                alert('Thank-you, your confirmation is already registered!');

            }
        });
    }
    else {
                alert('Please fill in all fields,comment is optional');
        return false;
    }
};