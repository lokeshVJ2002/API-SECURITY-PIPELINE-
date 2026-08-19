const http = require('http');

const request = (path) => new Promise((resolve) => {
    http.get(`http://localhost:3000${path}`, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve({ status: res.statusCode, body: data }));
    }).on('error', () => resolve({ status: 500, body: '' }));
});

async function runScan() {
    console.log('=== STARTING AUTOMATED API SECURITY SCAN ===\n');

    console.log('[+] Testing for BOLA (Broken Object Level Authorization)...');
    const user101 = await request('/api/users/101');
    const user102 = await request('/api/users/102');
    
    if (user101.status === 200 && user102.status === 200) {
        console.log('  [!] VULNERABILITY FOUND: BOLA Detected!');
        console.log('      An unauthenticated user accessed private user records for 101 and 102.\n');
    }

    console.log('[+] Testing Rate Limiting Middleware...');
    let blocked = false;
    for (let i = 1; i <= 105; i++) {
        const res = await request('/health');
        if (res.status === 429) {
            blocked = true;
            console.log(`  [✓] SUCCESS: Rate limiter activated on request #${i} (HTTP 429 Too Many Requests)\n`);
            break;
        }
    }
    if (!blocked) {
        console.log('  [!] WARNING: Rate limiter did not trigger after 100+ requests.\n');
    }

    console.log('=== SCAN COMPLETE ===');
}

runScan();
