import "../common/scss/main.scss";

$(".custom-datepicker").datepicker({});

let currentSelectedDate = new Date();

//
$("#bsDatepickerMonthSelect").on("changed.bs.select", function(e) {
  console.log(e.target.value);
  currentSelectedDate.setMonth(e.target.value);
  $(".custom-datepicker").datepicker("update", currentSelectedDate);
});

//
$("#bsDatepickerYearSelect").on("changed.bs.select", function(e) {
  console.log(e.target.value);
  currentSelectedDate.setFullYear(e.target.value);
  $(".custom-datepicker").datepicker("update", currentSelectedDate);
});

function bsDpickerSetNextMonth() {
  let currentMonth = currentSelectedDate.getMonth();
  currentMonth += 1;
  currentSelectedDate.setMonth(currentMonth);
  $(".custom-datepicker").datepicker("update", currentSelectedDate);
  $("#bsDatepickerMonthSelect").selectpicker(
    "val",
    currentSelectedDate.getMonth()
  );
  $("#bsDatepickerYearSelect").selectpicker(
    "val",
    currentSelectedDate.getFullYear()
  );
}

function bsDpickerSetPrevMonth() {
  let currentMonth = currentSelectedDate.getMonth();
  currentMonth -= 1;
  currentSelectedDate.setMonth(currentMonth);
  $(".custom-datepicker").datepicker("update", currentSelectedDate);
  $("#bsDatepickerMonthSelect").selectpicker(
    "val",
    currentSelectedDate.getMonth()
  );
  $("#bsDatepickerYearSelect").selectpicker(
    "val",
    currentSelectedDate.getFullYear()
  );
}

//
$(".custom-datepicker").datepicker("update", new Date());
$("#bsDatepickerMonthSelect").selectpicker(
  "val",
  currentSelectedDate.getMonth()
);
$("#bsDatepickerYearSelect").selectpicker(
  "val",
  currentSelectedDate.getFullYear()
);

//
$(".custom-datepicker__prev").on("click", () => {
  bsDpickerSetPrevMonth();
  console.log("prev");
});

$(".custom-datepicker__next").on("click", () => {
  bsDpickerSetNextMonth();
  console.log("next");
});

$(".custom-datepicker")
  .datepicker()
  .on("changeDate", function(e) {
    currentSelectedDate = new Date(e.date);
    $("#bsDatepickerMonthSelect").selectpicker(
      "val",
      currentSelectedDate.getMonth()
    );
    $("#bsDatepickerYearSelect").selectpicker(
      "val",
      currentSelectedDate.getFullYear()
    );
    console.log(
      currentSelectedDate +
        "-" +
        currentSelectedDate.getMonth() +
        "-" +
        currentSelectedDate.getFullYear()
    );
    //
  });
