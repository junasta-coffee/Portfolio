/* =========== Toggle Style Switcher ============*/
const styleSwitcherToggle = document.querySelector(".style-switcher-toggler");
styleSwitcherToggle.addEventListener("click", () => {
    document.querySelector(".style-switcher").classList.toggle("open");
});
// ----- Hide style swicher on scroll
window.addEventListener("mousewheel", () => {
    if (document.querySelector(".style-switcher").classList.contains("open")) {
        document.querySelector(".style-switcher").classList.remove("open");
    }
});
window.addEventListener("touchmove", () => {
    if (document.querySelector(".style-switcher").classList.contains("open")) {
        document.querySelector(".style-switcher").classList.remove("open");
    }
});
/* =========== Theme Colors ============ */
const alternateStyles = document.querySelectorAll(".alternate-style");

function setActiveStyle(color) {
    // Cek apakah warna yang diklik sudah aktif
    let currentActive = Array.from(alternateStyles).find(
        style => !style.disabled
    );

    if (currentActive && currentActive.getAttribute("title") === color) {
        return; // Jika warna sama, tidak perlu ubah
    }

    // Aktifkan stylesheet baru
    let newActive;
    alternateStyles.forEach(style => {
        if (color === style.getAttribute("title")) {
            style.disabled = false;
            newActive = style;
        }
    });

    // Nonaktifkan stylesheet sebelumnya setelah sedikit delay
    setTimeout(() => {
        if (currentActive && currentActive !== newActive) {
            currentActive.disabled = true;
        }
    }, 200);

    // Simpan preferensi
    localStorage.setItem("themeColor", color);
}

// Aktifkan theme saat halaman dimuat
window.addEventListener("DOMContentLoaded", () => {
    const savedColor = localStorage.getItem("themeColor");
    if (savedColor) {
        setActiveStyle(savedColor);
    } else {
        // Jika belum ada tema tersimpan, aktifkan default
        setActiveStyle("color-1");
    }
});
/* =========== Theme Light And Dark Mode ============ */
const dayNight = document.querySelector(".day-night");

// Toggle dark mode saat tombol diklik
dayNight.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    // Simpan preferensi ke localStorage
    if (document.body.classList.contains("dark")) {
        localStorage.setItem("themeMode", "dark");
    } else {
        localStorage.setItem("themeMode", "light");
    }

    // Ubah icon
    updateIcon();
});

// Fungsi untuk mengatur icon
function updateIcon() {
    const icon = dayNight.querySelector("i");
    if (document.body.classList.contains("dark")) {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
    } else {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
    }
}

// Saat halaman dimuat
window.addEventListener("DOMContentLoaded", () => {
    // Ambil preferensi dari localStorage
    const savedMode = localStorage.getItem("themeMode");

    // Jika belum ada, set default ke dark
    if (!savedMode || savedMode === "dark") {
        document.body.classList.add("dark");
    }

    // Update icon sesuai mode
    updateIcon();
});
/*   function setActiveStyle(color) {
    alternateStyles.forEach(style => {
        if (color === style.getAttribute("title")) {
            style.disabled = false;
        } else {
            style.disabled = true;
        }
    });
}
    */
