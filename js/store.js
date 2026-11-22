const OSD_STORAGE_KEY = 'osd_pro_db_v2';

const DEFAULT_DATA = {
    brand: {
        siteName: "Off Script Diaries",
        handle: "@offscriptdiaries",
        coupleNames: "Aarav & Meera",
        logoUrl: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=400&q=80",
        statusBadge: "LIVE ARCHIVE • VOL 01",
        location: "Chennai • Bengaluru"
    },
    sections: {
        // 1. App-Style Hero Banner Card
        hero: {
            badge: "FEATURED CHAPTER",
            headline: "Unscripted Moments. Zero Retakes.",
            subheadline: "Our private digital hub for raw memories, road trips, late-night playlists, and our living E-Magazine.",
            ctaText: "Explore E-Magazine",
            bgImage: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1400&q=80"
        },
        // 2. Quick Telemetry Strip (4-Column Compact Metrics)
        telemetry: {
            startDate: "2023-10-14",
            citiesExplored: "14",
            coffeeCups: "642",
            midnightCalls: "318"
        },
        // 3. Featured E-Magazine Horizontal Carousel + Grid
        magazineSpotlight: {
            heading: "Latest E-Magazine Drops",
            subtext: "Photos, journal entries & Google Drive videos"
        },
        // 4. Origin Story Compact Split Card
        origin: {
            tag: "CHAPTER 00 • ORIGIN",
            title: "How The Script Got Thrown Out",
            date: "14 Oct 2023",
            story: "It started with a delayed train, two lukewarm filter coffees, and a 10-minute chat that lasted three hours. Since that day, nothing has been rehearsed.",
            quote: "We didn't fall in love in a straight line; we stumbled into it laughing.",
            image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80"
        },
        // 5. Dual POV Tab Switcher (Interactive Mobile Tabs)
        perspectives: {
            partnerOneName: "His POV",
            partnerOneNote: "She says she doesn't want fries, eats half of mine, and still turns every ordinary Tuesday into the best part of my week.",
            partnerTwoName: "Her POV",
            partnerTwoNote: "He has a playlist for every drive, never loses patience when I'm running late, and feels like home wherever we go."
        },
        // 6. Interactive Bucket List with Progress Bar
        bucketList: [
            { id: 1, task: "Watch the Northern Lights in Tromsø", completed: false },
            { id: 2, task: "Monsoon road trip across the Western Ghats", completed: true },
            { id: 3, task: "Cook a 3-course Italian dinner from scratch", completed: true },
            { id: 4, task: "Seal time-capsule letters for Year 10", completed: false }
        ],
        // 7. Horizontal Milestone Stepper
        milestones: [
            { date: "OCT 2023", title: "First Coffee", desc: "10-minute hello turned into 3 hours." },
            { date: "FEB 2024", title: "Spontaneous Trip", desc: "Missed our bus, caught a coastal sunrise." },
            { date: "DEC 2024", title: "First Apartment", desc: "Two keys, one bookshelf, zero regrets." },
            { date: "PRESENT", title: "Volume II", desc: "Still improvising every single day." }
        ],
        // 8. Audio / Playlist Widget
        soundtrack: {
            albumTitle: "Late Night Drives — Vol. 04",
            curatorNote: "Tracks on repeat at 1:00 AM",
            tracks: [
                { title: "Un Tholil Saiyum Neram", artist: "Original Acoustic Demo", duration: "03:42" },
                { title: "Yellow (Midnight Rain)", artist: "Coldplay", duration: "04:26" },
                { title: "Kadavule Vidai", artist: "Anirudh Ravichander", duration: "04:08" }
            ]
        },
        // 9. Pinned Vault Notes (Accordion / Swipe Cards)
        loveNotes: [
            { tag: "RAINY DAY NOTE", message: "No matter how
