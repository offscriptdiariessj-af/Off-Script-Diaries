/**
 * Off Script Diaries — Core State & Media Engine
 * Version 1.0.0 | Enterprise Client-Side Architecture
 */

const OSD_STORAGE_KEY = 'osd_master_database_v1';

const DEFAULT_DATA = {
    brand: {
        siteName: "Off Script Diaries",
        tagline: "Two souls, zero rehearsals, endless chapters.",
        coupleNames: "Aarav & Meera",
        logoUrl: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=400&q=80",
        establishedYear: "2024",
        location: "Chennai • Bengaluru • Everywhere"
    },
    sections: {
        // 1. Cinematic Hero
        hero: {
            eyebrow: "EDITION 01 — THE UNSCRIPTED ARCHIVE",
            headline: "Love looks better when nobody yells 'Action.'",
            subheadline: "A living digital anthology of our midnight drives, terrible jokes, quiet coffee mornings, and the messy, unedited beauty of us.",
            ctaText: "Open The E-Magazine",
            bgImage: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1600&q=80"
        },
        // 2. Origin Story (Asymmetric Split)
        origin: {
            title: "How The Script Got Thrown Out",
            date: "October 14, 2023",
            story: "It started with a delayed train, two lukewarm filter coffees, and a conversation that was supposed to last ten minutes. Three hours later, we realized the best moments in life are the ones you never plan on a calendar.",
            quote: "“We didn't fall in love in a straight line; we stumbled into it laughing.”",
            image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80"
        },
        // 3. Relationship Telemetry (Live Metrics)
        telemetry: {
            startDate: "2023-10-14",
            citiesExplored: "14",
            coffeeCups: "642",
            midnightCalls: "318"
        },
        // 4. Featured E-Magazine Spotlight
        magazineSpotlight: {
            heading: "The Living E-Magazine",
            description: "High-resolution memories, behind-the-scenes clips, and raw journal entries curated issue by issue."
        },
        // 5. The Bucket List (Interactive Checklist)
        bucketList: [
            { id: 1, task: "Watch the northern lights in Tromsø", completed: false },
            { id: 2, task: "Road trip across the Western Ghats in monsoon", completed: true },
            { id: 3, task: "Cook a 3-course Italian dinner from scratch", completed: true },
            { id: 4, task: "Write letters to open on our 10th anniversary", completed: false }
        ],
        // 6. Dual Perspectives (His vs Hers)
        perspectives: {
            partnerOneName: "His POV",
            partnerOneNote: "She pretends she doesn't want fries, eats half of mine, and still makes every ordinary Tuesday feel like a holiday.",
            partnerTwoName: "Her POV",
            partnerTwoNote: "He has a playlist for every mood, never loses his patience when I'm late, and feels like home wherever we stand."
        },
        // 7. Milestone Timeline
        milestones: [
            { date: "OCT 2023", title: "The First Coffee", desc: "Where a 10-minute hello turned into 3 hours." },
            { date: "FEB 2024", title: "First Spontaneous Trip", desc: "Missed our bus, caught a sunrise by the coast." },
            { date: "DEC 2024", title: "The Apartment Keys", desc: "Two toothbrushes, one bookshelf, zero regrets." },
            { date: "NOW", title: "Writing Volume II", desc: "Still improvising every single day." }
        ],
        // 8. Soundtrack of Us
        soundtrack: {
            albumTitle: "Late Night Frequencies — Vol. 04",
            curatorNote: "Songs played on repeat while driving nowhere in particular.",
            tracks: [
                { title: "Un Tholil Saiyum Neram", artist: "Original Acoustic Demo", duration: "03:42" },
                { title: "Yellow (Midnight Rain Edit)", artist: "Coldplay", duration: "04:26" },
                { title: "Kadavule Vidai", artist: "Anirudh Ravichander", duration: "04:08" }
            ]
        },
        // 9. Unscripted Love Notes (Vault)
        loveNotes: [
            { tag: "FOR RAINY DAYS", message: "No matter how heavy the week gets, you never have to carry it alone. My shoulder is always yours." },
            { tag: "RANDOM REMINDER", message: "You are still my favorite notification, my best friend, and the best plot twist of my life." },
            { tag: "3:00 AM THOUGHT", message: "If I had to live this life over again, I’d still choose the exact same delayed train just to meet you." }
        ],
        // 10. Future Capsule & Editorial Colophon
        capsule: {
            heading: "To Be Continued...",
            message: "This archive grows with every photograph taken, every ticket stub saved, and every unscripted laugh ahead of us.",
            nextDestination: "Kyoto, Japan — Spring"
        }
    },
    posts: [
        {
            id: "post_101",
            title: "Monsoon Mist & Filter Coffee in Munnar",
            date: "2026-08-18",
            category: "TRAVEL DIARY",
            mediaType: "image",
            mediaUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
            description: "We left at 4 AM with no hotel booking and ended up watching clouds roll straight through our balcony window. Hands down our favorite unplanned weekend."
        },
        {
            id: "post_102",
            title: "Rooftop Sunset & Acoustic Sessions",
            date: "2026-09-24",
            category: "GOLDEN HOUR",
            mediaType: "image",
            mediaUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
            description: "Testing out new melodies while the city lights flickered on below us. Zero retakes, pure candid warmth."
        },
        {
            id: "post_103",
            title: "2nd Anniversary Dinner — Behind The Scenes",
            date: "2026-10-14",
            category: "MILESTONE",
            mediaType: "image",
            mediaUrl: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?auto=format&fit=crop&w=1200&q=80",
            description: "Two years of laughing at our own jokes. Dressed up for an hour, then went straight back to hoodies and street food."
        }
    ]
};

/**
 * Extracts Google Drive File ID from any standard Drive share link
 * and transforms it into a direct renderable Image CDN URL or Video Embed URL.
 */
function parseDriveMedia(rawUrl, mediaType = 'image') {
    if (!rawUrl) return '';
    const url = rawUrl.trim();

    // Regex matches /d/FILE_ID or id=FILE_ID
    const driveRegex = /(?:drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?id=)|docs\.google\.com\/file\/d\/)([a-zA-Z0-9_-]{25,})/;
    const match = url.match(driveRegex);

    if (match && match[1]) {
        const fileId = match[1];
        if (mediaType === 'video') {
            return `https://drive.google.com/file/d/${fileId}/preview`;
        }
        // High-resolution Google Drive image CDN endpoint
        return `https://lh3.googleusercontent.com/d/${fileId}=s1600`;
    }

    // Return original URL if it's already a direct link (Unsplash, YouTube embed, etc.)
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
    } catch (e) {
        console.error("Storage read error:", e);
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
