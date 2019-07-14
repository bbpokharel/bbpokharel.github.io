function doEmailSubmit() {
  var package = getUrlParam('package', 'Empty');

  if (package == "driversEdPackage") {
    return doEmailSubmitFull();
  } else {
    return doEmailSubmitMini();
  }

}
function doEmailSubmitFull() {
  var packageText = getSelectedPackageForSubmit();
  var template_params = {
    "student_name": document.getElementById('student_name').value == null ? '' : document.getElementById('student_name').value,
    "street_address": document.getElementById('address').value == null ? '' : document.getElementById('address').value,
    "city": document.getElementById('city').value == null ? '' : document.getElementById('city').value,
    "zip": document.getElementById('zip').value == null ? '' : document.getElementById('zip').value,
    "home_phone": document.getElementById('home_phone').value,
    "cell_phone": document.getElementById('student_cell').value,
    "student_email": document.getElementById('student_email').value == null ? '' : document.getElementById('student_email').value,

    "parent_name": document.getElementById('parent_name').value == null ? '' : document.getElementById('parent_name').value,
    "parent_email": document.getElementById('parent_email').value == null ? '' : document.getElementById('parent_email').value,
    "parent_phone": document.getElementById('parent_phone').value == null ? '' : document.getElementById('parent_phone').value,

    "best_time_to_call": document.getElementById('best_time_to_call').value == null ? '' : document.getElementById('best_time_to_call').value,
    "permit": document.getElementById('learners_permit').value == null ? '' : document.getElementById('learners_permit').value,
    "dob": document.getElementById('dob').value,
    "starting_date": document.getElementById('starting_date').value,
    "notes": document.getElementById('notes').value == null ? '' : document.getElementById('notes').value,

    "package": packageText,
    "agreedToPrice": document.getElementById('agreedToPrice').checked,
    "agreed": document.getElementById('agreeToTerms').checked
  }
  var service_id = "default_service";
  var template_id = 'registerformemail';

  var status = emailjs.send(service_id, template_id, template_params).then(function(result) { console.log("result is", result)});
  console.log("status", status);

  alert("Registration Information Saved! If you don't hear back from us in 48 hours, please give us a call!")
  window.location.replace("https://www.bbbautoschool.com/");
  return false;
}

function doEmailSubmitMini() {
  var packageText = getSelectedPackageForSubmit();
  var template_params = {
    "student_name": document.getElementById('student_name').value == null ? '' : document.getElementById('student_name').value,
    "street_address": document.getElementById('address').value == null ? '' : document.getElementById('address').value,
    "city": document.getElementById('city').value == null ? '' : document.getElementById('city').value,
    "zip": document.getElementById('zip').value == null ? '' : document.getElementById('zip').value,
    "cell_phone": document.getElementById('student_cell').value,
    "student_email": document.getElementById('student_email').value == null ? '' : document.getElementById('student_email').value,


    "best_time_to_call": document.getElementById('best_time_to_call').value == null ? '' : document.getElementById('best_time_to_call').value,
    "permit": document.getElementById('learners_permit').value == null ? '' : document.getElementById('learners_permit').value,
    "dob": document.getElementById('dob').value,

    "road_test_date": document.getElementById('road_test_date').value == null ? '' : document.getElementById('road_test_date').value,
    "road_test_time": document.getElementById('road_test_time').value == null ? '' : document.getElementById('road_test_time').value,
    "road_test_location": document.getElementById('road_test_location').value == null ? '' : document.getElementById('road_test_location').value,

    "package": packageText,
    "agreedToPrice": document.getElementById('agreedToPrice').checked,
    "agreed": document.getElementById('agreeToTerms').checked
  }
  var service_id = "default_service";
  var template_id = 'roadtestpackage';

  console.log(template_params);
  
  var status = emailjs.send(service_id, template_id, template_params).then(function(result) { console.log("result is", result)});
  console.log("status", status);

  alert("Registration Information Saved! If you don't hear back from us in 48 hours, please give us a call!")
  window.location.replace("https://www.bbbautoschool.com/");
  return false;
}

function addDashes(item) {
  if (document.getElementById(item).value) {
    var num = document.getElementById(item).value.replace(/-/g, "");

    var parts = [num.slice(0, 3), num.slice(3, 6), num.slice(6, 10)];

    var fNum = "";
    if (parts[2]) { fNum = parts[0] + "-" + parts[1] + "-" + parts[2]; }
    else if (parts[1]) { fNum = parts[0] + "-" + parts[1]; }
    else { fNum = parts[0]; }

    document.getElementById(item).value = fNum
  }
}

function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    vars[key] = value;
  });
  return vars;
}

function getUrlParam(parameter, defaultvalue) {
  var urlparameter = defaultvalue;
  if (window.location.href.indexOf(parameter) > -1) {
    urlparameter = getUrlVars()[parameter];
  }
  return urlparameter;
}
function updatePrivatePrice() {
  var e = document.getElementById("privatePackageHours");
  var hours = e.options[e.selectedIndex].text;
  var priceToUse = 50;

  var finalPrice = priceToUse * hours;
  
  if (hours == "6") {
   finalPrice = 270; 
  }

  if (!(isNaN(finalPrice))) {
    document.getElementById("finalPrice").innerHTML = "$" + finalPrice + ".00";
  } else {
    document.getElementById("finalPrice").innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  }
}
function getPrivatePackage() {
  const deal = `
      <h5>10% off Regular Price for sessions over 6 Hours!</h5>
      <h4>
        <table class="table">
          <tr>
            <td>Private Package</td>
            <td>$50.00 x 
              <select id="privatePackageHours" name="privatePackageHours" onchange="return updatePrivatePrice()">
                <option value="1" selected="selected">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select> 
              hour(s)
            </td>
            <td>
              <p name="finalPrice" id="finalPrice" style="width:200">$50.00</p>
            </td>
        </table>
      </h4>
    `;
  document.getElementById('packageSection').innerHTML = deal;
}
function updateDriversPackage() {
  var e = document.getElementById("driversPackage");
  var option = e.options[e.selectedIndex].value;

  if (option == "fullPackage") {
    document.getElementById("finalPrice").innerHTML = "$699.00";
  }
  else if (option == "30Hours") {
    document.getElementById("finalPrice").innerHTML = "$199.00";
  }
  else if (option == "12Hours") {
    document.getElementById("finalPrice").innerHTML = "$540.00";
  }
  else if (option == "6Hours") {
    document.getElementById("finalPrice").innerHTML = "$270.00";
  }
}
function getDriversEdPackage() {
  const deal = `
      <h4>
        <table class="table">
          <tr>
            <td>Driver's ED Program </td>
            <td>
              <select id="driversPackage" name="driversPackage" onchange="return updateDriversPackage()">
                <option value="fullPackage" selected="selected">Full Package</option>
                <option value="30Hours">30 Hours Classroom Lessons</option>
                <option value="12Hours">12 Hours Driving Instruction</option>
              </select>
            </td>
            <td>
              <p name="finalPrice" id="finalPrice" style="width:200">$699.00</p>
            </td>
        </table>
      </h4>
    `;
  document.getElementById('packageSection').innerHTML = deal;
}
function getRoadTestPackage() {
  const deal = `
      <h4>
        <table class="table">
          <tr>
            <td>
             Road Test Sponsorship
            </td>
            <td>
              <p name="finalPrice" id="finalPrice" style="width:200">$120.00</p>
            </td>
        </table>
      </h4>
    `;
  document.getElementById('packageSection').innerHTML = deal;
}
function noPackage() {
  const deal = `
      <h4>
        <table class="table">
          <tr>
            <td>
             No Package Selected
            </td>
            <td>
              <p name="finalPrice" id="finalPrice" style="width:200"></p>
            </td>
        </table>
      </h4>
    `;
  document.getElementById('packageSection').innerHTML = deal;
}

function getNonRoadTestTerms() {
  var content = `<label class="control-label"><input onchange="return enableRegisterButton()" type="checkbox" name="agreeToTerms"
          id="agreeToTerms">I have read and agree
        with the <a href="resources/Policies.pdf" target="_blank">Terms
          and Conditions</a>. <span
          style="color: #d00;font-family: 'Glyphicons Halflings'; font-weight: normal;font-size: 8px;">*</span></label>
    `;
  return content;
}
function getRoadTestTerms() {
  var content = `
      <br />
      <h4>Terms and Conditions</h4>
      <p>The RMV may cancel the road test schedule due to severe weather, state emergency and any other reason that BBB Auto School does not have any controls over. In order to confirm your appointment, please verify with RMV. If RMV cancels your appointment, you can reschedule with them.</p>
      <p>Road test sponsorship fee does not include any RMV Fees.</p>
      <p>Once booked for sponsorship with BBB Auto School, no cancellation can be made within 72 hours of the appointment.</p>
      <p>The student driver should be on time for their road test. If you are more than 15 minutes late, will be marked as no show resulting in a missed road test and no money will be refunded.</p>
      <label class="control-label"><input onchange="return enableRegisterButton()" type="checkbox" name="agreeToTerms"
          id="agreeToTerms">I have read and agree
        with the Terms
          and Conditions. <span
          style="color: #d00;font-family: 'Glyphicons Halflings'; font-weight: normal;font-size: 8px;">*</span></label>
    
    `;
  return content;

}

function getSelectedPackageForSubmit() {
  var optionChosen = getUrlParam('package', 'Empty');
  var output = "";

  if (optionChosen == "privatePackage") {
    var e = document.getElementById("privatePackageHours");
    var hours = e.options[e.selectedIndex].text;
    output = "Private Package - " + hours + " hours"
  }
  else if (optionChosen == "driversEdPackage") {
    var e = document.getElementById("driversPackage");
    var packages = e.options[e.selectedIndex].text;
    output = "Driver's ED Program - " + packages;
  }
  else if (optionChosen == "roadTestPackage") {
    output = "Road Test Sponsorship";
  } else {
    output = "None!";
  }
  return output;
}
function getPackageDetails() {
  var package = getUrlParam('package', 'Empty');

  document.getElementById("termsAndConditions").innerHTML = getNonRoadTestTerms();

  if (package == "privatePackage") {
    //hide form elements here
    document.getElementById("parentPhoneRow").style.display = "none";
    document.getElementById("parentEmailRow").style.display = "none";
    document.getElementById("parentNameRow").style.display = "none";

    document.getElementById("roadTestDateRow").style.display = "none";
    document.getElementById("roadTestTimeRow").style.display = "none";
    document.getElementById("roadTestLocationRow").style.display = "none";

    //required
    document.getElementById("permitRequiredFlag").style.display = "block";
    document.getElementById("learners_permit").required = true;

    return getPrivatePackage();
  }
  else if (package == "roadTestPackage") {

    document.getElementById("termsAndConditions").innerHTML = getRoadTestTerms();
    //hide form elements here
    document.getElementById("parentPhoneRow").style.display = "none";
    document.getElementById("parentEmailRow").style.display = "none";
    document.getElementById("parentNameRow").style.display = "none";
    document.getElementById("homePhoneRow").style.display = "none";
    document.getElementById("commentsRow").style.display = "none";
    document.getElementById("startingDateRow").style.display = "none";

    //required
    document.getElementById("permitRequiredFlag").style.display = "block";
    document.getElementById("learners_permit").required = true;

    return getRoadTestPackage();
  }
  else if (package == "driversEdPackage") {

    document.getElementById("permitRequiredFlag").style.display = "none";
    document.getElementById("learners_permit").required = false;

    document.getElementById("roadTestDateRow").style.display = "none";
    document.getElementById("roadTestTimeRow").style.display = "none";
    document.getElementById("roadTestLocationRow").style.display = "none";

    return getDriversEdPackage();
  } else {

    document.getElementById("agreeToTerms").disabled = true;
    return noPackage();
  }

}

function enableRegisterButton() {
  if (document.getElementById('agreedToPrice').checked && document.getElementById('agreeToTerms').checked) {
    document.getElementById('register').disabled = false;
  } else {
    document.getElementById('register').disabled = true;
  }
}
