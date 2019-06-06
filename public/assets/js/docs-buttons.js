$("#documenty .add").click(function() {
  var table = $(this)
    .parent()
    .parent()
    .find("table");
  var rowToInsert = table.find("tr:last").clone();
  rowToInsert.find("input, select, textarea").val("");
  rowToInsert.find("input, select, textarea").prop("checked", false);
  rowToInsert.removeClass("bg-danger");
  rowToInsert.find(".error").empty();
  table.append(rowToInsert);
  renameDocuments(table);
});

$("#documenty .remove").click(function() {
  var table = $(this)
    .parent()
    .parent()
    .find("table");
  if (table.find("tr").length > 2) {
    table.find("tr:last").remove();
  }
});

$("#documenty").delegate(".row_checker", "change", function() {
  var rowId = $(this).attr("name");
  if ($(this).is(":checked")) {
    $("#" + rowId).addClass("bg-danger");
  } else {
    $("#" + rowId).removeClass("bg-danger");
  }
});

$("#documenty .remove_selected").click(function() {
  var table = $(this)
    .parent()
    .parent()
    .find("table");
  var elements = table.find(".row_checker:checked");
  removeRows_D(table, elements);
  table.find("tr").removeClass("bg-danger");
  renameDocuments(table);
});

function renameDocuments(table) {
  renameTableElements_D(table, "name");
  renameTableElements_D(table, "url");
  renameSelectRowElements_D(table, table.attr("id"));
  renameRows_D(table, table.attr("id"));
}

function renameTableElements_D(table, elementName) {
  var elementsBaseName = table.attr("id");
  var elements = table.find("." + elementName);
  $.each(elements, function(key, value) {
    var currentElement = elements.eq(key);
    currentElement.attr(
      "name",
      elementsBaseName + "_" + key + "_" + elementName
    );
  });
}

function renameSelectRowElements_D(table, elementName) {
  var elements = table.find("." + elementName);
  $.each(elements, function(key, value) {
    var currentElement = elements.eq(key);
    currentElement.attr("name", elementName + "_" + (key + 1));
  });
}

function renameRows_D(table, baseName) {
  var elements = table.find("tr").not(":first");
  $.each(elements, function(key, value) {
    var currentElement = elements.eq(key);
    currentElement.attr("id", baseName + "_" + (key + 1));
  });
}

function removeRows_D(table, elements) {
  if (elements.length === 0) {
    make_bootstrap_message(
      "warning",
      "Необходимо указать строки для удаления",
      $("#messengerWindow")
    );
    return;
  }

  var rowToInsert = false;
  if (elements.length === table.find("tr").not(":first").length) {
    var rowToInsert = table
      .find("tr")
      .eq(1)
      .clone();
    rowToInsert.find("input, select, textarea").val("");
    rowToInsert.find("input, select, textarea").prop("checked", false);
    rowToInsert.find(".error").empty();
  }

  $.each(elements, function(index, value) {
    var currentCheckbox = elements.eq(index);
    var idSelector = "#" + currentCheckbox.attr("name");
    $(idSelector).remove();
  });
  if (rowToInsert) {
    table.append(rowToInsert);
  }
}
