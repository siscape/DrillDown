function ajaxData(max, offset, rcount){
    return $.ajax({
        type: "POST",
        url: "returnJson",
        data: { max : max,
            offset :offset,
            rcount: rcount},
        dataType: ""
    });
}
