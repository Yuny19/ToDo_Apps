import 'bootstrap';
import '@fortawesome/fontawesome-free/css/all.css';
import '../css/index.scss';
import '../js/jquery.toast';
import '../css/jquery.toast.css'

const baseUrl = 'http://localhost:3000';

$(function () {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');

    $("#username").append(name)

    if (!token) {
        $("#login-page").show();
        $("#register").hide();
        $("#dashboard").hide();
    } else {
        $("#dashboard").show();
        $("#login-page").hide();
        $("#container-project").hide();
        $("#task-content").hide();
    }
});

$("#signOut").click(function () {
    localStorage.removeItem(localStorage.key('token'));
    localStorage.removeItem(localStorage.key('name'));

    location.reload();
});

$("#click-register").click(function () {
    $("#register").show();
    $("#login").hide();
});

$("#click-login").click(function () {
    $("#register").hide();
    $("#login").show();
});

$("#task").click(function () {
    $("#task-content").show();
    $("#container-project").hide();
    $.ajax({
        url: `${baseUrl}/activity`,
        headers: {
            token: localStorage.getItem('token')
        },
        type: 'GET'
    })
        .done(function (data) {
            let html = "";
            $("#table-content").html(html);

            data.forEach((dt, i) => {
                var project = dt.project ? dt.project.name : "";
                html = html + '<tr>' +
                    '<td>' + (i + 1) + '</td>' +
                    '<td>' + dt.task + '</td>' +
                    '<td>' + project + '</td>' +
                    '<td></td>' +
                    '<td>' + dt.status + '</td>' +
                    '<td></td>' +
                    '</tr>';
            });
            $("#table-content").append(html);
        })
        .catch(function (error) {
            $.toast({
                heading: 'Warning',
                text: 'data not found',
                showHideTransition: 'slide',
                icon: 'warning',
                position: 'top-right'
            })
        })

    $("#task-content").show();
    $("#container-project").hide();

});

$("#project").click(function () {

    $.ajax({
        url: `${baseUrl}/project`,
        headers: {
            token: localStorage.getItem('token')
        },
        type: 'GET'
    })
        .done(function (data) {
            let html = "";
            $("#project-content").html(html);
            data.forEach(dt => {
                html = html + '<div  class="col-md-4 col-sm-6 col-xl-4 my-3">' +
                    '<div  class="card card-box d-block h-auto w-100 box-shadow-hover pointer">' +
                    '<div class="card-body p-4">' +
                    '<h3 class="h4 text-uppercase"><strong>' + dt.name + '</strong></h3>' +
                    '<p class="p-card">' + dt.description + '</p>' +
                    '<button class="btn-register" id="detail-project"  value="' + dt._id + '">detail</button>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
            });
            $("#project-content").append(html);
        })
        .catch(function (error) {
            $.toast({
                heading: 'Warning',
                text: 'data not found',
                showHideTransition: 'slide',
                icon: 'warning',
                position: 'top-right'
            })
        })

    $("#task-content").hide();
    $("#container-project").show();

});

$(document).on("click", "#detail-project", function (event) {
    console.log($(this).val());
})


$("#btn-login").click(function () {
    $.ajax({
        url: `${baseUrl}/user/login`,
        data: {
            email: $("#email-login").val(),
            password: $("#password-login").val(),
        },
        type: 'POST'
    })
        .done(function (data) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('name', data.name);
            location.reload();
        })
        .catch(function (error) {
            $.toast({
                heading: 'Warning',
                text: 'user cant login',
                showHideTransition: 'slide',
                icon: 'warning',
                position: 'top-right'
            })
        })
});

$("#btn-register").click(function () {
    $.ajax({
        url: `${baseUrl}/user/`,
        data: {
            name: $("#name").val(),
            email: $("#email").val(),
            password: $("#password").val(),
        },
        type: 'POST'
    })
        .done(function () {
            $.toast({
                heading: 'Success',
                text: 'account have been created',
                showHideTransition: 'slide',
                icon: 'success',
                position: 'top-right'
            });

            $("#login").show();
            $("#register").hide();
        })
        .catch(function (error) {
            $.toast({
                heading: 'Warning',
                text: 'cant create account',
                showHideTransition: 'slide',
                icon: 'warning',
                position: 'top-right'
            })
        })
});

$("#btn-add-project").click(function () {
    $.ajax({
        url: `${baseUrl}/project`,
        data: {
            name: $("#project-name").val(),
            description: $("#project-desc").val(),
        },
        type: 'POST'
    })
        .done(function (data) {
            $.toast({
                heading: 'Success',
                text: 'project have been created',
                showHideTransition: 'slide',
                icon: 'success',
                position: 'top-right'
            })
        })
        .catch(function (error) {
            $.toast({
                heading: 'Warning',
                text: 'cant create project',
                showHideTransition: 'slide',
                icon: 'warning',
                position: 'top-right'
            })
        })
});

