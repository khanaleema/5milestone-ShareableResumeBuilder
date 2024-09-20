// HTML Elements ko select karna
var resumeForm = document.getElementById('resume-form');
var resumeOutput = document.getElementById('resume-output');
var profilePicFileInput = document.getElementById('profile-pic');
var profilePicPreview = document.getElementById('profile-pic-preview');
var profilePicFile = null;
// Resume form ke submit event ko handle karna
resumeForm.addEventListener('submit', function (event) {
    event.preventDefault();
    // Input values ko get karna
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var address = document.getElementById('address').value;
    // Education section ka data get karna
    var educationData = Array.from(document.querySelectorAll('#education-section .education-entry')).map(function (entry) {
        var institution = entry.querySelector('input[name="institution"]').value;
        var degree = entry.querySelector('input[name="degree"]').value;
        var startDate = entry.querySelector('input[name="edu-start"]').value;
        var endDate = entry.querySelector('input[name="edu-end"]').value;
        return { institution: institution, degree: degree, startDate: startDate, endDate: endDate };
    });
    // Work experience ka data get karna
    var workData = Array.from(document.querySelectorAll('#work-section .work-entry')).map(function (entry) {
        var company = entry.querySelector('input[name="company"]').value;
        var position = entry.querySelector('input[name="position"]').value;
        var startDate = entry.querySelector('input[name="work-start"]').value;
        var endDate = entry.querySelector('input[name="work-end"]').value;
        return { company: company, position: position, startDate: startDate, endDate: endDate };
    });
    // Skills ka data get karna
    var skillsData = Array.from(document.querySelectorAll('#skills-section .skill-entry')).map(function (entry) {
        var skill = entry.querySelector('input[name="skill"]').value;
        return { skill: skill };
    });
    // Resume ka HTML generate karna
    var resumeHTML = "\n        <div class=\"resume-header\">\n            <img src=\"".concat(profilePicFile ? URL.createObjectURL(profilePicFile) : '', "\" class=\"resume-profile-pic\" alt=\"Profile Picture\">\n            <div class=\"contact-info\">\n                <h2>").concat(name, "</h2>\n                <p>Email: ").concat(email, "</p>\n                <p>Phone: ").concat(phone, "</p>\n                <p>Address: ").concat(address, "</p>\n            </div>\n        </div>\n        <div class=\"resume-section\">\n            <h3>Education</h3>\n            <ul>\n                ").concat(educationData.map(function (data) { return "\n                    <li>\n                        <strong>".concat(data.institution, "</strong><br>\n                        Degree: ").concat(data.degree, "<br>\n                        ").concat(data.startDate, " - ").concat(data.endDate, "\n                    </li>\n                "); }).join(''), "\n            </ul>\n        </div>\n        <div class=\"resume-section\">\n            <h3>Work Experience</h3>\n            <ul>\n                ").concat(workData.map(function (data) { return "\n                    <li>\n                        <strong>".concat(data.company, "</strong><br>\n                        Position: ").concat(data.position, "<br>\n                        ").concat(data.startDate, " - ").concat(data.endDate, "\n                    </li>\n                "); }).join(''), "\n            </ul>\n        </div>\n        <div class=\"resume-section\">\n            <h3>Skills</h3>\n            <ul>\n                ").concat(skillsData.map(function (data) { return "\n                    <li>".concat(data.skill, "</li>\n                "); }).join(''), "\n            </ul>\n        </div>\n    ");
    // Resume ko output mein display karna
    resumeOutput.innerHTML = "\n        <button id=\"edit-resume\" class=\"edit-button\" onclick=\"editResume()\">Edit Resume</button>\n        <button id=\"download-resume\" class=\"submit-button\" onclick=\"downloadResume()\">Download Resume</button>\n        ".concat(resumeHTML, "\n    ");
    resumeOutput.style.display = 'block';
});
// Profile picture ka preview
function previewImage(event) {
    var input = event.target;
    if (input.files && input.files[0]) {
        profilePicFile = input.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            profilePicPreview.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
}
// Profile picture ko select karna
function editProfilePic() {
    profilePicFileInput.click();
}
// Education field ko add karna
function addEducation() {
    var educationSection = document.getElementById('education-section');
    var newEducation = document.createElement('div');
    newEducation.className = 'education-entry';
    newEducation.innerHTML = "\n        <input type=\"text\" name=\"institution\" placeholder=\"Institution\" required>\n        <input type=\"text\" name=\"degree\" placeholder=\"Degree\" required>\n        <input type=\"date\" name=\"edu-start\" placeholder=\"Start Date\" required>\n        <input type=\"date\" name=\"edu-end\" placeholder=\"End Date\" required>\n    ";
    educationSection.appendChild(newEducation);
}
// Work experience field ko add karna
function addWorkExperience() {
    var workSection = document.getElementById('work-section');
    var newWork = document.createElement('div');
    newWork.className = 'work-entry';
    newWork.innerHTML = "\n        <input type=\"text\" name=\"company\" placeholder=\"Company\" required>\n        <input type=\"text\" name=\"position\" placeholder=\"Position\" required>\n        <input type=\"date\" name=\"work-start\" placeholder=\"Start Date\" required>\n        <input type=\"date\" name=\"work-end\" placeholder=\"End Date\" required>\n    ";
    workSection.appendChild(newWork);
}
// Skill field ko add karna
function addSkill() {
    var skillsSection = document.getElementById('skills-section');
    var newSkill = document.createElement('div');
    newSkill.className = 'skill-entry';
    newSkill.innerHTML = "\n        <input type=\"text\" name=\"skill\" placeholder=\"Skill\" required>\n    ";
    skillsSection.appendChild(newSkill);
}
// Resume ko edit karna
function editResume() {
    resumeOutput.style.display = 'none';
    resumeForm.reset();
}
// Resume output par click event handle karna
resumeOutput.addEventListener("click", function () {
    console.log("Resume output clicked");
});
function downloadResume() {
    var resumeOutput = document.getElementById("resume-output");
    var editButton = document.getElementById("edit-resume");
    var downloadButton = document.getElementById("download-resume");
    if (resumeOutput) {
        // Hide the buttons before generating the PDF
        editButton === null || editButton === void 0 ? void 0 : editButton.classList.add('hidden');
        downloadButton === null || downloadButton === void 0 ? void 0 : downloadButton.classList.add('hidden');
        // Ensure the resume output is visible
        resumeOutput.style.display = 'block';
        html2pdf().from(resumeOutput).save().then(function () {
            // Show the buttons again after the PDF is generated
            editButton === null || editButton === void 0 ? void 0 : editButton.classList.remove('hidden');
            downloadButton === null || downloadButton === void 0 ? void 0 : downloadButton.classList.remove('hidden');
        });
    }
    else {
        alert("No resume generated to download.");
    }
}
