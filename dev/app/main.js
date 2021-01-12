import "../common/scss/main.scss";

const bsDatepick = $("#customizedBsDatepicker");
const selectMonths = $("#bsDatepickerMonthSelect");
const selectYears = $("#bsDatepickerYearSelect");
const prevButton = $(".custom-datepicker__prev");
const nextButton = $(".custom-datepicker__next");

bsDatepick.datepicker({});
let currentSelectedDate = new Date();

// listen select changed.bs.select
selectMonths.on("changed.bs.select", function(e) {
  currentSelectedDate.setMonth(e.target.value);
  bsDatepick.datepicker("update", currentSelectedDate);
});
selectYears.on("changed.bs.select", function(e) {
  currentSelectedDate.setFullYear(e.target.value);
  bsDatepick.datepicker("update", currentSelectedDate);
});

// click next prev months
function bsDpickerSetPrevNextMonth(step) {
  let currentMonth = currentSelectedDate.getMonth();
  currentMonth += step;
  currentSelectedDate.setMonth(currentMonth);
  bsDatepick.datepicker("update", currentSelectedDate);
  selectMonths.selectpicker("val", currentSelectedDate.getMonth());
  selectYears.selectpicker("val", currentSelectedDate.getFullYear());
}
prevButton.on("click", () => bsDpickerSetPrevNextMonth(-1));
nextButton.on("click", () => bsDpickerSetPrevNextMonth(1));

// start today date
bsDatepick.datepicker("update", new Date());
selectMonths.selectpicker("val", currentSelectedDate.getMonth());
selectYears.selectpicker("val", currentSelectedDate.getFullYear());

bsDatepick.datepicker().on("changeDate", function(e) {
  currentSelectedDate = new Date(e.date);
  selectMonths.selectpicker("val", currentSelectedDate.getMonth());
  selectYears.selectpicker("val", currentSelectedDate.getFullYear());
});
