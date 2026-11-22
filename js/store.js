/**
 * Off Script Diaries — Core State, Media Parser & Dual-Role Auth Engine
 */

const OSD_STORAGE_KEY = 'osd_mobile_db_v3';
const OSD_AUTH_KEY = 'osd_dual_auth_v3';
const OSD_SESSION_INDEX_KEY = 'osd_session_index_v3';
const OSD_SESSION_ADMIN_KEY = 'osd_session_admin_v3';

const COMPANY_MASTER_KEY = '122655'; // Permanent master key — unlocks Index & Admin
const DEFAULT_PASSWORD = '123';

const DEFAULT_DATA = {
    brand: {
        siteName: "Off Script Diaries",
        tagline: "Zero rehearsals. Pure moments.",
        coupleNames: "Aarav & Meera",
        logoUrl: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=400&q=80",
        establishedYear: "2024",
        location: "Chennai • Bengaluru"
    },
    sections: {
        hero: {
            eyebrow: "ISSUE 01 • UNSCRIPTED",
            headline: "No script. Just us.",
            subheadline: "Late drives, filter coffee mornings, and every unplanned memory in one place.",
            ctaText: "Open E-Magazine",
            bgImage: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1200&q=80"
        },
        origin: {
            title: "How It Started",
            date: "Oct 14, 2023",
            story: "A delayed train and a ten-minute coffee turned into a three-hour conversation that changed everything.",
            quote: "“Best chapters are always unscripted.”",
            image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80"
        },
        telemetry: {
            startDate: "2023-10-14",
            citiesExplored: "14",
            coffeeCups: "642",
            midnightCalls: "318"
        },
        magazineSpotlight: {
            heading: "Our E-Magazine",
            description: "Photos & Google Drive videos with stories and dates."
        },
        bucketList: [
            { id: 1, task: "Northern lights in Tromsø", completed: false },
            { id: 2, task: "Monsoon drive in Western Ghats", completed: true },
            { id: 3, task: "3-course Italian dinner at home", completed: true },
            { id: 4, task: "10th anniversary letters", completed: false }
        ],
        perspectives: {
            partnerOneName: "His Note",
            partnerOneNote: "Steals half my fries every single time and still makes normal days feel special.",
            partnerTwoName: "Her Note",
            partnerTwoNote: "Has a song for every mood and never rushes me when I'm late."
        },
        milestones: [
            { date: "OCT 2023", title: "First Coffee", desc: "10 mins became 3 hours." },
            { date: "FEB 2024", title: "Coast Sunrise", desc: "Missed bus, caught dawn." },
            { date: "DEC 2024", title: "New Keys", desc: "First shared space." },
            { date: "NOW", title: "Volume II", desc: "Still improvising daily." }
        ],
        soundtrack: {
            albumTitle: "Late Night Loop",
            curatorNote: "On repeat during night drives.",
            tracks: [
                { title: "Un Tholil Saiyum Neram", artist: "Original Demo", duration: "03:42" },
                { title: "Yellow", artist: "Coldplay", duration: "04:26" },
                { title: "Kadavule Vidai", artist: "Anirudh", duration: "04:08" }
            ]
        },
        loveNotes: [
            { tag: "RAINY DAY", message: "You never have to carry heavy days alone." },
            { tag: "PING", message: "Still my favorite notification." },
            { tag: "3 AM", message: "I'd take that delayed train again every time." }
        ],
        capsule: {
            heading: "Next Stop",
            message: "Every ticket, photo, and laugh goes right here.",
            nextDestination: "Kyoto, Spring"
        }
    },
    posts: [
        {
            id: "post_101",
            title: "Munnar Mist & Filter Coffee",
            date: "2026-08-18",
            category: "TRAVEL",
            mediaType: "image",
            mediaUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
            description: "Left at 4 AM with zero plans and watched clouds drift past our balcony."
        },
        {
            id: "post_102",
            title: "Rooftop Golden Hour",
            date: "2026-09-24",
            category: "VIBE",
            mediaType: "image",
            mediaUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
            description: "Acoustic melodies as city lights flickered on below."
        }
    ]
};

function getAuthConfig() {
    try {
        const raw = localStorage.getItem(OSD_AUTH_KEY);
        if (!raw) {
            const init = {
                indexPassword: DEFAULT_PASSWORD,
                adminPassword: DEFAULT_PASSWORD,
                indexLockEnabled: true
            };
            localStorage.setItem(OSD_AUTH_KEY, JSON.stringify(init));
            return init;
        }
        const parsed = JSON.parse(raw);
        return {
            indexPassword: parsed.indexPassword || DEFAULT_PASSWORD,
            adminPassword: parsed.adminPassword || DEFAULT_PASSWORD,
            indexLockEnabled: typeof parsed.indexLockEnabled === 'boolean' ? parsed.indexLockEnabled : true
        };
    } catch {
        return {
            indexPassword: DEFAULT_PASSWORD,
            adminPassword: DEFAULT_PASSWORD,
            indexLockEnabled: true
        };
    }
}

function setIndexLockEnabled(enabled) {
    const cfg = getAuthConfig();
    cfg.indexLockEnabled = Boolean(enabled);
    localStorage.setItem(OSD_AUTH_KEY, JSON.stringify(cfg));
    return cfg.indexLockEnabled;
}

function verifyKeyForRole(inputKey, role = 'index') {
    const clean = (inputKey || '').trim();
    if (!clean) return false;
    if (clean === COMPANY_MASTER_KEY) return true;

    const cfg = getAuthConfig();
    if (role === 'admin') {
        return clean === cfg.adminPassword;
    }
    return clean === cfg.indexPassword;
}

function updateRolePassword(role, newPass, verifierKey) {
    const cleanNew = (newPass || '').trim();
    if (!cleanNew) {
        return { ok: false, msg: "New password cannot be blank." };
    }
    const valid =
        verifyKeyForRole(verifierKey, role) ||
        verifyKeyForRole(verifierKey, 'admin') ||
        (verifierKey || '').trim() === COMPANY_MASTER_KEY;

    if (!valid) {
        return { ok: false, msg: "Current password or permanent company code is incorrect." };
    }

    const cfg = getAuthConfig();
    if (role === 'admin') {
        cfg.adminPassword = cleanNew;
    } else {
        cfg.indexPassword = cleanNew;
    }
    localStorage.setItem(OSD_AUTH_KEY, JSON.stringify(cfg));
    return {
        ok: true,
        msg: role === 'admin'
            ? "Admin password updated. Company code remains permanent."
            : "Index password updated. Company code remains permanent."
    };
}

function getSessionKeyName(role) {
    return role === 'admin' ? OSD_SESSION_ADMIN_KEY : OSD_SESSION_INDEX_KEY;
}

function isRoleUnlocked(role) {
    return sessionStorage.getItem(getSessionKeyName(role)) === 'true';
}

function unlockRoleSession(key, role) {
    if (verifyKeyForRole(key, role)) {
        sessionStorage.setItem(getSessionKeyName(role), 'true');
        return true;
    }
    return false;
}

function lockRoleSession(role) {
    sessionStorage.removeItem(getSessionKeyName(role));
    location.reload();
}

const EYE_OPEN_SVG = `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`;
const EYE_CLOSED_SVG = `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10.6 5.1A10.4 10.4 0 0 1 12 5c6.4 0 10 7 10 7a18.5 18.5 0 0 1-2.2 3.3"/><path d="M6.6 6.6A18.3 18.3 0 0 0 2 12s3.6 7 10 7a9.7 9.7 0 0 0 5.4-1.6"/><path d="m3 3 18 18"/></svg>`;

function attachPasswordEyeToggles(root = document) {
    root.querySelectorAll('input[type="password"][data-eye-toggle]').forEach(input => {
        if (input.dataset.eyeMounted === 'true') return;
        input.dataset.eyeMounted = 'true';

        const wrapper = document.createElement('div');
        wrapper.className = 'relative flex items-center w-full';
        input.parentNode.insertBefore(wrapper, input);
        wrapper.appendChild(input);

        input.classList.add('pr-10');

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.setAttribute('aria-label', 'Show or hide password');
        btn.className = 'absolute right-2.5 text-white/50 hover:text-blue-400 transition p-1 flex items-center justify-center';
        btn.innerHTML = EYE_CLOSED_SVG;

        btn.addEventListener('click', () => {
            const isHidden = input.type === 'password';
            input.type = isHidden ? 'text' : 'password';
            btn.innerHTML = isHidden ? EYE_OPEN_SVG : EYE_CLOSED_SVG;
            btn.classList.toggle('text-blue-400', isHidden);
        });

        wrapper.appendChild(btn);
    });
}

function enforceRoleLock(role = 'index', titleText = "Protected Access") {
    const cfg = getAuthConfig();
    // If index password lock is OFF in admin, no password is asked for index/magazine viewer
    if (role === 'index' && !cfg.indexLockEnabled) return;
    if (isRoleUnlocked(role)) return;

    document.documentElement.style.overflow = 'hidden';
    const gate = document.createElement('div');
    gate.id = 'osd-role-gate';
    gate.className = 'fixed inset-0 z-[9999] bg-[#121417] text-white flex items-center justify-center p-5';
    gate.innerHTML = `
        <div class="w-full max-w-sm rounded-3xl bg-[#1E2126] border border-white/10 p-6 shadow-2xl">
            <span class="inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-blue-500/15 text-blue-400 mb-3">
                ${role === 'admin' ? 'Admin Lock' : 'Viewer Lock'}
            </span>
            <h1 class="text-xl font-bold text-white">${titleText}</h1>
            <p class="text-xs text-white/60 mt-1 mb-5">
                ${role === 'admin' ? 'Enter Admin password to manage content.' : 'Enter Index password to view.'}
            </p>
            <form id="osd-role-form" class="space-y-3">
                <input
                    id="osd-role-input"
                    type="password"
                    data-eye-toggle="true"
                    autocomplete="off"
                    placeholder="Enter password"
                    class="w-full h-12 px-4 rounded-xl bg-[#121417] border border-white/15 text-white text-sm focus:outline-none focus:border-blue-500"
                    required
                />
                <p id="osd-role-err" class="hidden text-xs text-rose-400">Incorrect password. Please try again.</p>
                <button type="submit" class="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition">
                    Continue
                </button>
            </form>
        </div>
    `;
    document.body.appendChild(gate);
    attachPasswordEyeToggles(gate);

    setTimeout(() => document.getElementById('osd-role-input')?.focus(), 50);

    document.getElementById('osd-role-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const secret = document.getElementById('osd-role-input').value;
        if (unlockRoleSession(secret, role)) {
            document.documentElement.style.overflow = '';
            gate.remove();
        } else {
            document.getElementById('osd-role-err').classList.remove('hidden');
        }
    });
}

function parseDriveMedia(rawUrl, mediaType = 'image') {
    if (!rawUrl) return '';
    const url = rawUrl.trim();
    const driveRegex = /(?:drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?id=)|docs\.google\.com\/file\/d\/)([a-zA-Z0-9_-]{25,})/;
    const match = url.match(driveRegex);

    if (match && match[1]) {
        const fileId = match[1];
        if (mediaType === 'video') {
            return `https://drive.google.com/file/d/${fileId}/preview`;
        }
        return `https://lh3.googleusercontent.com/d/${fileId}=s1200`;
    }
    return url;
}

function getOSDData() {
    try {
        const stored = localStorage.getItem(OSD_STORAGE_KEY);
        if (!stored) {
            localStorage.setItem(OSD_STORAGE_KEY, JSON.stringify(DEFAULT_DATA));
            return JSON.parse(JSON.stringify(DEFAULT_DATA));
        }
        return JSON.parse(stored);
    } catch {
        return JSON.parse(JSON.stringify(DEFAULT_DATA));
    }
}

function saveOSDData(newData) {
    localStorage.setItem(OSD_STORAGE_KEY, JSON.stringify(newData));
    window.dispatchEvent(new Event('osd_data_updated'));
}

window.addEventListener('DOMContentLoaded', () => attachPasswordEyeToggles(document));
