document.addEventListener('DOMContentLoaded', () => {
    const data = window.portfolioData;
    if (data) {
        loadProfile(data.profile);

        if (document.getElementById('skills-list')) {
            loadSkills(data.skills);
        }

        if (document.getElementById('projects-list')) {
            loadProjects(data.projects);
        }

        if (document.getElementById('experience-list')) {
            loadExperience(data.experience);
        }

        if (document.getElementById('responsibilities-list')) {
            loadResponsibilities(data.responsibilities);
        }
    } else {
        console.error('Portfolio data not found. Check if data/data.js is linked.');
    }
});

function loadProfile(profile) {
    // Common elements
    const nameElements = document.querySelectorAll('.profile-name');
    nameElements.forEach(el => el.textContent = profile.name);

    // Hero section
    const roleEl = document.querySelector('.hero-role');
    if (roleEl) roleEl.textContent = profile.role;

    const taglineEl = document.querySelector('.hero-tagline');
    if (taglineEl) taglineEl.textContent = profile.tagline;

    const aboutEl = document.querySelector('.about-text');
    if (aboutEl) aboutEl.textContent = profile.about;

    // Links
    const resumeBtn = document.querySelector('.btn-resume');
    if (resumeBtn) resumeBtn.href = profile.resume;

    const githubLinks = document.querySelectorAll('.link-github');
    githubLinks.forEach(el => el.href = profile.github);

    const linkedinLinks = document.querySelectorAll('.link-linkedin');
    linkedinLinks.forEach(el => el.href = profile.linkedin);

    const emailLinks = document.querySelectorAll('.link-email');
    emailLinks.forEach(el => {
        el.href = `mailto:${profile.email}`;
        el.textContent = profile.email;
    });

    const phoneLinks = document.querySelectorAll('.link-phone');
    phoneLinks.forEach(el => {
        el.href = `tel:${profile.phone.replace(/\s+/g, '')}`;
        const textEl = el.querySelector('.link-phone-text');
        if (textEl) textEl.textContent = profile.phone;
        else el.textContent = profile.phone;
    });

    const locationElements = document.querySelectorAll('.link-location-text');
    locationElements.forEach(el => el.textContent = profile.location);

    // Avatar
    const avatarEl = document.querySelector('.profile-img');
    if (avatarEl) avatarEl.src = profile.avatar;
}

function loadSkills(skills) {
    const container = document.getElementById('skills-list');
    if (!container) return;

    skills.forEach(skill => {
        const li = document.createElement('li');
        li.className = 'glass-card';
        li.style.padding = '0.5rem 1rem';
        li.style.textAlign = 'center';
        li.textContent = skill;
        container.appendChild(li);
    });
}

function loadProjects(projects) {
    const container = document.getElementById('projects-list');
    if (!container) return;

    projects.forEach(project => {
        const div = document.createElement('div');
        div.className = 'glass-card project-card';

        const tagsHtml = project.tech.map(t => `<span class="tag">${t}</span>`).join('');

        let linkHtml = '';
        if (project.link && project.link !== '#') {
            linkHtml = `<a href="${project.link}" class="btn" style="margin-top: 1rem; font-size: 0.8rem; padding: 0.5rem 1rem;">View Project</a>`;
        } else {
            linkHtml = `<span style="display:inline-block; margin-top: 1rem; color: var(--text-muted); font-size: 0.8rem; font-style: italic;">Proprietary / Internal</span>`;
        }

        div.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tags">
                ${tagsHtml}
            </div>
            ${linkHtml}
        `;
        container.appendChild(div);
    });
}

function loadExperience(experience) {
    const container = document.getElementById('experience-list');
    if (!container) return;

    experience.forEach(job => {
        const div = document.createElement('div');
        div.className = 'glass-card';
        div.style.marginBottom = '1.5rem';

        const companyHtml = job.companyUrl
            ? `<a href="${job.companyUrl}" target="_blank" rel="noopener noreferrer" style="color: var(--secondary-color); text-decoration: none; border-bottom: 1px dotted var(--secondary-color);">${job.company}</a>`
            : job.company;

        div.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.5rem;">
                <h3 style="color: var(--primary-color);">${job.role}</h3>
                <span style="color: var(--text-muted); font-size: 0.9rem;">${job.period}</span>
            </div>
            <h4 style="margin-bottom: 0.5rem;">${companyHtml}</h4>
            <p>${job.description}</p>
        `;
        container.appendChild(div);
    });
}

function loadResponsibilities(responsibilities) {
    const container = document.getElementById('responsibilities-list');
    if (!container) return;

    responsibilities.forEach((resp, index) => {
        const div = document.createElement('div');
        div.style.marginBottom = index < responsibilities.length - 1 ? '1.5rem' : '0';
        div.style.paddingBottom = index < responsibilities.length - 1 ? '1.5rem' : '0';
        div.style.borderBottom = index < responsibilities.length - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none';

        div.innerHTML = `
            <h3 style="color: var(--secondary-color); margin-bottom: 0.5rem; font-size: 1.1rem;">
                ${resp.title}
            </h3>
            <p style="color: var(--text-muted); line-height: 1.6;">
                ${resp.description}
            </p>
        `;
        container.appendChild(div);
    });
}
