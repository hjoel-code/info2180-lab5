document.addEventListener("DOMContentLoaded", function(){

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

    function sanitize(input) {
        if (/^[a-zA-Z\s]*$/.test(input)) {
            return input.length < 31;   
        }
        return input.length != 0 ? false : true;
    }

    $("#lookup-country").on('click', async e => {
        e.preventDefault();

        var input = $('#country').val()

        if (sanitize(input)) {
            $('#message').html('')
            var response = await GET_METHOD('world.php', {context: "COUNTRY", country: input});
            if (response.data != null ) {
                $('#result').html(response.data);
            } else {
                $('#result').html("Something went wrong: " + response.error);
            }
        } else {
            $('#message').html('Try again')
        }

        

    })

    $("#lookup-city").on('click', async e => {
        e.preventDefault();

        var input = $('#country').val()

        var response = await GET_METHOD('world.php', {context: "CITY", country: input});
        if (response.data != null ) {
            $('#result').html(response.data);
        } else {
            $('#result').html("Something went wrong: " + response.error);
        }

    })

})