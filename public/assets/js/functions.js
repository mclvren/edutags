function rowCheckerChangeHandler(){
    $('#struktura').delegate('.row_checker', 'change', function(){
        var rowId = $(this).attr('name');
        if ($(this).is(':checked')){
            $('#' + rowId).addClass('bg-danger');
        } else {
            $('#' + rowId).removeClass('bg-danger');
        }
    });
}

function renameTableElements(table, elementName){
    var elementsBaseName = table.attr('id');
    var elements = table.find('.' + elementName);
    $.each(elements, function(key, value){
        var currentElement = elements.eq(key);
        currentElement.attr('name', elementsBaseName + '[' + key + '][' + elementName + ']');
    });
}

function renameSelectRowElements(table, elementName){
    var elements = table.find('.' + elementName);
    $.each(elements, function(key, value){
        var currentElement = elements.eq(key);
        currentElement.attr('name', elementName + '_' + (key + 1));
    });
}

function renameRows(table, baseName){
    var elements = table.find('tr').not(':first');
    $.each(elements, function(key, value){
        var currentElement = elements.eq(key);
        currentElement.attr('id', baseName + '_' + (key + 1));
    });
}

function renameRowsSpecial(table, baseName){
    var elements = table.find('tr').slice(2);
    $.each(elements, function(key, value){
        var currentElement = elements.eq(key);
        currentElement.attr('id', baseName + '_' + (key + 1));
    });
}

function removeRows(table, elements){
    if (elements.length === 0){
        make_bootstrap_message('warning', 'Необходимо указать строки для удаления', $('#messengerWindow'));
        return;
    }

    var rowToInsert = false;
    if (elements.length === table.find('tr').not(':first').length){
        var rowToInsert = table.find('tr').eq(1).clone();
        rowToInsert.find('input, select, textarea').val('');
        rowToInsert.find('input, select, textarea').prop('checked', false);
        rowToInsert.find('.error').empty();
    }

    $.each(elements, function(index, value) {
        var currentCheckbox = elements.eq(index);
        var idSelector = '#' + currentCheckbox.attr('name');
        $(idSelector).remove();
    });
    if (rowToInsert){
        table.append(rowToInsert);
    }
}

function removeRowsSpecial(table, elements){
    if (elements.length === 0){
        make_bootstrap_message('warning', 'Необходимо указать строки для удаления', $('#messengerWindow'));
        return;
    }

    var rowToInsert = false;
    if (elements.length === table.find('tr').slice(2).length){
        var rowToInsert = table.find('tr').eq(2).clone();
        rowToInsert.find('input, select, textarea').val('');
        rowToInsert.find('input, select, textarea').prop('checked', false);
        rowToInsert.find('.error').empty();
    }

    $.each(elements, function(index, value) {
        var currentCheckbox = elements.eq(index);
        var idSelector = '#' + currentCheckbox.attr('name');
        $(idSelector).remove();
    });
    if (rowToInsert){
        table.append(rowToInsert);
    }
}
