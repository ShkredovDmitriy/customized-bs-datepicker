var modalInfo = new bootstrap.Modal(document.getElementById("modalInfo"));
$("#modalInfo").on("hidden.bs.modal", function(e, triggered) {
  location.href = "/page-authorization.html";
});

const apiRecoveryPasswordUrl = "http://localhost:8090/getRecoveryPassword";

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

$("#form-recovery-password").validate({
  rules: {
    formRecoveryPasswordEmail: {
      required: true,
      emailFormatCheck: true
    }
  },
  messages: {
    formRecoveryPasswordEmail: {
      required: "Вы не заполнили поле &quot; E-mail&quot;."
    }
  },
  submitHandler: function(form, event) {
    event.preventDefault();
    var formData = $(form).serialize();
    $.post(apiRecoveryPasswordUrl, formData)
      .done(function(data) {
        $(".form-general-error").html("");
        $(".modal-info .modal-title").html("Отправлено");
        $(".modal-info .modal-body").html(
          "Мы отправили новый пароль на вашу электронную почту."
        );
        modalInfo.show();
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
