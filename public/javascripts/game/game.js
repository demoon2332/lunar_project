
var mainAudio = new Audio("sound/sound.mp3");
mainAudio.volume = 0.5;
const questions = JSON.parse(sessionStorage.getItem("questions"))

var index = 0;
const question1 = questions[0];
const question2 = questions[1];
const question3 = questions[2];
const question4 = questions[3];
const question5 = questions[4];
const answers = [];


$(document).ready(async function () {
  // process bar
  Swal.fire({
    allowOutsideClick: false, 
    title: "Cậu ơi ",
    text: "Tớ có điều asasasy muốn hỏi cậu.",
    imageUrl: "images/game/cuteCat.jpg",
    imageWidth: 300,
    imageHeight: 300,
    background: '#fff url("images/iput-bg.jpg")',
    imageAlt: "Custom image",
  })

  setTimeout(function () {
    //basicDialog();
    $(".spinner").fadeOut();
    $("#preloader").delay(350).fadeOut("slow");
    $("body").delay(350).css({
      overflow: "visible",
    });
  }, 600);
  startDialogs();
});

async function findDialog(question) {
  if(index < questions.length-1){
    index = index + 1;
  }
  else{
    return finalDialog()
  }
  const dialogMap = {
    "radio": radioDialog,
    "date": dateDialog,
    "text": textDialog,
    "no-input": textDialog,
  };

  const dialogFunction = dialogMap[question.type];
  
  return dialogFunction ? await dialogFunction(question) : undefined;
}

async function startDialogs() {
  // Sequentially process all questions
  for (const question of questions) {
    try {
      const response = await findDialog(question);
      answers.push(response);
    } catch (error) {
      console.error("Error processing question:", error);
    }
  }
  console.log("All dialogs completed", answers);
}

async function radioDialog(question) {

  return await Swal.fire({
    allowOutsideClick: false,
    title: question.name,
    imageUrl: "images/game/cuteCat.jpg",
    imageWidth: 150,
    imageHeight: 150,
    html: generateRadioHTML(question.answers), // Dynamically generate HTML for the radio buttons
    showCancelButton: true,
    confirmButtonText: "Submit",
    cancelButtonText: "Cancel",
    onOpen: () => {
      // Disable the confirm button initially
      Swal.disableButtons();

      // Add event listener to enable confirm button on radio selection
      document.querySelectorAll('input[name="radio-options"]').forEach((input) => {
        input.addEventListener("change", () => {
          Swal.enableButtons();
        });
      });
    },
  }).then((result) => {
    if (result.isConfirmed) {
      // Retrieve the selected value
      const selectedOption = document.querySelector('input[name="radio-options"]:checked');
      const value = selectedOption ? selectedOption.value : null;

      console.log("ANSWER HERE:", value);
      return value;
    }
    return null;
  });
}

// Helper function to generate HTML for radio buttons
function generateRadioHTML(options) {
  if (!options || options.length === 0) {
    return "<p>No options available</p>";
  }

  return options
    .map(
      (option, index) => `
        <div>
          <input 
            type="radio" 
            id="option-${index}" 
            name="radio-options" 
            value="${option.value}" 
          />
          <label for="option-${index}">${option.value}</label>
        </div>
      `
    )
    .join("");
}


async function dateDialog(question) {
  return await Swal.fire({
    allowOutsideClick: false,
    title: question.name,
    html: `
      <label for="datepicker">Select Date:</label>
      <input type="date" id="datepicker" class="swal2-input">
    `,
    preConfirm: () => {
      const date = document.getElementById('datepicker').value;
      if (!date) {
        Swal.showValidationMessage('Please select a date!');
      }
      return date; // Return the selected date
    }
  }).then(async (result) => {
    if (result.isConfirmed) {
      // Format the date as dd/mm/yyyy
      const [year, month, day] = result.value.split('-');
      const formattedDate = `${day}/${month}/${year}`;
      
      console.log('Selected date:', formattedDate);
      return formattedDate;
    }
    return null;
  });
}



async function textDialog(question) {
  const swalOptions = {
    allowOutsideClick: false, 
    title: question.name,
    input: "text",
    inputPlaceholder: question.hint,
    onOpen: () => {
      // Disable the confirm button initially
      console.log("Here is the text Dialog");
      Swal.disableButtons();

      // Add event listener to the text input field
      document.querySelector('input[type="text"]').addEventListener("input", (event) => {
        if (event.target.value.trim()) {
          Swal.enableButtons();
        } else {
          Swal.disableButtons();
        }
      });
    },
  }
  if(question.imageUrl){
    swalOptions.imageUrl = question.imageUrl;
    swalOptions.imageWidth = 150;
    swalOptions.imageHeight = 150;
  }

  return await Swal.fire(swalOptions).then((result) => {
    if (result.isConfirmed) {
      console.log("ANSWER HERE:", result.value);
      return result.value;
    }
    return null;
  });
}


async function finalDialog() {
  const { value: accept } = await Swal.fire({
    allowOutsideClick: false, 
    title: "Terms and conditions",
    input: "checkbox",
    inputValue: 1,
    inputPlaceholder: "Đây là bí mật .",
    confirmButtonText: 'Continue <i class="fa fa-arrow-right"></i>',
    inputValidator: (result) => {
      return !result && "Đừng nói ai biết nhá.";
    },
  });

  if (accept) {
    document.querySelector(".content").style.display = "block";
    mainAudio.play();
    // Call fetchData here
    const response = await fetchData();
    console.log("Here is the responsee")
    console.log(response);
    if(response){
      await Swal.fire({
        icon: 'success',
        title: `All your answer are correct`,
        showConfirmButton: false,
        width: "20em",
        timer: 2500
      });
    }
}
}

async function loadingDialog(){
  return await Swal.fire({
    position: "top-end",
    imageUrl:"images/game/cuteCat.jpg",
    imageWidth: 90,
    imageHeight: 90,
  })
}

// switch button position
function switchButton() {
  var audio = new Audio("sound/duck.mp3");
  audio.volume = 0.5;
  audio.play();
  var leftNo = $("#no").css("left");
  var topNO = $("#no").css("top");
  var leftY = $("#yes").css("left");
  var topY = $("#yes").css("top");
  $("#no").css("left", leftY);
  $("#no").css("top", topY);
  $("#yes").css("left", leftNo);
  $("#yes").css("top", topNO);
}
// move random button position
function moveButton() {
  var audio = new Audio("sound/Swish1.mp3");
  audio.volume = 0.4;
  audio.play();
  if (screen.width <= 600) {
    var x = Math.random() * 300;
    var y = Math.random() * 500;
  } else {
    var x = Math.random() * 500;
    var y = Math.random() * 500;
  }
  var left = x + "px";
  var top = y + "px";
  $("#no").css("left", left);
  $("#no").css("top", top);
}

var n = 0;
$("#no").mousemove(function () {
  if (n < 1) switchButton();
  if (n > 1) moveButton();
  n++;
});
$("#no").click(() => {
  if (screen.width >= 900) switchButton();
});

// generate text in input
function textGenerate() {
  var n = "";
  var text =
    " 10 Điểm luôn, không có nhưng ....................................  ";
  var a = Array.from(text);
  var textVal = $("#txtReason").val() ? $("#txtReason").val() : "";
  var count = textVal.length;
  if (count > 0) {
    for (let i = 1; i <= count; i++) {
      n = n + a[i];
      if (i == text.length + 1) {
        $("#txtReason").val("");
        n = "";
        break;
      }
    }
  }
  $("#txtReason").val(n);
  setTimeout("textGenerate()", 1);
}

// show popup
$("#yes").click(function () {
  var audio = new Audio("sound/tick.mp3");
  audio.volume = 0.5;
  audio.play();
  Swal.fire({
    title: "Có gì cần góp ý hay nói với tớ không ?  :vvvv",
    html: true,
    width: 900,
    padding: "3em",
    html: "<input type='text' class='form-control' id='txtReason' onmousemove=textGenerate()  placeholder='Theo tớ nghĩ thì ....'>",
    background: '#fff url("images/iput-bg.jpg")',
    backdrop: `
              rgba(0,0,123,0.4)
              url("images/giphy2.gif")
              url("images/mafia.gif")
              url("images/Cute.jpg")
              left top
              no-repeat
            `,
    showCancelButton: true,
    cancelButtonText: "Hủy :<<",
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonColor: "#fe8a71",
    cancelButtonColor: "#f6cd61",
    confirmButtonText: "Gửi <3",
  }).then((result) => {
    if (result.value) {
      Swal.fire({
        width: 900,
        confirmButtonText: "Oke <3",
        imageUrl: "images/form/InivitatingCard.png",
        imageWidth: 800,
        background: '#fff url("img/iput-bg.jpg")',
        title: "Tớ biết mà",
        text: "Cám ơn cậu đã ghé qua :>>>   ",
        confirmButtonColor: "#83d0c9",
        onClose: () => {
          // window.location = 'http://fb.com';
          // Get the current host (e.g., 'localhost:8089')
          //const currentHost = window.location.host;
          const currentHost = "https://www.facebook.com/ndtrong247";

          // Create a new URL using the current host
          //const newURL = `//${currentHost}`;
          const newURL = `${currentHost}`;

          // Set the window location to the new URL
          window.location.href = newURL;
        },
      });
    }
  });
});

// 01/August/2022
// radio button animation
function playPause(e) {
  console.log("jj");
  console.log(e.animationPlayState);
  if (e.style.animationPlayState == "running") {
    e.style.animationPlayState = "paused";
    mainAudio.pause();
  } else {
    e.style.animationPlayState = "running";
    mainAudio.play();
  }
}


async function fetchData() {
  // Get a reference to the loading popup
  const loadingPopup = document.getElementById('loadingPopup');
  
  try {
      // Show the loading pop-up
      loadingPopup.style.display = 'flex';

      // Fetch the extra data from the server using POST
      const response = await fetch('/form', {
          method: 'POST', // Specify POST method
          headers: {
              'Content-Type': 'application/json', // Indicate JSON payload
          },
          body: JSON.stringify({formId: questions[0].formId,answers: answers, }) // Example payload
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      loadingDialog();
      return await response.json();
      // Display the fetched data on the page
      //document.getElementById('extraData').textContent = JSON.stringify(data);
  } catch (error) {
      console.error('Error fetching extra data:', error);
      //document.getElementById('extraData').textContent = 'Error fetching data!';
  } finally {
      // Hide the loading pop-up
      loadingPopup.style.display = 'none';
  }
}


//
