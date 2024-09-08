"use strict";
const resumeForm = document.getElementById('resume-form');
const resumeOutput = document.getElementById('resume-output');
const profilePicFileInput = document.getElementById('profile-pic');
const profilePicPreview = document.getElementById('profile-pic-preview');
let profilePicFile = null;
resumeForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const educationData = Array.from(document.querySelectorAll('#education-section .education-entry')).map(entry => {
        const institution = entry.querySelector('input[name="institution"]').value;
        const degree = entry.querySelector('input[name="degree"]').value;
        const startDate = entry.querySelector('input[name="edu-start"]').value;
        const endDate = entry.querySelector('input[name="edu-end"]').value;
        return { institution, degree, startDate, endDate };
    });
    const workData = Array.from(document.querySelectorAll('#work-section .work-entry')).map(entry => {
        const company = entry.querySelector('input[name="company"]').value;
        const position = entry.querySelector('input[name="position"]').value;
        const startDate = entry.querySelector('input[name="work-start"]').value;
        const endDate = entry.querySelector('input[name="work-end"]').value;
        return { company, position, startDate, endDate };
    });
    const skillsData = Array.from(document.querySelectorAll('#skills-section .skill-entry')).map(entry => {
        const skill = entry.querySelector('input[name="skill"]').value;
        return { skill };
    });
    // Generate Resume HTML
    const resumeHTML = `
        <div class="resume-header">
            <img src="${profilePicFile ? URL.createObjectURL(profilePicFile) : ''}" class="resume-profile-pic" alt="Profile Picture">
            <div class="contact-info">
                <h2>${name}</h2>
                <p>Email: ${email}</p>
                <p>Phone: ${phone}</p>
                <p>Address: ${address}</p>
            </div>
        </div>
        <div class="resume-section">
            <h3>Education</h3>
            <ul>
                ${educationData.map(data => `
                    <li>
                        <strong>${data.institution}</strong><br>
                        Degree: ${data.degree}<br>
                        ${data.startDate} - ${data.endDate}
                    </li>
                `).join('')}
            </ul>
        </div>
        <div class="resume-section">
            <h3>Work Experience</h3>
            <ul>
                ${workData.map(data => `
                    <li>
                        <strong>${data.company}</strong><br>
                        Position: ${data.position}<br>
                        ${data.startDate} - ${data.endDate}
                    </li>
                `).join('')}
            </ul>
        </div>
        <div class="resume-section">
            <h3>Skills</h3>
            <ul>
                ${skillsData.map(data => `
                    <li>${data.skill}</li>
                `).join('')}
            </ul>
        </div>
    `;
    resumeOutput.innerHTML = `
        <button id="edit-resume" class="edit-button" onclick="editResume()">Edit Resume</button>
        <button id="download-resume" class="submit-button" onclick="downloadResume()">Download Resume</button>
        ${resumeHTML}
    `;
    resumeOutput.style.display = 'block';
});
function previewImage(event) {
    const input = event.target;
    if (input.files && input.files[0]) {
        profilePicFile = input.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            var _a;
            profilePicPreview.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
}
function editProfilePic() {
    profilePicFileInput.click();
}
function addEducation() {
    const educationSection = document.getElementById('education-section');
    const newEducation = document.createElement('div');
    newEducation.className = 'education-entry';
    newEducation.innerHTML = `
        <input type="text" name="institution" placeholder="Institution" required>
        <input type="text" name="degree" placeholder="Degree" required>
        <input type="date" name="edu-start" placeholder="Start Date" required>
        <input type="date" name="edu-end" placeholder="End Date" required>
    `;
    educationSection.appendChild(newEducation);
}
function addWorkExperience() {
    const workSection = document.getElementById('work-section');
    const newWork = document.createElement('div');
    newWork.className = 'work-entry';
    newWork.innerHTML = `
        <input type="text" name="company" placeholder="Company" required>
        <input type="text" name="position" placeholder="Position" required>
        <input type="date" name="work-start" placeholder="Start Date" required>
        <input type="date" name="work-end" placeholder="End Date" required>
    `;
    workSection.appendChild(newWork);
}
function addSkill() {
    const skillsSection = document.getElementById('skills-section');
    const newSkill = document.createElement('div');
    newSkill.className = 'skill-entry';
    newSkill.innerHTML = `
        <input type="text" name="skill" placeholder="Skill" required>
    `;
    skillsSection.appendChild(newSkill);
}
function editResume() {
    resumeOutput.style.display = 'none';
    resumeForm.reset();
}
function downloadResume() {
    const opt = {
        margin: 1,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(resumeOutput).set(opt).save();
}
