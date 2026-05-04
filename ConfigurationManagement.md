
# DEPLOY – FTPS IN GITHUB ACTIONS 

## 1.0 SUMMARY

## 2.0 ADMINISTRATION
### 2.1 CHANGE LOG


| Version  | Date          | Author     | Description                                                                      |                           
|----------|---------------|------------|----------------------------------------------------------------------------------|
| 1.0      | 04 MAY 2026   | Sarna, J.  | Initial Draft and Release to Production.                                         |                           

### 2.2 TABLE OF CONTENTS



- [1.0 SUMMARY](#10-summary)
- [2.0 ADMINISTRATION](#20-administration)
  - [2.1 CHANGE LOG](#21-change-log)
  - [2.2 TABLE OF CONTENTS](#22-table-of-contents)
- [3.0 AIM](#30-aim)
- [4.0 PRODUCTION](#40-production)
  - [4.1 PRE-REQ](#41-pre-req)
  - [4.2 Add workflow – .github/workflows/deploy.yaml](#42-add-workflow-github-workflows-deployyaml)
  - [4.3 VERIFICATION](#43-verification)
- [5.0 DEVELOPMENT](#50-development)
  - [5.1 ASSUMPTION](#51-assumption)
    - [5.1.1 OPERATING DEVELOPMENT ENVIRONMENT](#511-operating-development-environment)
  - [5.2 PLAN](#52-plan)
    - [5.2.1 .env.development.local USE](#521-envdevelopmentlocal-use)
    - [5.2.2 USE OF ‘PREDEV’ IN PACKAGE.JSON](#522-use-of-predev-in-packagejson)
  - [5.3 PLAN IMPLEMENTATION](#53-plan-implementation)
- [6.0 CONCLUSION](#60-conclusion)



## 3.0 AIM: 
A) PRODUCTION: On a push to a repo in github, run ‘npm run build’, create a ftps connection to fastcomet and run replace the build folder. For verification purposes, upgrade the build version.

B) DEVELOPMENT: When running npm run dev command, the localhost version should also show the current build version

## 4.0 PRODUCTION

### 4.1 PRE-REQ: 
a) Your pipeline should have the capability to write to the repository:
For your Organisation, select your repository. Under "Repository → Settings → Actions → General → Workflow permissions", setup "Read and write permissions" by enabling it.

 
Secret Name	Definition	Value
GH_ACTIONS_TOKEN	Used to connect to your repository	<your secret>

b) ftps setup
Add Secret variables to github actions for ftps operation required by fastcomet:


|SECRET NAME        |DEFINITION                                                 | VALUE                                        |
|-------------------|-----------------------------------------------------------|----------------------------------------------|
|SFTP_HOST          | Your FastComet server hostname (e.g., s1.fastcomet.com)   |	au2.fcomet.com                             |
|SFTP_USER          | your cPanel username                                      |	systema1                                   |
|SFTP_PRIVATE_KEY   | private key to access fastcomet - Id_ed25519              |	Navigate to C:\Users\moose\.ssh            |
|SFTP_PORT          | Sftp port                                                 |   22                                         |
|SFTP_TARGET        | path to your public_html folder (see below)               |	home/systema1/webstore-production/webstore |




c) Preparation for Verification
i) Do not create a variable in your .env files for REACT_APP_BUILD_NUMBER. This is because React loads environment variables in this order:
•  .env.production
•  .env
•  Variables injected via $GITHUB_ENV
•  System environment variables

ii) Display
Update your app.js with following snippet:
		<h5><u>Build Version:</u> <span id="build-number">{process.env.REACT_APP_BUILD_NUMBER}</span></h5>

### 4.2 Add workflow – .github/workflows/deploy.yaml

``` yaml
name: Build and Deploy to FastComet

on:
  push:
    branches: [ prod, latest ]
  workflow_dispatch: # Allows manual triggering

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repo
        uses: actions/checkout@v3

      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm install

      - name: Build React app
        run: # CI = false disables the turning of ESLINT warnings into errors.
          |
            CI=false  
            npm run build

#https://github.com/SamKirkland/FTP-Deploy-Action
      - name: Deploy to FastComet via SFTP
        uses: SamKirkland/FTP-Deploy-Action@v4.4.0
        with:
          server: ${{ secrets.SFTP_HOST }}
          username: ${{ secrets.SFTP_USER }}
          password: ${{ secrets.SFTP_PASS }}
          port: ${{ secrets.SFTP_PORT }}
          local-dir: build/
          server-dir: ${{ secrets.SFTP_TARGET }}
          protocol: ftps
          dangerous-clean-slate: true

```

### 4.3 VERIFICATION
[Assumption: Corresponding Github repo is setup as remote origin]
git add .
git commit –m “See Readme.md version 3.0”
git pull origin prod
git push origin prod

## 5.0 DEVELOPMENT 

### 5.1 ASSUMPTION

#### 5.1.1 OPERATING DEVELOPMENT ENVIRONMENT

 When running ‘npm run dev’, killing the process only kills the server. Hence to kill the client, first use Netstat command to find the process running on the port and then kill it:

````bash
- Netstat –ano | Findstr :3000 
```
where,  -a is all ports, -n is list them as numerics and –o is list process number 

```bash
task kill /PID <process id> /F
```
### 5.2 PLAN
 
Generate .env.development.local automatically before starting the dev server
You can create an npm script that is run by predev that:
a. Reads build_number.txt
b. Writes it into .env.development.local
c. Starts the dev server
This keeps dev and prod consistent.

#### 5.2.1 .env.development.local USE

Current Development environment uses .env.development for variables, then why not use it for storing REACT_APP_BUILD_NUMBER too?

Yes, REACT_APP_BUILD_NUMBER can write directly into .env.development, but doing so has two drawbacks:

1.	You will commit .env.development changes to Git accidentally (React dev servers rewrite it every time you run npm run dev)

2.	React caches .env.development on first read – So, if the dev server is already running, updating the file won’t refresh the value.

That’s why React’s official recommendation is:

Use .env.development.local for machine specific or runtime generated values.

It’s ignored by Git, safe to overwrite, and React loads it automatically.

#### 5.2.2 USE OF ‘PREDEV’ IN PACKAGE.JSON

The plan uses predev in Package.json because:

- Because npm automatically runs predev before dev.

So the sequence becomes:

a. predev → generates .env.development.local
b. dev → starts React + API

React dev server loads the correct build number

### 5.3 PLAN IMPLEMENTATION 

🧩 Step 1 — Create a script scripts/set-dev-build-number.js
Create a folder:

- scripts/

Inside it, create:

scripts/set-dev-build-number.js

```js
const fs = require('fs');

const raw = fs.readFileSync('build_number.txt', 'utf8').trim();
const build = raw.replace(/\.0$/, ''); // optional cleanup

const envContent = `REACT_APP_BUILD_NUMBER=${raw}\n`;

fs.writeFileSync('.env.development.local', envContent);

console.log(`Dev build number set to ${raw}`);
```

This script ensures React dev server sees the value by:

a. Reads build_number.txt

b. Writes .env.development.local


🧩 Step 2 — Update your package.json scripts

Modify your scripts like this:

```json
"scripts": {
  "predev": "node scripts/set-dev-build-number.js",
  "client": "cd src && npm start",
  "server": "cd api && node server.js",
  "dev": "concurrently -k -n client,server -c blue,green \"npm run client\" \"npm run server\""
}
```
## 6.0 CONCLUSION
