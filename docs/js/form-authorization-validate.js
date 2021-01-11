const apiAuthorizationUrl = "http://localhost:8090/getAuthorization";

console.log("start auth validate");

$.validator.addMethod(
  "emailFormatCheck",
  function(value, element) {
    return (
      this.optional(element) ||
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i.test(value)
    );
  },
  "E-mail может быть формата XXXXX@XXXX.XX."
);

$.validator.addMethod(
  "passwordFormatCheck",
  function(value, element) {
    return this.optional(element) || /^[A-Za-z0-9]{6,16}$/i.test(value);
  },
  "Цифры, латиница. Длина от 6 до 16 символов."
);

$("#formAuthorization").validate({
  rules: {
    formAuthorizationEmail: {
      required: true,
      emailFormatCheck: true
    },
    formAuthorizationPassword: {
      required: true,
      passwordFormatCheck: true
    }
  },
  messages: {
    formAuthorizationEmail: {
      required: "Вы не заполнили поле &quot; E-mail&quot;."
    },
    formAuthorizationPassword: {
      required: "Вы не заполнили поле &quot;Пароль&quot;."
    }
  },
  submitHandler: function(form, event) {
    event.preventDefault();
    var formData = $(form).serialize();
    $.post(apiAuthorizationUrl, formData)
      .done(function(data) {
        $(".form-general-error").html("");
        location.href = "/personal.html";
      })
      .fail(function(data) {
        if (data.status === 401) {
          $(".form-general-error").html(
            `<div class="form-row"><div class="form-general-error__text">${data.responseJSON.errorText}</div></div>`
          );
        } else {
          $(".form-general-error").html(
            `<div class="form-row"><div class="form-general-error__text">Ошибка. Проверьте интернет подключение.</div></div>`
          );
        }
      })
      .always(function() {
        console.log("always");
      });
  }
});
