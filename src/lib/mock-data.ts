export type Part = {
  sku: string; id1: string; id2: string;
  name: string; description: string;
  price: number; compareAt?: number;
  stock: number; hasMotor: boolean;
  diagramNumber: string; altPartNumbers: string[];
  images: string[];
  compat: { machineModels: string[]; stitchType?: string[]; needleSystem?: string; threadType?: string };
  specs: { material?: string; weight?: string };
  maintenance: { lubrication?: string; replacementInterval_hours?: number };
  brandSlug: string; brandName: string;
  modelSlug: string; modelName: string;
  isBrand: boolean; rating: number; reviews: number;
};

export type Brand = {
  slug: string; name: string; isBrand: boolean;
  models: { slug: string; name: string; partsCount: number }[];
};

export const BRANDS: Brand[] = [
  { slug: "juki", name: "JUKI", isBrand: true, models: [
    { slug: "ddl-8700", name: "DDL-8700", partsCount: 24 },
    { slug: "mo-6716s", name: "MO-6716S", partsCount: 18 },
    { slug: "lk-1900a", name: "LK-1900A", partsCount: 12 },
  ]},
  { slug: "siruba", name: "SIRUBA", isBrand: true, models: [
    { slug: "988-700k", name: "988/700K", partsCount: 22 },
    { slug: "747d", name: "747D", partsCount: 15 },
    { slug: "f007", name: "F007", partsCount: 9 },
  ]},
  { slug: "brother", name: "BROTHER", isBrand: true, models: [
    { slug: "s-7200c", name: "S-7200C", partsCount: 17 },
    { slug: "b755", name: "B755", partsCount: 11 },
  ]},
  { slug: "jack", name: "JACK", isBrand: true, models: [
    { slug: "a4", name: "A4", partsCount: 14 },
    { slug: "f4", name: "F4", partsCount: 10 },
  ]},
  { slug: "pegasus", name: "PEGASUS", isBrand: true, models: [
    { slug: "m700", name: "M700", partsCount: 8 },
  ]},
  { slug: "others", name: "OTHERS", isBrand: false, models: [
    { slug: "eye-guard", name: "Eye Guard", partsCount: 12 },
    { slug: "puller", name: "Puller", partsCount: 9 },
    { slug: "folder", name: "Folder", partsCount: 15 },
    { slug: "needle-plate", name: "Needle Plate", partsCount: 21 },
    { slug: "presser-foot", name: "Presser Foot", partsCount: 28 },
    { slug: "motor", name: "Motor", partsCount: 7 },
  ]},
];

const img = (q: string) => `https://images.unsplash.com/${q}?auto=format&fit=crop&w=900&q=70`;

export const PARTS: Part[] = [
  { sku: "SKU-JUKI-HX48300", id1: "HX-48300", id2: "KD14",
    name: "Rotary Hook Assembly",
    description: "Hardened steel rotary hook for high-speed lockstitch. Precision-ground race for low-friction, consistent thread pickup.",
    price: 2450, compareAt: 2800, stock: 42, hasMotor: false,
    diagramNumber: "D-112", altPartNumbers: ["B1830-372-OAO", "229-26309"],
    images: [img("photo-1581094794329-c8112a89af12"), img("photo-1565043666747-69f6646db940"), img("photo-1581093588401-fbb62a02f120")],
    compat: { machineModels: ["JUKI DDL-8700", "JUKI DDL-9000"], stitchType: ["Lockstitch"], needleSystem: "DBx1", threadType: "Polyester or Cotton" },
    specs: { material: "Hardened steel", weight: "65g" },
    maintenance: { lubrication: "Light machine oil every 8 hours", replacementInterval_hours: 5000 },
    brandSlug: "juki", brandName: "JUKI", modelSlug: "ddl-8700", modelName: "DDL-8700", isBrand: true,
    rating: 4.8, reviews: 142 },
  { sku: "SKU-JUKI-NDL01", id1: "DBx1", id2: "#14",
    name: "Industrial Needle Pack (10)",
    description: "Genuine DBx1 needles, size #14. Pack of 10. Suits most single-needle lockstitch machines.",
    price: 320, stock: 320, hasMotor: false,
    diagramNumber: "D-008", altPartNumbers: ["DBX1-14"],
    images: [img("photo-1606293459339-aa5d34a7b0e1")],
    compat: { machineModels: ["JUKI DDL-8700", "Brother S-7200C", "SIRUBA L818F"], stitchType: ["Lockstitch"], needleSystem: "DBx1" },
    specs: { material: "Chrome-plated steel" },
    maintenance: { replacementInterval_hours: 100 },
    brandSlug: "juki", brandName: "JUKI", modelSlug: "ddl-8700", modelName: "DDL-8700", isBrand: true,
    rating: 4.9, reviews: 612 },
  { sku: "SKU-JUKI-BOB12", id1: "BBN-01", id2: "M",
    name: "Aluminium Bobbin (Pack of 12)",
    description: "Lightweight aluminium bobbins for smooth thread delivery on lockstitch heads.",
    price: 540, stock: 88, hasMotor: false,
    diagramNumber: "D-021", altPartNumbers: ["B9117-012-000"],
    images: [img("photo-1605559424843-9e4c228bf1c3")],
    compat: { machineModels: ["JUKI DDL-8700"], stitchType: ["Lockstitch"] },
    specs: { material: "Anodised aluminium" },
    maintenance: {},
    brandSlug: "juki", brandName: "JUKI", modelSlug: "ddl-8700", modelName: "DDL-8700", isBrand: true,
    rating: 4.6, reviews: 88 },
  { sku: "SKU-JUKI-MO6716-KNF", id1: "KN-220", id2: "U",
    name: "Upper Knife — Overlock",
    description: "Replacement upper knife for MO-6716S overlock cutter. Carbide tip.",
    price: 1180, stock: 24, hasMotor: false,
    diagramNumber: "D-307", altPartNumbers: ["118-81607"],
    images: [img("photo-1556228720-195a672e8a03")],
    compat: { machineModels: ["JUKI MO-6716S"], stitchType: ["Overlock"] },
    specs: { material: "Carbide-tipped steel" },
    maintenance: { replacementInterval_hours: 2000 },
    brandSlug: "juki", brandName: "JUKI", modelSlug: "mo-6716s", modelName: "MO-6716S", isBrand: true,
    rating: 4.7, reviews: 56 },
  { sku: "SKU-SIRUBA-KD14", id1: "KD-14", id2: "",
    name: "Looper Set — Siruba 988",
    description: "Complete looper set for 988/700K overlock series. OEM-grade replacement.",
    price: 1860, compareAt: 2100, stock: 16, hasMotor: false,
    diagramNumber: "D-411", altPartNumbers: ["S-988-LP"],
    images: [img("photo-1581092334651-ddf26d9a09d0")],
    compat: { machineModels: ["SIRUBA 988", "SIRUBA 700K"], stitchType: ["Overlock"] },
    specs: { material: "Tool steel" },
    maintenance: { replacementInterval_hours: 4000 },
    brandSlug: "siruba", brandName: "SIRUBA", modelSlug: "988-700k", modelName: "988/700K", isBrand: true,
    rating: 4.5, reviews: 41 },
  { sku: "SKU-BROTHER-S7200-FT", id1: "PF-77", id2: "",
    name: "Teflon Presser Foot",
    description: "Low-friction PTFE presser foot for sticky synthetic fabrics.",
    price: 420, stock: 130, hasMotor: false,
    diagramNumber: "D-505", altPartNumbers: ["S35457-001"],
    images: [img("photo-1583591225897-2c5f8e7e7a9c")],
    compat: { machineModels: ["Brother S-7200C", "JUKI DDL-8700"] },
    specs: { material: "PTFE / steel" },
    maintenance: {},
    brandSlug: "brother", brandName: "BROTHER", modelSlug: "s-7200c", modelName: "S-7200C", isBrand: true,
    rating: 4.7, reviews: 220 },
  { sku: "SKU-OTHERS-EG01", id1: "EG-100", id2: "",
    name: "Universal Eye Guard",
    description: "Clip-on transparent eye guard. Fits most industrial heads.",
    price: 95, stock: 540, hasMotor: false,
    diagramNumber: "D-001", altPartNumbers: ["EGU-01"],
    images: [img("photo-1565538810643-b5bdb714032a")],
    compat: { machineModels: ["Universal"] },
    specs: { material: "Polycarbonate" },
    maintenance: {},
    brandSlug: "others", brandName: "OTHERS", modelSlug: "eye-guard", modelName: "Eye Guard", isBrand: false,
    rating: 4.4, reviews: 98 },
  { sku: "SKU-OTHERS-MOT550", id1: "MT-550W", id2: "",
    name: "Servo Motor 550W",
    description: "Energy-efficient brushless servo motor. Quiet operation, instant stop.",
    price: 6800, compareAt: 7500, stock: 22, hasMotor: true,
    diagramNumber: "D-900", altPartNumbers: ["SRV-550"],
    images: [img("photo-1581092918056-0c4c3acd3789")],
    compat: { machineModels: ["Universal industrial heads"] },
    specs: { material: "Aluminium housing", weight: "3.4kg" },
    maintenance: { replacementInterval_hours: 10000 },
    brandSlug: "others", brandName: "OTHERS", modelSlug: "motor", modelName: "Motor", isBrand: false,
    rating: 4.8, reviews: 73 },
  { sku: "SKU-OTHERS-NDP09", id1: "NP-9MM", id2: "",
    name: "Needle Plate 9mm",
    description: "Hardened needle plate for general-purpose lockstitch. Bright finish.",
    price: 360, stock: 60, hasMotor: false,
    diagramNumber: "D-210", altPartNumbers: ["B2406-380"],
    images: [img("photo-1581093588401-fbb62a02f120")],
    compat: { machineModels: ["JUKI DDL-8700", "Brother S-7200C"] },
    specs: { material: "Hardened steel" },
    maintenance: {},
    brandSlug: "others", brandName: "OTHERS", modelSlug: "needle-plate", modelName: "Needle Plate", isBrand: false,
    rating: 4.6, reviews: 39 },
  { sku: "SKU-JACK-A4-BLT", id1: "BLT-12", id2: "",
    name: "Drive Belt — Jack A4",
    description: "OEM polyurethane drive belt for Jack A4 direct-drive heads.",
    price: 280, stock: 75, hasMotor: false,
    diagramNumber: "D-602", altPartNumbers: ["JK-A4-BLT"],
    images: [img("photo-1565043666747-69f6646db940")],
    compat: { machineModels: ["Jack A4"] },
    specs: { material: "Polyurethane" },
    maintenance: { replacementInterval_hours: 3000 },
    brandSlug: "jack", brandName: "JACK", modelSlug: "a4", modelName: "A4", isBrand: true,
    rating: 4.5, reviews: 47 },
  { sku: "SKU-PEG-M700-LP", id1: "LPR-700", id2: "",
    name: "Pegasus M700 Looper",
    description: "Complete looper for Pegasus M700 overlock.",
    price: 2100, stock: 19, hasMotor: false,
    diagramNumber: "D-422", altPartNumbers: ["PEG-M700-LP"],
    images: [img("photo-1581092334651-ddf26d9a09d0")],
    compat: { machineModels: ["Pegasus M700"], stitchType: ["Overlock"] },
    specs: { material: "Tool steel" },
    maintenance: { replacementInterval_hours: 4500 },
    brandSlug: "pegasus", brandName: "PEGASUS", modelSlug: "m700", modelName: "M700", isBrand: true,
    rating: 4.6, reviews: 28 },
  { sku: "SKU-OTHERS-PLR-01", id1: "PLR-01", id2: "",
    name: "Tape Puller Assembly",
    description: "Pneumatic-assist puller for binding tape feed.",
    price: 4400, stock: 11, hasMotor: false,
    diagramNumber: "D-770", altPartNumbers: ["PLR-100"],
    images: [img("photo-1581094794329-c8112a89af12")],
    compat: { machineModels: ["Universal"] },
    specs: {},
    maintenance: {},
    brandSlug: "others", brandName: "OTHERS", modelSlug: "puller", modelName: "Puller", isBrand: false,
    rating: 4.3, reviews: 17 },
];

export const findPart = (sku: string) => PARTS.find((p) => p.sku === sku);
export const partsByBrand = (slug: string) => PARTS.filter((p) => p.brandSlug === slug);
export const partsByModel = (brand: string, model: string) =>
  PARTS.filter((p) => p.brandSlug === brand && p.modelSlug === model);

export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

export const MOCK_CART = [
  { sku: "SKU-JUKI-HX48300", qty: 1 },
  { sku: "SKU-SIRUBA-KD14", qty: 2 },
  { sku: "SKU-OTHERS-EG01", qty: 4 },
];
export const MOCK_WISHLIST = ["SKU-JUKI-MO6716-KNF", "SKU-OTHERS-MOT550", "SKU-BROTHER-S7200-FT"];

export const MOCK_ORDERS = [
  { id: "ORD-2026-1042", placedAt: "2026-06-18", status: "shipped", total: 5840, items: 3 },
  { id: "ORD-2026-1019", placedAt: "2026-06-11", status: "delivered", total: 1240, items: 2 },
  { id: "ORD-2026-0998", placedAt: "2026-05-29", status: "delivered", total: 8460, items: 5 },
  { id: "ORD-2026-0954", placedAt: "2026-05-12", status: "cancelled", total: 320, items: 1 },
];

export const ADMIN_KPIS = {
  revenueWeek: 184500, revenueMonth: 742300,
  ordersWeek: 86, ordersMonth: 341,
  lowStock: 7, activeUsers: 1284, openIssues: 4,
};

export const ADMIN_WEEKLY = [
  { d: "Mon", orders: 12, revenue: 24500 },
  { d: "Tue", orders: 18, revenue: 38200 },
  { d: "Wed", orders: 9, revenue: 19800 },
  { d: "Thu", orders: 22, revenue: 41200 },
  { d: "Fri", orders: 14, revenue: 28600 },
  { d: "Sat", orders: 7, revenue: 14400 },
  { d: "Sun", orders: 4, revenue: 17800 },
];

export const ADMIN_RECENT_ORDERS = [
  { id: "ORD-2026-1051", user: "Amit Sharma", total: 2450, status: "placed", at: "12 min ago" },
  { id: "ORD-2026-1050", user: "Neha Kapoor", total: 8460, status: "placed", at: "44 min ago" },
  { id: "ORD-2026-1049", user: "Rahul Verma", total: 320, status: "shipped", at: "2 h ago" },
  { id: "ORD-2026-1048", user: "Priya Desai", total: 6800, status: "delivered", at: "5 h ago" },
  { id: "ORD-2026-1047", user: "Faisal Khan", total: 1180, status: "cancelled", at: "9 h ago" },
];

export const ADMIN_USERS = [
  { id: "USR001", name: "Amit Sharma", email: "amit@example.com", phone: "+91-9876543210", orders: 14, spent: 48200, status: "active" },
  { id: "USR002", name: "Neha Kapoor", email: "neha@example.com", phone: "+91-9811122334", orders: 22, spent: 91450, status: "active" },
  { id: "USR003", name: "Rahul Verma", email: "rahul@example.com", phone: "+91-9999000111", orders: 3, spent: 5400, status: "active" },
  { id: "USR004", name: "Faisal Khan", email: "faisal@example.com", phone: "+91-9001112233", orders: 8, spent: 12200, status: "blocked" },
];

export const ADMIN_ADMINS = [
  { id: "ADM001", name: "Priya Singh", email: "priya.admin@example.com", role: "superadmin", status: "active" },
  { id: "ADM002", name: "Karan Mehta", email: "karan.admin@example.com", role: "admin", status: "active" },
];

export const SALES = [
  { id: "S-01", name: "Monsoon Lockstitch Sale", scope: "brand", scopeRef: "JUKI", percent: 12, endsAt: "2026-07-05T23:59:59" },
  { id: "S-02", name: "Eye Guards Flash", scope: "category", scopeRef: "Eye Guard", percent: 20, endsAt: "2026-06-25T23:59:59" },
  { id: "S-03", name: "Servo Motor Combo", scope: "item", scopeRef: "SKU-OTHERS-MOT550", percent: 9, endsAt: "2026-07-15T23:59:59" },
];

export const ISSUES = [
  { id: "ISS-201", subject: "machine_part", user: "Amit Sharma", phone: "+91-9876543210", location: "Ludhiana", status: "open", at: "Today 11:02" },
  { id: "ISS-200", subject: "website", user: "Neha Kapoor", phone: "+91-9811122334", location: "Mumbai", status: "open", at: "Today 09:14" },
  { id: "ISS-199", subject: "machine", user: "Rahul Verma", phone: "+91-9999000111", location: "Delhi", status: "resolved", at: "Yesterday" },
];
