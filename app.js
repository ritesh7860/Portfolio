    // Toast Message
    function showToast(message, type = "success") {

      const toast = document.getElementById("toast");

      toast.innerText = message;
      toast.className = "";

      if (type === "error") {
        toast.classList.add("error");
      }

      toast.classList.add("show");

      setTimeout(() => {
        toast.classList.remove("show");
      }, 3000);
    }


    // Scroll reveal
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach(el => observer.observe(el));

    // Nav highlight
    window.addEventListener('scroll', () => {
      const nav = document.querySelector('nav');
      nav.style.background = window.scrollY > 60
        ? 'rgba(10,15,30,0.97)'
        : 'linear-gradient(to bottom, rgba(10,15,30,0.95) 0%, transparent 100%)';
    });

    emailjs.init("7CNLANTci6Dhe-ZNd");

    function handleSubmit(btn) {

      const name = document.querySelectorAll('.form-input')[0];
      const email = document.querySelectorAll('.form-input')[1];
      const subject = document.querySelectorAll('.form-input')[2];
      const message = document.querySelector('.form-textarea');

      // Validate all fields
      if (
        !name.value.trim() ||
        !email.value.trim() ||
        !subject.value.trim() ||
        !message.value.trim()
      ) {
        btn.innerHTML = "Please fill all fields.";
        // showToast("Please fill all fields.");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email.value)) {
        btn.innerHTML = "Please enter a valid email address.";
        return;
      }

      btn.disabled = true;
      btn.innerHTML = "Sending...";

      const templateParams = {
        name: name.value,
        email: email.value,
        subject: subject.value,
        message: message.value
      };

      emailjs.send(
        "service_4bypqe6",
        "template_l3g48af",
        templateParams
      )
        .then(function (response) {

          showToast("Message sent successfully!");

          name.value = "";
          email.value = "";
          subject.value = "";
          message.value = "";

          btn.disabled = false;
          btn.innerHTML = "&#9993; Send Message";

          console.log("SUCCESS!", response.status, response.text);

        })
        .catch(function (error) {

          console.error("FAILED...", error);

          showToast("Failed to send message. Please try again.");

          btn.disabled = false;
          btn.innerHTML = "&#9993; Send Message";
        });
    }
    // Interaction layer: transform-only effects keep the page responsive.
    (() => {
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      const finePointer = matchMedia('(pointer: fine)').matches;
      const intro = document.getElementById('intro');
      if (!reduced) window.addEventListener('load', () => setTimeout(() => intro.classList.add('done'), 750), { once: true });

      const navToggle = document.querySelector('.nav-toggle');
      const navMenu = document.querySelector('.nav-links');
      const closeMenu = () => { navMenu.classList.remove('open'); document.body.classList.remove('nav-menu-open'); navToggle.setAttribute('aria-expanded', 'false'); navToggle.setAttribute('aria-label', 'Open navigation'); };
      navToggle.addEventListener('click', () => { const open = navMenu.classList.toggle('open'); document.body.classList.toggle('nav-menu-open', open); navToggle.setAttribute('aria-expanded', String(open)); navToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); });
      navMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
      addEventListener('resize', () => { if (innerWidth > 900) closeMenu(); }, { passive:true });

      if (finePointer && !reduced) {
        const cursor = document.getElementById('cursor');
        const ring = document.getElementById('cursor-ring');
        const cursorWord = document.getElementById('cursor-word');
        let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
        addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; cursor.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`; document.documentElement.style.setProperty('--mx', `${mx / innerWidth * 100}%`); document.documentElement.style.setProperty('--my', `${my / innerHeight * 100}%`); }, { passive: true });
        const follow = () => { rx += (mx - rx) * .34; ry += (my - ry) * .34; ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`; requestAnimationFrame(follow); }; follow();
        document.querySelectorAll('a, button, .cert-item, .skill-tag, .cert-card').forEach(el => { el.addEventListener('mouseenter', () => { document.body.classList.add('cursor-active'); cursorWord.textContent = el.closest('.cert-card, .cert-item') ? 'CERT' : el.closest('.project-card, .personal-project-card') ? 'VIEW' : 'GO'; }); el.addEventListener('mouseleave', () => { document.body.classList.remove('cursor-active'); cursorWord.textContent = ''; }); });
        document.querySelectorAll('.magnetic, nav a, .pp-live-btn').forEach(el => {
          el.addEventListener('mousemove', e => { const r = el.getBoundingClientRect(); el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .16}px, ${(e.clientY - r.top - r.height / 2) * .16}px)`; });
          el.addEventListener('mouseleave', () => el.style.transform = 'translate(0,0)');
        });
        document.querySelectorAll('.skill-card,.project-card,.personal-project-card,.edu-card').forEach(card => {
          card.addEventListener('mousemove', e => { const r = card.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; card.style.transform = `perspective(850px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg) translateY(-5px)`; });
          card.addEventListener('mouseleave', () => card.style.transform = '');
        });
        document.querySelectorAll('.cert-card').forEach(card => {
          card.addEventListener('mousemove', e => { const r = card.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; card.style.setProperty('--cx', `${(x + .5) * 100}%`); card.style.setProperty('--cy', `${(y + .5) * 100}%`); card.style.transform = `perspective(850px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateY(-4px)`; });
          card.addEventListener('mouseleave', () => card.style.transform = '');
        });
        const center = document.querySelector('.command-center');
        document.getElementById('hero').addEventListener('mousemove', e => { const r = e.currentTarget.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; center.style.transform = `perspective(1200px) rotateY(${-5 + x * 8}deg) rotateX(${2 - y * 6}deg)`; });
      }
      document.querySelectorAll('.cert-item').forEach(item => item.addEventListener('click', () => item.classList.toggle('active')));
      const sections = [...document.querySelectorAll('section[id]')];
      const navLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
      const sectionObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`)); }), { rootMargin: '-45% 0px -48%', threshold: 0 });
      sections.forEach(section => sectionObserver.observe(section));
      const bug = document.getElementById('bug');
      bug.addEventListener('click', () => { bug.classList.add('bug-found'); bug.textContent = '✓ BUG CAPTURED · TEST CASE ADDED'; setTimeout(() => { bug.classList.remove('bug-found'); bug.textContent = '⚡ REPORT A BUG'; }, 2200); });
      const themeSwitch = document.getElementById('theme-switch');
      const themes = ['classic', 'neon', 'amber', 'violet', 'matrix', 'arctic'];
      const themeNames = { classic: 'CLASSIC', neon: 'NEON GRID', amber: 'AMBER LAB', violet: 'CYBER VIOLET', matrix: 'MATRIX QA', arctic: 'ARCTIC SIGNAL' };
      const themeWash = document.getElementById('theme-wash');
      const savedTheme = localStorage.getItem('qa-theme') || 'classic';
      const setTheme = (theme, animate = false) => { if (animate && !reduced) { themeWash.classList.remove('play'); void themeWash.offsetWidth; themeWash.classList.add('play'); } document.body.dataset.theme = theme === 'classic' ? '' : theme; themeSwitch.textContent = `QA THEME: ${themeNames[theme]}`; localStorage.setItem('qa-theme', theme); };
      setTheme(savedTheme);
      themeSwitch.addEventListener('click', () => setTheme(themes[(themes.indexOf(localStorage.getItem('qa-theme') || 'classic') + 1) % themes.length], true));
      let keys = [];
      addEventListener('keydown', e => { keys = [...keys.slice(-7), e.key.toLowerCase()]; if (keys.join('') === 'qaqaqaqa') { document.body.classList.toggle('matrix'); showToast('QA MODE UNLOCKED — all systems curious.'); } });
      // Every intentional click gets a tiny QA-style test pulse without blocking normal actions.
      document.addEventListener('click', e => {
        if (reduced || e.target.closest('input, textarea, select')) return;
        const ping = document.createElement('span');
        ping.id = 'qa-click';
        ping.style.left = `${e.clientX}px`; ping.style.top = `${e.clientY}px`;
        ping.innerHTML = '<i class="qa-check">✓</i>';
        document.body.appendChild(ping);
        ping.addEventListener('animationend', () => ping.remove());
      });
    })();
