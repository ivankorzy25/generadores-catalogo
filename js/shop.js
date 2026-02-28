
(function() {
  "use strict";

  var TABS = [
    {id:'hogar', label:'🏠 Hogar'},
    {id:'country', label:'🏘 Country'},
    {id:'pileta', label:'🏊 Pileta'},
    {id:'comercio', label:'🏪 Comercio'},
    {id:'industria', label:'⚙ Industria'},
    {id:'campo', label:'🌾 Campo'},
    {id:'obra', label:'🚧 Obra'}
  ];

  var FS_PRESETS = [
    {label:'Depto',val:70},
    {label:'Casa chica',val:60},
    {label:'Casa media',val:50},
    {label:'Country',val:45},
    {label:'Comercio',val:35},
    {label:'Industria',val:60}
  ];

  var FUEL_OPTS = [
    {id:'todos',label:'Todos'},
    {id:'gas',label:'🔥 Gas'},
    {id:'diesel',label:'⛽ Diesel'},
    {id:'nafta',label:'⛽ Nafta'}
  ];

  var APP = {
    hogar: [
      {id:'heladera',n:'Heladera c/ Freezer',ic:'❄️',w:250,ws:800,t:0},
      {id:'freezer',n:'Freezer',ic:'❄️',w:200,ws:600,t:0},
      {id:'aire_3500',n:'Split 3500 fg (dormitorio)',ic:'☁️',w:1300,ws:3900,t:0},
      {id:'aire_4500',n:'Split 4500 fg (living med.)',ic:'☁️',w:1800,ws:5400,t:0},
      {id:'aire_6000',n:'Split 6000 fg (living grande)',ic:'☁️',w:2400,ws:7200,t:0},
      {id:'microondas',n:'Microondas',ic:'⚡',w:1200,ws:1500,t:0},
      {id:'horno_elec',n:'Horno Eléctrico',ic:'⚡',w:3000,ws:3000,t:0},
      {id:'anafe_vitro',n:'Anafe Vitrocerámica 4h',ic:'⚡',w:7000,ws:7000,t:0},
      {id:'lavarropas',n:'Lavarropas Automático',ic:'⚡',w:500,ws:1500,t:0},
      {id:'secarropas',n:'Secarropas',ic:'⚡',w:2500,ws:3000,t:0},
      {id:'lavavajillas',n:'Lavavajillas',ic:'⚡',w:1800,ws:2200,t:0},
      {id:'termotanque80',n:'Termotanque Eléctrico 80L',ic:'⚡',w:1500,ws:1500,t:0},
      {id:'bomba_1hp',n:'Bomba Presurizadora 1HP',ic:'💧',w:750,ws:2250,t:0},
      {id:'ilum_casa',n:'Iluminación LED (casa)',ic:'💡',w:300,ws:300,t:0},
      {id:'tv_led',n:'TV LED 55"',ic:'📺',w:120,ws:120,t:0},
      {id:'pc',n:'PC + Monitor',ic:'💻',w:350,ws:400,t:0},
      {id:'calefactor',n:'Calefactor Eléctrico',ic:'☀️',w:2000,ws:2000,t:0},
      {id:'router',n:'Router WiFi + Mesh',ic:'🌐',w:30,ws:30,t:0}
    ],
    country: [
      {id:'ac_central_10',n:'A/C Central 10 TR',ic:'❄️',w:12000,ws:36000,t:1},
      {id:'ac_central_15',n:'A/C Central 15 TR',ic:'❄️',w:18000,ws:54000,t:1},
      {id:'split_9000',n:'Split 9000 fg (salón)',ic:'☁️',w:3500,ws:10500,t:0},
      {id:'piso_radiante',n:'Piso Radiante (bomba)',ic:'☀️',w:2000,ws:6000,t:0},
      {id:'ascensor',n:'Ascensor Residencial',ic:'⬆️',w:5000,ws:15000,t:1},
      {id:'jacuzzi',n:'Jacuzzi / Hidromasaje',ic:'🛁',w:4000,ws:12000,t:0},
      {id:'sauna',n:'Sauna Eléctrico',ic:'♨️',w:6000,ws:6000,t:1},
      {id:'sala_vapor',n:'Sala de Vapor',ic:'♨️',w:6000,ws:6000,t:1},
      {id:'bodega',n:'Bodega Climatizada',ic:'🍷',w:1000,ws:3000,t:0},
      {id:'porton_x2',n:'Portón Eléctrico (x2)',ic:'🚪',w:800,ws:2400,t:0},
      {id:'home_theater',n:'Home Theater Completo',ic:'🎬',w:1000,ws:1000,t:0},
      {id:'cctv_16',n:'CCTV 16 Cámaras + NVR',ic:'📷',w:300,ws:300,t:0},
      {id:'alarma',n:'Alarma Perimetral',ic:'🔔',w:150,ws:150,t:0},
      {id:'domotica',n:'Domótica / Automatización',ic:'🏠',w:200,ws:200,t:0},
      {id:'ups',n:'UPS Sistemas Críticos',ic:'⚡',w:1000,ws:1000,t:0},
      {id:'ilum_country',n:'Iluminación Total (400m²)',ic:'💡',w:2500,ws:2500,t:0},
      {id:'ilum_jardin',n:'Iluminación Jardín/Exterior',ic:'💡',w:1000,ws:1000,t:0},
      {id:'bomba_2hp',n:'Bomba Presurizadora 2HP',ic:'💧',w:1500,ws:4500,t:0},
      {id:'bomba_3hp',n:'Bomba Presurizadora 3HP',ic:'💧',w:2200,ws:6600,t:1},
      {id:'bomba_pozo_3hp',n:'Bomba Sumergible Pozo 3HP',ic:'💧',w:2200,ws:6600,t:1},
      {id:'riego_auto',n:'Riego Automático Jardín',ic:'🌿',w:1000,ws:3000,t:0},
      {id:'termotanque200',n:'Termotanque 200L',ic:'⚡',w:4000,ws:4000,t:0},
      {id:'calefon_inst',n:'Calefón Instantáneo',ic:'⚡',w:10000,ws:10000,t:1},
      {id:'cargador_ev2',n:'Cargador EV Nivel 2',ic:'🔌',w:7400,ws:7400,t:1},
      {id:'horno_emp',n:'Horno Empotrado Premium',ic:'⚡',w:4000,ws:4000,t:0},
      {id:'anafe_induc',n:'Anafe Inducción 4 zonas',ic:'⚡',w:7400,ws:7400,t:1},
      {id:'heladera_ss',n:'Heladera Side-by-Side',ic:'❄️',w:350,ws:1200,t:0},
      {id:'quincho_full',n:'Quincho (heladera+extractor)',ic:'🍖',w:500,ws:1200,t:0}
    ],
    pileta: [
      {id:'bomba_fil_1hp',n:'Bomba Filtrado 1HP',ic:'💧',w:750,ws:2250,t:0},
      {id:'bomba_fil_2hp',n:'Bomba Filtrado 2HP',ic:'💧',w:1500,ws:4500,t:0},
      {id:'bomba_fil_3hp',n:'Bomba Filtrado 3HP',ic:'💧',w:2200,ws:6600,t:1},
      {id:'heat_pump_30',n:'Bomba Calor 30.000 BTU',ic:'☀️',w:2500,ws:7500,t:0},
      {id:'heat_pump_60',n:'Bomba Calor 60.000 BTU',ic:'☀️',w:4500,ws:13500,t:1},
      {id:'heat_pump_100',n:'Bomba Calor 100.000 BTU',ic:'☀️',w:7500,ws:22500,t:1},
      {id:'calentador_pil',n:'Calentador Eléctrico Pileta',ic:'☀️',w:12000,ws:12000,t:1},
      {id:'bomba_cascada',n:'Bomba Cascada / Jets',ic:'💧',w:2000,ws:6000,t:0},
      {id:'clorinador',n:'Clorinador Salino',ic:'⚡',w:200,ws:200,t:0},
      {id:'ilum_pileta',n:'Iluminación Subacuática',ic:'💡',w:200,ws:200,t:0}
    ],
    comercio: [
      {id:'vitrina_fria',n:'Vitrina Refrigerada',ic:'❄️',w:500,ws:1500,t:0},
      {id:'camara_frio',n:'Cámara Frigorífica',ic:'❄️',w:2000,ws:6000,t:0},
      {id:'aire_central_com',n:'A/C Central Comercial',ic:'☁️',w:5000,ws:15000,t:1},
      {id:'ilum_comercio',n:'Iluminación Comercio',ic:'💡',w:1500,ws:1500,t:0},
      {id:'caja_reg',n:'Caja Registradora/POS',ic:'💻',w:150,ws:200,t:0},
      {id:'servidor',n:'Servidor + UPS',ic:'💻',w:800,ws:1000,t:0},
      {id:'camaras_seg',n:'CCTV 8 Cámaras',ic:'📷',w:200,ws:200,t:0},
      {id:'porton_com',n:'Portón Eléctrico',ic:'🚪',w:500,ws:1500,t:0},
      {id:'bomba_com',n:'Bomba 2HP',ic:'💧',w:1500,ws:4500,t:0},
      {id:'cafe_ind',n:'Cafetera Industrial',ic:'☕',w:3000,ws:3500,t:0}
    ],
    industria: [
      {id:'motor_5hp',n:'Motor Eléctrico 5HP',ic:'⚙️',w:3700,ws:11100,t:1},
      {id:'motor_10hp',n:'Motor Eléctrico 10HP',ic:'⚙️',w:7500,ws:22500,t:1},
      {id:'motor_25hp',n:'Motor Eléctrico 25HP',ic:'⚙️',w:18500,ws:55500,t:1},
      {id:'compresor_ind',n:'Compresor Industrial',ic:'⚙️',w:5500,ws:16500,t:1},
      {id:'soldadora',n:'Soldadora Eléctrica',ic:'⚡',w:8000,ws:10000,t:0},
      {id:'torno',n:'Torno CNC',ic:'⚙️',w:5000,ws:8000,t:1},
      {id:'ilum_nave',n:'Iluminación Nave',ic:'💡',w:3000,ws:3000,t:0},
      {id:'grua',n:'Puente Grúa 5T',ic:'⚙️',w:15000,ws:45000,t:1},
      {id:'bomba_ind',n:'Bomba Industrial 5HP',ic:'💧',w:3700,ws:11100,t:1},
      {id:'sierra_ind',n:'Sierra Circular Industrial',ic:'⚙️',w:3000,ws:6000,t:1}
    ],
    campo: [
      {id:'bomba_riego',n:'Bomba Riego 3HP',ic:'💧',w:2200,ws:6600,t:1},
      {id:'ordenadora',n:'Ordeñadora',ic:'⚙️',w:1500,ws:3000,t:0},
      {id:'tanque_frio',n:'Tanque Frío (leche)',ic:'❄️',w:3000,ws:8000,t:1},
      {id:'ilum_galpon',n:'Iluminación Galpón',ic:'💡',w:1500,ws:1500,t:0},
      {id:'electrificador',n:'Electrificador Cercos',ic:'⚡',w:50,ws:50,t:0},
      {id:'molino',n:'Molino / Trituradora',ic:'⚙️',w:5000,ws:15000,t:1},
      {id:'casa_campo',n:'Casa de Campo (básico)',ic:'⚡',w:2000,ws:3000,t:0},
      {id:'bomba_sum',n:'Bomba Sumergible Pozo',ic:'💧',w:1500,ws:4500,t:0}
    ],
    obra: [
      {id:'hormigonera',n:'Hormigonera',ic:'⚙️',w:1500,ws:4500,t:0},
      {id:'amoladora',n:'Amoladora Grande',ic:'⚙️',w:2200,ws:4000,t:0},
      {id:'taladro',n:'Rotomartillo',ic:'⚙️',w:1200,ws:2400,t:0},
      {id:'sierra_obra',n:'Sierra Circular',ic:'⚙️',w:1800,ws:3600,t:0},
      {id:'vibrador',n:'Vibrador Hormigón',ic:'⚙️',w:2000,ws:4000,t:0},
      {id:'ilum_obra',n:'Torres Iluminación',ic:'💡',w:4000,ws:4000,t:0},
      {id:'compresor_obra',n:'Compresor de Obra',ic:'⚙️',w:3000,ws:9000,t:0},
      {id:'guinche',n:'Guinche Eléctrico',ic:'⚙️',w:2000,ws:6000,t:0}
    ]
  };

  var GENS = [
    {c:'10604',n:'GI1000 Silent',kva:1,f:'nafta',a:0,s:1,t:0,b:'Logus',p:347,r:'logus-gi1000-silent'},
    {c:'10600',n:'GI2000 Silent',kva:2,f:'nafta',a:0,s:1,t:0,b:'Logus',p:430,r:'logus-gi2000-silent'},
    {c:'10601',n:'GI4500 Silent',kva:4.5,f:'nafta',a:0,s:1,t:0,b:'Logus',p:740,r:'logus-gi4500-silent'},
    {c:'10602',n:'GI5500 Silent',kva:5.5,f:'nafta',a:0,s:1,t:0,b:'Logus',p:993,r:'logus-gi5500-silent'},
    {c:'GL3300',n:'GL3300AM',kva:3.3,f:'nafta',a:0,s:0,t:0,b:'Logus',p:241,r:'logus-gl3300am'},
    {c:'10090',n:'GL3300E',kva:3.3,f:'nafta',a:1,s:0,t:0,b:'Logus',p:293,r:'logus-gl3300e'},
    {c:'GL5500EP',n:'GL5500E Premium',kva:5.5,f:'nafta',a:1,s:0,t:0,b:'Logus',p:665,r:'logus-gl5500e-premium'},
    {c:'10082',n:'GL8500E Premium',kva:8.5,f:'nafta',a:1,s:0,t:0,b:'Logus',p:757,r:'logus-gl8500e-premium'},
    {c:'10197',n:'GL8500E3 Premium',kva:8.5,f:'nafta',a:1,s:0,t:1,b:'Logus',p:796,r:'logus-gl8500e3-premium'},
    {c:'10085',n:'GL12E',kva:12,f:'nafta',a:1,s:0,t:0,b:'Logus',p:2087,r:'logus-gl12e'},
    {c:'10086',n:'GL12E3',kva:12,f:'nafta',a:1,s:0,t:1,b:'Logus',p:2139,r:'logus-gl12e3'},
    {c:'10300',n:'PRAMAC GA8000',kva:8,f:'gas',a:1,s:1,t:0,b:'Pramac',p:5500,r:'pramac-ga8000'},
    {c:'10312',n:'Pramac GA10000',kva:10,f:'gas',a:1,s:1,t:0,b:'Pramac',p:6063,r:'pramac-ga10000'},
    {c:'10301',n:'Pramac GA13000',kva:13,f:'gas',a:1,s:1,t:0,b:'Pramac',p:7500,r:'pramac-ga13000'},
    {c:'10302',n:'Pramac GA20000',kva:20,f:'gas',a:1,s:1,t:1,b:'Pramac',p:9375,r:'pramac-ga20000'},
    {c:'10313',n:'Pramac GL027',kva:27,f:'gas',a:1,s:1,t:1,b:'Pramac',p:20200,r:'pramac-gl027'},
    {c:'10303',n:'Pramac GGW035',kva:35,f:'gas',a:1,s:1,t:1,b:'Pramac',p:30562,r:'pramac-ggw035'},
    {c:'10304',n:'Pramac GGW050',kva:50,f:'gas',a:1,s:1,t:1,b:'Pramac',p:35337,r:'pramac-ggw050'},
    {c:'10311',n:'Pramac GGW070',kva:70,f:'gas',a:1,s:1,t:1,b:'Pramac',p:40269,r:'pramac-ggw070'},
    {c:'10309',n:'Pramac GGW080',kva:80,f:'gas',a:1,s:1,t:1,b:'Pramac',p:40569,r:'pramac-ggw080'},
    {c:'10306',n:'Pramac GGW100G',kva:100,f:'gas',a:1,s:1,t:1,b:'Pramac',p:42989,r:'pramac-ggw100g'},
    {c:'10672',n:'GLG8000EM',kva:8,f:'gas',a:1,s:0,t:0,b:'Logus',p:3999,r:'glg8000em'},
    {c:'10650',n:'GLT9500E',kva:9.5,f:'nafta',a:1,s:0,t:0,b:'Logus',p:2299,r:'glt9500e'},
    {c:'10673',n:'GLG13000EM',kva:13,f:'gas',a:1,s:0,t:0,b:'Logus',p:5900,r:'glg13000em'},
    {c:'10670',n:'GLG20000EM',kva:20,f:'gas',a:1,s:0,t:0,b:'Logus',p:6787,r:'glg20000em'},
    {c:'10115',n:'KDE6500T Silent',kva:5.5,f:'diesel',a:0,s:1,t:0,b:'Kipor',p:1530,r:'kipor-kde6500t-silent'},
    {c:'10087',n:'GLD9500ED',kva:7.5,f:'diesel',a:1,s:0,t:0,b:'Logus',p:1957,r:'logus-gld9500ed-dual'},
    {c:'10117',n:'KDE12EAF',kva:10,f:'diesel',a:1,s:0,t:0,b:'Kipor',p:3965,r:'kipor-kde12eaf'},
    {c:'10119',n:'KDE12STAF Silent',kva:10,f:'diesel',a:1,s:1,t:0,b:'Kipor',p:5426,r:'kipor-kde12staf-silent'},
    {c:'10123',n:'KDE19STA Silent',kva:15,f:'diesel',a:1,s:1,t:0,b:'Kipor',p:7970,r:'kipor-kde19sta-silent'},
    {c:'10124',n:'KDE20SS3 Ultra Silent',kva:16.5,f:'diesel',a:1,s:1,t:1,b:'Kipor',p:7970,r:'kde20ss3-ultra-silent'},
    {c:'10125',n:'KDE30SS3 Ultra Silent',kva:24,f:'diesel',a:1,s:1,t:1,b:'Kipor',p:11861,r:'kde30ss3-ultra-silent'},
    {c:'10500',n:'LOGUS 21BR Silent',kva:21,f:'diesel',a:1,s:1,t:1,b:'Logus',p:7717,r:'logus-21br'},
    {c:'10501',n:'LOGUS 41BR Silent',kva:41,f:'diesel',a:1,s:1,t:1,b:'Logus',p:10870,r:'logus-41br'},
    {c:'10502',n:'LOGUS 69BR Silent',kva:69,f:'diesel',a:1,s:1,t:1,b:'Logus',p:12228,r:'logus-69br'},
    {c:'10503',n:'LOGUS 100BR Silent',kva:100,f:'diesel',a:1,s:1,t:1,b:'Logus',p:14266,r:'logus-100br'},
    {c:'10504',n:'LOGUS 125BR Silent',kva:125,f:'diesel',a:1,s:1,t:1,b:'Logus',p:16712,r:'logus-125br'},
    {c:'10505',n:'LOGUS 165BR Silent',kva:165,f:'diesel',a:1,s:1,t:1,b:'Logus',p:18342,r:'logus-165br'},
    {c:'10506',n:'LOGUS 200BR Silent',kva:200,f:'diesel',a:1,s:1,t:1,b:'Logus',p:21332,r:'logus-200br'},
    {c:'10507',n:'LOGUS 450BR Silent',kva:450,f:'diesel',a:1,s:1,t:1,b:'Logus',p:47554,r:'logus-450br'},
    {c:'10233',n:'YNS42S',kva:42,f:'diesel',a:1,s:1,t:1,b:'Cummins',p:12969,r:'yns42s'},
    {c:'10234',n:'YNS65S',kva:65,f:'diesel',a:1,s:1,t:1,b:'Cummins',p:14699,r:'yns65s'},
    {c:'10235',n:'YNS88S',kva:88,f:'diesel',a:1,s:1,t:1,b:'Cummins',p:15193,r:'yns88s'},
    {c:'10237',n:'YNS110S',kva:110,f:'diesel',a:1,s:1,t:1,b:'Cummins',p:17045,r:'yns110s'},
    {c:'10239',n:'YNS170S',kva:170,f:'diesel',a:1,s:1,t:1,b:'Cummins',p:23468,r:'yns170s'},
    {c:'10241',n:'YNS200S',kva:200,f:'diesel',a:1,s:1,t:1,b:'Cummins',p:27162,r:'yns200s'},
    {c:'10242',n:'YNS275S',kva:275,f:'diesel',a:1,s:1,t:1,b:'Cummins',p:36438,r:'yns275s'},
    {c:'10243',n:'YNS350S',kva:350,f:'diesel',a:1,s:1,t:1,b:'Cummins',p:42614,r:'yns350s'},
    {c:'10141',n:'CS200A',kva:200,f:'diesel',a:1,s:0,t:1,b:'Cummins',p:26411,r:'cs200a'},
    {c:'10142',n:'CS200S',kva:200,f:'diesel',a:1,s:1,t:1,b:'Cummins',p:28707,r:'cs200s'},
    {c:'10143',n:'CS275A',kva:275,f:'diesel',a:1,s:0,t:1,b:'Cummins',p:32720,r:'cs275a'},
    {c:'101723',n:'CS360A',kva:360,f:'diesel',a:1,s:0,t:1,b:'Cummins',p:40746,r:'cs360a'},
    {c:'10174',n:'CS375S',kva:375,f:'diesel',a:1,s:1,t:1,b:'Cummins',p:49389,r:'cs375s'},
    {c:'101724',n:'CS450A',kva:450,f:'diesel',a:1,s:0,t:1,b:'Cummins',p:56550,r:'cs450a'},
    {c:'101441',n:'CS450S',kva:450,f:'diesel',a:1,s:1,t:1,b:'Cummins',p:63588,r:'cs450s'},
    {c:'101725',n:'CS550A',kva:550,f:'diesel',a:1,s:0,t:1,b:'Cummins',p:67430,r:'cs550a'},
    {c:'10172',n:'CS550S',kva:550,f:'diesel',a:1,s:1,t:1,b:'Cummins',p:76552,r:'cs550s'},
    {c:'101721',n:'CS650S',kva:650,f:'diesel',a:1,s:1,t:1,b:'Cummins',p:85000,r:'cs650s'}
  ];

  // State
  var sel = {};       // selected items {id: qty}
  var curTab = 'hogar';
  var curFuel = 'todos';
  var fs = 0.50;

  // DOM refs
  var $tabs, $grid, $kva, $phase, $meter, $wStat, $wsStat;
  var $fsTip, $fsVal, $fsRange, $selList, $results, $resNote, $recs;

  function $(id) { return document.getElementById(id); }

  function fmt(n) {
    return n.toLocaleString('es-AR');
  }

  function init() {
    $tabs = $('kc-tabs');
    $grid = $('kc-grid');
    $kva = $('kc-kva');
    $phase = $('kc-phase');
    $meter = $('kc-meter');
    $wStat = $('kc-w');
    $wsStat = $('kc-ws');
    $fsVal = $('kc-fs-val');
    $fsRange = $('kc-fs-range');
    $fsTip = $('kc-fs-tip');
    $selList = $('kc-sel-list');
    $results = $('kc-results');
    $resNote = $('kc-res-note');
    $recs = $('kc-recs');

    if (!$tabs || !$grid) {
      console.error('KOR Calc: DOM elements not found');
      return;
    }

    buildTabs();
    buildPresets();
    buildFilters();
    $fsRange.addEventListener('input', onFsChange);
    $('kc-go-btn').addEventListener('click', showResults);
    renderGrid();
    updateSummary();
  }

  function buildTabs() {
    var h = '';
    for (var i = 0; i < TABS.length; i++) {
      var t = TABS[i];
      var cls = t.id === curTab ? ' active' : '';
      h += '<button class="kc-tab' + cls + '" data-tab="' + t.id + '">' + t.label + '</button>';
    }
    $tabs.innerHTML = h;
    $tabs.addEventListener('click', function(e) {
      var btn = e.target.closest('.kc-tab');
      if (!btn) return;
      curTab = btn.dataset.tab;
      var all = $tabs.querySelectorAll('.kc-tab');
      for (var i = 0; i < all.length; i++) all[i].classList.remove('active');
      btn.classList.add('active');
      renderGrid();
    });
  }

  function buildPresets() {
    var wrap = $('kc-presets');
    var h = '';
    for (var i = 0; i < FS_PRESETS.length; i++) {
      var p = FS_PRESETS[i];
      var cls = p.val === 50 ? ' act' : '';
      h += '<button class="kc-preset' + cls + '" data-val="' + p.val + '">' + p.label + '</button>';
    }
    wrap.innerHTML = h;
    wrap.addEventListener('click', function(e) {
      var btn = e.target.closest('.kc-preset');
      if (!btn) return;
      var v = parseInt(btn.dataset.val);
      $fsRange.value = v;
      fs = v / 100;
      $fsVal.textContent = fs.toFixed(2);
      var all = wrap.querySelectorAll('.kc-preset');
      for (var i = 0; i < all.length; i++) all[i].classList.remove('act');
      btn.classList.add('act');
      updateFsTip();
      updateSummary();
    });
  }

  function buildFilters() {
    var wrap = $('kc-filters');
    var h = '';
    for (var i = 0; i < FUEL_OPTS.length; i++) {
      var f = FUEL_OPTS[i];
      var cls = f.id === 'todos' ? ' act' : '';
      h += '<button class="kc-fbtn' + cls + '" data-fuel="' + f.id + '">' + f.label + '</button>';
    }
    wrap.innerHTML = h;
    wrap.addEventListener('click', function(e) {
      var btn = e.target.closest('.kc-fbtn');
      if (!btn) return;
      curFuel = btn.dataset.fuel;
      var all = wrap.querySelectorAll('.kc-fbtn');
      for (var i = 0; i < all.length; i++) all[i].classList.remove('act');
      btn.classList.add('act');
    });
  }

  function onFsChange() {
    fs = parseInt($fsRange.value) / 100;
    $fsVal.textContent = fs.toFixed(2);
    var all = $('kc-presets').querySelectorAll('.kc-preset');
    for (var i = 0; i < all.length; i++) all[i].classList.remove('act');
    updateFsTip();
    updateSummary();
  }

  function updateFsTip() {
    var v = parseInt($fsRange.value);
    var tips = {20:'Muy conservador',30:'Comercio grande',35:'Comercio',40:'Casa grande',45:'Country típico',50:'Casa media',55:'Casa media-chica',60:'Casa chica / Industria',65:'Depto mediano',70:'Depto chico',80:'Uso casi total',90:'Todo encendido'};
    var best = 50, diff = 100;
    var keys = Object.keys(tips);
    for (var i = 0; i < keys.length; i++) {
      var d = Math.abs(parseInt(keys[i]) - v);
      if (d < diff) { diff = d; best = keys[i]; }
    }
    $fsTip.textContent = tips[best] + ' — Factor: ' + fs.toFixed(2);
  }

  function renderGrid() {
    var items = APP[curTab] || [];
    if (!items.length) {
      $grid.innerHTML = '<div class="kc-empty"><div class="kc-empty-icon">🔌</div><div class="kc-empty-text">No hay equipos en esta categoría</div></div>';
      return;
    }
    var h = '';
    for (var i = 0; i < items.length; i++) {
      var a = items[i];
      var qty = sel[a.id] || 0;
      var cls = qty > 0 ? ' sel' : '';
      var ph = a.t ? '<span class="kc-phase tri">3Ø</span>' : '<span class="kc-phase mono">1Ø</span>';
      h += '<div class="kc-item' + cls + '" data-id="' + a.id + '">' +
        '<div class="kc-item-icon">' + a.ic + '</div>' +
        '<div class="kc-item-info"><div class="kc-item-name">' + a.n + ' ' + ph + '</div>' +
        '<div class="kc-item-watts">' + fmt(a.w) + ' W • arranque ' + fmt(a.ws) + ' W</div></div>' +
        '<div class="kc-qty">' +
        '<button class="kc-qty-btn" data-id="' + a.id + '" data-d="-1">−</button>' +
        '<span class="kc-qty-val">' + qty + '</span>' +
        '<button class="kc-qty-btn" data-id="' + a.id + '" data-d="1">+</button></div></div>';
    }
    $grid.innerHTML = h;
  }

  // Event delegation for grid clicks
  function onGridClick(e) {
    var qtyBtn = e.target.closest('.kc-qty-btn');
    if (qtyBtn) {
      e.stopPropagation();
      var id = qtyBtn.dataset.id;
      var d = parseInt(qtyBtn.dataset.d);
      var nv = Math.max(0, (sel[id] || 0) + d);
      if (nv === 0) delete sel[id]; else sel[id] = nv;
      renderGrid();
      updateSummary();
      return;
    }
    var item = e.target.closest('.kc-item');
    if (item) {
      var id = item.dataset.id;
      if (sel[id]) delete sel[id]; else sel[id] = 1;
      renderGrid();
      updateSummary();
    }
  }

  function getSelected() {
    var result = [];
    var allItems = [];
    var cats = Object.keys(APP);
    for (var c = 0; c < cats.length; c++) {
      var arr = APP[cats[c]];
      for (var j = 0; j < arr.length; j++) allItems.push(arr[j]);
    }
    var ids = Object.keys(sel);
    for (var i = 0; i < ids.length; i++) {
      for (var j = 0; j < allItems.length; j++) {
        if (allItems[j].id === ids[i]) {
          result.push({app: allItems[j], qty: sel[ids[i]]});
          break;
        }
      }
    }
    return result;
  }

  function calc() {
    var items = getSelected();
    var totalW = 0, maxSurge = 0, hasTri = false;
    for (var i = 0; i < items.length; i++) {
      var w = items[i].app.w * items[i].qty;
      var ws = items[i].app.ws * items[i].qty;
      totalW += w;
      var surge = ws - w;
      if (surge > maxSurge) maxSurge = surge;
      if (items[i].app.t) hasTri = true;
    }
    var simultW = totalW * fs;
    var withSurge = simultW + maxSurge;
    var margin = withSurge * 1.15;
    var kva = margin / 800;
    return {
      kva: Math.round(kva * 10) / 10,
      watts: totalW,
      surge: maxSurge,
      simultW: Math.round(simultW),
      tri: hasTri
    };
  }

  function updateSummary() {
    var c = calc();
    $kva.textContent = c.kva.toFixed(1);
    $wStat.textContent = (c.simultW / 1000).toFixed(1) + ' kW';
    $wsStat.textContent = (c.surge / 1000).toFixed(1) + ' kW';
    var pct = Math.min(100, (c.kva / 150) * 100);
    $meter.style.width = pct + '%';
    if (c.tri) {
      $phase.textContent = 'Requiere TRIFÁSICO (3Ø)';
      $phase.style.color = '#8e44ad';
    } else if (c.kva > 0) {
      $phase.textContent = 'Monofásico suficiente';
      $phase.style.color = '';
    } else {
      $phase.textContent = 'Seleccioná equipos';
      $phase.style.color = '';
    }

    var items = getSelected();
    var h = '';
    for (var i = 0; i < items.length; i++) {
      var a = items[i];
      h += '<div class="kc-sel-row"><span>' + a.app.ic + ' ' + a.app.n;
      if (a.qty > 1) h += ' x' + a.qty;
      h += '</span><span class="w">' + fmt(a.app.w * a.qty) + ' W</span></div>';
    }
    if (!items.length) {
      h = '<div style="text-align:center;color:rgba(255,255,255,0.25);font-size:11px;padding:10px;">Seleccioná equipos de la lista</div>';
    }
    $selList.innerHTML = h;
  }

  function showResults() {
    var c = calc();
    if (c.kva < 0.5) {
      alert('Seleccioná al menos un equipo.');
      return;
    }
    var needed = c.kva;
    var gens = [];
    for (var i = 0; i < GENS.length; i++) {
      var g = GENS[i];
      if (curFuel !== 'todos' && g.f !== curFuel) continue;
      if (c.tri && !g.t) continue;
      if (g.kva < needed * 0.6) continue;
      if (g.kva > needed * 6 && needed < 30) continue;

      var score = 0;
      var ratio = g.kva / needed;
      if (ratio >= 1.0 && ratio <= 1.3) score += 100;
      else if (ratio >= 0.85 && ratio <= 1.5) score += 80;
      else if (ratio >= 0.7 && ratio <= 2.0) score += 50;
      else score += 20;
      if (g.a) score += 15;
      if (g.s) score += 10;
      if (g.b === 'Pramac' || g.b === 'Cummins') score += 8;
      if (g.p > 0) score += 5;
      gens.push({gen: g, score: score, ratio: ratio});
    }
    gens.sort(function(a, b) {
      if (b.score !== a.score) return b.score - a.score;
      return Math.abs(a.ratio - 1.15) - Math.abs(b.ratio - 1.15);
    });
    var top = gens.slice(0, 5);

    // Note
    $resNote.innerHTML = '<strong>Potencia necesaria: ' + c.kva.toFixed(1) + ' kVA</strong> &mdash; ' +
      'Consumo nominal: ' + (c.watts / 1000).toFixed(1) + ' kW &times; Fs ' + fs.toFixed(2) +
      ' = ' + (c.simultW / 1000).toFixed(1) + ' kW simultáneo + ' +
      (c.surge / 1000).toFixed(1) + ' kW pico arranque + 15% margen.' +
      (c.tri ? ' <strong style="color:#8e44ad;">Requiere generador TRIFÁSICO.</strong>' : '');

    // Recommendations
    if (!top.length) {
      $recs.innerHTML = '<div style="text-align:center;padding:30px;color:#888;">No hay generadores que coincidan. Probá otro combustible.</div>';
    } else {
      var h = '';
      for (var j = 0; j < top.length; j++) {
        var g = top[j].gen;
        var best = j === 0 ? ' best' : '';
        var tags = '<span class="kc-tag kva">' + g.kva + ' kVA</span>';
        var fl = g.f === 'gas' ? 'Gas' : g.f === 'diesel' ? 'Diesel' : 'Nafta';
        tags += '<span class="kc-tag fuel">' + fl + '</span>';
        if (g.t) tags += '<span class="kc-tag tri">Trifásico</span>';
        if (g.a) tags += '<span class="kc-tag">Auto</span>';
        if (g.s) tags += '<span class="kc-tag">Silent</span>';
        h += '<div class="kc-rec' + best + '"><div class="kc-rec-rank">' + (j + 1) + '</div>' +
          '<div class="kc-rec-info"><h4>' + g.b + ' ' + g.n + '</h4><div class="kc-rec-tags">' + tags + '</div></div>' +
          '<div class="kc-rec-right"><div class="kc-rec-price">' + (g.p > 0 ? 'USD ' + fmt(g.p) : 'Consultar') + '</div>' +
          '<a href="/' + g.r + '" class="kc-rec-link">Ver ficha →</a></div></div>';
      }
      $recs.innerHTML = h;
    }

    $results.classList.add('show');
    $results.scrollIntoView({behavior: 'smooth', block: 'nearest'});
  }

  // Boot
  function boot() {
    try {
      init();
      // Use event delegation on grid (avoids re-attaching handlers)
      $grid.addEventListener('click', onGridClick);
    } catch (e) {
      console.error('KOR Calc init error:', e);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();




const korShop = {
  allProducts: [],
  filteredProducts: [],
  categories: {},
  currentPage: 1,
  perPage: 12,
  currentGroup: 'all',
  currentView: 3,
  priceMin: null,
  priceMax: null,
  searchQuery: '',

  init() {
    this.loadCategories();
    this.loadAllProducts();
    this.renderCategories();
    this.renderCategoryBar();
    this.applyFilters();

    // Search on Enter
    document.getElementById('kor-search-input').addEventListener('keyup', (e) => {
      if (e.key === 'Enter') this.search();
      if (e.target.value === '' && this.searchQuery !== '') {
        this.searchQuery = '';
        this.applyFilters();
      }
    });
  },

  loadCategories() {
    // Static: use embedded data instead of API
    this.categories = window.KOR_DATA.categories;
  },

  loadAllProducts() {
    // Static: use embedded data instead of API
    this.allProducts = window.KOR_DATA.products;

    // Update category counts
    this.allProducts.forEach(p => {
      Object.keys(this.categories).forEach(cat => {
        const catData = this.categories[cat];
        if (p.item_group === cat || catData.children.includes(p.item_group)) {
          catData.count++;
        }
      });
    });
  },

  loadPrices() {
    // Static: prices already embedded in product data
  },

  renderCategoryBar() {
    const bar = document.getElementById('kor-cat-bar');
    // Keep the "Todos" link
    const mainCats = Object.keys(this.categories).filter(c =>
      this.categories[c].count > 0
    ).sort();

    mainCats.forEach(cat => {
      const a = document.createElement('a');
      a.className = 'kor-cat-link';
      a.dataset.group = cat;
      a.textContent = cat;
      a.onclick = () => this.filterCategory(cat, a);
      bar.appendChild(a);
    });
  },

  renderCategories() {
    const container = document.getElementById('kor-categories-list');
    container.innerHTML = '';

    const sortedCats = Object.keys(this.categories)
      .filter(c => this.categories[c].count > 0)
      .sort();

    sortedCats.forEach(cat => {
      const catData = this.categories[cat];
      const group = document.createElement('div');
      group.className = 'kor-cat-group';

      const hasChildren = catData.children.length > 0;

      group.innerHTML = `
        <div class="kor-cat-parent ${this.currentGroup === cat ? 'active' : ''} ${hasChildren ? '' : ''}"
             onclick="korShop.toggleCategory('${cat}', this)">
          <span>${cat} <span class="kor-cat-count">${catData.count}</span></span>
          ${hasChildren ? '<span class="kor-cat-arrow">&#9660;</span>' : ''}
        </div>
        ${hasChildren ? `
          <div class="kor-cat-children" id="cat-children-${cat.replace(/\s/g, '_')}">
            ${catData.children.map(child => {
              const childCount = this.allProducts.filter(p => p.item_group === child).length;
              return childCount > 0 ? `
                <div class="kor-cat-child ${this.currentGroup === child ? 'active' : ''}"
                     onclick="korShop.filterCategory('${child}')">
                  <span>${child}</span>
                  <span class="kor-cat-count">${childCount}</span>
                </div>
              ` : '';
            }).join('')}
          </div>
        ` : ''}
      `;
      container.appendChild(group);
    });
  },

  toggleCategory(cat, el) {
    const childrenId = `cat-children-${cat.replace(/\s/g, '_')}`;
    const children = document.getElementById(childrenId);

    if (children) {
      children.classList.toggle('open');
      el.classList.toggle('open');
    }

    this.filterCategory(cat);
  },

  filterCategory(group, barEl) {
    this.currentGroup = group;
    this.currentPage = 1;

    // Update bar active state
    document.querySelectorAll('.kor-cat-link').forEach(l => l.classList.remove('active'));
    if (barEl) {
      barEl.classList.add('active');
    } else {
      const barLink = document.querySelector(`.kor-cat-link[data-group="${group}"]`);
      if (barLink) barLink.classList.add('active');
    }

    // Update sidebar active state
    document.querySelectorAll('.kor-cat-parent').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.kor-cat-child').forEach(c => c.classList.remove('active'));

    this.applyFilters();
    this.closeSidebar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return false;
  },

  clearFilters() {
    this.currentGroup = 'all';
    this.priceMin = null;
    this.priceMax = null;
    this.searchQuery = '';
    document.getElementById('kor-search-input').value = '';
    document.getElementById('kor-price-min').value = '';
    document.getElementById('kor-price-max').value = '';
    this.currentPage = 1;

    document.querySelectorAll('.kor-cat-link').forEach(l => l.classList.remove('active'));
    document.querySelector('.kor-cat-link[data-group="all"]').classList.add('active');

    this.applyFilters();
  },

  search() {
    this.searchQuery = document.getElementById('kor-search-input').value.trim().toLowerCase();
    this.currentPage = 1;
    this.applyFilters();
  },

  applyPriceFilter() {
    const min = document.getElementById('kor-price-min').value;
    const max = document.getElementById('kor-price-max').value;
    this.priceMin = min ? parseFloat(min) : null;
    this.priceMax = max ? parseFloat(max) : null;
    this.currentPage = 1;
    this.applyFilters();
  },

  applyFilters() {
    let products = [...this.allProducts];

    // Category filter
    if (this.currentGroup !== 'all') {
      const catData = this.categories[this.currentGroup];
      if (catData) {
        // Parent category - include children
        const validGroups = [this.currentGroup, ...catData.children];
        products = products.filter(p => validGroups.includes(p.item_group));
      } else {
        // Direct child category
        products = products.filter(p => p.item_group === this.currentGroup);
      }
    }

    // Search filter
    if (this.searchQuery) {
      products = products.filter(p =>
        p.web_item_name.toLowerCase().includes(this.searchQuery) ||
        (p.short_description || '').toLowerCase().includes(this.searchQuery) ||
        p.item_group.toLowerCase().includes(this.searchQuery) ||
        (p.item_code || '').toLowerCase().includes(this.searchQuery)
      );
    }

    // Price filter
    if (this.priceMin !== null) {
      products = products.filter(p => p.price >= this.priceMin);
    }
    if (this.priceMax !== null) {
      products = products.filter(p => p.price <= this.priceMax || p.price === 0);
    }

    this.filteredProducts = products;
    this.sort(false);
  },

  sort(fromEvent = true) {
    const sortBy = document.getElementById('kor-sort').value;

    switch(sortBy) {
      case 'name_asc':
        this.filteredProducts.sort((a, b) => a.web_item_name.localeCompare(b.web_item_name));
        break;
      case 'name_desc':
        this.filteredProducts.sort((a, b) => b.web_item_name.localeCompare(a.web_item_name));
        break;
      case 'price_asc':
        this.filteredProducts.sort((a, b) => (a.price || 99999999) - (b.price || 99999999));
        break;
      case 'price_desc':
        this.filteredProducts.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'newest':
        // Already sorted by modified desc from API
        break;
      default:
        // relevance - sort by ranking (highest first), then by price desc
        this.filteredProducts.sort((a, b) => {
          const rA = a.ranking || 0;
          const rB = b.ranking || 0;
          if (rA !== rB) return rB - rA;
          return (b.price || 0) - (a.price || 0);
        });
        break;
    }

    if (fromEvent) this.currentPage = 1;
    this.render();
  },

  render() {
    const grid = document.getElementById('kor-products-grid');
    const total = this.filteredProducts.length;
    const start = (this.currentPage - 1) * this.perPage;
    const pageItems = this.filteredProducts.slice(start, start + this.perPage);

    // Update count
    document.getElementById('kor-count').textContent = total;
    const filterLabel = document.getElementById('kor-active-filter');
    if (this.currentGroup !== 'all') {
      filterLabel.textContent = ` en "${this.currentGroup}"`;
    } else if (this.searchQuery) {
      filterLabel.textContent = ` para "${this.searchQuery}"`;
    } else {
      filterLabel.textContent = '';
    }

    if (pageItems.length === 0) {
      grid.innerHTML = `
        <div class="kor-no-results" style="grid-column:1/-1">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <h3>No se encontraron productos</h3>
          <p>Intenta con otra b&uacute;squeda o categor&iacute;a</p>
          <button class="kor-btn-detail" onclick="korShop.clearFilters()" style="margin-top:12px">
            Ver todos los productos
          </button>
        </div>`;
      document.getElementById('kor-pagination').innerHTML = '';
      return;
    }

    grid.innerHTML = pageItems.map(p => this.renderCard(p)).join('');
    this.renderPagination(total);
  },

  renderCard(product) {
    const imageUrl = product.website_image || 'img/placeholder.svg';
    const route = product.route || '#';
    const waMsg = encodeURIComponent(`Hola! Me interesa el producto: ${product.web_item_name}`);
    const priceHtml = product.formatted_price
      ? `<div class="kor-product-price">${product.formatted_price}</div>`
      : `<div class="kor-product-price" style="color:var(--kor-text-muted);font-size:14px;">Consultar precio</div>`;

    return `
      <div class="kor-product-card">
        <div class="kor-product-image-wrapper">
          <a href="/${route}">
            <img class="kor-product-image" src="${imageUrl}" alt="${product.web_item_name}"
                 loading="lazy" onerror="this.src='img/placeholder.svg'">
          </a>
        </div>
        <div class="kor-product-info">
          <div class="kor-product-group">${product.item_group}</div>
          <h3 class="kor-product-name">
            <a href="/${route}">${product.web_item_name}</a>
          </h3>
          ${product.short_description ? `<div class="kor-product-desc">${product.short_description}</div>` : ''}
          <div class="kor-product-bottom">
            <div>
              ${priceHtml}
            </div>
            <div class="kor-product-actions">
              <a href="/${route}" class="kor-btn-detail">Ver m&aacute;s</a>
              <a href="https://wa.me/5491139563099?text=${waMsg}" target="_blank" class="kor-btn-whatsapp" title="Consultar por WhatsApp">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderPagination(total) {
    const totalPages = Math.ceil(total / this.perPage);
    if (totalPages <= 1) {
      document.getElementById('kor-pagination').innerHTML = '';
      return;
    }

    let html = '';

    // Prev
    html += `<a class="kor-page-btn ${this.currentPage === 1 ? 'disabled' : ''}"
               onclick="korShop.goPage(${this.currentPage - 1})">&laquo; Anterior</a>`;

    // Page numbers
    const maxVisible = 7;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    if (startPage > 1) {
      html += `<a class="kor-page-btn" onclick="korShop.goPage(1)">1</a>`;
      if (startPage > 2) html += `<span style="padding:0 4px;color:var(--kor-text-muted)">...</span>`;
    }

    for (let i = startPage; i <= endPage; i++) {
      html += `<a class="kor-page-btn ${i === this.currentPage ? 'active' : ''}"
                 onclick="korShop.goPage(${i})">${i}</a>`;
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) html += `<span style="padding:0 4px;color:var(--kor-text-muted)">...</span>`;
      html += `<a class="kor-page-btn" onclick="korShop.goPage(${totalPages})">${totalPages}</a>`;
    }

    // Next
    html += `<a class="kor-page-btn ${this.currentPage === totalPages ? 'disabled' : ''}"
               onclick="korShop.goPage(${this.currentPage + 1})">Siguiente &raquo;</a>`;

    document.getElementById('kor-pagination').innerHTML = html;
  },

  goPage(page) {
    const totalPages = Math.ceil(this.filteredProducts.length / this.perPage);
    if (page < 1 || page > totalPages) return;
    this.currentPage = page;
    this.render();
    window.scrollTo({ top: 200, behavior: 'smooth' });
  },

  setView(cols, btn) {
    const grid = document.getElementById('kor-products-grid');
    grid.className = 'kor-products-grid';
    if (cols === 'list') {
      grid.classList.add('view-list');
    } else {
      grid.classList.add(`view-${cols}`);
    }
    this.currentView = cols;

    document.querySelectorAll('.kor-view-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  },

  openSidebar() {
    document.getElementById('kor-sidebar').classList.add('open');
    document.getElementById('kor-sidebar-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  },

  closeSidebar() {
    document.getElementById('kor-sidebar').classList.remove('open');
    document.getElementById('kor-sidebar-overlay').classList.remove('open');
    document.body.style.overflow = '';
  }
};

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  korShop.init();
});
