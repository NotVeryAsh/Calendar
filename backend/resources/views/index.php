<?php

?>

<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

<script>

    axios.defaults.headers.post['accept'] = 'application/json'

    axios.get('/sanctum/csrf-cookie', {
    })
    .then(function (response) {
        axios.post('/auth/register', {
            name: 'John Doe',
            email: 'test2@test.com',
            password: 'Test123$',
            password_confirmation: 'Test123$',
        }).then(response => {
            console.log(response);
        })

    });

</script>
