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
            curatorNote: "On repeat
