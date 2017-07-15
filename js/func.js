var fullString = "http://www.domain.com/contact.html";
var subString = "";
var stockData = [];

//if there are already pasted Old URLs, show the hint with first URL
function subStrCustom() {
  var oldLines =  $('#oldUrl').val().split(/\n/);
  if (oldLines[0] !== undefined) {
    fullString = oldLines[0];
    $("#preview-full").text(fullString);
  }
  subStr();
}
//generate Substring - delete X characters from start and Y from the end
function subStr() {
var x = $("#prefix").val();
var y = $("#suffix").val();
var endString = fullString.split("").reverse().join("").substr(y,fullString.length).split("").reverse().join("");
subString = endString.substr(x,endString.length);
$("#preview").text(subString);
}
$('#oldUrl').change(subStrCustom);
$("#prefix").keyup(subStr);
$("#suffix").keyup(subStr);

// On click...
$("#proceed").click(function() {
  event.preventDefault();
  // read input values
  var newUrl = $("#newUrl").val();
  var download = $("#download").val();

  // read Old URLs and line by line save them as an object
  var oldLines =  $('#oldUrl').val().split(/\n/);
  for (var i = 0; i < oldLines.length; i++){
    //save the substring of each URL
    var x = $("#prefix").val();
    var y = $("#suffix").val();
    var endString = oldLines[i].split("").reverse().join("").substr(y,oldLines[i].length).split("").reverse().join("");
    var subStringEach = endString.substr(x,endString.length);
    var subStringEachNoDash = subStringEach.replace(/[^a-z0-9]/g,'');

    // read New URLs and line by line save them as an object
    var newLines =  $('#newUrl').val().split(/\n/);
    var newUrlResult = [];

    for (var j = 0; j < newLines.length; j++){
      var newUrlString = newLines[j];
      var newUrlStringNoDash = newUrlString.replace(/[^a-z0-9]/g,'');

      var isThere = newUrlStringNoDash.search(subStringEachNoDash);
      if (isThere !== -1 ) {
        newUrlResult[i] = newLines[j];
        break;
      }
      else {
        newUrlResult[i] = "";
      }
    }

    stockData.push({OldURL:oldLines[i],SearchSubstring:subStringEach,NewURL:newUrlResult[i]});
  }

  // Enable download button
  $("#download").removeClass("disabled");
  $("#proceed").addClass("disabled");
});

/* Download as CSV script from https://halistechnology.com/2015/05/28/use-javascript-to-export-your-data-as-csv/ */

// Convert Objects to CSV
function convertArrayOfObjectsToCSV(args) {
  var result, ctr, keys, columnDelimiter, lineDelimiter, data;

  data = args.data || null;
  if (data == null || !data.length) {
    return null;
  }

  columnDelimiter = args.columnDelimiter || ',';
  lineDelimiter = args.lineDelimiter || '\n';

  keys = Object.keys(data[0]);

  result = '';
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  data.forEach(function(item) {
    ctr = 0;
    keys.forEach(function(key) {
      if (ctr > 0) result += columnDelimiter;

      result += item[key];
      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
}

// Download as CSV
function downloadCSV(args) {
  var data, filename, link;

  var csv = convertArrayOfObjectsToCSV({
    data: stockData
  });
  if (csv == null) return;

  filename = 'redirect-export.csv';

  if (!csv.match(/^data:text\/csv/i)) {
    csv = 'data:text/csv;charset=utf-8,' + csv;
  }
  data = encodeURI(csv);

  link = document.createElement('a');
  link.setAttribute('href', data);
  link.setAttribute('download', filename);
  link.click();
}
