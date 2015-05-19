function getSchools(me) {
    var area = $(me).val();
    if (area != '' || area != undefined) {
        var par = {};
        par.name = area;
        $.ajax({
            type: "POST",
            url: '/college/getSchools',
            data: par,
            success: function (data, textStatus) {
                $('#form_select_school option').remove();
                var domstr = '';
                _.each(data, function (ele, index, list) {
                    domstr += '<option>' + ele + '</option>';
                })
                $('#form_select_school').append(domstr);
            }
        });
    }
}

function getMajors(me) {
    var school = $(me).val();
    if (school != '' || school != undefined) {
        var par = {};
        par.name = school;
        $.ajax({
            type: "POST",
            url: '/college/getMajors',
            data: par,
            success: function (data, textStatus) {
                $('#form_select_major option').remove();
                var domstr = '';
                _.each(data, function (ele, index, list) {
                    domstr += '<option>' + ele + '</option>';
                })
                $('#form_select_major').append(domstr);
            }
        });
    }
}