
$(function(){
$('#menu').slicknav();
});

$("form").on("submit",function(form)
{
if(!$("#agree_checkbox").prop("checked"))
{
$("#agree_chk_error").show();
}
else
{
$("#agree_chk_error").hide();
}
$("form")[0].reset();
return false;
})

$('#webBtn').hide();
$('#textarea').on('keyup', function() {
    if (this.value.length) {
        $('#webBtn').show();
    }else{
        $('#webBtn').hide();
    }
});



// show and Hide div
// function toggleDiv() {
//   $("#section-2").hide();
//     setTimeout(function () {
//         $("#section-1").hide();
//         $("#section-2").show();
//         setTimeout(function () {
//             $("#section-1").show();
//             $("#section-2").hide();
//             toggleDiv();
//         }, 4800);
//     }, 1500);
// }
// $(function() {
// $("#section-2").hide();
// $("#section-3").hide();
//     setTimeout(function() {
//         $("#section-1").hide()
//     }, 5000);
//     setTimeout(function () {
//         $("#section-2").show();
//         setTimeout(function () {
//             $("#section-3").show();
//             $("#section-2").hide();
//             $("#section-1").hide();
//             toggleDiv();
//         }, 10000);
//     }, 5000);
// });

$(function() {
$("#p1").hide();
$("#p2").hide();
$("#p3").hide();
$("#section-2").hide();
$("#section-3").hide();
$("#section-4").hide();
  setTimeout(function() {
    $("#p1").fadeIn(2000);
      setTimeout(function () {
        $("#p2").fadeIn(3000);
        $("#p1").hide();
        setTimeout(function () {
          $("#p3").fadeIn(3000);
          $("#section-4").show();
          $("#sec4Floral").show();
          $("#sec1Floral").hide();
          $("#p1").hide();
          $("#p2").hide();
          $("#sec1Btn").hide();
          setTimeout(function () {
            // $("#section-3").show();
            // $("#sec3Floral").show();
            $("#section-2").show();
            $("#sec2Btn").hide();
            $("#section-4").hide();
            setTimeout(function () {
            $("#section-3").show();
            $("#sec3Floral").show();
            $("#section-2").hide();
            $("#sec2Btn").hide();
            $("#section-4").hide();
            toggleDiv();
            },15000);
          },5000);
        }, 12000);
      }, 15000);
  }, 1000);
});
// show and Hide div



// color change depending on +ve and -ve Values
function MakePosNeg() {
var TDs = document.querySelectorAll('.plusmin');
for (var i = 0; i < TDs.length; i++) {
var temp = TDs[i];
if (temp.firstChild.nodeValue.indexOf('-') == 0) {temp.className = "negative";}
else {temp.className = "positive";}
}
}
onload = MakePosNeg()
// color change depending on +ve and -ve Values

// form Tabs start
var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  //... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Show me the results of my test";
    // document.getElementById("nextBtn").classList.add("mystyle");
    $("#nextBtn").removeAttr('onclick');
    $('#nextBtn').attr('onClick','result()');

  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
     $("#nextBtn").removeAttr('onclick');
    $('#nextBtn').attr('onClick','nextPrev(1)');


  }
  //... and run a function that will display the correct step indicator:
  fixStepIndicator(n)
}

// jQuery(document).ready(function(){

// // $( ".mystyle" ).click(function() {

// //   alert('wwww');

// // //   var elem = document.getElementById('nextBtn');
// // // var txt = elem.textContent || elem.innerText;
// // // if(txt == "SHOW ME THE RESULTS OF MY TEST"){
// // // location.replace("result.html")
// // // return;
// // // }
  
// // });

//    $(document).on("click",".mystyle",function() {
//         alert("click bound to document listening for #test-element");
//     });

// });

function result(){


  location.replace("result.html");

  return;




}

function nextPrev(n) {

// var elem = document.getElementById('prevBtn');
// var txt = elem.textContent || elem.innerText;
// if(txt == "Previous"){
// location.replace("question-page.html")
// return;
// }




// This function will figure out which tab to display
var x = document.getElementsByClassName("tab");
// Exit the function if any field in the current tab is invalid:
if (n == 1 && !validateForm()) return false;
// Hide the current tab:
x[currentTab].style.display = "none";
// Increase or decrease the current tab by 1:
currentTab = currentTab + n;
// if you have reached the end of the form...
if (currentTab >= x.length) {
// ... the form gets submitted:
document.getElementById("regForm").submit();
return false;
}
// Otherwise, display the correct tab:
showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class on the current step:
  x[n].className += " active";
}
// form Tabs end

// slicknav-script
 $(function(){
   $('#menu').slicknav();
 });
// slicknav-script

// WOW-script
new WOW().init();
// WOW-script

// owl-carousel script
$('.Saying_slider').slick({
  dots: false,
  arrows:true,
  infinite: true,
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: false
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});

$('.Blog_slider').slick({
  dots: false,
  arrows:true,
  infinite: true,
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: false
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});

$(document).ready(function() {

  $(".toggle-accordion").on("click", function() {
    var accordionId = $(this).attr("accordion-id"),
      numPanelOpen = $(accordionId + ' .collapse.in').length;
    
    $(this).toggleClass("active");

    if (numPanelOpen == 0) {
      openAllPanels(accordionId);
    } else {
      closeAllPanels(accordionId);
    }
  })

  openAllPanels = function(aId) {
    console.log("setAllPanelOpen");
    $(aId + ' .panel-collapse:not(".in")').collapse('show');
  }
  closeAllPanels = function(aId) {
    console.log("setAllPanelclose");
    $(aId + ' .panel-collapse.in').collapse('hide');
  }
     
});
//plugin bootstrap minus and plus


$('.brandsSlider').slick({
  dots: false,
  arrows:false,
  infinite: true,
  speed: 300,
  slidesToShow: 5,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});

$('.say_slider').slick({
  dots: false,
  infinite: false,
  arrows:true,
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: false
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});


// quantity start
var QtyInput = (function () {
var $qtyInputs = $(".qty-input");
if (!$qtyInputs.length) {
return;
}
var $inputs = $qtyInputs.find(".product-qty");
var $countBtn = $qtyInputs.find(".qty-count");
var qtyMin = parseInt($inputs.attr("min"));
var qtyMax = parseInt($inputs.attr("max"));
$inputs.change(function () {
var $this = $(this);
var $minusBtn = $this.siblings(".qty-count--minus");
var $addBtn = $this.siblings(".qty-count--add");
var qty = parseInt($this.val());
  if (isNaN(qty) || qty <= qtyMin) {
  $this.val(qtyMin);
  $minusBtn.attr("disabled", true);
  } else {
  $minusBtn.attr("disabled", false);

  if(qty >= qtyMax){
  $this.val(qtyMax);
  $addBtn.attr('disabled', true);
  } else {
  $this.val(qty);
  $addBtn.attr('disabled', false);
  }
}
});

$countBtn.click(function () {
var operator = this.dataset.action;
var $this = $(this);
var $input = $this.siblings(".product-qty");
var qty = parseInt($input.val());

if (operator == "add") {
qty += 1;
if (qty >= qtyMin + 1) {
$this.siblings(".qty-count--minus").attr("disabled", false);
}

if (qty >= qtyMax) {
$this.attr("disabled", true);
}
} else {
qty = qty <= qtyMin ? qtyMin : (qty -= 1);

if (qty == qtyMin) {
$this.attr("disabled", true);
}

if (qty < qtyMax) {
$this.siblings(".qty-count--add").attr("disabled", false);
}
}

$input.val(qty);
});
})();
// quantity end


// Range Slider start
var slider = document.getElementById("slider");
var output = document.getElementById("output");
output.innerHTML = slider.value;

slider.oninput = function() {
output.innerHTML = this.value;
}
// Range Slider start

