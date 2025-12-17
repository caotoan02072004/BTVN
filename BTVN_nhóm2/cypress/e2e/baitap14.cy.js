/// <reference types="cypress" />
// Bỏ qua các lỗi uncaught exception từ script ngoài (ads, analytics)
describe("TB_14 - Hoàn thành đăng ký Student Registration Form", () => {
  it("Điền đầy đủ thông tin và submit form", () => {
    cy.visit("https://demoqa.com/automation-practice-form");
    const student = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@test.com",
      gender: "Male",
      mobile: "0987654321",
      dob: {
        day: "15",
        month: "May",
        year: "1990"
      },
      subjects: ["Maths", "Physics", "Computer Science"],
      hobbies: ["Sports", "Music"],
      address: "123 Test Street, Hanoi",
      state: "NCR",
      city: "Delhi",
      file: "example.txt"
    };

    // Điền thông tin cơ bản
    cy.get("#firstName").type(student.firstName);
    cy.get("#lastName").type(student.lastName);
    cy.get("#userEmail").type(student.email);
    cy.contains('label', student.gender).click();
    cy.get("#userNumber").type(student.mobile);

    // Date of Birth
    cy.get("#dateOfBirthInput").click();
    cy.get(".react-datepicker__month-select").select(student.dob.month);
    cy.get(".react-datepicker__year-select").select(student.dob.year);
    cy.get(`.react-datepicker__day--0${student.dob.day}`).not('.react-datepicker__day--outside-month').click();

    // Subjects
    student.subjects.forEach(subject => {
      cy.get("#subjectsInput").type(subject).type('{enter}');
    });

    // Hobbies
    student.hobbies.forEach(hobby => {
      cy.contains('label', hobby).click();
    });

    // Upload file (cần plugin cypress-file-upload)
    cy.get('#uploadPicture').attachFile(student.file);

    // Address
    cy.get("#currentAddress").type(student.address);

    // State & City
    cy.get("#state").click();
    cy.contains("div", student.state).click();
    cy.get("#city").click();
    cy.contains("div", student.city).click();

    // Submit form
    cy.get("#submit").click();

    // Kiểm tra popup hiển thị
    cy.get(".modal-content").should("be.visible");
    cy.contains(".modal-title", "Thanks for submitting the form").should("exist");

    // Kiểm tra Student Name hiển thị đúng
    cy.get("td")
      .contains("Student Name")
      .siblings("td")
      .should("have.text", `${student.firstName} ${student.lastName}`);
  });
});
