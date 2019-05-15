$("#save-btn").click(function() {
    // get all the inputs into an array.
    var $inputs = $('#osn-sveden :input');
    // get an associative array of just the values.
    var ms = {};
    $inputs.each(function() {
        ms[this.name] = $(this).val();
        if ($(this).val()=='') {
          $(this).toggleClass("is-invalid text-danger");
          $(this).attr("placeholder", "Поле не заполнено!");
          $(this).focus();
        }
    });
    $('#osn-sveden :input').focus(function(event) {
     $(this).removeClass("is-invalid text-danger");
     $(this).attr("placeholder", "");
    });
  obr_dat = ms.obr_dat;
  obr_adr = ms.obr_adr;
  obr_time = ms.obr_time;
  obr_phones = ms.obr_phones;
  obr_fax = ms.obr_fax;
  obr_email = ms.obr_email;
});
