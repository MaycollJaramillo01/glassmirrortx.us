/**
 * Behaviour for the Glass & Mirror theme — the Next.js site's client
 * components in plain JS. Each block does nothing when its markup is absent.
 */
(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  // Reveal on scroll (RevealEngine). html.js-reveal is added here, so content
  // stays visible if this script never runs.
  if (!reduceMotion.matches && "IntersectionObserver" in window) {
    document.documentElement.classList.add("js-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    for (const el of document.querySelectorAll("[data-reveal]")) {
      // Already on screen at load: reveal now, so the first viewport is never blank.
      const box = el.getBoundingClientRect();
      if (box.top < window.innerHeight && box.bottom > 0) el.classList.add("is-in");
      else observer.observe(el);
    }
  }

  // Mobile drawer (MobileNav).
  const drawer = document.querySelector("[data-mobile-nav]");
  const openButton = document.querySelector("[data-menu-open]");
  if (drawer && openButton) {
    const closeButton = drawer.querySelector("[data-menu-close]");
    const servicesToggle = drawer.querySelector("[data-services-toggle]");
    const servicesList = document.getElementById("mobile-services");

    const setServices = (open) => {
      servicesList.hidden = !open;
      servicesToggle.setAttribute("aria-expanded", String(open));
      servicesToggle.querySelector("svg").classList.toggle("rotate-180", open);
    };
    const setDrawer = (open) => {
      if (drawer.classList.contains("visible") === open) return;
      drawer.classList.toggle("visible", open);
      drawer.classList.toggle("opacity-100", open);
      drawer.classList.toggle("invisible", !open);
      drawer.classList.toggle("opacity-0", !open);
      drawer.setAttribute("aria-hidden", String(!open));
      openButton.setAttribute("aria-expanded", String(open));
      if (!open) {
        setServices(false);
        openButton.focus();
      }
    };

    // The drawer is visibility:hidden until its fade runs, so focus the close
    // button once the drawer's own transition ends (not a child's).
    drawer.addEventListener("transitionend", (event) => {
      if (event.target === drawer && drawer.classList.contains("visible")) closeButton.focus();
    });
    openButton.addEventListener("click", () => setDrawer(true));
    closeButton.addEventListener("click", () => setDrawer(false));
    servicesToggle.addEventListener("click", () => setServices(servicesList.hidden));
    drawer.addEventListener("click", (event) => {
      if (event.target.closest("a")) setDrawer(false);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setDrawer(false);
    });
  }

  // Services mega menu: hover, focus, Escape, outside click.
  const mega = document.querySelector("[data-mega]");
  if (mega) {
    const trigger = mega.querySelector("[data-mega-trigger]");
    const panel = mega.querySelector("[data-mega-panel]");
    const active = trigger.hasAttribute("data-active");
    let closeTimer;

    const setMega = (open) => {
      clearTimeout(closeTimer);
      if (panel.hidden === !open) return;
      panel.hidden = !open;
      trigger.setAttribute("aria-expanded", String(open));
      trigger.querySelector("svg").classList.toggle("rotate-180", open);
      if (!active) {
        trigger.classList.toggle("text-gold", open);
        trigger.classList.toggle("text-bone/72", !open);
        trigger.classList.toggle("hover:text-bone", !open);
      }
    };

    mega.addEventListener("mouseenter", () => setMega(true));
    // The panel starts below the whole header, so the pointer crosses space
    // that belongs to neither on the way down. Hold the menu open across it.
    mega.addEventListener("mouseleave", () => {
      clearTimeout(closeTimer);
      closeTimer = setTimeout(() => setMega(false), 220);
    });
    trigger.addEventListener("focus", () => setMega(true));
    mega.addEventListener("focusout", (event) => {
      if (!mega.contains(event.relatedTarget)) setMega(false);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setMega(false);
    });
    document.addEventListener("mousedown", (event) => {
      if (!mega.contains(event.target)) setMega(false);
    });
  }

  // Decorative hero video; the poster stays if autoplay is blocked.
  const video = document.querySelector("[data-hero-video]");
  if (video) {
    const syncPlayback = () => {
      if (reduceMotion.matches) {
        video.pause();
        video.currentTime = 0;
      } else {
        video.play().catch(() => {});
      }
    };
    syncPlayback();
    reduceMotion.addEventListener("change", syncPlayback);
  }

  // Google reviews carousel. Skips ticks while the tab is hidden.
  const carousel = document.querySelector("[data-carousel]");
  if (carousel) {
    const slides = [...carousel.querySelectorAll("[data-slide]")];
    const dots = [...carousel.querySelectorAll("[data-dot]")];
    let index = 0;

    const show = (next) => {
      index = (next + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        slide.hidden = i !== index;
      });
      dots.forEach((dot, i) => {
        const on = i === index;
        dot.setAttribute("aria-selected", String(on));
        dot.classList.toggle("w-8", on);
        dot.classList.toggle("bg-gold", on);
        dot.classList.toggle("w-2", !on);
        dot.classList.toggle("bg-bone/25", !on);
        dot.classList.toggle("hover:bg-bone/45", !on);
      });
    };

    dots.forEach((dot, i) => dot.addEventListener("click", () => show(i)));
    carousel.querySelector("[data-prev]")?.addEventListener("click", () => show(index - 1));
    carousel.querySelector("[data-next]")?.addEventListener("click", () => show(index + 1));
    if (slides.length > 1) {
      setInterval(() => {
        if (!reduceMotion.matches && document.visibilityState !== "hidden") show(index + 1);
      }, 6500);
    }
  }

  // Service-area map (ServiceAreaLeaflet). Leaflet is only enqueued on the home page.
  const mapEl = document.querySelector("[data-service-map]");
  if (mapEl && window.L) {
    const houston = [29.7604, -95.3698];
    const cities = [
      ["Houston", houston, true],
      ["Katy", [29.7858, -95.8245]],
      ["Sugar Land", [29.6197, -95.6349]],
      ["Cypress", [29.9691, -95.6972]],
      ["Spring", [30.0799, -95.4172]],
      ["Tomball", [30.0972, -95.6161]],
      ["Humble", [29.9988, -95.2622]],
      ["Conroe", [30.3119, -95.4561]],
      ["Alvin", [29.4238, -95.2441]],
      ["League City", [29.5075, -95.0949]],
    ];

    const map = L.map(mapEl, { center: houston, zoom: 9, minZoom: 8, maxZoom: 14, scrollWheelZoom: false });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    L.circle(houston, {
      radius: Math.round(Number(mapEl.dataset.radiusMiles) * 1609.34),
      color: "#14c4c4",
      fillColor: "#14c4c4",
      fillOpacity: 0.1,
      weight: 2,
    }).addTo(map);
    for (const [name, coordinates, home] of cities) {
      L.circleMarker(coordinates, {
        radius: home ? 9 : 6,
        color: "#f4f8f9",
        fillColor: home ? "#14c4c4" : "#0a1218",
        fillOpacity: 1,
        weight: 2,
      })
        .bindTooltip(name, { permanent: true, direction: "top", offset: [0, -7], opacity: 1 })
        .addTo(map);
    }
  }

  // Gallery filters (GalleryGrid).
  const filters = document.querySelector("[data-gallery-filters]");
  if (filters) {
    const on = ["border-forest", "bg-forest", "text-bone"];
    const off = ["border-charcoal/15", "bg-white", "text-charcoal", "hover:border-forest", "hover:text-forest"];

    filters.addEventListener("click", (event) => {
      const button = event.target.closest("[data-filter]");
      if (!button) return;
      const category = button.dataset.filter;

      for (const other of filters.querySelectorAll("[data-filter]")) {
        const active = other === button;
        other.setAttribute("aria-pressed", String(active));
        on.forEach((name) => other.classList.toggle(name, active));
        off.forEach((name) => other.classList.toggle(name, !active));
        const count = other.querySelector("span");
        count.classList.toggle("text-bone/70", active);
        count.classList.toggle("text-muted", !active);
      }
      for (const item of document.querySelectorAll("[data-gallery-grid] [data-category]")) {
        item.hidden = category !== "All" && item.dataset.category !== category;
      }
    });
  }

  // Appointment form (EstimateForm): photo list, validation, submit states.
  const form = document.querySelector("[data-estimate-form]");
  if (form) {
    const input = form.querySelector("[data-photo-input]");
    const list = form.querySelector("[data-photo-list]");
    const error = form.querySelector("[data-form-error]");
    const submit = form.querySelector("[data-submit]");
    const label = submit.querySelector("span");
    const idleLabel = label.textContent;
    const success = form.closest("[data-estimate]").querySelector("[data-form-success]");
    const maxPhotos = Number(input.dataset.maxPhotos);
    const maxBytes = Number(input.dataset.maxBytes);
    const accepted = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"];
    let photos = [];

    const setError = (message) => {
      error.textContent = message;
      error.hidden = !message;
    };

    const renderPhotos = () => {
      list.hidden = photos.length === 0;
      list.replaceChildren(
        ...photos.map((photo, i) => {
          const item = document.createElement("li");
          item.className =
            "flex items-center justify-between gap-3 border border-charcoal/10 bg-white px-3 py-2.5 text-[0.8rem] text-charcoal";
          const name = document.createElement("span");
          name.className = "min-w-0 truncate";
          name.textContent = photo.name;
          const remove = document.createElement("button");
          remove.type = "button";
          remove.className =
            "inline-flex size-8 shrink-0 items-center justify-center text-muted transition-colors hover:text-charcoal";
          remove.setAttribute("aria-label", `Remove ${photo.name}`);
          remove.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="size-4" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';
          remove.addEventListener("click", () => {
            photos.splice(i, 1);
            renderPhotos();
          });
          item.append(name, remove);
          return item;
        }),
      );
    };

    input.addEventListener("change", () => {
      let reject = "";
      for (const file of input.files) {
        if (photos.length >= maxPhotos) {
          reject = `You can attach up to ${maxPhotos} photos.`;
          break;
        }
        if (!accepted.includes(file.type) && !/\.(jpe?g|png|webp|heic|heif)$/i.test(file.name)) {
          reject = "Photos must be JPG, PNG, WEBP, or HEIC.";
          continue;
        }
        if (file.size > maxBytes) {
          reject = "Each photo must be under 1.2 MB. Compress larger images or send fewer photos.";
          continue;
        }
        photos.push(file);
      }
      input.value = "";
      renderPhotos();
      setError(reject);
    });

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      setError("");
      submit.disabled = true;
      label.textContent = "Sending request";

      const data = new FormData(form);
      data.delete("photos[]");
      photos.forEach((photo) => data.append("photos[]", photo));

      try {
        const response = await fetch(form.action, { method: "POST", body: data });
        const result = await response.json().catch(() => ({}));
        if (!response.ok) {
          setError(result.message || "We could not send the request. Please call us instead.");
          return;
        }
        form.reset();
        photos = [];
        renderPhotos();
        success.querySelector("[data-success-message]").textContent =
          result.message || "Your request is in. We will be in touch shortly.";
        form.hidden = true;
        success.hidden = false;
      } catch {
        setError(`Connection failed. Please call ${form.dataset.phone} instead.`);
      } finally {
        submit.disabled = false;
        label.textContent = idleLabel;
      }
    });

    success.querySelector("[data-form-reset]").addEventListener("click", () => {
      success.hidden = true;
      form.hidden = false;
    });
  }

  // One delegated listener for phone/email clicks (TrackingBridge). Inert until
  // GTM or GA4 is configured in the Customizer.
  const events = { phone: "phone_click", emergency_phone: "emergency_phone_click", email: "email_click" };
  document.addEventListener("click", (event) => {
    const el = event.target.closest("[data-cta]");
    const name = el && events[el.dataset.cta];
    if (!name) return;
    const params = { location: el.dataset.location || "unknown" };
    (window.dataLayer = window.dataLayer || []).push({ event: name, ...params });
    window.gtag?.("event", name, params);
  });
})();
