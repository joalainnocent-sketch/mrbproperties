document.getElementById('mobileMenu').addEventListener('click', function() {
    document.getElementById('mainNav').classList.toggle('active');
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            document.getElementById('mainNav').classList.remove('active');

            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 120)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

const zarFormatter = new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR'
});

function formatThousandsAbbrev(amount) {
    const k = Math.round(amount / 1000);
    return `${k}K`;
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.price[data-amount], .zar-price[data-amount]').forEach(element => {
        const raw = element.getAttribute('data-amount');
        const amount = raw ? Number(raw) : NaN;
        if (!Number.isNaN(amount)) {
            const full = zarFormatter.format(amount);
            element.textContent = formatThousandsAbbrev(amount);
            element.setAttribute('aria-label', full);
        }
    });

    const waBtn = document.getElementById('whatsappFloat');
    if (waBtn) {
        const number = '27815408254';
        const siteTitle = document.title || 'Major RB Properties';
        const pageUrl = window.location.href;
        const message = [
            'Hello Major RB Properties,',
            'I have an enquiry about your services. Please assist me with the following:',
            '',
            '- Services of interest: [Utilities / Water connection / Electricity connection / Property pricing / Availability / Other]',
            '- My questions: [Briefly describe your questions]',
            '',
            'My details:',
            '- Name: [Your Name]',
            '- Preferred contact: [Phone / Email / WhatsApp]',
            '- Best time to reach me: [Time]',
            '',
            `From: ${siteTitle}`,
            `Page: ${pageUrl}`
        ].join('\n');
        const href = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
        waBtn.setAttribute('href', href);
    }
});

