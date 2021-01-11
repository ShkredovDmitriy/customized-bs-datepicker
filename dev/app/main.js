import "../common/scss/main.scss";

$(".custom-datepicker").datepicker({
  format: "mm/dd/yyyy",
  maxViewMode: 0,
  language: "ru",
  templates: {
    leftArrow: "<span></span>",
    rightArrow: "<span></span>"
  }
});
