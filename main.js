/* =========================================================
   Aginet SA — interacciones
   Sin dependencias. Todo vanilla JS.
   ========================================================= */

const WA_NUMBER = "5491124080743"; // WhatsApp comercial: +54 9 11 2408-0743

/* Páginas propias de cada app. Pegá la URL cuando esté publicada y el botón
   "Conocer ..." aparece solo en la tarjeta. Vacío = el botón queda oculto. */
const APP_LINKS = {
  aquacontrol: "https://aquacontrol.aginet.com.ar/",
  agipedidos: "https://agipedidos.aginet.com.ar/",
  agivision: "https://agivision.aginet.com.ar/",
};

/* ---------- Contenido de servicios ---------- */
const SERVICES = {
  pbx: {
    title: "Centrales IP",
    tag: "Una central a tu medida, en la nube o en tu oficina.",
    desc: "Instalamos o migramos tu central telefónica a tecnología IP. Atendé desde cualquier lugar, con menús de voz, colas, grabación y reportes. Sin depender de hardware viejo ni de un técnico que venga cada vez.",
    features: ["IVR y menús de voz", "Colas y grupos de llamada", "Extensiones ilimitadas", "Grabación de llamadas", "Transición a la nube", "Soporte personalizado"],
    icon: '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M7 9h10M7 13h6"/><circle cx="17" cy="14" r="1.2"/></svg>',
  },
  voip: {
    title: "Telefonía IP",
    tag: "Llamadas de calidad, menos costo.",
    desc: "Líneas SIP, troncales IP y numeración 0800 / 0810 para que tu empresa hable más y pague menos. Tu interno te sigue al celular o a la notebook, estés donde estés.",
    features: ["Líneas SIP", "Números 0800 / 0810", "Troncal IP", "Portabilidad numérica", "Movilidad: tu interno en el celular", "Ahorro en llamadas"],
    icon: '<svg viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/><path d="M15 3a6 6 0 016 6M15 7a2 2 0 012 2"/></svg>',
  },
  cc: {
    title: "Call Center",
    tag: "Tu call center en la nube, listo en días.",
    desc: "Campañas, discador, colas inteligentes y monitoreo en tiempo real para equipos de ventas, cobranzas o atención. Y cuando el volumen crece, agentes de voz con IA que absorben las llamadas repetitivas.",
    features: ["Discador y campañas", "Colas inteligentes", "Grabación y monitoreo", "Reportes en tiempo real", "Integración con CRM", "Agentes de voz con IA"],
    icon: '<svg viewBox="0 0 24 24"><path d="M4 13a8 8 0 0116 0"/><rect x="3" y="12" width="4" height="6" rx="1.5"/><rect x="17" y="12" width="4" height="6" rx="1.5"/><path d="M19 18a3 3 0 01-3 3h-3"/></svg>',
  },
  hosting: {
    title: "Hosting y Web",
    tag: "Alojamiento seguro, rápido y económico.",
    desc: "Hosting con panel cPanel, dominios, casillas de correo corporativas y certificados SSL. Si necesitás presencia nueva, diseñamos tu sitio web y lo dejamos online.",
    features: ["Hosting cPanel", "Dominios", "Casillas de correo", "Certificado SSL", "Diseño web", "Backups automáticos"],
    icon: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/></svg>',
  },
  mkt: {
    title: "Marketing",
    tag: "Llegá a tu audiencia de forma eficiente.",
    desc: "Campañas de email, SMS masivos y encuestas telefónicas sobre bases segmentadas. Medimos cada envío para que sepas qué funciona y qué no.",
    features: ["Email marketing", "SMS masivos", "Encuestas telefónicas", "Campañas de WhatsApp", "Bases segmentadas", "Reportes de resultados"],
    icon: '<svg viewBox="0 0 24 24"><path d="M3 11v2a2 2 0 002 2h2l6 4V5L7 9H5a2 2 0 00-2 2z"/><path d="M17 9a4 4 0 010 6M19.5 6.5a8 8 0 010 11"/></svg>',
  },
  srv: {
    title: "Servidores",
    tag: "Infraestructura a medida y escalable.",
    desc: "VPS, servidores dedicados y VPN corporativa, administrados y monitoreados por nuestro equipo. Crecés cuando lo necesitás, sin comprar fierros ni sumar personal de IT.",
    features: ["VPS", "Servidores dedicados", "VPN corporativa", "Monitoreo 24/7", "Backups", "Administración y soporte"],
    icon: '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="7" rx="2"/><rect x="3" y="13" width="18" height="7" rx="2"/><path d="M7 7.5h.01M7 16.5h.01"/></svg>',
  },
};

/* ---------- Helpers ---------- */
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Nav: scroll state, progreso, menú móvil, link activo ---------- */
(() => {
  const nav = $("#nav");
  const bar = $(".progress span");
  const burger = $("#burger");
  const links = $("#navLinks");

  const onScroll = () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 20);
    const h = document.documentElement;
    const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    bar.style.width = pct + "%";
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  burger.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  });
  links.addEventListener("click", (e) => {
    if (e.target.tagName === "A") { links.classList.remove("is-open"); burger.setAttribute("aria-expanded", "false"); }
  });

  // Resalta el link de la sección visible
  const sections = $$("main section[id]");
  const navAnchors = $$('#navLinks a[href^="#"]');
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      navAnchors.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach((s) => spy.observe(s));
})();

/* ---------- Reveal on scroll ---------- */
(() => {
  const els = $$(".reveal, .steps li");
  if (reduceMotion) { els.forEach((el) => el.classList.add("is-visible")); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  els.forEach((el) => io.observe(el));
})();

/* ---------- Hero: red de nodos reactiva al cursor ---------- */
(() => {
  const canvas = $("#net");
  if (!canvas || reduceMotion) return;
  const ctx = canvas.getContext("2d");
  let w, h, dpr, nodes = [], mouse = { x: -9999, y: -9999 }, raf;

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.round((w * h) / 16000);
    nodes = Array.from({ length: Math.min(count, 110) }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35,
      r: Math.random() * 1.6 + .8,
    }));
  };

  const step = () => {
    ctx.clearRect(0, 0, w, h);
    const linkDist = 130;
    for (const n of nodes) {
      // atracción suave hacia el cursor
      const dx = mouse.x - n.x, dy = mouse.y - n.y, d2 = dx * dx + dy * dy;
      if (d2 < 220 * 220) { n.vx += dx * .00004; n.vy += dy * .00004; }
      n.x += n.vx; n.y += n.vy;
      n.vx *= .995; n.vy *= .995;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
    }
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy);
        if (d < linkDist) {
          const alpha = (1 - d / linkDist) * .35;
          ctx.strokeStyle = `rgba(167,139,250,${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
    }
    for (const n of nodes) {
      const near = Math.hypot(mouse.x - n.x, mouse.y - n.y) < 160;
      ctx.fillStyle = near ? "rgba(34,211,238,.9)" : "rgba(196,181,253,.7)";
      ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
    }
    raf = requestAnimationFrame(step);
  };

  const hero = canvas.parentElement;
  hero.addEventListener("pointermove", (e) => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
  hero.addEventListener("pointerleave", () => { mouse.x = mouse.y = -9999; });
  window.addEventListener("resize", resize);
  resize(); step();

  // pausa cuando el hero no está en pantalla
  new IntersectionObserver(([en]) => {
    if (en.isIntersecting) { if (!raf) step(); } else { cancelAnimationFrame(raf); raf = null; }
  }).observe(hero);
})();

/* ---------- Explorer de servicios ---------- */
(() => {
  const list = $("#explorer .explorer__list");
  const items = $$(".explorer__item");
  const panel = $("#panel-services");
  const timer = $(".explorer__timer");
  const els = { icon: $("#svcIcon"), title: $("#svcTitle"), tag: $("#svcTag"), desc: $("#svcDesc"), feats: $("#svcFeatures"), cta: $("#svcCta") };
  const ROTATE_MS = 6000;
  let current = "pbx", auto = null, userTouched = false;
  const isMobile = () => window.matchMedia("(max-width: 899px)").matches;

  const render = (key) => {
    const s = SERVICES[key];
    panel.classList.remove("is-switching"); void panel.offsetWidth; panel.classList.add("is-switching");
    els.icon.innerHTML = s.icon;
    els.title.textContent = s.title;
    els.tag.textContent = s.tag;
    els.desc.textContent = s.desc;
    els.feats.innerHTML = s.features.map((f) => `<li>${f}</li>`).join("");
    els.cta.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hola Aginet, quiero consultar por ${s.title}.`)}`;
    els.cta.target = "_blank"; els.cta.rel = "noopener";
    panel.setAttribute("aria-labelledby", "tab-" + key);
    items.forEach((b) => {
      const on = b.dataset.service === key;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-selected", String(on));
    });
    // En móvil el panel se acomoda debajo del botón activo (acordeón)
    const active = items.find((b) => b.dataset.service === key);
    if (isMobile()) active.insertAdjacentElement("afterend", panel); else list.parentElement.appendChild(panel);
    current = key;
  };

  const restartTimer = () => {
    timer.classList.remove("is-running"); void timer.offsetWidth;
    if (!userTouched && !isMobile()) timer.classList.add("is-running");
  };
  const startAuto = () => {
    stopAuto();
    if (userTouched || isMobile()) return;
    auto = setInterval(() => {
      const keys = Object.keys(SERVICES);
      render(keys[(keys.indexOf(current) + 1) % keys.length]);
      restartTimer();
    }, ROTATE_MS);
    restartTimer();
  };
  const stopAuto = () => { clearInterval(auto); auto = null; timer.classList.remove("is-running"); };

  items.forEach((b) => {
    b.addEventListener("click", () => { userTouched = true; stopAuto(); render(b.dataset.service); if (isMobile()) b.scrollIntoView({ behavior: "smooth", block: "start" }); });
    b.addEventListener("keydown", (e) => {
      const i = items.indexOf(b);
      if (e.key === "ArrowDown" || e.key === "ArrowRight") { e.preventDefault(); items[(i + 1) % items.length].focus(); items[(i + 1) % items.length].click(); }
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") { e.preventDefault(); items[(i - 1 + items.length) % items.length].focus(); items[(i - 1 + items.length) % items.length].click(); }
    });
  });

  // arranca la rotación cuando la sección entra en pantalla, la pausa al salir
  render(current);
  new IntersectionObserver(([en]) => { en.isIntersecting ? startAuto() : stopAuto(); }, { threshold: 0.3 }).observe($("#explorer"));
  window.addEventListener("resize", () => render(current));
})();

/* ---------- Tarjetas de apps: tilt 3D ---------- */
(() => {
  if (reduceMotion || !window.matchMedia("(hover: hover)").matches) return;
  $$("[data-tilt]").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      card.style.transform = `perspective(900px) rotateX(${-y * 6}deg) rotateY(${x * 8}deg) translateY(-4px)`;
    });
    card.addEventListener("pointerleave", () => { card.style.transform = ""; });
  });
})();

/* ---------- AgiVision: mapa de calor animado ---------- */
(() => {
  const grid = $("#heatGrid");
  if (!grid) return;
  const cols = 12, rows = 6;
  grid.innerHTML = Array.from({ length: cols * rows }, () => "<i></i>").join("");
  const cells = $$("i", grid);
  let t = 0;
  const paint = () => {
    t += reduceMotion ? 0 : .02;
    const cx = cols / 2 + Math.sin(t) * 3, cy = rows / 2 + Math.cos(t * .8) * 1.5;
    cells.forEach((c, i) => {
      const x = i % cols, y = Math.floor(i / cols);
      const d = Math.hypot(x - cx, y - cy);
      const v = Math.max(.06, 1 - d / 6);
      c.style.setProperty("--h", v.toFixed(2));
      c.style.background = v > .7 ? `rgba(244,114,182,${v})` : v > .4 ? `rgba(139,92,246,${v})` : `rgba(34,211,238,${v * .8})`;
    });
    if (!reduceMotion) setTimeout(paint, 120);
  };
  paint();
})();

/* ---------- Formulario → WhatsApp ---------- */
(() => {
  const form = $("#contactForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#fName").value.trim();
    const company = $("#fCompany").value.trim();
    const topic = $("#fTopic").value;
    const msg = $("#fMsg").value.trim();
    const nameField = $("#fName").closest(".field");
    nameField.classList.toggle("is-error", !name);
    if (!name) { $("#fName").focus(); return; }
    const text = [
      `Hola Aginet, soy ${name}${company ? ` de ${company}` : ""}.`,
      `Me interesa: ${topic}.`,
      msg ? msg : "",
    ].filter(Boolean).join("\n");
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  });
})();

/* ---------- Links a las páginas de cada app ---------- */
$$("[data-app]").forEach((a) => {
  const url = (APP_LINKS[a.dataset.app] || "").trim();
  if (!url) return;
  a.href = url;
  a.hidden = false;
  if (/^https?:\/\//.test(url) && !url.includes(location.hostname)) { a.target = "_blank"; a.rel = "noopener"; }
});

/* ---------- Año en el footer ---------- */
$("#year").textContent = new Date().getFullYear();
