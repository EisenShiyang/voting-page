var firebaseConfig = {
    apiKey: "AIzaSyC_fLQ_hmRmsEyXnrxxX3mjgT19etwoPWg",
    authDomain: "voting-page.firebaseapp.com",
    projectId: "voting-page",
    storageBucket: "voting-page.appspot.com",
    messagingSenderId: "1006072720919",
    appId: "1:1006072720919:web:d84f367f50fea8839cf652",
    measurementId: "G-4KEXJWG8ZQ"
};

firebase.initializeApp(firebaseConfig);

var color;
var red = 0;
var blue = 0;
var yellow = 0;
var last_vote;
var vote_history = new Array();

firebase.firestore().collection("colors").doc('red').onSnapshot((doc)=>{
    red = doc.data().count
    myChart.data.datasets.forEach((dataset) => {
        dataset.data[0] = red
        document.getElementById('btn1').textContent = red;
    });
    myChart.update();
});

firebase.firestore().collection("colors").doc('blue').onSnapshot((doc)=>{
    blue = doc.data().count
    myChart.data.datasets.forEach((dataset) => {
        dataset.data[1] = blue
        document.getElementById('btn2').textContent = blue;
    });
    myChart.update();
});

firebase.firestore().collection("colors").doc('yellow').onSnapshot((doc)=>{
    yellow = doc.data().count
    myChart.data.datasets.forEach((dataset) => {
        dataset.data[2] = yellow
        document.getElementById('btn3').textContent = yellow;
    });
    myChart.update();
});

var ctx = document.getElementById('chart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [{
            label: '# of Votes',
            data: [red, blue, yellow],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

function addData(chart, label, data) {

}

document.getElementById('btn1').addEventListener('click', () => {
    firebase.firestore().collection('colors').doc('red').set({count: red + 1})
    last_vote = firebase.firestore.Timestamp.now().toDate()
    vote_history.push(last_vote + ' -> Red')
    document.getElementById('last_vote').innerHTML = last_vote + ' -> Red'
})
document.getElementById('btn2').addEventListener('click', () => {
    firebase.firestore().collection('colors').doc('blue').set({count: blue + 1})
    last_vote = firebase.firestore.Timestamp.now().toDate()
    vote_history.push(last_vote + ' -> Blue')
    document.getElementById('last_vote').innerHTML = last_vote + ' -> Blue'
})
document.getElementById('btn3').addEventListener('click', () => {
    firebase.firestore().collection('colors').doc('yellow').set({count: yellow + 1})
    last_vote = firebase.firestore.Timestamp.now().toDate()
    vote_history.push(last_vote + ' -> Yellow')
    document.getElementById('last_vote').innerHTML = last_vote + ' -> Yellow'
})
document.getElementById('clear').addEventListener('click', () => {
    firebase.firestore().collection('colors').doc('red').set({count: 0})
    firebase.firestore().collection('colors').doc('blue').set({count: 0})
    firebase.firestore().collection('colors').doc('yellow').set({count: 0})
    last_vote = firebase.firestore.Timestamp.now().toDate()
    vote_history.push(last_vote + ' -> Clear votes')
    document.getElementById('last_vote').innerHTML = last_vote + ' -> Clear votes'
    console.log(vote_history)
    vote_history = [ ]
})
