var modalInfo = new bootstrap.Modal(document.getElementById("modalInfo"));

var checkEmailPhoneInDatabase = false;
var isEmailConfirmed = false;
var showEmailConfirmButton = false;
var showEmailConfirmButton2 = false;
var showEmailConfirmField = false;
var sendRequestToApi = false;

var apiRegCheckEmailPhone = "http://localhost:8090/getRegCheckEmailPhone";
var apiRegCheckMailConfirm = "http://localhost:8090/getRegCheckMailConfirm";
var apiRegistrationUrl = "http://localhost:8090/getRegistration";

$.validator.addMethod(
  "nameFormatCheck",
  function(value, element) {
    return this.optional(element) || /^[а-яА-Я- ]{2,10}$/i.test(value);
  },
  "Поле «Имя» может состоять из кириллицы, тире и пробела. Длина от 2 до 10 символов."
);

$.validator.addMethod(
  "lastNameFormatCheck",
  function(value, element) {
    return this.optional(element) || /^[а-яА-Я- ]{2,15}$/i.test(value);
  },
  "Поле «Фамилия» может состоять из кириллицы, тире и пробела. Длина от 2 до 15 символов."
);

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
  "phoneFormatCheck",
  function(value, element) {
    return (
      this.optional(element) ||
      /^([\+])+([7])+([\(])+([9])+([0-9]{2})+([\)])+([0-9]{7})$/i.test(value)
    );
  },
  "Номер телефона должен быть в формате +7(9ХХ)XXXXXXX"
);

$.validator.addMethod(
  "formRegistration",
  function(value, element) {
    return this.optional(element) || /^[A-Za-z0-9]{6,16}$/i.test(value);
  },
  "Цифры, латиница. Длина от 6 до 16 символов."
);

$("#formRegistration").validate({
  rules: {
    formRegistrationName: {
      required: true,
      nameFormatCheck: true
    },
    formRegistrationLastName: {
      required: true,
      lastNameFormatCheck: true
    },
    formRegistrationEmail: {
      required: true,
      emailFormatCheck: true
    },
    formRegistrationPhone: {
      required: true,
      phoneFormatCheck: true
    },
    formRegistrationUserData: {
      required: true
    },
    formRegistrationRules: {
      required: true
    }
  },
  messages: {
    formRegistrationName: {
      required: "Вы не заполнили поле «Имя»."
    },
    formRegistrationLastName: {
      required: "Вы не заполнили поле «Фамилия»."
    },
    formRegistrationEmail: {
      required: "Вы не заполнили поле «E-mail»."
    },
    formRegistrationPhone: {
      required: "Вы не заполнили поле «Телефон»."
    }
  },

  submitHandler: function(form, event) {
    event.preventDefault();

    // check email and phone
    if (!checkEmailPhoneInDatabase) {
      var formData = $(form).serialize();
      $.post(apiRegCheckEmailPhone, formData)
        .done(function(data) {
          $(".form-general-error").html("");
          checkEmailPhoneInDatabase = true;
          showEmailConfirmButton = true;
          $(".form-registration-mail-confirm-button").show();
          $(".form-general-error").html(
            `<div class="form-row"><div class="form-general-error__text">Пожалуйста, подтвердите электронную почту.</div></div>`
          );
          $("#formRegistrationName").prop("readonly", true);
          $("#formRegistrationLastName").prop("readonly", true);
          $("#formRegistrationEmail").prop("readonly", true);
          $("#formRegistrationPhone").prop("readonly", true);
          $("#formRegistrationUserData").prop("readonly", true);
          $("#formRegistrationUserData").attr("disabled", "disabled");
          $("#formRegistrationRules").prop("readonly", true);
          $("#formRegistrationRules").attr("disabled", "disabled");
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
        .always(function() {});
    }

    // check mail confirm code
    if (sendRequestToApi) {
      var formData = $(form).serialize();
      $.post(apiRegCheckMailConfirm, formData)
        .done(function(data) {
          $(".form-general-error").html("");
          $(".modal-info .modal-title").html(
            "Ваше заявление принято и\u00A0отправлено\u00A0на рассмотрение"
          );
          $(".modal-info .modal-body").html(
            "Мы сообщим вам о результате проверки на указанную электронную почту."
          );
          modalInfo.show();
          showEmailConfirmButton = false;
          showEmailConfirmButton2 = false;
          showEmailConfirmField = false;
          isEmailConfirmed = true;
          $(".form-registration-mail-confirm-button2").hide();
          $(".form-registration-mail-confirm-input-container").hide();
          $("#modalInfo").on("hidden.bs.modal", function(e, triggered) {
            $(form).trigger("reset");
            location.href = "/page-authorization.html";
          });
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
        .always(function() {});
    }

    if (!isEmailConfirmed) {
      $(".form-general-error").html(
        `<div class="form-row"><div class="form-general-error__text">Пожалуйста, подтвердите электронную почту.</div></div>`
      );
    }

    if (showEmailConfirmButton) {
      $(".form-registration-mail-confirm-button").show();
    } else {
      $(".form-registration-mail-confirm-button").hide();
    }

    if (showEmailConfirmButton2) {
      $(".form-registration-mail-confirm-button2").show();
    } else {
      $(".form-registration-mail-confirm-button2").hide();
    }

    if (showEmailConfirmField) {
      $(".form-registration-mail-confirm-input-container").show();
    } else {
      $(".form-registration-mail-confirm-input-container").hide();
    }
  }
});

$(".form-registration-mail-confirm-button").on("click", () => {
  showEmailConfirmButton = false;
  showEmailConfirmField = true;
  $(".form-registration-mail-confirm-button").hide();
  $(".form-registration-mail-confirm-input-container").show();
  startEmailConfirmCountdown();
  sendRequestToApi = true;
});

$(".form-registration-mail-confirm-again-button").on("click", () => {
  showEmailConfirmButton2 = false;
  $(".form-registration-mail-confirm-again-button").hide();
  startEmailConfirmCountdown();
  sendRequestToApi = true;
});

function startEmailConfirmCountdown() {
  var start = 36;

  $(".form-registration-mail-confirm-countdown").html(
    `Осталось ${start} секунд, чтобы ввести код`
  );

  function CountdownStep() {
    start--;
    if (start > 0) {
      $(".form-registration-mail-confirm-countdown").html(
        `Осталось ${start} секунд, чтобы ввести код`
      );
      setTimeout(() => {
        CountdownStep();
      }, 1000);
    } else if (!isEmailConfirmed) {
      showEmailConfirmButton2 = true;
      sendRequestToApi = false;
      $(".form-registration-mail-confirm-countdown").html("Время истекло");
      $(".form-registration-mail-confirm-again-button").show();
      $(".form-general-error").html(
        `<div class="form-row"><div class="form-general-error__text">Время истекло. Отправьте проверочный код повторно.</div></div>`
      );
    }
  }
  CountdownStep();
}
