const TITLE_MAP = {
    home: "",
    table: "Periodic Table of Elements",
    table_chal: "Elemental Fit",
    lewis: "Lewis Dot Structures",
    matchmaker: "MatchMaker"};

const MODES = {
    home: {
        title: "",
        subtitle: ""
    },
    table: {
        title: "Periodic Table of Elements",
        subtitle: ""
    },
    elemental_fit_menu: {
        title: "Elemental Fit",
        subtitle: ""
    },
    table_complete: {
        title: "Elemental Fit",
        subtitle: "Complete the table"
    },
    table_master: {
        title: "Elemental Fit",
        subtitle: "Master the Table"
    },
    table_timed: {
        title: "Elemental Fit",
        subtitle: "Timed Trial"
    },
    matchmaker: {
        title: "MatchMaker",
        subtitle: "Can you match the correct cards?"
    }
};

// FULL 118 ELEMENTS (complete)
const elements = [
    {"number":1,"symbol":"H","name":"Hydrogen","mass":"1.008","lattice":"hex","notes":"Lightest element, powers stars via fusion."},
    {"number":2,"symbol":"He","name":"Helium","mass":"4.003","lattice":"fcc","notes":"Noble gas, second most abundant in universe."},
    {"number":3,"symbol":"Li","name":"Lithium","mass":"6.941","lattice":"bcc","notes":"Softest metal, crucial for modern batteries."},
    {"number":4,"symbol":"Be","name":"Beryllium","mass":"9.012","lattice":"hcp","notes":"Lightweight, high stiffness, used in aerospace."},
    {"number":5,"symbol":"B","name":"Boron","mass":"10.81","lattice":"trig","notes":"Metalloid used in semiconductors and borosilicate glass."},
    {"number":6,"symbol":"C","name":"Carbon","mass":"12.011","lattice":"hex","notes":"Forms diamond, graphite, graphene; basis of life."},
    {"number":7,"symbol":"N","name":"Nitrogen","mass":"14.007","lattice":"hex","notes":"78% of atmosphere, essential for amino acids."},
    {"number":8,"symbol":"O","name":"Oxygen","mass":"15.999","lattice":"monoc","notes":"Most abundant element in Earth's crust by mass."},
    {"number":9,"symbol":"F","name":"Fluorine","mass":"18.998","lattice":"monoc","notes":"Most reactive nonmetal, used in fluoropolymers."},
    {"number":10,"symbol":"Ne","name":"Neon","mass":"20.180","lattice":"fcc","notes":"Noble gas, iconic glowing red in signs."},
    {"number":11,"symbol":"Na","name":"Sodium","mass":"22.990","lattice":"bcc","notes":"Reactive alkali metal, key in nerves and salt."},
    {"number":12,"symbol":"Mg","name":"Magnesium","mass":"24.305","lattice":"hcp","notes":"Light alloy metal, burns with bright white flame."},
    {"number":13,"symbol":"Al","name":"Aluminium","mass":"26.982","lattice":"fcc","notes":"Light, corrosion-resistant, most used non-ferrous metal."},
    {"number":14,"symbol":"Si","name":"Silicon","mass":"28.085","lattice":"diamond","notes":"Semiconductor backbone of electronics and solar cells."},
    {"number":15,"symbol":"P","name":"Phosphorus","mass":"30.974","lattice":"tric","notes":"Essential for DNA, bones, and ATP energy transfer."},
    {"number":16,"symbol":"S","name":"Sulfur","mass":"32.06","lattice":"orth","notes":"Yellow nonmetal, used in sulfuric acid and rubber."},
    {"number":17,"symbol":"Cl","name":"Chlorine","mass":"35.45","lattice":"orth","notes":"Halogen, disinfectant, component of table salt."},
    {"number":18,"symbol":"Ar","name":"Argon","mass":"39.948","lattice":"fcc","notes":"Inert noble gas, used in welding and lighting."},
    {"number":19,"symbol":"K","name":"Potassium","mass":"39.098","lattice":"bcc","notes":"Vital for plant growth and muscle function."},
    {"number":20,"symbol":"Ca","name":"Calcium","mass":"40.078","lattice":"fcc","notes":"Essential for bones, teeth, and cement."},
    {"number":21,"symbol":"Sc","name":"Scandium","mass":"44.956","lattice":"hcp","notes":"Rare earth-like, strengthens aluminum alloys."},
    {"number":22,"symbol":"Ti","name":"Titanium","mass":"47.867","lattice":"hcp","notes":"Strong, lightweight, highly corrosion resistant."},
    {"number":23,"symbol":"V","name":"Vanadium","mass":"50.942","lattice":"bcc","notes":"Adds strength to steel, used in tools."},
    {"number":24,"symbol":"Cr","name":"Chromium","mass":"51.996","lattice":"bcc","notes":"Provides corrosion resistance in stainless steel."},
    {"number":25,"symbol":"Mn","name":"Manganese","mass":"54.938","lattice":"bcc","notes":"Essential for steel production and enzymes."},
    {"number":26,"symbol":"Fe","name":"Iron","mass":"55.845","lattice":"bcc","notes":"Most used metal, core of Earth's magnetic field."},
    {"number":27,"symbol":"Co","name":"Cobalt","mass":"58.933","lattice":"hcp","notes":"Used in batteries, magnets, and blue pigments."},
    {"number":28,"symbol":"Ni","name":"Nickel","mass":"58.693","lattice":"fcc","notes":"Corrosion resistant, used in stainless steel and coins."},
    {"number":29,"symbol":"Cu","name":"Copper","mass":"63.546","lattice":"fcc","notes":"Excellent conductor, used in wiring and plumbing."},
    {"number":30,"symbol":"Zn","name":"Zinc","mass":"65.38","lattice":"hcp","notes":"Galvanizing metal, essential trace element."},
    {"number":31,"symbol":"Ga","name":"Gallium","mass":"69.723","lattice":"orth","notes":"Melts in your hand, used in semiconductors."},
    {"number":32,"symbol":"Ge","name":"Germanium","mass":"72.63","lattice":"diamond","notes":"Semiconductor, used in early transistors."},
    {"number":33,"symbol":"As","name":"Arsenic","mass":"74.922","lattice":"trig","notes":"Toxic metalloid, used in semiconductors."},
    {"number":34,"symbol":"Se","name":"Selenium","mass":"78.971","lattice":"hex","notes":"Photoconductor, used in glass and electronics."},
    {"number":35,"symbol":"Br","name":"Bromine","mass":"79.904","lattice":"orth","notes":"Reddish-brown liquid halogen."},
    {"number":36,"symbol":"Kr","name":"Krypton","mass":"83.798","lattice":"fcc","notes":"Noble gas, used in high-performance lighting."},
    {"number":37,"symbol":"Rb","name":"Rubidium","mass":"85.468","lattice":"bcc","notes":"Highly reactive, used in atomic clocks."},
    {"number":38,"symbol":"Sr","name":"Strontium","mass":"87.62","lattice":"fcc","notes":"Used in fireworks (red color) and magnets."},
    {"number":39,"symbol":"Y","name":"Yttrium","mass":"88.906","lattice":"hcp","notes":"Used in LEDs and superconductors."},
    {"number":40,"symbol":"Zr","name":"Zirconium","mass":"91.224","lattice":"hcp","notes":"Corrosion resistant, used in nuclear reactors."},
    {"number":41,"symbol":"Nb","name":"Niobium","mass":"92.906","lattice":"bcc","notes":"Superconducting alloys, high-strength steel."},
    {"number":42,"symbol":"Mo","name":"Molybdenum","mass":"95.95","lattice":"bcc","notes":"High melting point, used in alloys."},
    {"number":43,"symbol":"Tc","name":"Technetium","mass":"[98]","lattice":"hcp","notes":"Radioactive, used in medical imaging."},
    {"number":44,"symbol":"Ru","name":"Ruthenium","mass":"101.07","lattice":"hcp","notes":"Hard platinum-group metal, catalysts."},
    {"number":45,"symbol":"Rh","name":"Rhodium","mass":"102.91","lattice":"fcc","notes":"Most expensive precious metal, catalysts."},
    {"number":46,"symbol":"Pd","name":"Palladium","mass":"106.42","lattice":"fcc","notes":"Excellent hydrogen absorber, catalytic converters."},
    {"number":47,"symbol":"Ag","name":"Silver","mass":"107.87","lattice":"fcc","notes":"Best electrical and thermal conductor."},
    {"number":48,"symbol":"Cd","name":"Cadmium","mass":"112.41","lattice":"hcp","notes":"Used in batteries and pigments (toxic)."},
    {"number":49,"symbol":"In","name":"Indium","mass":"114.82","lattice":"tet","notes":"Soft metal, used in touchscreens (ITO)."},
    {"number":50,"symbol":"Sn","name":"Tin","mass":"118.71","lattice":"tet","notes":"Used in solder and bronze."},
    {"number":51,"symbol":"Sb","name":"Antimony","mass":"121.76","lattice":"trig","notes":"Used in flame retardants and alloys."},
    {"number":52,"symbol":"Te","name":"Tellurium","mass":"127.60","lattice":"hex","notes":"Used in solar panels and thermoelectric devices."},
    {"number":53,"symbol":"I","name":"Iodine","mass":"126.90","lattice":"orth","notes":"Essential for thyroid hormones."},
    {"number":54,"symbol":"Xe","name":"Xenon","mass":"131.29","lattice":"fcc","notes":"Noble gas, used in ion thrusters and lighting."},
    {"number":55,"symbol":"Cs","name":"Caesium","mass":"132.91","lattice":"bcc","notes":"Most reactive metal, used in atomic clocks."},
    {"number":56,"symbol":"Ba","name":"Barium","mass":"137.33","lattice":"bcc","notes":"Used in medical imaging and fireworks."},
    {"number":57,"symbol":"La","name":"Lanthanum","mass":"138.91","lattice":"hcp","notes":"Starting element of lanthanides."},
    {"number":58,"symbol":"Ce","name":"Cerium","mass":"140.12","lattice":"fcc","notes":"Used in catalytic converters and glass polishing."},
    {"number":59,"symbol":"Pr","name":"Praseodymium","mass":"140.91","lattice":"hcp","notes":"Used in high-strength magnets."},
    {"number":60,"symbol":"Nd","name":"Neodymium","mass":"144.24","lattice":"hcp","notes":"Strongest permanent magnets."},
    {"number":61,"symbol":"Pm","name":"Promethium","mass":"[145]","lattice":"hcp","notes":"Radioactive, used in nuclear batteries."},
    {"number":62,"symbol":"Sm","name":"Samarium","mass":"150.36","lattice":"rhom","notes":"Used in magnets and nuclear reactors."},
    {"number":63,"symbol":"Eu","name":"Europium","mass":"151.96","lattice":"bcc","notes":"Red phosphor in displays."},
    {"number":64,"symbol":"Gd","name":"Gadolinium","mass":"157.25","lattice":"hcp","notes":"Used in MRI contrast agents."},
    {"number":65,"symbol":"Tb","name":"Terbium","mass":"158.93","lattice":"hcp","notes":"Green phosphor and magneto-optical devices."},
    {"number":66,"symbol":"Dy","name":"Dysprosium","mass":"162.50","lattice":"hcp","notes":"High-temperature magnets."},
    {"number":67,"symbol":"Ho","name":"Holmium","mass":"164.93","lattice":"hcp","notes":"Strongest magnetic field material."},
    {"number":68,"symbol":"Er","name":"Erbium","mass":"167.26","lattice":"hcp","notes":"Used in fiber optic amplifiers."},
    {"number":69,"symbol":"Tm","name":"Thulium","mass":"168.93","lattice":"hcp","notes":"Portable X-ray sources."},
    {"number":70,"symbol":"Yb","name":"Ytterbium","mass":"173.05","lattice":"fcc","notes":"Used in atomic clocks and lasers."},
    {"number":71,"symbol":"Lu","name":"Lutetium","mass":"174.97","lattice":"hcp","notes":"Used in PET scanners and catalysts."},
    {"number":72,"symbol":"Hf","name":"Hafnium","mass":"178.49","lattice":"hcp","notes":"High melting point, nuclear control rods."},
    {"number":73,"symbol":"Ta","name":"Tantalum","mass":"180.95","lattice":"bcc","notes":"Corrosion resistant, used in capacitors."},
    {"number":74,"symbol":"W","name":"Tungsten","mass":"183.84","lattice":"bcc","notes":"Highest melting point metal."},
    {"number":75,"symbol":"Re","name":"Rhenium","mass":"186.21","lattice":"hcp","notes":"High-temperature alloys."},
    {"number":76,"symbol":"Os","name":"Osmium","mass":"190.23","lattice":"hcp","notes":"Densest naturally occurring element."},
    {"number":77,"symbol":"Ir","name":"Iridium","mass":"192.22","lattice":"fcc","notes":"Most corrosion-resistant metal."},
    {"number":78,"symbol":"Pt","name":"Platinum","mass":"195.08","lattice":"fcc","notes":"Catalytic converters and jewelry."},
    {"number":79,"symbol":"Au","name":"Gold","mass":"196.97","lattice":"fcc","notes":"Highly malleable, excellent conductor."},
    {"number":80,"symbol":"Hg","name":"Mercury","mass":"200.59","lattice":"rhom","notes":"Only liquid metal at room temperature."},
    {"number":81,"symbol":"Tl","name":"Thallium","mass":"204.38","lattice":"hcp","notes":"Toxic, used in electronics (limited)."},
    {"number":82,"symbol":"Pb","name":"Lead","mass":"207.2","lattice":"fcc","notes":"Dense, used in shielding and batteries."},
    {"number":83,"symbol":"Bi","name":"Bismuth","mass":"208.98","lattice":"rhom","notes":"Non-toxic alternative to lead."},
    {"number":84,"symbol":"Po","name":"Polonium","mass":"[209]","lattice":"cub","notes":"Highly radioactive."},
    {"number":85,"symbol":"At","name":"Astatine","mass":"[210]","lattice":"unknown","notes":"Rare radioactive halogen."},
    {"number":86,"symbol":"Rn","name":"Radon","mass":"[222]","lattice":"fcc","notes":"Radioactive noble gas."},
    {"number":87,"symbol":"Fr","name":"Francium","mass":"[223]","lattice":"bcc","notes":"Most unstable alkali metal."},
    {"number":88,"symbol":"Ra","name":"Radium","mass":"[226]","lattice":"bcc","notes":"Highly radioactive."},
    {"number":89,"symbol":"Ac","name":"Actinium","mass":"[227]","lattice":"fcc","notes":"Radioactive, glows blue."},
    {"number":90,"symbol":"Th","name":"Thorium","mass":"232.04","lattice":"fcc","notes":"Nuclear fuel potential."},
    {"number":91,"symbol":"Pa","name":"Protactinium","mass":"231.04","lattice":"tet","notes":"Rare actinide."},
    {"number":92,"symbol":"U","name":"Uranium","mass":"238.03","lattice":"orth","notes":"Nuclear fuel, densest naturally occurring element."},
    {"number":93,"symbol":"Np","name":"Neptunium","mass":"[237]","lattice":"orth","notes":"Synthetic actinide."},
    {"number":94,"symbol":"Pu","name":"Plutonium","mass":"[244]","lattice":"monoc","notes":"Used in nuclear weapons and reactors."},
    {"number":95,"symbol":"Am","name":"Americium","mass":"[243]","lattice":"hcp","notes":"Used in smoke detectors."},
    {"number":96,"symbol":"Cm","name":"Curium","mass":"[247]","lattice":"hcp","notes":"Powerful alpha emitter."},
    {"number":97,"symbol":"Bk","name":"Berkelium","mass":"[247]","lattice":"hcp","notes":"Synthetic."},
    {"number":98,"symbol":"Cf","name":"Californium","mass":"[251]","lattice":"hcp","notes":"Neutron source."},
    {"number":99,"symbol":"Es","name":"Einsteinium","mass":"[252]","lattice":"hcp","notes":"Synthetic."},
    {"number":100,"symbol":"Fm","name":"Fermium","mass":"[257]","lattice":"hcp","notes":"Synthetic."},
    {"number":101,"symbol":"Md","name":"Mendelevium","mass":"[258]","lattice":"hcp","notes":"Synthetic."},
    {"number":102,"symbol":"No","name":"Nobelium","mass":"[259]","lattice":"hcp","notes":"Synthetic."},
    {"number":103,"symbol":"Lr","name":"Lawrencium","mass":"[266]","lattice":"hcp","notes":"Synthetic."},
    {"number":104,"symbol":"Rf","name":"Rutherfordium","mass":"[267]","lattice":"hcp","notes":"Synthetic."},
    {"number":105,"symbol":"Db","name":"Dubnium","mass":"[268]","lattice":"unknown","notes":"Synthetic."},
    {"number":106,"symbol":"Sg","name":"Seaborgium","mass":"[269]","lattice":"unknown","notes":"Synthetic."},
    {"number":107,"symbol":"Bh","name":"Bohrium","mass":"[270]","lattice":"unknown","notes":"Synthetic."},
    {"number":108,"symbol":"Hs","name":"Hassium","mass":"[277]","lattice":"unknown","notes":"Synthetic."},
    {"number":109,"symbol":"Mt","name":"Meitnerium","mass":"[278]","lattice":"unknown","notes":"Synthetic."},
    {"number":110,"symbol":"Ds","name":"Darmstadtium","mass":"[281]","lattice":"unknown","notes":"Synthetic."},
    {"number":111,"symbol":"Rg","name":"Roentgenium","mass":"[282]","lattice":"unknown","notes":"Synthetic."},
    {"number":112,"symbol":"Cn","name":"Copernicium","mass":"[285]","lattice":"unknown","notes":"Synthetic."},
    {"number":113,"symbol":"Nh","name":"Nihonium","mass":"[286]","lattice":"unknown","notes":"Synthetic."},
    {"number":114,"symbol":"Fl","name":"Flerovium","mass":"[289]","lattice":"unknown","notes":"Synthetic."},
    {"number":115,"symbol":"Mc","name":"Moscovium","mass":"[290]","lattice":"unknown","notes":"Synthetic."},
    {"number":116,"symbol":"Lv","name":"Livermorium","mass":"[293]","lattice":"unknown","notes":"Synthetic."},
    {"number":117,"symbol":"Ts","name":"Tennessine","mass":"[294]","lattice":"unknown","notes":"Synthetic."},
    {"number":118,"symbol":"Og","name":"Oganesson","mass":"[294]","lattice":"unknown","notes":"Synthetic noble gas candidate."}
];

const elementMeta = {

    H:  { group: 'nonmetal', period: 1, radius: 53,  electronegativity: 2.20, ionization: 13.598 },
    He: { group: 'noble_gas', period: 1, radius: 31, electronegativity: null, ionization: 24.587 },

    Li: { group: 'alkali_metal', period: 2, radius: 167, electronegativity: 0.98, ionization: 5.392 },
    Be: { group: 'alkaline_earth_metal', period: 2, radius: 112, electronegativity: 1.57, ionization: 9.323 },
    B:  { group: 'metalloid', period: 2, radius: 87, electronegativity: 2.04, ionization: 8.298 },
    C:  { group: 'nonmetal', period: 2, radius: 67, electronegativity: 2.55, ionization: 11.260 },
    N:  { group: 'nonmetal', period: 2, radius: 56, electronegativity: 3.04, ionization: 14.534 },
    O:  { group: 'nonmetal', period: 2, radius: 48, electronegativity: 3.44, ionization: 13.618 },
    F:  { group: 'halogen', period: 2, radius: 42, electronegativity: 3.98, ionization: 17.423 },
    Ne: { group: 'noble_gas', period: 2, radius: 38, electronegativity: null, ionization: 21.565 },

    Na: { group: 'alkali_metal', period: 3, radius: 190, electronegativity: 0.93, ionization: 5.139 },
    Mg: { group: 'alkaline_earth_metal', period: 3, radius: 145, electronegativity: 1.31, ionization: 7.646 },
    Al: { group: 'post_transition_metal', period: 3, radius: 118, electronegativity: 1.61, ionization: 5.986 },
    Si: { group: 'metalloid', period: 3, radius: 111, electronegativity: 1.90, ionization: 8.152 },
    P:  { group: 'nonmetal', period: 3, radius: 98, electronegativity: 2.19, ionization: 10.487 },
    S:  { group: 'nonmetal', period: 3, radius: 88, electronegativity: 2.58, ionization: 10.360 },
    Cl: { group: 'halogen', period: 3, radius: 79, electronegativity: 3.16, ionization: 12.968 },
    Ar: { group: 'noble_gas', period: 3, radius: 71, electronegativity: null, ionization: 15.760 },

    K:  { group: 'alkali_metal', period: 4, radius: 243, electronegativity: 0.82, ionization: 4.341 },
    Ca: { group: 'alkaline_earth_metal', period: 4, radius: 194, electronegativity: 1.00, ionization: 6.113 },
    Sc: { group: 'transition_metal', period: 4, radius: 184, electronegativity: 1.36, ionization: 6.561 },
    Ti: { group: 'transition_metal', period: 4, radius: 176, electronegativity: 1.54, ionization: 6.828 },
    V:  { group: 'transition_metal', period: 4, radius: 171, electronegativity: 1.63, ionization: 6.746 },
    Cr: { group: 'transition_metal', period: 4, radius: 166, electronegativity: 1.66, ionization: 6.767 },
    Mn: { group: 'transition_metal', period: 4, radius: 161, electronegativity: 1.55, ionization: 7.434 },
    Fe: { group: 'transition_metal', period: 4, radius: 156, electronegativity: 1.83, ionization: 7.902 },
    Co: { group: 'transition_metal', period: 4, radius: 152, electronegativity: 1.88, ionization: 7.881 },
    Ni: { group: 'transition_metal', period: 4, radius: 149, electronegativity: 1.91, ionization: 7.640 },
    Cu: { group: 'transition_metal', period: 4, radius: 145, electronegativity: 1.90, ionization: 7.726 },
    Zn: { group: 'transition_metal', period: 4, radius: 142, electronegativity: 1.65, ionization: 9.394 },

    Ga: { group: 'post_transition_metal', period: 4, radius: 136, electronegativity: 1.81, ionization: 5.999 },
    Ge: { group: 'metalloid', period: 4, radius: 125, electronegativity: 2.01, ionization: 7.900 },
    As: { group: 'metalloid', period: 4, radius: 114, electronegativity: 2.18, ionization: 9.789 },
    Se: { group: 'nonmetal', period: 4, radius: 103, electronegativity: 2.55, ionization: 9.752 },
    Br: { group: 'halogen', period: 4, radius: 94, electronegativity: 2.96, ionization: 11.814 },
    Kr: { group: 'noble_gas', period: 4, radius: 88, electronegativity: 3.00, ionization: 13.999 },

    Rb: { group: 'alkali_metal', period: 5, radius: 265, electronegativity: 0.82, ionization: 4.177 },
    Sr: { group: 'alkaline_earth_metal', period: 5, radius: 219, electronegativity: 0.95, ionization: 5.695 },
    Y:  { group: 'transition_metal', period: 5, radius: 212, electronegativity: 1.22, ionization: 6.217 },
    Zr: { group: 'transition_metal', period: 5, radius: 206, electronegativity: 1.33, ionization: 6.634 },

    Nb: { group: 'transition_metal', period: 5, radius: 198, electronegativity: 1.60, ionization: 6.759 },
    Mo: { group: 'transition_metal', period: 5, radius: 190, electronegativity: 2.16, ionization: 7.092 },
    Tc: { group: 'transition_metal', period: 5, radius: 183, electronegativity: 1.90, ionization: 7.280 },
    Ru: { group: 'transition_metal', period: 5, radius: 178, electronegativity: 2.20, ionization: 7.361 },
    Rh: { group: 'transition_metal', period: 5, radius: 173, electronegativity: 2.28, ionization: 7.459 },
    Pd: { group: 'transition_metal', period: 5, radius: 169, electronegativity: 2.20, ionization: 8.337 },
    Ag: { group: 'transition_metal', period: 5, radius: 165, electronegativity: 1.93, ionization: 7.576 },
    Cd: { group: 'transition_metal', period: 5, radius: 161, electronegativity: 1.69, ionization: 8.994 },

    In: { group: 'post_transition_metal', period: 5, radius: 156, electronegativity: 1.78, ionization: 5.786 },
    Sn: { group: 'post_transition_metal', period: 5, radius: 145, electronegativity: 1.96, ionization: 7.344 },
    Sb: { group: 'metalloid', period: 5, radius: 133, electronegativity: 2.05, ionization: 8.608 },
    Te: { group: 'metalloid', period: 5, radius: 123, electronegativity: 2.10, ionization: 9.010 },
    I:  { group: 'halogen', period: 5, radius: 115, electronegativity: 2.66, ionization: 10.451 },
    Xe: { group: 'noble_gas', period: 5, radius: 108, electronegativity: 2.60, ionization: 12.130 },

    // PERIOD 6

    Cs: { group: 'alkali_metal', period: 6, radius: 298, electronegativity: 0.79, ionization: 3.894 },
    Ba: { group: 'alkaline_earth_metal', period: 6, radius: 253, electronegativity: 0.89, ionization: 5.212 },

    La: { group: 'lanthanide', period: 6, radius: 195, electronegativity: 1.10, ionization: 5.577 },
    Ce: { group: 'lanthanide', period: 6, radius: 185, electronegativity: 1.12, ionization: 5.539 },
    Pr: { group: 'lanthanide', period: 6, radius: 247, electronegativity: 1.13, ionization: 5.473 },
    Nd: { group: 'lanthanide', period: 6, radius: 206, electronegativity: 1.14, ionization: 5.525 },
    Pm: { group: 'lanthanide', period: 6, radius: 205, electronegativity: 1.13, ionization: 5.582 },
    Sm: { group: 'lanthanide', period: 6, radius: 238, electronegativity: 1.17, ionization: 5.644 },
    Eu: { group: 'lanthanide', period: 6, radius: 231, electronegativity: 1.20, ionization: 5.670 },
    Gd: { group: 'lanthanide', period: 6, radius: 233, electronegativity: 1.20, ionization: 6.150 },
    Tb: { group: 'lanthanide', period: 6, radius: 225, electronegativity: 1.10, ionization: 5.864 },
    Dy: { group: 'lanthanide', period: 6, radius: 228, electronegativity: 1.22, ionization: 5.939 },
    Ho: { group: 'lanthanide', period: 6, radius: 226, electronegativity: 1.23, ionization: 6.022 },
    Er: { group: 'lanthanide', period: 6, radius: 226, electronegativity: 1.24, ionization: 6.108 },
    Tm: { group: 'lanthanide', period: 6, radius: 222, electronegativity: 1.25, ionization: 6.184 },
    Yb: { group: 'lanthanide', period: 6, radius: 222, electronegativity: 1.10, ionization: 6.254 },
    Lu: { group: 'lanthanide', period: 6, radius: 217, electronegativity: 1.27, ionization: 5.426 },

    Hf: { group: 'transition_metal', period: 6, radius: 208, electronegativity: 1.30, ionization: 6.825 },
    Ta: { group: 'transition_metal', period: 6, radius: 200, electronegativity: 1.50, ionization: 7.550 },
    W:  { group: 'transition_metal', period: 6, radius: 193, electronegativity: 2.36, ionization: 7.864 },
    Re: { group: 'transition_metal', period: 6, radius: 188, electronegativity: 1.90, ionization: 7.833 },
    Os: { group: 'transition_metal', period: 6, radius: 185, electronegativity: 2.20, ionization: 8.438 },
    Ir: { group: 'transition_metal', period: 6, radius: 180, electronegativity: 2.20, ionization: 8.967 },
    Pt: { group: 'transition_metal', period: 6, radius: 177, electronegativity: 2.28, ionization: 8.959 },
    Au: { group: 'transition_metal', period: 6, radius: 174, electronegativity: 2.54, ionization: 9.226 },
    Hg: { group: 'transition_metal', period: 6, radius: 171, electronegativity: 2.00, ionization: 10.438 },

    Tl: { group: 'post_transition_metal', period: 6, radius: 156, electronegativity: 1.62, ionization: 6.108 },
    Pb: { group: 'post_transition_metal', period: 6, radius: 154, electronegativity: 2.33, ionization: 7.417 },
    Bi: { group: 'post_transition_metal', period: 6, radius: 143, electronegativity: 2.02, ionization: 7.289 },
    Po: { group: 'metalloid', period: 6, radius: 135, electronegativity: 2.00, ionization: 8.417 },
    At: { group: 'halogen', period: 6, radius: 127, electronegativity: 2.20, ionization: 9.300 },
    Rn: { group: 'noble_gas', period: 6, radius: 120, electronegativity: null, ionization: 10.748 },

    // PERIOD 7

    Fr: { group: 'alkali_metal', period: 7, radius: 348, electronegativity: 0.70, ionization: 4.073 },
    Ra: { group: 'alkaline_earth_metal', period: 7, radius: 283, electronegativity: 0.90, ionization: 5.279 },

    Ac: { group: 'actinide', period: 7, radius: 195, electronegativity: 1.10, ionization: 5.170 },
    Th: { group: 'actinide', period: 7, radius: 180, electronegativity: 1.30, ionization: 6.307 },
    Pa: { group: 'actinide', period: 7, radius: 161, electronegativity: 1.50, ionization: 5.890 },
    U:  { group: 'actinide', period: 7, radius: 156, electronegativity: 1.38, ionization: 6.194 },
    Np: { group: 'actinide', period: 7, radius: 155, electronegativity: 1.36, ionization: 6.266 },
    Pu: { group: 'actinide', period: 7, radius: 159, electronegativity: 1.28, ionization: 6.026 },
    Am: { group: 'actinide', period: 7, radius: 173, electronegativity: 1.30, ionization: 5.974 },
    Cm: { group: 'actinide', period: 7, radius: 174, electronegativity: 1.30, ionization: 5.992 },
    Bk: { group: 'actinide', period: 7, radius: 170, electronegativity: 1.30, ionization: 6.198 },
    Cf: { group: 'actinide', period: 7, radius: 186, electronegativity: 1.30, ionization: 6.282 },
    Es: { group: 'actinide', period: 7, radius: 186, electronegativity: 1.30, ionization: 6.367 },
    Fm: { group: 'actinide', period: 7, radius: 176, electronegativity: 1.30, ionization: 6.500 },
    Md: { group: 'actinide', period: 7, radius: 161, electronegativity: 1.30, ionization: 6.580 },
    No: { group: 'actinide', period: 7, radius: 173, electronegativity: 1.30, ionization: 6.650 },
    Lr: { group: 'actinide', period: 7, radius: 161, electronegativity: 1.30, ionization: 4.960 },

    Rf: { group: 'transition_metal', period: 7, radius: 157, electronegativity: null, ionization: null },
    Db: { group: 'transition_metal', period: 7, radius: 149, electronegativity: null, ionization: null },
    Sg: { group: 'transition_metal', period: 7, radius: 143, electronegativity: null, ionization: null },
    Bh: { group: 'transition_metal', period: 7, radius: 141, electronegativity: null, ionization: null },
    Hs: { group: 'transition_metal', period: 7, radius: 134, electronegativity: null, ionization: null },
    Mt: { group: 'transition_metal', period: 7, radius: 129, electronegativity: null, ionization: null },
    Ds: { group: 'transition_metal', period: 7, radius: 128, electronegativity: null, ionization: null },
    Rg: { group: 'transition_metal', period: 7, radius: 121, electronegativity: null, ionization: null },
    Cn: { group: 'transition_metal', period: 7, radius: 122, electronegativity: null, ionization: null },

    Nh: { group: 'post_transition_metal', period: 7, radius: 136, electronegativity: null, ionization: null },
    Fl: { group: 'post_transition_metal', period: 7, radius: 143, electronegativity: null, ionization: null },
    Mc: { group: 'post_transition_metal', period: 7, radius: 162, electronegativity: null, ionization: null },
    Lv: { group: 'post_transition_metal', period: 7, radius: 175, electronegativity: null, ionization: null },
    Ts: { group: 'halogen', period: 7, radius: 165, electronegativity: null, ionization: null },
    Og: { group: 'noble_gas', period: 7, radius: 157, electronegativity: null, ionization: null }
};

elements.forEach (el => {
    const meta = elementMeta[el.symbol];

    if (meta) {
        Object.assign(el, meta);
    }
});

const ELECTRONEGATIVITY = {
1:2.20,2:null,3:0.98,4:1.57,5:2.04,6:2.55,7:3.04,8:3.44,9:3.98,10:null,
11:0.93,12:1.31,13:1.61,14:1.90,15:2.19,16:2.58,17:3.16,18:null,
19:0.82,20:1.00,21:1.36,22:1.54,23:1.63,24:1.66,25:1.55,26:1.83,27:1.88,28:1.91,
29:1.90,30:1.65,31:1.81,32:2.01,33:2.18,34:2.55,35:2.96,36:3.00,
37:0.82,38:0.95,39:1.22,40:1.33,41:1.60,42:2.16,43:1.90,44:2.20,45:2.28,46:2.20,
47:1.93,48:1.69,49:1.78,50:1.96,51:2.05,52:2.10,53:2.66,54:2.60,
55:0.79,56:0.89,57:1.10,58:1.12,59:1.13,60:1.14,61:1.13,62:1.17,63:1.20,64:1.20,
65:1.10,66:1.22,67:1.23,68:1.24,69:1.25,70:1.10,71:1.27,
72:1.30,73:1.50,74:2.36,75:1.90,76:2.20,77:2.20,78:2.28,79:2.54,80:2.00,
81:1.62,82:2.33,83:2.02,84:2.00,85:2.20,86:null,
87:0.70,88:0.90,89:1.10,90:1.30,91:1.50,92:1.38,93:1.36,94:1.28,
95:1.30,96:1.30,97:1.30,98:1.30,99:1.30,100:1.30,101:1.30,102:1.30,103:1.30,
104:null,105:null,106:null,107:null,108:null,109:null,110:null,111:null,112:null,
113:null,114:null,115:null,116:null,117:null,118:null
};

const IONIZATION = {
1:1312,2:2372,
3:520,4:900,5:801,6:1086,7:1402,8:1314,9:1681,10:2080,
11:496,12:738,13:578,14:787,15:1012,16:1000,17:1251,18:1521,
19:419,20:590,21:633,22:659,23:651,24:653,25:717,26:762,27:760,28:737,
29:745,30:906,31:579,32:762,33:947,34:941,35:1140,36:1351,
37:403,38:549,39:600,40:640,41:652,42:684,43:702,44:710,45:720,46:804,
47:731,48:868,49:558,50:709,51:834,52:869,53:1008,54:1170,
55:376,56:503,57:538,58:534,59:527,60:533,61:540,62:545,63:547,64:593,
65:566,66:573,67:581,68:589,69:597,70:603,71:524,
72:659,73:761,74:770,75:760,76:840,77:880,78:870,79:890,80:1007,
81:589,82:716,83:703,84:812,85:920,86:1037,
87:380,88:509,89:499,90:587,91:568,92:597,93:604,94:585,95:578,96:581,
97:601,98:608,99:619,100:627,101:635,102:642,103:470,
104:580,105:664,106:757,107:742,108:715,109:704,110:665,111:757,112:1000,
113:704,114:715,115:703,116:812,117:920,118:1037
};

const ATOMIC_RADIUS = {
1:53,2:31,
3:167,4:112,5:87,6:67,7:56,8:48,9:42,10:38,
11:190,12:145,13:118,14:111,15:98,16:88,17:79,18:71,
19:243,20:194,21:184,22:176,23:171,24:166,25:161,26:156,27:152,28:149,
29:145,30:142,31:136,32:125,33:114,34:103,35:94,36:88,
37:265,38:219,39:212,40:206,41:198,42:190,43:183,44:178,45:173,46:169,
47:165,48:161,49:156,50:145,51:133,52:123,53:115,54:108,
55:298,56:253,57:195,58:185,59:247,60:206,61:205,62:238,63:231,64:233,
65:225,66:228,67:226,68:226,69:222,70:222,71:217,
72:208,73:200,74:193,75:188,76:185,77:180,78:177,79:174,80:171,
81:156,82:154,83:143,84:135,85:127,86:120,
87:348,88:283,89:260,90:237,91:243,92:240,93:221,94:243,95:244,96:245,
97:244,98:245,99:245,100:245,101:246,102:246,103:246
};

const GROUPS = {
    alkali: [3, 11, 19, 37, 55, 87],
    alkaline_earth: [4, 12, 20, 38, 56, 88],
    transition: [22,23,24,25,26,27,28,29,30,
                40,41,42,43,44,45,46,47,48,
                72,73,74,75,76,77,78,79,80,
                104,105,106,107,108,109,110,111,112],
    other_metals: [13,31,49,50,81,82,83, 113,114,115,116],
    metalloid: [5,14,32,33,51,52, 84],
    nonmetal: [1,6,7,8,15,16,34],
    halogen: [9,17,35,53,85, 117],
    noble_gas: [2,10,18,36,54,86, 118],
    lanthanide: [21,39,57,58,59,60,61,62,63,64,65,66,67,68,69,70, 71],
    actinide: [89, 90, 91,92,93,94,95,96,97,98,99,100,101,102,103]
};

const GROUP_COLORS = {
    alkali: "#ff7f00",
    alkaline_earth: "#facc15",
    transition: "#6b21a8",
    other_metals: "#FF7AE1",
    metalloid: "#BFBC00",
    nonmetal: "#FF0A00",
    halogen: "#22c55e",
    noble_gas: "#3b82f6",
    lanthanide: "#68BF00",
    actinide: "#67e8f9",
    unknown: "#ffffff"
};

const LEWIS_DATA = {
    "h2o": "H : O : H",
    "co2": "O = C = O",
    "nh3": "   H\nH : N : H",
    "ch4": "   H\nH : C : H\n   H"
};

const CHEM_JOURNEY = [
    {
        id: "particles",
        title: "Particles",
        subtitle: "Learn the building blocks of atoms",
        questions: 12,
        unlocked: true
    },

    {
        id: "atoms",
        title: "Atoms",
        subtitle: "Atomic number, mass, and structure",
        questions: 18,
        unlocked: false
    },

    {
        id: "molecules",
        title: "Molecules",
        subtitle: "Compounds and chemical formulae",
        questions: 20,
        unlocked: false
    },
]

const CHEM_QUESTIONS = {

    particles: [

        {
            question: "What particle has a positive charge?",
            correct: "Proton",
            answers: [
                "Proton",
                "Electron",
                "Neutron",
                "Photon"
            ]
        },

        // {
        //     question: "What particle has a negative charge?",
        //     correct: "Electron",
        //     answers: [
        //         "Proton",
        //         "Electron",
        //         "Neutron",
        //         "Nucleus"
        //     ]
        // },

        // {
        //     question: "What particle has no charge?",
        //     correct: "Neutron",
        //     answers: [
        //         "Electron",
        //         "Proton",
        //         "Neutron",
        //         "Ion"
        //     ]
        // },

        // {
        //     question: "Where are protons found?",
        //     correct: "Nucleus",
        //     answers: [
        //         "Electron Cloud",
        //         "Shell",
        //         "Nucleus",
        //         "Orbit"
        //     ]
        // },

        // {
        //     question: "Which particle determines atomic number?",
        //     correct: "Protons",
        //     answers: [
        //         "Electrons",
        //         "Neutrons",
        //         "Protons",
        //         "Photons"
        //     ]
        // },

        // {
        //     question: "Which particle is the smallest?",
        //     correct: "Electron",
        //     answers: [
        //         "Proton",
        //         "Electron",
        //         "Neutron",
        //         "Nucleus"
        //     ]
        // },

        // {
        //     question: "What charge does a neutron have?",
        //     correct: "Neutral",
        //     answers: [
        //         "Positive",
        //         "Negative",
        //         "Neutral",
        //         "Variable"
        //     ]
        // },

        // {
        //     question: "Atoms are mostly made of...",
        //     correct: "Empty space",
        //     answers: [
        //         "Solid matter",
        //         "Water",
        //         "Metal",
        //         "Empty space"
        //     ]
        // },

        // {
        //     question: "What is found inside the nucleus?",
        //     correct: "Protons and neutrons",
        //     answers: [
        //         "Electrons only",
        //         "Protons and neutrons",
        //         "Photons",
        //         "Electron shells"
        //     ]
        // },

        // {
        //     question: "Which particle moves around the nucleus?",
        //     correct: "Electron",
        //     answers: [
        //         "Proton",
        //         "Electron",
        //         "Neutron",
        //         "Nucleon"
        //     ]
        // },

        // {
        //     question: "What keeps electrons attracted to the nucleus?",
        //     correct: "Electromagnetic force",
        //     answers: [
        //         "Gravity",
        //         "Strong force",
        //         "Electromagnetic force",
        //         "Magnetism only"
        //     ]
        // },

        // {
        //     question: "Smallest unit of an element that retains its properties?",
        //     correct: "Atom",
        //     answers: [
        //         "Molecule",
        //         "Atom",
        //         "Electron",
        //         "Proton "
        //     ]
        // },
    ],

    atoms: [

        {
            question: "The smallest particles that make up elements are called?",
            correct: "Atoms",
            answers: [
                "Electrons",
                "Neutrons",
                "Molecules",
                "Atoms"
            ]
        },

    //     {
    //         question: "What is the center of an atom called?",
    //         correct: "Nucleus",
    //         answers: [
    //             "Electron Shell",
    //             "Nucleus",
    //             "Proton Cloud",
    //             "Core"
    //         ]
    //     },

    //     {
    //         question: "Which particle determines the element?",
    //         correct: "Protons",
    //         answers: [
    //             "Electrons",
    //             "Neutrons",
    //             "Protons",
    //             "Ions"
    //         ]
    //     },

    //     {
    //         question: "Atoms with different neutron counts are called?",
    //         correct: "Isotopes",
    //         answers: [
    //             "Compound",
    //             "Ions",
    //             "Molecules",
    //             "Isotopes"
    //         ]
    //     },

    //     {
    //         question: "What is the atomic number?",
    //         correct: "Number of protons",
    //         answers: [
    //             "Number of neutrons",
    //             "Number of protons",
    //             "Atomic mass",
    //             "Electron charge"
    //         ]
    //     },

    //     {
    //         question: "What charge does a neutral atom have?",
    //         correct: "No net charge",
    //         answers: [
    //             "Positive",
    //             "Negative",
    //             "No net charge",
    //             "Variable"
    //         ]
    //     },

    //     {
    //         question: "What happens when an atom gains electrons?",
    //         correct: "It becomes negative",
    //         answers: [
    //             "It becomes neutral",
    //             "It becomes positive",
    //             "It becomes unstable",
    //             "It becomes negative"
    //         ]
    //     },

    //     {
    //         question: "What happens when an atom loses electrons?",
    //         correct: "It becomes positive",
    //         answers: [
    //             "It becomes negative",
    //             "It becomes positive",
    //             "It becomes neutral",
    //             "It becomes heavier"
    //         ]
    //     },

    //     {
    //         question: "What is an element's mass number?",
    //         correct: "Protons plus neutrons",
    //         answers: [
    //             "Electrons plus protons",
    //             "Protons only",
    //             "Protons plus neutrons",
    //             "Neutrons only"
    //         ]
    //     },

    //     {
    //         question: "Which particles are found in the nucleus?",
    //         correct: "Protons and neutrons",
    //         answers: [
    //             "Electrons and protons",
    //             "Electrons only",
    //             "Neutrons and electrons",
    //             "Protons and neutrons"
    //         ]
    //     },

    //     {
    //         question: "What is a charged atom called",
    //         correct: "Ion",
    //         answers: [
    //             "Molecule",
    //             "Ion",
    //             "Compound",
    //             "Isotope"
    //         ]
    //     },

    //     {
    //         question: "Most of an atom's mass is located where?",
    //         correct: "Nucleus",
    //         answers: [
    //             "Photons",
    //             "Nucleus",
    //             "Electrons",
    //             "Atoms don't have mass"
    //         ]
    //     },

    //     {
    //         question: "About how many different kinds of atoms are there?",
    //         correct: "Over 100",
    //         answers: [
    //             "Less than 20",
    //             "No more than 50",
    //             "Over 100",
    //             "Over 500"
    //         ]
    //     },

    //     {
    //         question: "What is the most abundant type of atom in the universe?",
    //         correct: "Hydrogen",
    //         answers: [
    //             "Helium",
    //             "Hydrogen",
    //             "Neon",
    //             "Iron"
    //         ]
    //     },

    //     {
    //         question: "Atoms bond together to form?",
    //         correct: "Molecules",
    //         answers: [
    //             "Neutrons",
    //             "Protons",
    //             "Molecules",
    //             "Nuclei"
    //         ]
    //     },
    // ],
    ],

    molecules: [

        {
            question: "Molecules are made of what?",
            correct: "Atoms",
            answers: [
                "Protons",
                "Atoms",
                "Oxygen",
                "Neutrons"
            ]
        },

        {
            question: "What shape is a molecule?",
            correct: "Molecules have many shapes and sizes",
            answers: [
                "Molecules have no shape",
                "Molecules look like squares",
                "Molecules look like triangles",
                "Molecules have many shapes and sizes"
            ]
        },

        {
            question: "What is it called when a molecule breaks down into its component atom(s)?",
            correct: "Decomposition reaction",
            answers: [
                "Decay",
                "Heat transfer",
                "Loss state",
                "Decomposition reaction"
            ]
        },

        {
            question: "Who proposed that all matter is made of tiny building blocks called atoms?",
            correct: "John Dalton",
            answers: [
                "John Dalton",
                "Albert Einstein",
                "Isaac Newton",
                "Marie Curie"
            ]
        },
    ]
};