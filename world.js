async function GET_METHOD(server_url, data_send) {
    var response = {
        data: null,
        error: null
    };

    await $.ajax(server_url,  {
        type: 'get',
        data: data_send
    })
    .done( result => {
        response.data = result;
    })
    .fail( error => {
        response.error = error
    })

    return response
}

$("#lookup").on('click', async e => {
    e.preventDefault;

    var input = $('#country').val()
    console.log(input);

    var response = await GET_METHOD('world.php', {country: input});
    console.log(response);
    if (response.data != null ) {
        $('#result').html(response.data);
    } else {
        $('#result').html("Something went wrong: " + response.error);
    }

})