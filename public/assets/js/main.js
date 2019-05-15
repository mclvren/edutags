$("#save-btn").click(function() {
  event.preventDefault();
    // get all the inputs into an array.
    var $inputs = $('#osn-sveden :input');
    // get an associative array of just the values.
    var ms = {};
    var isNull=false;
    $inputs.each(function() {
        ms[this.name] = $(this).val();
        if ($(this).val()=='') {
          isNull=true;
          $(this).addClass("is-invalid text-danger");
          $(this).attr("placeholder", "Поле не заполнено!");
          //$(this).focus();
        }
    });
    $('#osn-sveden :input').focus(function(event) {
     $(this).removeClass("is-invalid text-danger");
     $(this).attr("placeholder", "");
    });
    if (isNull==false) {
  obr_dat=ms.obr_dat;
  obr_adr=ms.obr_adr;
  obr_time=ms.obr_time;
  obr_phones=ms.obr_phones;
  obr_fax=ms.obr_fax;
  obr_email=ms.obr_email;
  name_uchred=ms.founders_1_name_uchred;
  fullname_uchred=ms.founders_1_fullname_uchred;
  address_uchred=ms.founders_1_address_uchred;
  tel_uchred=ms.founders_1_tel_uchred;
  mail_uchred=ms.founders_1_mail_uchred;
  website_uchred=ms.founders_1_website_uchred;
  $.ajax({
        type        : 'POST',
        url         : '/saveInfo',
        data        : {
                        "obr_dat": obr_dat,
                        "obr_adr": obr_adr,
                        "obr_phones": obr_phones,
                        "obr_fax": obr_fax,
                        "obr_email": obr_email,
                        "name_uchred": name_uchred,
                        "fullname_uchred": fullname_uchred,
                        "address_uchred": address_uchred,
                        "tel_uchred": tel_uchred,
                        "mail_uchred": mail_uchred,
                        "website_uchred": website_uchred
                      },
        dataType    : 'application/json',
        encode      : true,
    })
        .done(function(data) {
            //$(.result).html(data);
            console.log(data);
        });
}
});
