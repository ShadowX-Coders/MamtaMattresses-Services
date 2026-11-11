import { ServiceItem } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  // --- Category 1: Mattress Repair ---
  {
    id: 'mattress-sagging-repair',
    name: 'Mattress Sagging Repair',
    category: 'Mattress Repair',
    shortDesc: 'Eliminate body impressions and hollow dips with structural core reinforcement at your home.',
    fullDesc: 'Sagging in the center or sleeping zones causes chronic back strain. Our technician inspects your internal support system on-site, replaces fatigued support layers, and adds high-resilience inserts to restore a perfectly level, supportive sleeping surface.',
    benefits: ['Relieves back and spine pressure', 'Restores even weight distribution', 'Prevents costly new mattress replacement', 'Completed in 2-3 hours at your home'],
    commonIssues: ['Center depression', 'Waking up with lower back pain', 'Uneven sleeping surface', 'Sinking feeling'],
    estimatedDuration: '2 - 3 Hours',
    tag: 'Most Requested',
    iconName: 'Activity'
  },
  {
    id: 'mattress-spring-repair',
    name: 'Mattress Spring Repair',
    category: 'Mattress Repair',
    shortDesc: 'Fix broken, popping, or squeaking bonnell and pocket spring coils directly on-site.',
    fullDesc: 'Damaged or misaligned spring units can protrude painfully into upholstery and produce loud squeaks. Our technician opens the perimeter seams at your home, replaces damaged pocket coils or springs, realigns the grid, and installs protective insulation felt pads.',
    benefits: ['Silences squeaking and metal creaks', 'Eliminates painful protruding coils', 'Restores spring responsiveness', 'Extends spring mattress life by years'],
    commonIssues: ['Loud squeaking noises', 'Sharp coils poking through cover', 'One side collapsing when seated', 'Broken coil mesh'],
    estimatedDuration: '2.5 - 3.5 Hours',
    tag: 'Specialized',
    iconName: 'Zap'
  },
  {
    id: 'mattress-sidewall-repair',
    name: 'Mattress Sidewall Repair',
    category: 'Mattress Repair',
    shortDesc: 'Reinforce bulging, collapsed, or ruptured mattress borders and side walls.',
    fullDesc: 'Sitting on mattress edges often bursts internal side casing seams and buckles wire supports. We repair the internal border encasement, re-anchor side support bands, and re-quilt external side walls for a crisp, upright rectangular profile.',
    benefits: ['Stops unsightly side bulging', 'Reinforces bed perimeter integrity', 'Restores original rectangular shape', 'Prevents mattress sliding off bed frame'],
    commonIssues: ['Bulging side panels', 'Collapsed perimeter corners', 'Torn sidewall stitching', 'Sagging border when sitting'],
    estimatedDuration: '2 - 3 Hours',
    iconName: 'Maximize2'
  },
  {
    id: 'mattress-edge-support-repair',
    name: 'Mattress Edge Support Repair',
    category: 'Mattress Repair',
    shortDesc: 'Rebuild collapsed mattress edges so you can sit and sleep safely right to the border.',
    fullDesc: 'Weak edges make you feel like you are rolling off the bed. We install high-density foam encasement borders and rigid boundary supports at your doorstep, maximizing your usable sleep surface and making getting out of bed easy.',
    benefits: ['Prevents roll-off accidents', 'Provides firm sitting support on bed edges', 'Expands usable mattress sleep area', 'High-density border foam reinforcement'],
    commonIssues: ['Rolling off while sleeping', 'No support when sitting on the edge', 'Perimeter slope'],
    estimatedDuration: '2 - 2.5 Hours',
    iconName: 'Shield'
  },
  {
    id: 'mattress-stitching-seam-repair',
    name: 'Mattress Stitching & Seam Repair',
    category: 'Mattress Repair',
    shortDesc: 'Heavy-duty industrial re-stitching for opened seams, loose piping, and split tape-edges.',
    fullDesc: 'Open seams expose internal batting and invite dust and allergens. Our technician uses heavy-gauge nylon threads and specialized mattress binding equipment right in your home to lock open seams, re-bind piping cords, and restore tufting buttons.',
    benefits: ['Industrial-strength nylon lockstitching', 'Stops loose threads from unraveling further', 'Secures internal layers in place', 'Neat, factory-grade finish'],
    commonIssues: ['Separated tape edges', 'Torn piping borders', 'Popped tufting buttons', 'Open seams showing foam'],
    estimatedDuration: '1 - 2 Hours',
    iconName: 'Scissors'
  },

  // --- Category 2: Foam & Comfort Solutions ---
  {
    id: 'mattress-foam-replacement',
    name: 'Mattress Foam Replacement',
    category: 'Mattress Repair',
    shortDesc: 'Replace crumbled, compacted, or deteriorated foam with fresh, high-density comfort foam.',
    fullDesc: 'Over time, poly-foam breaks down into dust and loses resilience. We carry a wide selection of premium 32D, 40D, and 50D certified foams to your home, cleanly remove old powdering layers, and cut & fit brand new responsive foam layers directly inside your mattress.',
    benefits: ['Brand-new plush or supportive feel', 'Hypoallergenic fresh foam layers', 'Choice of density (32D to 50D)', 'Done inside your home with no mess'],
    commonIssues: ['Foam turning powdery or crumbling', 'Deep body impressions', 'Loss of bounce and buoyancy'],
    estimatedDuration: '2 - 3.5 Hours',
    tag: 'Popular',
    iconName: 'Layers'
  },
  {
    id: 'memory-foam-replacement',
    name: 'Memory Foam Replacement',
    category: 'Foam & Comfort Solutions',
    shortDesc: 'Upgrade to contouring pressure-relieving memory foam for therapeutic sleep support.',
    fullDesc: 'Replace tired standard foam with cool-gel or high-recovery memory foam. Ideal for relieving shoulder, hip, and lumbar pressure points. Our technician measures, cuts, and bonds the memory foam layer on-site to match your bed dimensions perfectly.',
    benefits: ['Therapeutic contouring for body curves', 'Significant pressure-point relief', 'Reduced motion transfer between partners', 'Available in gel-infused cooling memory foam'],
    commonIssues: ['Morning stiffness and hip pain', 'Partner movement disturbing sleep', 'Mattress feels too rigid'],
    estimatedDuration: '2 - 3 Hours',
    iconName: 'Feather'
  },
  {
    id: 'mattress-layer-replacement',
    name: 'Mattress Layer Replacement',
    category: 'Foam & Comfort Solutions',
    shortDesc: 'Targeted replacement of specific worn interior layers while keeping good base layers intact.',
    fullDesc: 'Why replace an entire expensive mattress when only the top 2 inches are worn out? We surgically open the mattress casing, inspect each layer, discard only the compromised layer (coir, transition foam, or quilting), and install fresh materials while keeping your sound base intact.',
    benefits: ['Cost-efficient targeted restoration', 'Eco-friendly alternative to discarding mattress', 'Customizable layer density combination', 'Honest assessment of internal layers'],
    commonIssues: ['Lumpy surface feel', 'Top layer thin while base is sturdy', 'Deteriorated quilting pad'],
    estimatedDuration: '2 - 3 Hours',
    iconName: 'Layers'
  },
  {
    id: 'mattress-thickness-upgrade',
    name: 'Mattress Thickness Upgrade',
    category: 'Foam & Comfort Solutions',
    shortDesc: 'Increase mattress height by 2 to 4 inches with high-resilience comfort additions.',
    fullDesc: 'Transform a slim 4-inch or 5-inch mattress into a luxurious 7-inch or 8-inch hotel-grade mattress. Our technician integrates new orthopedic support layers into your existing core and fits an expanded border casing on-site.',
    benefits: ['Raises bed height for comfortable sitting & standing', 'Enhances deep cushioning support', 'Adapts mattress to modern high-bed frames', 'Custom tailored thickness (e.g. 5" to 8")'],
    commonIssues: ['Mattress feels too thin and hard', 'Bed height too low for knee comfort', 'Base bed frame felt through thin foam'],
    estimatedDuration: '2.5 - 3.5 Hours',
    iconName: 'ChevronsUp'
  },
  {
    id: 'mattress-firmness-adjustment',
    name: 'Mattress Firmness Adjustment',
    category: 'Foam & Comfort Solutions',
    shortDesc: 'Calibrate your mattress firmness level from medium to orthopedically firm as doctor-advised.',
    fullDesc: 'Doctor advised a firmer sleeping surface for spine alignment? We can insert high-density rebonded orthopedic sheets or firm coir pads right inside your mattress at home to achieve your exact prescribed level of firmness.',
    benefits: ['Doctor-recommended orthopedic spine support', 'Eliminates excessive spinal arching', 'Tailored specifically to your doctor’s advice', 'Tested in real-time with you lying on it'],
    commonIssues: ['Mattress too soft causing spine pain', 'Doctor recommended firmer bed', 'Mattress sinking into hammock shape'],
    estimatedDuration: '2 - 3 Hours',
    tag: 'Orthopedic',
    iconName: 'Sliders'
  },
  {
    id: 'mattress-softness-hardness-modification',
    name: 'Mattress Softness / Hardness Modification',
    category: 'Foam & Comfort Solutions',
    shortDesc: 'Fine-tune surface comfort without buying a new bed — make it softer, firmer, or balanced.',
    fullDesc: 'Bought a new mattress that is too hard, or an old one that has grown overly stiff? Our technician brings softness test samples to your Pune home. We swap or modify the comfort top layer until it matches your exact preference.',
    benefits: ['Test comfort levels right on your bed', 'Save 70% compared to buying a replacement', 'Personalized comfort matching', 'Dual-side firmness adjustment available'],
    commonIssues: ['Mattress feels like a wooden plank', 'Tossing and turning all night', 'Numbness in arms or legs during sleep'],
    estimatedDuration: '2 - 3 Hours',
    iconName: 'Smile'
  },

  // --- Category 3: Mattress Customization ---
  {
    id: 'mattress-resizing',
    name: 'Mattress Resizing',
    category: 'Mattress Customization',
    shortDesc: 'Resize your mattress to fit new bed frames, storage beds, or altered bedroom layouts.',
    fullDesc: 'Moved homes or changed your cot? Don’t throw away your expensive mattress. Our technician cuts down King size to Queen size, or trims width and length cleanly at your home, reshaping internal springs, foam, and quilting with neat factory borders.',
    benefits: ['Precision measurement to fit your specific bed frame', 'Handles both spring and foam cores', 'Clean re-stitched perimeter edging', 'No transportation risk or damage'],
    commonIssues: ['Mattress hangs over bed edges', 'Mattress too wide for new bedroom cot', 'Hydraulic bed lifting mechanism blocked'],
    estimatedDuration: '3 - 4 Hours',
    tag: 'Precision Craft',
    iconName: 'Crop'
  },
  {
    id: 'mattress-size-modification',
    name: 'Mattress Size Modification',
    category: 'Mattress Customization',
    shortDesc: 'Custom length, width, or corner notch cuts for antique cots, bunk beds, and boat/RV berths.',
    fullDesc: 'Many apartments and heritage homes feature non-standard cots, four-poster beds, or corner pillar obstructions. We modify existing mattresses with custom cutouts, tapered angles, or customized single/double splits right on-site.',
    benefits: ['Custom cuts around corner bed posts', 'Accurate split mattresses for adjustable beds', 'Perfect fit for modular furniture and bay windows', 'Done on-site with precise measurements'],
    commonIssues: ['Bed frame has corner pillars', 'Mattress bunches up at the footboard', 'Custom made cot dimensions'],
    estimatedDuration: '2.5 - 3.5 Hours',
    iconName: 'Minimize'
  },
  {
    id: 'custom-mattress-making',
    name: 'Custom Mattress Making',
    category: 'Mattress Customization',
    shortDesc: 'Handcrafted at-home mattress construction using your choice of coir, foam, and cotton.',
    fullDesc: 'Build a bespoke mattress tailored from scratch to your exact ergonomic needs. Our master craftsman brings raw certified materials to your Pune residence, layers coir, high-density foam, and breathable ticking, and quilts your mattress in front of you.',
    benefits: ['100% transparency of internal materials', 'Custom blend of coir, latex, and foam', 'Zero mystery fillers or synthetic adulteration', 'Crafted right before your eyes'],
    commonIssues: ['Cannot find standard size for unique bed', 'Want guaranteed pure materials', 'Need specific dual-firmness for two partners'],
    estimatedDuration: '4 - 6 Hours',
    tag: 'Bespoke',
    iconName: 'Compass'
  },
  {
    id: 'custom-foam-cutting',
    name: 'Custom Foam Cutting',
    category: 'Mattress Customization',
    shortDesc: 'Precision on-site cutting of foam blocks, cushions, daybeds, and window seating.',
    fullDesc: 'Need foam cushions for diwans, sofa-cum-beds, bay window nooks, or floor seating? We bring commercial foam cutting tools and premium foam sheets to your home to cut exact shapes, curves, and angles.',
    benefits: ['Clean, straight, crumb-free cut edges', 'Custom shapes for diwans, swings, and bay seats', 'Wide choice of densities and firmnesses', 'Instant fitting onto your furniture'],
    commonIssues: ['Irregular seating angles', 'Sofa-cum-bed foam sagging', 'Need new diwan cushions'],
    estimatedDuration: '1.5 - 2.5 Hours',
    iconName: 'Grid'
  },
  {
    id: 'mattress-topper-customization',
    name: 'Mattress Topper Customization',
    category: 'Mattress Customization',
    shortDesc: 'Tailor-made memory foam or orthopedic toppers to enhance any existing mattress.',
    fullDesc: 'If your mattress base is still good but needs an extra layer of cloud-like comfort, we create and fit custom 2-inch to 3-inch removable or integrated toppers with corner anchor straps, tailored to your exact cot dimensions.',
    benefits: ['Easy-to-clean removable comfort layer', 'Elastic corner straps prevent shifting', 'Adds luxurious cushioning without bulk', 'Custom thickness and softness levels'],
    commonIssues: ['Mattress feels slightly too firm', 'Need extra plush comfort layer', 'Rental apartment temporary comfort upgrade'],
    estimatedDuration: '1.5 - 2 Hours',
    iconName: 'Sparkles'
  },

  // --- Category 4: Restoration & Fabric ---
  {
    id: 'old-mattress-restoration',
    name: 'Old Mattress Restoration',
    category: 'Restoration & Fabric',
    shortDesc: 'Complete revitalization of heirloom, heavy cotton, or premium aged mattresses.',
    fullDesc: 'Heirloom and vintage mattresses built with pure materials often just need skilled hands. We unpick, air, re-comb and re-card internal cotton/coir, replace fatigued foam cores, reinforce internal springs, and re-case the mattress in fresh fabric.',
    benefits: ['Preserves sentimental or antique beds', 'Restores hygienic, resilient sleeping support', 'Fraction of the cost of new premium beds', 'Environmentally sustainable restoration'],
    commonIssues: ['Mattress feels old and uneven', 'Cotton or coir shifted inside', 'Dusty aged feel'],
    estimatedDuration: '3 - 4.5 Hours',
    tag: 'Complete Revival',
    iconName: 'RefreshCw'
  },
  {
    id: 'used-mattress-renovation',
    name: 'Used Mattress Renovation',
    category: 'Restoration & Fabric',
    shortDesc: 'Complete overhaul of pre-owned mattresses for clean, like-new sleeping hygiene.',
    fullDesc: 'Moving into a furnished flat or inherited a pre-owned mattress? We perform a comprehensive strip-down, deep sanitation, replace top comfort layers, and fit a brand new sealed fabric cover so you sleep on a clean, fresh, sanitized surface.',
    benefits: ['Fresh, sanitized sleep environment', 'Brand-new outer cover and top padding', 'Eliminates previous tenant stains and odors', 'High-temperature steam sanitization included'],
    commonIssues: ['Moved into furnished rental with old bed', 'Need fresh hygienic cover and padding', 'Mysterious previous odors'],
    estimatedDuration: '2.5 - 3.5 Hours',
    iconName: 'CheckCircle2'
  },
  {
    id: 'mattress-cover-replacement',
    name: 'Mattress Cover Replacement',
    category: 'Restoration & Fabric',
    shortDesc: 'Replace stained, torn, or aged outer fabric with premium jacquard or organic cotton covers.',
    fullDesc: 'Stained or threadbare covers ruin bedroom aesthetics and trap allergens. We remove the old fabric, inspect internal layers, and stitch a brand new breathable jacquard, organic knit, or water-resistant bamboo fabric cover on-site.',
    benefits: ['Fresh, clean, elegant exterior appearance', 'Choice of breathable fabrics (Jacquard, Knitted, Bamboo)', 'Tight, tailored fit with piping cords', 'Protective barrier against dust mites'],
    commonIssues: ['Yellowed or stained mattress cover', 'Pet scratches or fabric tears', 'Fabric pilling and fraying'],
    estimatedDuration: '2 - 3 Hours',
    tag: 'Aesthetic Upgrade',
    iconName: 'Shirt'
  },
  {
    id: 'mattress-fabric-replacement',
    name: 'Mattress Fabric Replacement',
    category: 'Restoration & Fabric',
    shortDesc: 'Total outer textile reupholstery including quilted borders and bottom anti-skid base.',
    fullDesc: 'Complete reupholstery of all 6 sides of your mattress. We install high-GSM quilted top ticking, durable side border textiles, and non-slip bottom panels, finished with industrial tape-edge machinery at your home.',
    benefits: ['360-degree factory-finish reupholstery', 'Anti-skid bottom keeps mattress positioned', 'Durable high-GSM quilted fabrics', 'Choice of soft cream, sage, or grey palettes'],
    commonIssues: ['Total fabric wear and tear', 'Spill stains through multiple panels', 'Frayed edging tape'],
    estimatedDuration: '2.5 - 4 Hours',
    iconName: 'Sparkles'
  },

  // --- Category 5: Cleaning & Hygiene ---
  {
    id: 'mattress-deep-cleaning',
    name: 'Mattress Deep Cleaning',
    category: 'Cleaning & Hygiene',
    shortDesc: 'Commercial extraction cleaning to remove deep-seated dirt, dead skin, and allergens.',
    fullDesc: 'Household vacuuming only touches the surface. Our technician brings commercial injection-extraction machines to your Pune home, injecting eco-friendly cleaning solution deep into fibers and extracting micro-debris, dead skin cells, and allergens.',
    benefits: ['Removes micro-debris and allergen buildup', 'Safe, non-toxic, pet- and baby-safe solutions', 'Rapid-dry moisture extraction technology', 'Noticeably fresher bedroom air quality'],
    commonIssues: ['Mattress never deep-cleaned in years', 'Sneezing or allergies when in bed', 'Greyish dusty appearance'],
    estimatedDuration: '1.5 - 2 Hours',
    iconName: 'Droplets'
  },
  {
    id: 'mattress-stain-removal',
    name: 'Mattress Stain Removal',
    category: 'Cleaning & Hygiene',
    shortDesc: 'Targeted enzyme treatments for sweat stains, tea/coffee spills, water marks, and accidents.',
    fullDesc: 'Stains penetrate foam quickly if left untreated. We use bio-enzymatic stain lifters formulated specifically for upholstery fabrics, lifting stubborn organic stains, food spills, and sweat marks without bleaching or damaging delicate fibers.',
    benefits: ['Enzymatic formula breaks down organic stains', 'Preserves mattress fabric integrity and color', 'Neutralizes deep-seated residue', 'Safe for children and elderly skin'],
    commonIssues: ['Sweat rings and body moisture marks', 'Tea, coffee, or milk spills', 'Accidental ink or makeup stains'],
    estimatedDuration: '1 - 2 Hours',
    tag: 'Targeted Care',
    iconName: 'Sparkle'
  },
  {
    id: 'mattress-odour-removal',
    name: 'Mattress Odour Removal',
    category: 'Cleaning & Hygiene',
    shortDesc: 'Neutralize persistent musty, damp, smoke, or pet odors from deep inside the mattress core.',
    fullDesc: 'Masking sprays only hide odors temporarily. Our technician applies deep-penetrating anti-microbial odor neutralizers and thermal de-odorizing treatments that eradicate odor-causing bacteria at the molecular level.',
    benefits: ['Eradicates source of odors rather than masking', 'Eliminates musty monsoon damp smells', 'Leaves a clean, crisp, neutral scent', 'Safe, non-pungent natural agents'],
    commonIssues: ['Musty damp odor during Pune monsoons', 'Pet smells lingering on bed', 'Stuffy stale odors'],
    estimatedDuration: '1 - 1.5 Hours',
    iconName: 'Wind'
  },
  {
    id: 'mattress-sanitization',
    name: 'Mattress Sanitization',
    category: 'Cleaning & Hygiene',
    shortDesc: 'High-temperature dry steam sanitization eradicating bacteria, viruses, and dust mites.',
    fullDesc: 'Dry steam at 140°C penetrates mattress layers, destroying 99.9% of bacteria, allergens, and dust mites without soaking the core. Followed by hospital-grade UV-C light treatment for complete hygienic peace of mind.',
    benefits: ['99.9% eradication of dust mites and bacteria', 'Chemical-free high-temperature dry steam', 'Fast drying with minimal downtime', 'Recommended every 6 months for allergy sufferers'],
    commonIssues: ['Dust mite sensitivity', 'Post-illness bedroom sanitization', 'Infant and toddler nursery mattresses'],
    estimatedDuration: '1 - 1.5 Hours',
    tag: 'Hygienic',
    iconName: 'ShieldCheck'
  },
  {
    id: 'mattress-dust-removal',
    name: 'Mattress Dust Removal',
    category: 'Cleaning & Hygiene',
    shortDesc: 'HEPA-filtered micro-vibration beating to dislodge deeply trapped dust and fine particulates.',
    fullDesc: 'Mattresses accumulate kilograms of fine dust and shed skin over years. We use high-frequency pulsation beaters and HEPA-13 certified filtration vacuums to pull fine dust from up to 8 inches deep inside the mattress core.',
    benefits: ['Pulls deeply buried micro-particulates', 'HEPA-13 filtration prevents dust redistribution', 'Significantly relieves asthma and nighttime congestion', 'Lightens mattress and improves air circulation'],
    commonIssues: ['Puff of dust when patting the mattress', 'Waking up with runny nose or itchy eyes', 'Mattress feels heavy and stuffy'],
    estimatedDuration: '1 - 1.5 Hours',
    iconName: 'Airplay'
  }
];

export const SERVICE_CATEGORIES: { name: import('../types').ServiceCategory; count: number; desc: string }[] = [
  {
    name: 'Mattress Repair',
    count: 5,
    desc: 'Core structural fixes including sagging, broken coils, sidewall bulging, and seam rebuilding.'
  },
  {
    name: 'Foam & Comfort Solutions',
    count: 6,
    desc: 'High-density foam swaps, contouring memory foam, thickness upgrades, and custom firmness tuning.'
  },
  {
    name: 'Mattress Customization',
    count: 5,
    desc: 'Precision resizing, custom cuts for antique or boat cots, and handcrafted at-home mattress building.'
  },
  {
    name: 'Restoration & Fabric',
    count: 4,
    desc: 'Total mattress revivals, premium jacquard cover replacement, and 360-degree reupholstery.'
  },
  {
    name: 'Cleaning & Hygiene',
    count: 5,
    desc: 'Commercial injection cleaning, high-temperature sanitization, stain lifting, and HEPA dust extraction.'
  }
];
