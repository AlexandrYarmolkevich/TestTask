var count = 0;
$.getJSON("./json/users.json", function (json) {
  output = '<div id="update">';
  var output;
  var users = [];
  $.each(json, function (key, val) {
    output += '<div class="user">';
    output += '<div class="img-user" style="background-image: url(' + val.imageSrc + ')">';
    output += '</div>';
    output += '<div>';
    output += '<p>' + val.Name + '</p>';
    output += '<p>' + val.description + '</p>';
    output += '</div>';
    output += '<input type="checkbox">';
    output += '</div>';
    users.push(val);
  });
  output += '</div>';
  $('.list-users').html(output);

  $(".user").click(function () {
    if ($(this).find(":checkbox").attr("checked") == 'checked') {
      $(this).find(":checkbox").removeAttr("checked");
      $(this).css("background-color", "white");
      count--;
      var listInputs = $(".hide");
      var checkName = $(this).find("p:first-child").text();
      var path;
      for (var i = 0; i < users.length; i++) {
        if (checkName == users[i].Name) {
          path = users[i].imageSrc;
        }
      }
      listInputs.each(function () {
        if ($(this).val() == path) {
          $(this).remove();
        }
      });
    } else {
      $(this).find(":checkbox").attr("checked", "checked");
      $(this).css("background-color", "#C3C3C3");
      count++
      var userName = $(this).find("p:first-child").text();
      for (var i = 0; i < users.length; i++) {
        if (userName == users[i].Name) {
          $(".info").after('<input type="text" class="hide" style="display: none;" name="img[' + i + ']" value="' + users[i].imageSrc + '">');
        }
      }
    }
  });
});

$.getJSON("../json/parameters.json", function (json) {
  var output_types;
  var output_modes;
  var output_sizes;
  $.each(json, function (key, val) {
    if (val.type !== "") output_types += '<option value=' + val.type + '>' + val.type + '</option>';
    if (val.mode !== "") output_modes += '<option value=' + val.mode + '>' + val.mode + '</option>';
    if (val.size !== "") output_sizes += '<option value=' + val.size + '>' + val.size + '</option>';
  });
  $('#types-paper').html(output_types);
  $('#mode-print').html(output_modes);
  $('#size-paper').html(output_sizes);
});

$('.form').submit(function () {
  if (count == '0') {
    $(function () {
      swal("Error", "Please select at least 1 photo!", "error");
    });
    return false;
  }
  $.ajax({
    type: 'POST',
    url: 'index.html',
    data: $(this).serialize(),
    success: function (data) {
      alert("Data sent!");
    },
    error: function (xhr, str) {
      alert("Data not sent!");
    }
  });
});