🛡️ API Security Pipeline (api-security-demo)
An automated security testing and validation pipeline designed to test Node.js/Express APIs for common security misconfigurations, vulnerability vectors, and rate-limiting enforcement.

📋 Table of Contents
About The Project

Target API Implementation (app.js)

Automated Security Scanner (scan.js)

Tech Stack & Dependencies

Project Structure

Getting Started

Prerequisites

Installation

Running the Application & Security Scan

Contributing

License

🎯 About The Project
The API-SECURITY-PIPELINE project demonstrates a secure Express.js target backend integrated with custom automated runtime validation. It actively verifies protections against critical API threat vectors such as Broken Object Level Authorization (BOLA / OWASP API1) and volumetric DDoS/abuse attacks via Rate Limiting.

⚙️ Target API Implementation (app.js)
The application serves a lightweight REST interface running on Express:

Health Check (GET /health): Confirms operational status.

Secured Resource Endpoint (GET /api/users/:id): Validates authentication headers (Bearer token-for-<id>) to prevent unauthorized BOLA exploits before returning confidential user records (Alice or Bob).

Global Rate Limiter: Enforces a strict cap of 100 requests per 15-minute window per IP using express-rate-limit.

🔍 Automated Security Scanner (scan.js)
The project includes an integrated script (scan.js) that performs automated functional security checks against the target API:

BOLA Assessment: Probes restricted endpoints (/api/users/101 and /api/users/102) without proper credentials to verify if unauthenticated access controls block unauthorized resource retrieval.

Rate Limiting Verification: Floods the /health endpoint past the threshold limit (100 requests) to test and confirm that the rate-limiting middleware appropriately returns HTTP 429 (Too Many Requests).

🛠️ Tech Stack & Dependencies
Runtime: Node.js (>= 18)

Framework: Express (^5.2.1)

Security & Utility Packages:

express-rate-limit (^8.6.2) – Mitigates brute-force and DDoS attempts.

jsonwebtoken (^9.0.3) – Handles JSON Web Token parsing and validation.

📂 Project Structure
Plaintext
API-SECURITY-PIPELINE/
├── app.js             # Main Express server and secure API routing logic
├── scan.js            # Automated security testing script (BOLA & Rate Limit checks)
├── package.json       # Dependency configurations and lock metadata
└── README.md          # Project documentation
🚀 Getting Started
Prerequisites
Node.js (v18 or higher)

npm (v6 or higher)

Installation
Clone the repository:

Bash
git clone https://github.com/lokeshVJ2002/API-SECURITY-PIPELINE-.git
cd API-SECURITY-PIPELINE-
Install dependencies:

Bash
npm install
🏃‍♂️ Running the Application & Security Scan
Step 1: Start the Target API
Open a terminal window and launch the Express server:

Bash
node app.js
(The server will run on http://localhost:3000)

Step 2: Run the Security Scanner
Open a second terminal window and execute the security validation script:

Bash
node scan.js
🤝 Contributing
Contributions, expanded vulnerability checks, and pull requests are welcome!

Fork the Project

Create your Feature Branch (git checkout -b feature/AdvancedScanner)

Commit your Changes (git commit -m 'Add support for additional OWASP top 10 checks')

Push to the Branch (git push origin feature/AdvancedScanner)

Open a Pull Request
