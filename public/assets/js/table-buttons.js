$(document).ready(function() {

  function addRow(button,table) {
    var table = button
      .parent()
      .parent()
      .find("#"+table);
    var rowToInsert = table.find("tr:last").clone();
    rowToInsert.find("input, select, textarea").val("");
    rowToInsert.find("input, select, textarea").prop("checked", false);
    rowToInsert.removeClass("bg-danger");
    rowToInsert.find(".error").empty();
    table.append(rowToInsert);
    renameDepartments(table);
  }

  function renameDepartments(table) {
    renameTableElements(table, "name");
    renameTableElements(table, "fio");
    renameTableElements(table, "post");
    renameTableElements(table, "address_str");
    renameTableElements(table, "site");
    renameTableElements(table, "email");
    renameTableElements(table, "division_clause_doc_link");
    renameTableElements(table, "phone");
    str_id = table.find("tr").last().prop('id');
    var name;
    if (str_id.match(/department_\d/)) name = "department";
    else if (str_id.match(/department_others/)) name = "department_others";
    else if (str_id.match(/department_st/)) name = "department_st";
    else if (str_id.match(/department_public/)) name = "department_public";
    renameSelectRowElements(table, name);
    renameRows(table, name);
  }

  $(".add_department").click(function() {
    addRow($(this),"departments");
  });
  $(".add_department_others").click(function() {
    addRow($(this),"departments_others");
  });
  $(".add_department_st").click(function() {
    addRow($(this),"departments_st");
  });
  $(".add_department_public").click(function() {
    addRow($(this),"departments_public");
  });

  function removeAll(button,table) {
    var table = button
      .parent()
      .parent()
      .find("#"+table);
    if (table.find("tr").length > 2) {
      table.find("tr:last").remove();
    }
  }

  $(".remove").click(function() {
    removeAll($(this),"departments");
  });
  $(".remove_others").click(function() {
    removeAll($(this),"departments_others");
  });
  $(".remove_st").click(function() {
    removeAll($(this),"departments_st");
  });
  $(".remove_public").click(function() {
    removeAll($(this),"departments_public");
  });

  rowCheckerChangeHandler();

  function removeSelected(button,table) {
    var table = button
      .parent()
      .parent()
      .find("#"+table);
    var elements = table.find(".row_checker:checked");
    removeRows(table, elements);
    table.find("tr").removeClass("bg-danger");
    renameDepartments(table);
  }

  $(".remove_selected_departments").click(function() {
    removeSelected($(this),"departments");
  });
  $(".remove_selected_departments_others").click(function() {
    removeSelected($(this),"departments_others");
  });
  $(".remove_selected_departments_st").click(function() {
    removeSelected($(this),"departments_st");
  });
  $(".remove_selected_departments_public").click(function() {
    removeSelected($(this),"departments_public");
  });
});
