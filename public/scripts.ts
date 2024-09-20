// HTML Elements ko select karna
const resumeForm = document.getElementById('resume-form') as HTMLFormElement;
const resumeOutput = document.getElementById('resume-output') as HTMLDivElement;
const profilePicFileInput = document.getElementById('profile-pic') as HTMLInputElement;
const profilePicPreview = document.getElementById('profile-pic-preview') as HTMLImageElement;
let profilePicFile: File | null = null;

// Resume form ke submit event ko handle karna
resumeForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Input values ko get karna
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const address = (document.getElementById('address') as HTMLInputElement).value;

    // Education section ka data get karna
    const educationData = Array.from(document.querySelectorAll('#education-section .education-entry')).map(entry => {
        const institution = (entry.querySelector('input[name="institution"]') as HTMLInputElement).value;
        const degree = (entry.querySelector('input[name="degree"]') as HTMLInputElement).value;
        const startDate = (entry.querySelector('input[name="edu-start"]') as HTMLInputElement).value;
        const endDate = (entry.querySelector('input[name="edu-end"]') as HTMLInputElement).value;
        return { institution, degree, startDate, endDate };
    });

    // Work experience ka data get karna
    const workData = Array.from(document.querySelectorAll('#work-section .work-entry')).map(entry => {
        const company = (entry.querySelector('input[name="company"]') as HTMLInputElement).value;
        const position = (entry.querySelector('input[name="position"]') as HTMLInputElement).value;
        const startDate = (entry.querySelector('input[name="work-start"]') as HTMLInputElement).value;
        const endDate = (entry.querySelector('input[name="work-end"]') as HTMLInputElement).value;
        return { company, position, startDate, endDate };
    });

    // Skills ka data get karna
    const skillsData = Array.from(document.querySelectorAll('#skills-section .skill-entry')).map(entry => {
        const skill = (entry.querySelector('input[name="skill"]') as HTMLInputElement).value;
        return { skill };
    });

    // Resume ka HTML generate karna
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

    // Resume ko output mein display karna
    resumeOutput.innerHTML = `
        <button id="edit-resume" class="edit-button" onclick="editResume()">Edit Resume</button>
        <button id="download-resume" class="submit-button" onclick="downloadResume()">Download Resume</button>
        ${resumeHTML}
    `;
    resumeOutput.style.display = 'block';
});

// Profile picture ka preview
function previewImage(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
        profilePicFile = input.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            profilePicPreview.src = e.target?.result as string;
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
    const educationSection = document.getElementById('education-section') as HTMLDivElement;
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

// Work experience field ko add karna
function addWorkExperience() {
    const workSection = document.getElementById('work-section') as HTMLDivElement;
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

// Skill field ko add karna
function addSkill() {
    const skillsSection = document.getElementById('skills-section') as HTMLDivElement;
    const newSkill = document.createElement('div');
    newSkill.className = 'skill-entry';
    newSkill.innerHTML = `
        <input type="text" name="skill" placeholder="Skill" required>
    `;
    skillsSection.appendChild(newSkill);
}

// Resume ko edit karna
function editResume() {
    resumeOutput.style.display = 'none';
    resumeForm.reset();
}

// Resume output par click event handle karna
resumeOutput.addEventListener("click", () => {
    console.log("Resume output clicked");
});

function downloadResume() {
    const resumeOutput = document.getElementById("resume-output");
    const editButton = document.getElementById("edit-resume");
    const downloadButton = document.getElementById("download-resume");

    if (resumeOutput) {
        // Hide the buttons before generating the PDF
        editButton?.classList.add('hidden');
        downloadButton?.classList.add('hidden');

        // Ensure the resume output is visible
        resumeOutput.style.display = 'block'; 

        html2pdf().from(resumeOutput).save().then(() => {
            // Show the buttons again after the PDF is generated
            editButton?.classList.remove('hidden');
            downloadButton?.classList.remove('hidden');
        });
    } else {
        alert("No resume generated to download.");
    }
}
