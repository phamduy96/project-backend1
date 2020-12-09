// var users = document.getElementsByClassName('user');
// for(let i = 0; i < users.length; i++){
//     let edituser = document.getElementById('edituser-' +i);
//     edituser.addEventListener('click', function(){
//         document.getElementById('user-id' + i).style.display   =  'none';
//         document.getElementById('user-username' + i).style.display =  'none';
//         document.getElementById('user-password' + i).style.display = 'none';
//          document.getElementById('user-email' + i).style.display = 'none';

//         document.getElementById('edit-id' + i).style.display =    'block';
//         document.getElementById('edit-username' + i).style.display  = 'block';
//         document.getElementById('edit-password' + i).style.display =  'block';
//         document.getElementById('edit-email' + i).style.display = 'block';
//     })
// }

var i = 1;
var edituser = document.getElementById('edituser-1');
edituser.addEventListener('click', function () {
    document.getElementById('user-id-1').style.display = 'none';
    document.getElementById('user-username-1').style.display = 'none';
    document.getElementById('user-password-1').style.display = 'none';
    document.getElementById('user-email-1').style.display = 'none';

    document.getElementById('edit-id-1').style.display = 'block';
    document.getElementById('edit-username-1').style.display = 'block';
    document.getElementById('edit-password-1').style.display = 'block';
    document.getElementById('edit-email-1').style.display = 'block';
})


