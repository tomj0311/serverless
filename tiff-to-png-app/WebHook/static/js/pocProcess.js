//Global Variables
var filecount = 0;
var count = $('#imgInsert').val();
var sortedFile = [];
var processIDs = [];
var identified = []
var recognize = []
var k = 0;
var scrollposition = 0;
var reviewData = [];
var loginattempt = 3;
var reviewProcess = 0;
var strategy = ["ABS", "BS", "BO", "A"];
var processedIdsCount = 0;
var scanClicked = 0;
var zoneClicked = 0;
var markClicked = 0;
var webSocket = null;
var ws_protocol = null;
var ws_hostname = null;
var ws_port = null;
var ws_endpoint = null;
var listcount = 0;
var processid = ''
var strategytype = '';
var uploadedType = '';
var zoned = 0
var processed

//var ws_protocol = "ws";
//var ws_hostname = "tojose";
//var ws_port = "9000";
//var ws_endpoint = "/recognize/";
//webSocket = new WebSocket(ws_protocol + "://" + ws_hostname + ":" + ws_port );

//Scan Click Event
function scanClick(e) {
    $("#marksheetimage").show();
    e.preventDefault();
    var element = document.getElementById('filesseperate');
    element.click();
    uploadedType = "Files";
}

//Function for File Upload
function onChangeHandler(e) {
    if (window.File && window.FileList && window.FileReader) {
        scanClicked = 1;
        var files = e.target.files,
            filesLength = files.length;
        if (files.length == 0) {
            scanClicked = 0;
        }
        for (var i = 0, f; i < filesLength, f = files[i]; i++) {
            filecount++;
            //f = files[i]
            sortedFile.push(files[i]);
            var fileReader = new FileReader();
            //count++;

            fileReader.onload = (function(f, count) {
                return function(e) {
                    var file = e.target;
                   $("#image" + count).attr('src', e.target.result);
                   $('#image' + count).attr('alt', f.name);
                    
                };
            })(f, i);
            fileReader.readAsDataURL(f);
        }

        $("<p>Scanning done.</p>").prependTo("#divAnnotations")
        $("#collapsible0").empty();
        zoned = 0 
        zoneImages()

    } else {
        alert("Your browser doesn't support to File API")
    }
}

function zoneImages() {
    // $("#collapsible0").empty();

    listcount=0;
    processIDs = [];
    $("<p>Zoning....</p>").prependTo("#divAnnotations")

    identified = []
    var file = $("#filesseperate")[0];
    var fd = new FormData();
    for (i = 0; i < file.files.length; i++) {
        fd.append('files', file.files[i]);
        fd.append('template', $('#templateBox').val())
    }

    pagesUrl = "/automarkpages/";

    $.ajax({
        url: pagesUrl,
		crossDomain: true,
        type: 'POST',
        contentType: false,
        data: fd,
        async: false,
        processData: false,
        success: function(data) {
            processed = JSON.parse(data);
        },
        error: function(data) {
            // error
        }
    });
}

function identify(){
    $("#responseTable").hide();
    $("#marksheetimage").show();
    if (zoned == 1){
        return
    }
    for(i=0; i<processed.ProcessIDs.length; i++){
        pid = processed.ProcessIDs[i].toString().split('.')[0]
        identifyImage(pid, i)
    }
}
//Ajax Call for Identifying the Image Data
function identifyImage(processid, k) {
    if (processid != null && processid != '') {        
        scrollposition = 200;
        identifyUrl = "/identify/";
		$('#container').load('http://google.com');
        $.ajax({
            url: identifyUrl,
            type: 'GET',
            dataType: 'JSON',
			crossDomain: true,
            data: {
                ProcessID: processid
            },
            async: true,
            success: function(response) {
                var identifiedData = JSON.parse(response);                
                identified.push(identifiedData)
                if (identified.length == processed.ProcessIDs.length){
                    updateHtml()
                }
            },
            error: function(error) {
                $("<p>Error Occured for Identifying Page " + (k + 1) + ": " + error.statusText + "</p>").prependTo("#divAnnotations")
            }
        });
    }
    document.getElementById("zone").style.pointerEvents="auto";
    zoned = 1
}

function updateHtml(){
    for (i=0; i<identified.length; i++){
        $("<p>Page " + (i + 1) + " done.</p>").prependTo("#divAnnotations")
        $('#image' + i).attr('src', identified[i].Base64str);
        $('#imagDiv').animate({
            scrollTop: scrollposition
        }, 1000);
        
        var questionContent = "<li class=\"question-list has-sub\"><a class=\"question-item\" ><span>Page" + (i + 1) + "</span></a><ul class=\"question-group\">";
        for (var j = 0; j < identified[i].ItemRegions.length; j++) {                    
            questionContent = questionContent + "<li  class=\"question-list\" > <a class=\"question-item marked-question\"> <span id=\"listId" + String(listcount) + "\" class=\"question-text\">" + String(j + 1) + "</span> <span class=\"question-mark\"> <span class=\"mark-version cur\"><span id=\"spanId" + String(listcount) + "\" class=\"mark\" >0</span></span> </span> </a> </li>"
            listcount++;
        }
        questionContent = questionContent + "</ul></li>";
        $("#collapsible0").append(questionContent);    
    }
}

//Function for Marking
function recognizeImage() {
    reviewData = [];
    listcount = 0;

    $("<p> Marking started...</p>").prependTo("#divAnnotations")
	
    getApi("/recognize/", 0, 0, identified)     
    processedIdsCount = 0
}

function getApi(apiurl, i, j, identifiedData){

    if (identifiedData.length == 0){
        $("<p> Cannot find zone data, marking stopped.</p>").prependTo("#divAnnotations")
        return
    }
    strategytype=document.getElementById("selectValue").value;
    if(strategytype == ''){
        strategytype = strategy[0];
    }    

    let data = {
        ProcessID: identifiedData[i].ProcessID,
        Strategy: strategytype,
        Region: j + 1
    }

    $.ajax({
        url: apiurl,
        type: 'GET',
		crossDomain: true,
        data: data,
        async: true,
        success: function(response) {
            handleRecognize(response, j)   

            j += 1           
            if (j != identifiedData[i].ItemRegions.length){
                setTimeout(getApi(apiurl, i, j, identifiedData), 100);
            }
            else{
                i += 1
                j = 0
                if (i != identifiedData.length)
                    setTimeout(getApi(apiurl, i, j, identifiedData), 100);
            }
        },
        error: function(error) {
            console.log(error)
        }
    });
}

function handleRecognize(data, j){
    recognizedData = JSON.parse(data);
    reviewData.push(recognizedData);

    var mark = 0;
    if (recognizedData.Result == null){
        return
    }
    markedresult=recognizedData.Result;
    for(var i=0; i<markedresult.length; i++){
        $("<p>"+ (j+1) + ". Strategy " + strategytype + " - (Expected: " + markedresult[i][0] + ") (Recognized: " + markedresult[i][1] + ")</p>").prependTo("#divAnnotations")
        if(markedresult[i][2][0]==1){
            mark = 1
        }
     }          

     document.getElementById("listId" + String(listcount)).style.color = "#0075cd";
     document.getElementById("spanId" + String(listcount)).style.color = "#0075cd";
     document.getElementById("spanId" + String(listcount)).innerHTML = mark;
     listcount++
}

function analyseVideo() {
    window.location = "https://tinyurl.com/rmams2";
}

//Reviewing the Data Marked.
function reviewResponse() {
    var j = 0;
    $("#marksheetimage").hide();
    $("#responseTable").show();
    $("#responseTable").empty();
    $("#responseTable").append("<tr><td width=\"45%\" style=\"text-align:center;vertical-align:middle;background-color:#428ff4;color:white \" >Response</td>"+
    "<td width=\"25%\" style=\"text-align:center;vertical-align:middle;background-color:#428ff4;color:white \" >Answer Key</td>"+    
    "<td width=\"25%\" style=\"text-align:center;vertical-align:middle;background-color:#428ff4;color:white \" >Check 1</td>"+
    "<td width=\"25%\" style=\"text-align:center;vertical-align:middle;background-color:#428ff4;color:white \" >Check 2</td>"+
    "<td width=\"15%\" style=\"text-align:center;vertical-align:middle;background-color:#428ff4;color:white \" >Check 3</td>"+
    "<td width=\"25%\" style=\"text-align:center;vertical-align:middle;background-color:#428ff4;color:white \" >Outcome</td></tr>"
    )
    
    for (var j = 0; j < reviewData.length; j++) {
        results = reviewData[j].Result
        reviews = []        
        reviewResponseTable="<tr><td width=\"45%\" style=\"text-align:left;vertical-align:middle \" ><img src=\"" + reviewData[j].Base64str + "\" style=\"width:100%;display:block;height:auto\"/></td>";
        reviewResponseTable=reviewResponseTable+"<td width=\"25%\" style=\"text-align:center;vertical-align:middle;font-size:20px \" >" + reviewData[j].Result[0][0] + "</td>"
        for (var k=0; k < results.length; k++){
            var responseOutcome='';
            reviewResponseTable=reviewResponseTable + "<td width=\"25%\" style=\"text-align:center;vertical-align:middle;font-size:20px \">" + results[k][1].toString() + "</td>"
            if(results.length == 1){
                reviewResponseTable=reviewResponseTable + "<td width=\"25%\" style=\"text-align:center;vertical-align:middle \"><span style=\"font-family:Arial;font-size:15px;top:50%;position:relative;display:table-cell;text-align:left;vertical-align:middle\"></span></td>"
            }
            if(k == results.length-1){
                reviewResponseTable=reviewResponseTable + "<td width=\"15%\" style=\"text-align:center;vertical-align:middle \"><input type=\"text\" style=\"width:70px\"></input></td>"
            }
            
            if (results[k][2][0] == 1){
                responseOutcome="<td width=\"25%\" style=\"text-align:center;vertical-align:middle \"><span style=\"font-size: 225%; color:green\">&#10004;</span></td></tr>"; //&#252;
            }
            else{   
                responseOutcome= "<td width=\"25%\" style=\"text-align:center;vertical-align:middle \"><span style=\"font-size: 225%; color:#FFC200\">&#63;</span></td></tr>";
            }
        };
        reviewResponseTable=reviewResponseTable+responseOutcome;
        $("#responseTable").append(reviewResponseTable);
    }
}

function getBase64Data(file, callback) {
    var reader = new FileReader();
    reader.onload = callback
    reader.readAsDataURL(file); 
}

function sendData(data) {
    webSocket.send(data);
}