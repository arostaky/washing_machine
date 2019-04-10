var socket = io();
socket.on('timer', function (data) {
    $('#counter').html(data.countdown);
    console.log('whats the status? ' + data.status);
    if (data.countdown == 0) {
        // sending to the client
        socket.emit('hello', 'can you hear me?', 1, 2, 'abc');
    }
});
socket.on('status', function (data) {
    if (data.status == false) {
        $('.toggle').addClass('off');
        $('#showTime').hide();
    } else {
        $('.toggle').removeClass('off');
        $('#showTime').show();
    }
});
$('#reset').click(function () {
    socket.emit('reset');
});
var localUser = localStorage.getItem('username'), tempVal;
var postItem = function (val) {
    var data = { name: val };
    $.ajax({
        type: 'POST',
        url: '/user',
        timeout: 2000,
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            //show content
            console.log('Success!' + data);
            $('#modalName').modal('hide');
        },
        error: function (jqXHR, textStatus, err) {
            //show error message
            console.log('text status ' + textStatus + ', err ' + err)
        }
    });
}
var postTime = function (val) {
    let data = { time: val };
    $.ajax({
        type: 'POST',
        url: '/time',
        timeout: 2000,
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            //hide the time scroll and ok btn
            console.log('time sent!', data);
            $('#showTime').hide();
        },
        error: function (jqXHR, textStatusm, err) {
            //show erro
            console.log('text status ' + textStatus + ', err ' + err);
        }
    });
}
//time selector
var slider = document.getElementById("timeSelector");
var output = document.getElementById("timetoShow");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function () {
    output.innerHTML = this.value + ' mins';
}
$(document).ready(function () {
    if (localUser == null) {
        $('#modalName').modal('show');
    } else {
        $('#showToast').toast('show');
        $('#insertuser').text(localUser);
    }
    console.log('localuser:' + localUser);
    $('#okBtn').on('click', function () {
        //check if they put name on it:
        tempVal = $('#usr').val();
        if (tempVal != '') {
            postItem(tempVal);
        } else {
            console.log('mother f* didnt put name');
        }
        localStorage.setItem('username', tempVal);
    });
    $('#gobtn').on('click', function () {
        console.log('clicked ok!')
        let timeselector = $('#timeSelector').val();
        postTime(timeselector);
    });
    //show last user only if status if busy:

    // $.get('/showlast', function (data) {
    //     $('#lastUser').text(data);
    // });
});
//$('.toggle').addClass('off');