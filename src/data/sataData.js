/**
 * SATA OFFICIAL DATA REPOSITORY
 * Science and Technology Appreciation Club
 * Official leadership panel & active member roster.
 */

export const SATA_DATA = {
  clubName: "SATA",
  fullName: "Science and Technology Appreciation Club",
  established: "2023",
  location: "Room 402, Technology Block C, Delhi NCR",
  
  // --------------------------------------------------------------------------
  // EVENT ARCHIVE
  // --------------------------------------------------------------------------
  events: [
    {
      id: "sata-ev-07",
      number: "01",
      title: "BUILDATHON '26",
      subtitle: "Flagship 48-Hour Systems & Hardware Hackathon",
      category: "hackathons",
      categoryLabel: "Flagship Hackathon",
      date: "14—16 FEB 2026",
      dateShort: "FEB 2026",
      venue: "Innovation Hub & Prototyping Labs",
      participants: "128 Hackers",
      projects: "24 Deployed Repos",
      prizePool: "₹1,00,000",
      image: "assets/images/events/buildathon-26.svg",
      summary: "A high-intensity 48-hour student hackathon centered on systems engineering, edge AI, and autonomous hardware. Over 128 students across 4 universities competed to ship production-grade software and prototypes.",
      outcomes: [
        "24 functional repositories shipped and demonstrated before industry jury.",
        "Top 3 teams secured seed grants from SATA Incubation Fund.",
        "Featured breakthrough projects: AeroSense drone telemetry & KryptonOS microkernel."
      ],
      organizers: ["Devansh (President)", "Janya Sharma (Vice President)", "Anushka (Tech Lead)", "Harsh Chahal (Ops Lead)"]
    },
    {
      id: "sata-ev-06",
      number: "02",
      title: "NEURAL SYSTEMS & EDGE AI",
      subtitle: "Hands-on INT8 Quantization & On-Device Inferencing",
      category: "workshops",
      categoryLabel: "Technical Workshop",
      date: "22 JAN 2026",
      dateShort: "JAN 2026",
      venue: "SATA Compute Lab 402",
      participants: "84 Attendees",
      projects: "84 Flashed NPU Boards",
      prizePool: "N/A",
      image: "assets/images/events/neural-workshop.svg",
      summary: "Deep technical dive into running quantized transformer and vision models locally on resource-constrained microcontrollers and edge TPUs without cloud dependency.",
      outcomes: [
        "Hands-on flashing of tinyLLM on Raspberry Pi 5 and ESP32-S3.",
        "Demonstrated 12ms inference latency for on-device voice commands.",
        "Full open-source lab workbook released to community."
      ],
      organizers: ["Gyanesh Nayak (AI Lead)", "Anushka (Tech Lead)", "Devansh (President)"]
    },
    {
      id: "sata-ev-05",
      number: "03",
      title: "DECENTRALIZED PROTOCOLS & SYSTEMS",
      subtitle: "Byzantine Fault Tolerance & Peer-to-Peer Consensus",
      category: "talks",
      categoryLabel: "Tech Talk & Panel",
      date: "18 NOV 2025",
      dateShort: "NOV 2025",
      venue: "Main Auditorium",
      participants: "110 Attendees",
      projects: "3 Research Whitepapers",
      prizePool: "N/A",
      image: "assets/images/events/decentralized-talk.svg",
      summary: "Technical lecture and architecture panel on decentralized state machines, Raft consensus algorithm implementations, and low-bandwidth wireless mesh protocols.",
      outcomes: [
        "Live demonstration of a 10-node Raft consensus cluster recovering from network partitions.",
        "Initiated the SATAMesh campus wireless radio project.",
        "Student Q&A with distributed systems engineers."
      ],
      organizers: ["Devansh (President)", "Janya Sharma (Vice President)", "Bhavika Bansal (Design Lead)"]
    },
    {
      id: "sata-ev-04",
      number: "04",
      title: "EMBEDDED IOT & ROBOTICS LAB",
      subtitle: "Sensor Fusion, CAN-Bus & Real-Time Control",
      category: "hardware",
      categoryLabel: "Hardware Sprint",
      date: "12 OCT 2025",
      dateShort: "OCT 2025",
      venue: "Robotics Workstation C",
      participants: "62 Hackers",
      projects: "14 Functional Hardware Rigs",
      prizePool: "₹25,000",
      image: "assets/images/events/embedded-lab.svg",
      summary: "Hardware-intensive laboratory session focusing on high-speed SPI/I2C communication, Kalman filtering for IMU sensors, and CAN-bus telemetry setups.",
      outcomes: [
        "Assembled 14 self-balancing robotic bases.",
        "Zero hardware component failures during 6-hour endurance test.",
        "Established the SATA Embedded Hardware Lending Vault."
      ],
      organizers: ["Hardik Wadhwa (Hardware Lead)", "Harsh Chahal (Ops Lead)", "Tapesh (Robotics)"]
    },
    {
      id: "sata-ev-03",
      number: "05",
      title: "ALGORITHMIC ARENA '25",
      subtitle: "High-Performance Systems & Competitive Problem Solving",
      category: "hackathons",
      categoryLabel: "Coding Sprint",
      date: "28 AUG 2025",
      dateShort: "AUG 2025",
      venue: "Virtual & Lab 301",
      participants: "96 Competitors",
      projects: "420 Submissions",
      prizePool: "₹40,000",
      image: "assets/images/events/algo-arena.svg",
      summary: "Fast-paced 6-hour algorithmic sprint emphasizing cache-friendly memory layouts, parallel processing with OpenMP, and advanced graph algorithms.",
      outcomes: [
        "96 student engineers solving 8 complex systems programming challenges.",
        "Fastest solve recorded in 12 milliseconds in C++20.",
        "Winner sponsored for ACM ICPC Regional qualifiers."
      ],
      organizers: ["Anushka (Tech Lead)", "Devansh (President)", "Taksh Yadav (Development)"]
    },
    {
      id: "sata-ev-02",
      number: "06",
      title: "OPEN SOURCE ACCELERATOR '25",
      subtitle: "Student Project Incubation & Release Showcase",
      category: "workshops",
      categoryLabel: "Incubation Demo Day",
      date: "15 JUL 2025",
      dateShort: "JUL 2025",
      venue: "Amphitheatre",
      participants: "140 Attendees",
      projects: "8 Shipped Releases",
      prizePool: "₹85,000",
      image: "assets/images/events/open-source.svg",
      summary: "Celebration and public release of 8 student-built open source tools, including developer utilities, Linux kernel patches, and accessible campus tools.",
      outcomes: [
        "Over 480 GitHub stars accumulated across incubated projects in 48 hours.",
        "2 projects nominated for international open source fellowships.",
        "SATA Open Source Guide published."
      ],
      organizers: ["Devansh (President)", "Janya Sharma (Vice President)", "Bhavika Bansal (Design Lead)"]
    }
  ],

  // --------------------------------------------------------------------------
  // CORE PROJECTS VAULT
  // --------------------------------------------------------------------------
  projects: [
    {
      id: "proj-01",
      title: "AeroSense",
      subtitle: "Autonomous Drone Environmental Telemetry",
      category: "Hardware / Systems",
      badge: "ACTIVE PRODUCTION",
      image: "assets/images/projects/aerosense.svg",
      description: "A customized quadcopter flight stack equipped with multispectral particulate and gas sensors, streaming live geospatial air quality maps over 5.8GHz telemetry.",
      techStack: ["Rust", "ESP32-S3", "C++", "Sensirion SPS30", "WebSockets"],
      metrics: "Sub-50ms Telemetry • 4.2km Range • 99.4% Uptime",
      github: "https://github.com/sata-org/aerosense",
      demo: "#"
    },
    {
      id: "proj-02",
      title: "KryptonOS",
      subtitle: "Real-Time Microkernel for Resource-Constrained MCUs",
      category: "Systems Engineering",
      badge: "RESEARCH CORE",
      image: "assets/images/projects/kryptonos.svg",
      description: "A memory-safe, capability-based microkernel written in Rust targeting RISC-V and ARM Cortex-M architecture with deterministic zero-copy IPC messaging.",
      techStack: ["Rust", "RISC-V", "WebAssembly", "QEMU", "GDB"],
      metrics: "180ns Context Switch • 64KB Footprint • Zero Memory Leaks",
      github: "https://github.com/sata-org/krypton-os",
      demo: "#"
    },
    {
      id: "proj-03",
      title: "NeuroSync",
      subtitle: "Low-Latency Brain-Computer Interface (BCI)",
      category: "AI & Signal Processing",
      badge: "INNOVATION LAB",
      image: "assets/images/projects/neurosync.svg",
      description: "An open hardware and software EEG acquisition pipeline with real-time digital bandpass filtering and PyTorch neural decoding for motor-imagery control.",
      techStack: ["Python", "PyTorch", "ADS1299 AFE", "NumPy", "FastAPI"],
      metrics: "98.4% Classification Acc • 8ms DSP Latency • 8 Channels",
      github: "https://github.com/sata-org/neurosync-bci",
      demo: "#"
    },
    {
      id: "proj-04",
      title: "SATAMesh",
      subtitle: "Decentralized Campus LoRa Radio Mesh",
      category: "Networking & Protocols",
      badge: "DEPLOYED ON CAMPUS",
      image: "assets/images/projects/satamesh.svg",
      description: "A resilient peer-to-peer wireless packet radio network deployed across college buildings, facilitating zero-infrastructure encrypted student communication.",
      techStack: ["C++", "LoRa 868MHz", "AES-256", "SX1262", "Protobuf"],
      metrics: "4.8km Coverage • 18 Static Nodes • Zero Cloud Dependency",
      github: "https://github.com/sata-org/satamesh-protocol",
      demo: "#"
    }
  ],

  // --------------------------------------------------------------------------
  // OFFICIAL STUDENT LEADERSHIP PANEL
  // --------------------------------------------------------------------------
  leadership: [
    {
      id: "lead-01",
      number: "01",
      role: "PRESIDENT",
      name: "DEVANSH",
      responsibility: "STRATEGY & OPERATIONS",
      bio: "Chief Executive of SATA. Steers organizational vision, university alignment, industry outreach, and flagship hackathons. Committed to fostering high-velocity student innovation.",
      accent: "amber",
      image: "assets/images/people/devansh.svg",
      github: "https://github.com/devansh-sata",
      linkedin: "https://linkedin.com"
    },
    {
      id: "lead-02",
      number: "02",
      role: "VICE PRESIDENT",
      name: "JANYA SHARMA",
      responsibility: "COMMUNITY & EXECUTION",
      bio: "Vice President leading community operations, cross-domain project execution, and member mentorship. Coordinates flagship symposiums and student hackathon teams.",
      accent: "cyan",
      image: "assets/images/people/janya-sharma.svg",
      github: "https://github.com/janyasharma-sata",
      linkedin: "https://linkedin.com"
    },
    {
      id: "lead-03",
      number: "03",
      role: "TECH LEAD",
      name: "ANUSHKA",
      responsibility: "SYSTEMS & INFRASTRUCTURE (CSE 4)",
      bio: "Technical architect and 4th-year Computer Science specialist. Oversees server clusters, bare-metal project pipelines, and code architecture standards across SATA labs.",
      accent: "amber",
      image: "assets/images/people/anushka.svg",
      github: "https://github.com/anushka-cse",
      linkedin: "https://linkedin.com"
    },
    {
      id: "lead-04",
      number: "04",
      role: "DESIGN LEAD",
      name: "BHAVIKA BANSAL",
      responsibility: "VISUAL & EXPERIENCE SYSTEMS",
      bio: "Design engineer shaping SATA's visual brand, digital UI/UX frameworks, exhibition aesthetics, and typography systems.",
      accent: "cyan",
      image: "assets/images/people/bhavika-bansal.svg",
      github: "https://github.com/bhavikabansal-design",
      linkedin: "https://linkedin.com"
    },
    {
      id: "lead-05",
      number: "05",
      role: "AI & RESEARCH LEAD",
      name: "GYANESH NAYAK",
      responsibility: "AUTONOMOUS AGENTS & ML SYSTEMS",
      bio: "Machine learning researcher focused on on-device LLM fine-tuning, model quantization, and neuro-symbolic agent workflows. Leads SATA AI Build Nights.",
      accent: "amber",
      image: "assets/images/people/gyanesh-nayak.svg",
      github: "https://github.com/gyaneshnayak-ai",
      linkedin: "https://linkedin.com"
    },
    {
      id: "lead-06",
      number: "06",
      role: "HARDWARE LEAD",
      name: "HARDIK WADHWA",
      responsibility: "EMBEDDED LABS & ROBOTICS",
      bio: "Hardware engineer managing PCB design, microcontroller flashing benches, sensor fusion systems, and autonomous robotics prototypes.",
      accent: "cyan",
      image: "assets/images/people/hardik-wadhwa.svg",
      github: "https://github.com/hardikwadhwa-hw",
      linkedin: "https://linkedin.com"
    },
    {
      id: "lead-07",
      number: "07",
      role: "OPERATIONS LEAD",
      name: "HARSH CHAHAL",
      responsibility: "OPERATIONS & EVENT MANAGEMENT",
      bio: "Operational strategist managing event timelines, logistics, university administration, and community engagement for all SATA active members.",
      accent: "amber",
      image: "assets/images/people/harsh-chahal.svg",
      github: "https://github.com/harshchahal-ops",
      linkedin: "https://linkedin.com"
    }
  ],

  // --------------------------------------------------------------------------
  // SATA ACTIVE MEMBER DIRECTORY (OFFICIAL 15-MEMBER ROSTER)
  // --------------------------------------------------------------------------
  members: [
    { num: "01", name: "Devansh", domain: "Leadership", focus: "President // Strategy & Systems", year: "4th Year" },
    { num: "02", name: "Janya Sharma", domain: "Leadership", focus: "Vice President // Community & Execution", year: "3rd Year" },
    { num: "03", name: "Anushka", domain: "Development", focus: "Tech Lead // Systems & Infra (CSE 4)", year: "4th Year" },
    { num: "04", name: "Bhavika Bansal", domain: "Design", focus: "Design Lead // Visual & UX Systems", year: "3rd Year" },
    { num: "05", name: "Akshita", domain: "Development", focus: "Full Stack & Web Engineering", year: "2nd Year" },
    { num: "06", name: "Ashwika Sharma", domain: "Design", focus: "UI/UX & Creative Media", year: "2nd Year" },
    { num: "07", name: "Gyanesh Nayak", domain: "AI / ML", focus: "AI Lead // ML & Autonomous Agents", year: "3rd Year" },
    { num: "08", name: "Hardik Wadhwa", domain: "Embedded", focus: "Hardware Lead // IoT & Embedded Systems", year: "3rd Year" },
    { num: "09", name: "Harsh Chahal", domain: "Operations", focus: "Ops Lead // Logistics & Events", year: "3rd Year" },
    { num: "10", name: "Rishita Roy", domain: "Development", focus: "Frontend & Interactive Systems", year: "2nd Year" },
    { num: "11", name: "Shubhi Vajpayee", domain: "Content", focus: "Content Strategy & Technical Writing", year: "2nd Year" },
    { num: "12", name: "Sneha Jangra", domain: "Operations", focus: "Community Outreach & Relations", year: "2nd Year" },
    { num: "13", name: "Taksh Yadav", domain: "Development", focus: "Systems Programming & Cloud", year: "3rd Year" },
    { num: "14", name: "Tapesh", domain: "Embedded", focus: "Hardware Lab & Robotics Prototyping", year: "2nd Year" },
    { num: "15", name: "Vaibhav Jangra", domain: "Development", focus: "Cybersecurity & Network Protocols", year: "3rd Year" }
  ],

  // --------------------------------------------------------------------------
  // NEXT EXPERIMENT & UPCOMING INITIATIVES
  // --------------------------------------------------------------------------
  nextExperiment: {
    title: "AI BUILD NIGHT: Autonomous Agents & On-Device LLMs",
    code: "EXP.V-2.4 // ACTIVE SPRINT",
    date: "18 SEP 2026",
    targetDateISO: "2026-09-18T18:00:00+05:30",
    time: "18:00 — 21:00 IST",
    venue: "Main Auditorium & Innovation Lab",
    seatsTotal: 60,
    seatsBooked: 44,
    description: "An intensive hands-on building night where students will build, fine-tune, and deploy multi-agent autonomous reasoning workflows running directly on personal laptops and local Ollama clusters.",
    prerequisites: "Laptop with 8GB+ RAM, Docker or Python 3.11+, enthusiasm for local models."
  },

  upcomingSchedule: [
    { date: "28 SEP", title: "Embedded Linux & RISC-V Hands-On Sprint", type: "Hardware Lab" },
    { date: "12 OCT", title: "SATA Winter Hackathon Warmup & Team Mixer", type: "Community" },
    { date: "24 OCT", title: "Systems Paper Reading Group: Raft vs Paxos", type: "Research Talk" }
  ]
};
