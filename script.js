$(document).ready(function() {
    
    function displayMessage(type, message) {
        
        const messageDiv = $('<div class="message"></div>').addClass(type).text(message);
        $('.tab-content').prepend(messageDiv);
        setTimeout(() => {
            messageDiv.fadeOut(300, function() {
                $(this).remove();
            });
        }, 3000);
    }
    $('#logout-btn').click(function() {
        $.ajax({
            type: 'GET',
            url: 'logout.php',
            success: function() {
                window.location.href = 'http://avas.local:10057/salahrecord/index.php';
            },
            error: function() {
                displayMessage('error', "There was an error logging out.");
            }
        });   
    });     
    
    function showTab(index) {
        $('.tab-header-item').removeClass('active');
        $('.tab-header-item').eq(index).addClass('active');
        $('.tab').removeClass('active');
        $('.tab').eq(index).addClass('active');
    }
    showTab(0);
    $('.tab-header-item').click(function() {
        var index = $(this).index();
        showTab(index);
    });
    $('#register-form').submit(function(event) {
        event.preventDefault();
        var username = $('input[name="username"]').val();
        var password = $('input[name="password"]').val();

        if (username === "" || password === "") {
            displayMessage('error', "Please fill in all fields.");
            return false;
        }

        $.ajax({
            type: 'POST',
            url: 'register.php',
            data: $(this).serialize(),
            success: function(response) {
                displayMessage('success', response);
            },
            error: function() {
                displayMessage('error', "There was an error processing your request.");
            }
        });
    });
    
    $('#login-form').submit(function(event) {
        event.preventDefault();
        var username = $('input[name="usernameLogin"]').val();
        var password = $('input[name="passwordLogin"]').val();
        console.log(username+'user');
        console.log(password+'pass');

        if (username == "" || password == "") {
            displayMessage('error', "Please fill in all fields.");
            return false;
        }

        $.ajax({
            type: 'POST',
            url: 'login.php',
            data: $(this).serialize(),
            success: function(response) {
                displayMessage('success', response);
                window.location.href = "http://avas.local:10057/salahrecord/record_salah_form.php";
                exit(); 
            },
            error: function() {
                displayMessage('error', "There was an error processing your request.");
            }
        });
    });

    $('#salah-form').on('submit', function(event) {
        event.preventDefault();

        $.ajax({
            type: 'POST',
            url: 'records.php',
            data: $(this).serialize(),
            dataType: 'json',
            success: function(response) {
                if (response.status === 'success') {
                    displayMessage('success', response.message);
                    updateSalahRecords(response.records);
                } else {
                    displayMessage('error', response.message);
                }
            },
            error: function() {
                displayMessage('error', "There was an error processing your request.");
            }
        });
    });


    loadPreviousRecords();

    function loadPreviousRecords() {
        $.ajax({
            type: 'GET',
            url: 'showRecords.php',
            data: { fetch_records: 1 },
            dataType: 'json',
            success: function(data) {
                updateSalahRecords(data);
            },
            error: function() {
                $('#previous-records').html('<p>Error loading records.</p>');
            }
        });
    }

    function updateSalahRecords(records) {
        let recordsHtml = '<table><thead><tr><th>Date</th><th>Fajr</th><th>Dhuhr</th><th>Asr</th><th>Maghrib</th><th>Isha</th></tr></thead><tbody>';
        records.forEach(function(record) {
            recordsHtml += `<tr>
                <td>${record.datetime}</td>
                <td>${record.fajr == 1 ? 'Yes' : 'No'}</td>
                <td>${record.dhuhr == 1 ? 'Yes' : 'No'}</td>
                <td>${record.asr == 1 ? 'Yes' : 'No'}</td>
                <td>${record.maghrib == 1 ? 'Yes' : 'No'}</td>
                <td>${record.isha == 1 ? 'Yes' : 'No'}</td>
            </tr>`;
        });
        recordsHtml += '</tbody></table>';
        $('#previous-records').html(recordsHtml);
    }

    function displayMessage(type, message) {
        const messageDiv = $('.displayMessage');
        messageDiv.removeClass('success error').addClass(type).text(message).show();
        setTimeout(() => {
            messageDiv.hide();
        }, 3000);
    }


    // $('#salah-form').submit(function(e) { 
    //     e.preventDefault();
    //     $.ajax({
    //         type: 'POST',
    //         url: 'records.php',
    //         data: $(this).serialize(),
    //         dataType: 'json',
    //         success: function(data) {
    //             let recordsHtml = '<table><thead><tr><th>Date</th><th>Fajr</th><th>Dhuhr</th><th>Asr</th><th>Maghrib</th><th>Isha</th></tr></thead><tbody>';
    //             data.forEach(function(record) {
    //                 recordsHtml += `<tr>
    //                     <td>${record.datetime}</td>
    //                     <td>${record.fajr==1 ? 'Yes' : 'No'}</td>
    //                     <td>${record.dhuhr==1 ? 'Yes' : 'No'}</td>
    //                     <td>${record.asr==1 ? 'Yes' : 'No'}</td>
    //                     <td>${record.maghrib==1 ? 'Yes' : 'No'}</td>
    //                     <td>${record.isha==1 ? 'Yes' : 'No'}</td>
    //                 </tr>`;
    //             });
    //             recordsHtml += '</tbody></table>';
    //             $('#previous-records').html(recordsHtml);
    //         },
    //         error: function() {
    //             $('#previous-records').html('<p>Error loading records.</p>');
    //         }
    //     });
    // });

    // function loadPreviousRecords() {
    //     $.ajax({
    //         type: 'GET',
    //         url: 'showRecords.php',
    //         data: { fetch_records: 1 },
    //         dataType: 'json',
    //         success: function(data) {
    //             let recordsHtml = '<table><thead><tr><th>Date</th><th>Fajr</th><th>Dhuhr</th><th>Asr</th><th>Maghrib</th><th>Isha</th></tr></thead><tbody>';
    //             data.forEach(function(record) {
    //                 recordsHtml += `<tr>
    //                     <td>${record.datetime}</td>
    //                     <td>${record.fajr==1 ? 'Yes' : 'No'}</td>
    //                     <td>${record.dhuhr==1 ? 'Yes' : 'No'}</td>
    //                     <td>${record.asr==1 ? 'Yes' : 'No'}</td>
    //                     <td>${record.maghrib==1 ? 'Yes' : 'No'}</td>
    //                     <td>${record.isha==1 ? 'Yes' : 'No'}</td>
    //                 </tr>`;
    //             });
    //             recordsHtml += '</tbody></table>';
    //             $('#previous-records').html(recordsHtml);
    //         },
    //         error: function() {
    //             $('#previous-records').html('<p>Error loading records.</p>');
    //         }
    //     });
    // }
        
    // window.onload = function() {
    //     if ($('#salah-form').length) {
    //         loadPreviousRecords();
    //     }
    // }
});
