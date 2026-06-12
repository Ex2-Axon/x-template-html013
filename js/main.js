const chartColors = {
    accent: 'rgba(217, 119, 6, 0.8)',
    accentBorder: 'rgba(217, 119, 6, 1)',
    neutral: 'rgba(168, 162, 158, 0.5)',
    neutralBorder: 'rgba(168, 162, 158, 1)',
    dark: 'rgba(45, 42, 38, 0.8)',
    light: 'rgba(254, 243, 199, 0.8)'
};

Chart.defaults.font.family = "'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', sans-serif";
Chart.defaults.color = '#57534e';

const ctxRadar = document.getElementById('uiRadarChart').getContext('2d');
new Chart(ctxRadar, {
    type: 'radar',
    data: {
        labels: ['Personalization', '3D / Spatial Integration', 'Dynamic Generation', 'Performance/Speed', 'Sensory Feedback'],
        datasets: [
            {
                label: 'ปี ปัจจุบัน (Static)',
                data: [40, 10, 20, 60, 30],
                backgroundColor: chartColors.neutral,
                borderColor: chartColors.neutralBorder,
                borderWidth: 2,
                fill: true
            },
            {
                label: 'ปี 2030 (Generative)',
                data: [100, 95, 100, 95, 90],
                backgroundColor: 'rgba(217, 119, 6, 0.4)',
                borderColor: chartColors.accentBorder,
                borderWidth: 2,
                fill: true
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            r: {
                angleLines: { color: 'rgba(0,0,0,0.1)' },
                grid: { color: 'rgba(0,0,0,0.05)' },
                pointLabels: { font: { size: 11 } },
                ticks: { display: false, max: 100, min: 0 }
            }
        },
        plugins: {
            legend: { position: 'bottom' }
        }
    }
});

const ctxBar = document.getElementById('latencyChart').getContext('2d');
new Chart(ctxBar, {
    type: 'bar',
    data: {
        labels: ['Centralized Server (แบบเดิม)', 'Decentralized Edge (2030)'],
        datasets: [{
            label: 'ระยะเวลาตอบสนอง (ms)',
            data: [150, 5],
            backgroundColor: [chartColors.neutralBorder, chartColors.accent],
            borderRadius: 6
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        scales: {
            x: {
                beginAtZero: true,
                title: { display: true, text: 'มิลลิวินาที (ms)' }
            }
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return context.raw + ' ms';
                    }
                }
            }
        }
    }
});

const devRoleData = {
    '2024': [70, 10, 10, 10],
    '2030': [10, 40, 30, 20]
};

const ctxPie = document.getElementById('devRoleChart').getContext('2d');
let devChart = new Chart(ctxPie, {
    type: 'doughnut',
    data: {
        labels: ['เขียนโค้ด (Manual Coding)', 'ควบคุม AI (AI Training)', 'ออกแบบ UX (Strategist)', 'ความปลอดภัย (Security)'],
        datasets: [{
            data: devRoleData['2030'],
            backgroundColor: [
                chartColors.neutralBorder,
                chartColors.accent,
                chartColors.dark,
                '#65a30d'
            ],
            borderWidth: 2,
            borderColor: '#ffffff'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        plugins: {
            legend: { position: 'right' }
        }
    }
});

function updatePieChart(year) {
    devChart.data.datasets[0].data = devRoleData[year];
    devChart.update();
}

function switchUITab(tabName, btnElement) {
    document.querySelectorAll('.ui-content').forEach(el => el.classList.add('hidden'));

    const tabsContainer = document.getElementById('ui-tabs');
    tabsContainer.querySelectorAll('button').forEach(btn => {
        btn.classList.remove('tab-active');
        btn.classList.add('text-stone-500');
    });

    document.getElementById('tab-' + tabName).classList.remove('hidden');

    btnElement.classList.add('tab-active');
    btnElement.classList.remove('text-stone-500');
}

const paradigms = {
    web2: {
        title: "ระบบรวมศูนย์ดั้งเดิม (Centralized Web2)",
        desc: "ข้อมูลและอำนาจควบคุมทั้งหมดขึ้นอยู่กับผู้ให้บริการแพลตฟอร์มรายใหญ่ที่เป็นตัวกลาง",
        items: [
            { icon: "🔑", title: "ข้อมูลตัวตน (Identity)", detail: "เข้าสู่ระบบด้วยบัญชีโซเชียลมีเดีย ข้อมูลส่วนบุคคลถูกแอบสะกดรอยและนำไปแสวงหาผลประโยชน์ทางการโฆษณา" },
            { icon: "💾", title: "การเก็บรักษาข้อมูล (Storage)", detail: "ฝากไว้บน Cloud ขนาดใหญ่ที่รวมศูนย์ หากระบบล่ม ข้อมูลสูญหาย หรือผู้ให้บริการเปลี่ยนนโยบาย คุณจะไม่สามารถกู้คืนได้" },
            { icon: "🪙", title: "สินทรัพย์ดิจิทัล (Assets)", detail: "สิทธิ์การครอบครองจำกัดอยู่ภายใต้เงื่อนไขเซิร์ฟเวอร์ค่ายเกมหรือแพลตฟอร์ม ไม่สามารถโอนย้ายออกไปภายนอกได้" }
        ]
    },
    web3: {
        title: "สถาปัตยกรรมกระจายศูนย์ (Decentralized Web3 2030)",
        desc: "สิทธิ์ความเป็นส่วนตัวและเจ้าของกลับสู่ผู้ใช้จริง ทำงานร่วมกับความสามารถของ AI ประมวลผลท้องถิ่น",
        items: [
            { icon: "🛡️", title: "อธิปไตยดิจิทัลแห่งตน (SSI / DID)", detail: "เข้าสู่ระบบด้วยคีย์ส่วนตัว ควบคุมสิทธิ์การอนุญาตและพิสูจน์เอกสารตัวตน (Verifiable Credentials) โดยเปิดเผยข้อมูลเท่าที่จำเป็น" },
            { icon: "📦", title: "การเก็บข้อมูลระดับสากลไร้ตัวกลาง (IPFS / Arweave)", detail: "ไฟล์เว็บ โค้ด และสื่อต่างๆ ถูกทำสำเนาและให้บริการแบบกระจายไปทั่ว Edge Server ไม่มีใครสามารถปิดกั้นเนื้อหาได้" },
            { icon: "💎", title: "สิทธิ์ครอบครองถาวร (True Ownership)", detail: "ข้อมูล สิ่งประดิษฐ์ ดินแดน 3D และงานเขียนกลายเป็นกรรมสิทธิ์ดิจิทัลส่วนตัวของคุณ โอนย้ายข้ามทุกแพลตฟอร์มได้อย่างเสรี" }
        ]
    }
};

function toggleWebParadigm(type) {
    const contentDiv = document.getElementById('paradigm-content');
    const btnWeb2 = document.getElementById('btn-web2');
    const btnWeb3 = document.getElementById('btn-web3');

    if (type === 'web2') {
        btnWeb2.classList.remove('bg-stone-200', 'text-stone-700');
        btnWeb2.classList.add('bg-stone-800', 'text-white');
        btnWeb3.classList.remove('bg-accent', 'text-white');
        btnWeb3.classList.add('bg-stone-200', 'text-stone-700');
    } else {
        btnWeb3.classList.remove('bg-stone-200', 'text-stone-700');
        btnWeb3.classList.add('bg-accent', 'text-white');
        btnWeb2.classList.remove('bg-stone-800', 'text-white');
        btnWeb2.classList.add('bg-stone-200', 'text-stone-700');
    }

    const data = paradigms[type];
    let html = `
        <div class="border-b border-stone-200 pb-3 mb-2">
            <h4 class="font-bold text-accent text-md flex items-center">${type === 'web2' ? '&#x1F512;' : '&#x1F516;'} ${data.title}</h4>
            <p class="text-xs text-stone-600">${data.desc}</p>
        </div>
        <div class="space-y-3">
    `;

    data.items.forEach(item => {
        html += `
            <div class="flex items-start bg-stone-50 p-3 rounded-lg border border-stone-200/50 shadow-sm transition-all hover:translate-x-1">
                <span class="text-2xl mr-3">${item.icon}</span>
                <div>
                    <h5 class="font-bold text-xs text-stone-800">${item.title}</h5>
                    <p class="text-xs text-stone-500 leading-relaxed">${item.detail}</p>
                </div>
            </div>
        `;
    });

    html += `</div>`;
    contentDiv.innerHTML = html;
}

window.onload = function() {
    toggleWebParadigm('web3');
};
