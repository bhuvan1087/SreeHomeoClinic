const SHEET_NAME = "Appointments";

function doPost(e) {
  const sheet = getAppointmentSheet_();
  const data = JSON.parse((e && e.postData && e.postData.contents) || "{}");

  sheet.appendRow([
    data.id || data.appointmentId || Utilities.getUuid(),
    data.submittedAt || data.timestamp || new Date().toISOString(),
    data.clinic || data.clinicName || "",
    data.doctor || data.doctorName || "",
    data.name || data.patientName || data.fullName || "",
    data.phone || data.mobile || data.phoneNumber || "",
    data.concern || data.healthConcern || data.symptoms || "",
    data.consultationType || data.consultationMode || data.visitType || data.appointmentType || data.mode || "",
    data.preferredDate || data.appointmentDate || data.date || "",
    data.preferredTime || data.appointmentTime || data.timeSlot || data.slot || "",
    data.status || "NEW",
    data.source || "Website",
    data.pageUrl || "",
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getAppointmentSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Appointment ID",
      "Submitted At",
      "Clinic",
      "Doctor",
      "Name",
      "Phone",
      "Health Concern",
      "Consultation Type",
      "Preferred Date",
      "Preferred Time",
      "Status",
      "Source",
      "Page URL",
    ]);
  }

  return sheet;
}
