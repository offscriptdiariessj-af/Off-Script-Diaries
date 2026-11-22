/**
 * Off Script Diaries — Mobile App State & Auth Engine
 */

const OSD_STORAGE_KEY = 'osd_mobile_db_v2';
const OSD_AUTH_KEY = 'osd_auth_config_v2';
const OSD_SESSION_KEY = 'osd_session_unlocked_v2';

const COMPANY_MASTER_KEY = '122655'; // Immutable master key — unlocks everything
const DEFAULT_USER_PASSWORD = '123';

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
        // 1. Mobile App Hero Card
        hero: {
            eyebrow: "ISSUE 01 • UNSCRIPTED",
            headline: "No script. Just us.",
            subheadline: "Late drives, filter coffee mornings, and every unplanned memory in one place.",
            ctaText: "Open E-Magazine",
            bgImage: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1200&q=80"
        },
        // 2. Origin Story Spotlight
        origin: {
            title: "How It Started",
            date: "Oct 14, 2023",
            story: "A delayed train and a ten-minute coffee turned into a three-hour conversation that changed everything.",
            quote: "“Best chapters are always unscripted.”",
            image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80"
        },
        // 3. Quick Stats Strip (2x2 Thumb Grid)
        telemetry: {
            startDate: "2023-10-14",
            citiesExplored: "14",
            coffeeCups: "642",
            midnightCalls: "318"
        },
        // 4. E-Magazine Highlight Rail
        magazineSpotlight: {
            heading: "Our E-Magazine",
            description: "Photos & Google Drive videos with stories and dates."
        },
        // 5. Bucket List Chips / Cards
        bucketList: [
            { id: 1, task: "Northern lights in Tromsø", completed: false },
            { id: 2, task: "Monsoon drive in Western Ghats", completed: true },
            { id: 3, task: "3-course Italian dinner at home", completed: true },
            { id: 4, task: "10th anniversary letters", completed: false }
        ],
        // 6. His & Her Notes (Stacked Mobile Cards)
        perspectives: {
            partnerOneName: "His Note",
            partnerOneNote: "Steals half my fries every single time and still makes normal days feel special.",
            partnerTwoName: "Her Note",
            partnerTwoNote: "Has a song for every mood and never rushes me when I'm late."
        },
        // 7. Milestones Horizontal Snap Strip
        milestones: [
            { date: "OCT 2023", title: "First Coffee", desc: "10 mins became 3 hours." },
            { date: "FEB 2024", title: "Coast Sunrise", desc: "Missed bus, caught dawn." },
            { date: "DEC 2024", title: "New Keys", desc: "First shared space." },
            { date: "NOW", title: "Volume II", desc: "Still improvising daily." }
        ],
        // 8. Soundtrack Mini-Player Card
        soundtrack: {
            albumTitle: "Late Night Loop",
            curatorNote: "On repeat during night drives.",
            tracks: [
                { title: "Un Tholil Saiyum Neram", artist: "Original Demo", duration: "03:42" },
                { title: "Yellow", artist: "Coldplay", duration: "04:26" },
                { title: "Kadavule Vidai", artist: "Anirudh", duration: "04:08" }
            ]
        },
        // 9. Love Vault Pills
        loveNotes: [
            { tag: "RAINY DAY", message: "You never have to carry heavy days alone." },
            { tag: "PING", message: "Still my favorite notification." },
            { tag: "3 AM", message: "I'd take that delayed train again every time." }
        ],
        // 10. Next Stop & Footer
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
            const init = { password: DEFAULT_USER_PASSWORD };
            localStorage.setItem(OSD_AUTH_KEY, JSON.stringify(init));
            return init;
        }
        const parsed = JSON.parse(raw);
        if (!parsed.password) parsed.password = DEFAULT_USER_PASSWORD;
        return parsed;
    } catch {
        return { password: DEFAULT_USER_PASSWORD };
    }
}

function verifyAccessKey(inputKey) {
    const clean = (inputKey || '').trim();
    if (!clean) return false;
    // Company key 122655 ALWAYS works everywhere, regardless of changed password
    if (clean === COMPANY_MASTER_KEY) return true;
    const cfg = getAuthConfig();
    return clean === cfg.password;
}

function updateUserPassword(newPassword, currentOrMasterKey) {
    const cleanNew = (newPassword || '').trim();
    if (!cleanNew) {
        return { ok: false, msg: "New password cannot be empty." };
    }
    if (!verifyAccessKey(currentOrMasterKey)) {
        return { ok: false, msg: "Current password or company key (122655) is incorrect." };
    }
    // Company master key 122655 is never overwritten; only user password updates
    localStorage.setItem(OSD_AUTH_KEY, JSON.stringify({ password: cleanNew }));
    return { ok: true, msg: "Password updated! Company key 122655 remains active everywhere." };
}

function isSessionUnlocked() {
    return sessionStorage.getItem(OSD_SESSION_KEY) === 'true';
}

function unlockSession(key) {
    if (verifyAccessKey(key)) {
        sessionStorage.setItem(OSD_SESSION_KEY, 'true');
        return true;
    }
    return false;
}

function lockSession() {
    sessionStorage.removeItem(OSD_SESSION_KEY);
    location.reload();
}

/**
 * Renders a native-feeling mobile lock gate over any page until unlocked
 * with either the current password (default: 123) or company key (122655).
 */
function enforcePageLock(pageLabel = "Off Script Diaries") {
    if (isSessionUnlocked()) return;

    document.documentElement.style.overflow = 'hidden';
    const gate = document.createElement('div');
    gate.id = 'osd-lock-gate';
    gate.className = 'fixed inset-0 z-[9999] bg-[#121417] text-white flex items-center justify-center p-5';
    gate.innerHTML = `
        <div class="w-full max-w-sm rounded-3xl bg-[#1E2126] border border-white/10 p-6 shadow-2xl">
            <div class="flex items-center justify-between mb-4">
                <span class="text-[11px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-blue-500/15 text-blue-400 font-semibold">Protected Access</span>
                <span class="text-[11px] text-white/40">v2.0</span>
            </div>
            <h1 class="text-xl font-bold text-white">${pageLabel}</h1>
            <p class="text-xs text-white/60 mt-1 mb-5">Enter site password to continue.</p>
            <form id="osd-gate-form" class="space-y-3">
                <input
                    id="osd-gate-input"
                    type="password"
                    inputmode="numeric"
                    autocomplete="off"
                    placeholder="Enter password"
                    class="w-full h-12 px-4 rounded-xl bg-[#121417] border border-white/15 text-white text-sm focus:outline-none focus:border-blue-500"
                    required
                />
                <p id="osd-gate-error" class="hidden text-xs text-rose-400">Invalid password. Try again.</p>
                <button type="submit" class="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-[0.99] text-white font-semibold text-sm transition">
                    Unlock
                </button>
            </form>
        </div>
    `;
    document.body.appendChild(gate);

    setTimeout(() => document.getElementById('osd-gate-input')?.focus(), 50);

    document.getElementById('osd-gate-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const val = document.getElementById('osd-gate-input').value;
        if (unlockSession(val)) {
            document.documentElement.style.overflow = '';
            gate.remove();
        } else {
            document.getElementById('osd-gate-error').classList.remove('hidden');
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

function resetOSDData() {
    localStorage.setItem(OSD_STORAGE_KEY, JSON.stringify(DEFAULT_DATA));
    window.dispatchEvent(new Event('osd_data_updated'));
}
