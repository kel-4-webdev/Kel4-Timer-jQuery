let seconds = 0;
let minutes = 0;
let hours = 0;
let display_seconds = 0;
let display_minutes = 0;
let display_hours = 0;
let interval = null;
let status = "stopped";

window.addEventListener('beforeunload', function (e) {

    e.preventDefault()

    // localStorage.setItem('closed-time', new Date());
    // localStorage.setItem('Time', JSON.stringify({hours, minutes, seconds}));
    // localStorage.setItem('stat', status);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'http://localhost:3000/users', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        time: new Date(),
        status: status,
    }));
    console.log(this.status)

});

window.addEventListener('load', function (e) {

    let close_time = localStorage.getItem('closed-time');
    let elapsed_time = (new Date().getTime() - new Date(close_time).getTime())/1000;
    let duration = JSON.parse(localStorage.getItem('Time'));
    let time_to_sec = calculateDuration(duration.hours, duration.minutes, duration.seconds);

    if (localStorage.getItem('stat') === "paused") {
        seconds = Math.floor(elapsed_time + time_to_sec);
        let valueTime = secondToTime(seconds)
        hours = valueTime[0]
        minutes = valueTime[1]
        seconds = valueTime[2] - 1 // -1 because startTimer() starting with seconds++
        startTimer() // set time when first load
        startstopcontinue(); // rev for timer auto play when refresh
    }

    if (localStorage.getItem('stat') === "continue") {
        hours = duration.hours
        minutes = duration.minutes
        seconds = duration.seconds - 1 // -1 because startTimer() starting with seconds++
        status = "paused"
        startTimer()
        startstopcontinue()
    }

    // EXPERIMENT
    /*get the inner html value of div with "address" as its ID*/
    // var long= "long=" + $('#longitude').val();
    // var lat = "lat=" + $('#latitude').val();   
    // var data = "id=" + $('#id').html()+'&'+long+'&'+lat;

    // $.ajax({
    //     type: 'GET',
    //     url: "http://localhost:3000/users",
    //     data: data
    // })
    // .done(function(data) {
    //     /*handle successful call here*/
    // })
    // .fail(function(data) {
    //     /*oops, something went wrong*/
    // })
    // .always(function(data) {
    //     /*no matter what, let's do this*/
    // }); 
    // $.getJSON('/users/36', function(response) {
    //     time = this.time
    //     // do something with the response, which should be the same as 'results.rows' above
    //   });

    // var xhr = new XMLHttpRequest();
    // // we defined the xhr

    // xhr.onreadystatechange = function () {
    //     if (this.readyState != 4) return;

    //     if (this.status == 200) {
    //         var data = JSON.parse(this.responseText);

    //         // we get the returned data
    //     }

    //     // end of state change: it can be after some time (async)
    // };

    // xhr.open('GET', 'http://localhost:3000/users/36', true);
    // xhr.send();

    

});


function startTimer(){
    seconds++;
    if (seconds / 60 === 1) {
        seconds = 0;
        minutes++;
        if (minutes / 60 === 1){
            minutes = 0;
            hours++;
        }                    
    }
    if (seconds < 10){
        display_seconds = "0" + seconds.toString();
    }
    else{
        display_seconds = seconds;
    }
    if (minutes < 10){
        display_minutes = "0" + minutes.toString();
    }
    else{
        display_minutes = minutes;
    }
    if (hours < 10){
        display_hours = "0" + hours.toString();
    }
    else{
        display_hours = hours;
    }
    document.getElementById('hours').innerHTML = display_hours;
    document.getElementById('minutes').innerHTML = display_minutes;
    document.getElementById('seconds').innerHTML = display_seconds;
}

function startstopcontinue() {
    if (status === "stopped"){
        interval=window.setInterval(startTimer, 1000);
        document.getElementById("start-stop-continue").innerHTML="Pause";
        status="paused";
    }
    else if (status === "paused"){
        window.clearInterval(interval);
        document.getElementById("start-stop-continue").innerHTML="Continue";
        status="continue";
    }
    else if (status === "continue"){
        interval=window.setInterval(startTimer, 1000);
        document.getElementById("start-stop-continue").innerHTML="Pause";
        status="paused"; 
    }
}

function stop(){
    window.clearInterval(interval);
    document.getElementById("start-stop-continue").innerHTML="Start";
    document.getElementById("pesan").innerHTML="Total Waktu Pengerjaan : " + hours + " Jam " + minutes + " Menit " + seconds + " Detik";
    status = "stopped";
    seconds = 0;
    minutes = 0;
    hours = 0;
    document.getElementById('hours').innerHTML = "00";
    document.getElementById('minutes').innerHTML = "00";
    document.getElementById('seconds').innerHTML = "00";
}

function calculateDuration(hour, minute, second) {
    let duration = 0;
    duration += hour * 3600;
    duration += minute * 60;
    duration += second;

    return duration;
}


function secondToTime(second) {
    var sec_num = parseInt(second, 10);
    var sec2hours   = Math.floor(sec_num / 3600);
    var sec2minutes = Math.floor((sec_num - (sec2hours * 3600)) / 60);
    var sec2seconds = sec_num - (sec2hours * 3600) - (sec2minutes * 60);
    return [sec2hours, sec2minutes, sec2seconds];
} 

