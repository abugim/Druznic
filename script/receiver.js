(function() {
    var i = 0;
    setInterval(function () {
        $('#div_stat').html(i);
        i++;
    }, 100);
});


// var i = 0;
//
// function timedCount() {
//     i = i + 1;
//     postMessage(i);
//     setTimeout("timedCount()",500);
// }
//
// timedCount();
