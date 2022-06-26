let count = 0
let temperature=35
function Animation_Control() {
    if(count %2 != 0){
        Speek("voice assistiant shutdown.")
        stopRocket();
    }
    else{
        Speek("Voice assistaint started.")
        startRecognization();
    }
    count += 1
}


function Speek(speechToSpeek) {
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(speechToSpeek));
}

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new window.SpeechRecognition();

function startRecognization() {
    recognition.interimResults = true;
    recognition.addEventListener('result', (e) => {
        let text = Array.from(e.results).map(result => result[0]).map(result => result.transcript).join('');
        console.log(text);
        if (e.results[0].isFinal) {
            text = text.toLowerCase()
            if (text.includes('nexa') || text.includes('nexa') ) {
                switch (true) {
                    case text.indexOf('open') != -1:
                        if (text.includes("whatsapp")) {
                            Speek("opening whatsapp")
                            window.open("https://www.whatsapp.com/","_blank");
                        }
                        else if (text.includes('instagram') || text.includes('insta') || text.includes('reels')) {
                            Speek("Openig Instagram")
                            window.open("https://www.instagram.com/","_blank");
                        }
                        else if (text.includes('youtube') || text.includes('videos')) {
                            Speek("Opening Youtube")
                            window.open("https://youtube.com/","_blank");
                        }
                        else if(text.includes('twitter')||text.includes('tweet')){
                            Speek("Opening twitter")
                            window.open("https://twitter.com");
                        }
                        else if(text.includes('discord')||text.includes('Discord')){
                            Speek("Opening discord")
                            window.open("https://discord.com/channels/@me");
                        }
                        else{
                            Speek("These are the Results i found")
                            idx = text.indexOf('open')
                            tosearch = text.slice(idx+5)
                            window.open('https://www.google.com/search?q='+tosearch);   
                        }
                        break;
                    case text.indexOf('search') != -1:
                        idx = text.indexOf('search')
                        tosearch = text.slice(idx+7)
                        Speek("searching "+tosearch)
                        window.open('https://www.google.com/search?q='+tosearch);
                        break;
                    case text.indexOf('help') != -1 || text.indexOf('show commands'):
                        Speek("These are the commands");
                        document.getElementById("help").click();
                        break;
                    case text.indexOf('joke') != -1 || text.indexOf('jokes'):
                        var jokes=["What is the most shocking city in the world?Electricity",
                                    "Why don't some couples go to the gym?Because some relationships don't workout",
                                    "The right eye said to the left eye, between you and me, something smells",
                                    "Why did the banker switch careers?  She lost interest",
                                    "Can a kangaroo jump higher than a house? Of course! Houses can't jump"
                                ];
                            var item = jokes[Math.floor(Math.random()*jokes.length)];
                            document.getElementById('').src="./images/laugh.gif";
                            Speek(item);
                        break;
                    case text.indexOf('weather') != -1 || text.indexOf('climate'):
                        let lon;
                        let lat;
                        const kelvin = 273;
                        window.addEventListener("load", () => {
                            if (navigator.geolocation)
                            {
                                navigator.geolocation.getCurrentPosition((position) => {
                                // console.log(position);
                                lon = position.coords.longitude;
                                lat = position.coords.latitude;
                                const api = "6d055e39ee237af35ca066f35474e9df";
                                const base =
                                `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&` +
                                `lon=${lon}&appid=6d055e39ee237af35ca066f35474e9df`;
                                fetch(base)
                                    .then((response) => {
                                    return response.json();
                                    })
                                    .then((data) => {
                                    temperature = Math.floor(data.main.temp - kelvin);
                                    console.log(temperature);
                                    });
                                });
                            }
                            });
                            Speek("current temperature is "+temperature+"degree centigrades ");
                            if(parseInt(temperature) < 30)
                            {
                                document.getElementById('logo').src="./images/cold.gif";
                            }
                            else if(temperature >= 30)
                            {
                                document.getElementById('logo').src="./images/hot.gif";
                            }
                            else{
                                document.getElementById('logo').src="./images/shut.gif";
                            }
                            break;
                        case (text.indexOf('I am feeling') != -1) || (text.indexOf("I am") != -1) || (text.indexOf('i am') != -1) || (text.indexOf('iam') != -1 || text.indexOf('its') != -1 || text.indexOf("it's") != -1 || text.indexOf('lets') != -1):
                                    if ( (text.indexOf('surprise') != -1)||(text.indexOf('surprised') != -1))
                                    {
                                        document.getElementById('logo').src="./images/whooaa.gif";
                                        Speek("Good to hear that");
                                    }
                                    else if ( (text.indexOf('angry') != -1)){
                                        document.getElementById('logo').src="./images/angry.gif";
                                        Speek('Sometimes, you have to get angry to get things done.');
                                    }
                                    else if ( (text.indexOf('sad') != -1) ||  (text.indexOf('unhappy') != -1)){
                                        document.getElementById('logo').src="./images/sad.gif";
                                        Speek("Sorry to hear that I wish I had arms to hug you ")
                                    }
                                    else if ( (text.indexOf('party') != -1) ||  (text.indexOf('party time') != -1)){
                                        document.getElementById('logo').src="./images/party.gif";
                                        Speek("Let's get this party started");
                                    }
                                    break;
                        default:
                            Speek('Command not found .. please follow these commands');
                            document.getElementById("help").click();
                            break
                }
            }
        }
    })
    recognition.addEventListener('end', () => {
        recognition.start();
    })
    recognition.start();
}
function stopRocket() {
    recognition.stop();
}
