<div align="center">
  <h3>Jyotirmay Sarna, BE (Software), CEH</h3>
  <p>This work is original. Please do not copy, repost, or use without permission.</p>
  <a href="./LICENSE.md">View LICENSE</a>
</div>

# Versions

## Purpose of code ##
In 2026, Identity management is crucial in the success of any application. To merge common needs of Authenticatio and Authorisation, such as single signon (needs domain controller) and defence against Cybersecurity vectors such as DDOS and encryption breaking attacks, and OpenID access, given an application exists on the web, a platform like OAuth is ideal for small to medium sized business inorder to scale down infrastructure costs. Heck, this application does not even have a database, and yet it uses oAuth for all communciations implementing perfect Authentication and Authorisation. Refer to Appendix 2.0 to understand how to implement a simple solution like this in Auth0. I started the solution of this modern Implementation of OAuth using Auth0 with help from Mr. Mittal (Mafia Codes, 2021, Mar, 28). 

Note: If 'npm run dev' is run, then it creates a client and an api server instance on ports 3000 and 4000, respectively. The api server here is a stub, which exists within the client. When existing in this dev environment, the server exists but the client does not. To exist from client use command:

- npx kill-port 3000   (i may need to create a devkill task in NPM) 

## Metadata and identification information for code ##

### Server
-----------
#### SERVER REPO NAME IN GITHUB: <a href="https://github.com/BoundlessLove/items4sale-api">items4sale-api</a>

#### SERVER DOMAIN NAME, HOSTED ON FASTCOMET: [Backend](https://www.apiserver.systematicdefence.tech/)

#### FASTCOMET FOLDER NAME: /home/systema1/webstore-production/prod-api-server

#### TECHNOLOGY: Node.js Express Server, using oAuth and api keys for authentication and authorisation


### Client
----------
#### CLIENT REPO SELF NAME IN GITHUB: <a href="https://github.com/BoundlessLove/webstore">webstore</a>

#### CLIENT DOMAIN NAME, HOSTED ON FASTCOMET: [Client](https://www.systematicdefence.tech)

#### FASTCOMET FOLDER NAME: /home/systema1/webstore-production/webstore

#### TECHNOLOGY: REACT

### MAIL
----------
### CLIENT REPO SELF NAME IN GITHUB: Not on Git hub

### CLIENT DOMAIN NAME, HOSTED ON FASTCOMET: [Email Server](https://emailserver.systematicdefence.tech/)

#### FASTCOMET FOLDER NAME: /home/systema1/webstore-production/prod-signup-server

#### TECHNOLOGY: Node.js Express Server, using api keys

----------------------------------------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------------------


### Major Versions 

#### Version 0.0
##### Version 0.1 
06 October Midnight plus: Completed about half of tutorial
##### Version 0.2 
12 October 22:15 pm: Completed Tutorial
##### Version 0.3
14 October 17:49 pm: Client application now printing result to application 
##### Version 0.4
14 October 10:25 pm: The server now prints result based on user's permissions. See Documents\Cyber Ethical Hacking\Webhosting\transfer\MoveAuth0AppToPhp3Oct2025.doc for screenshots. 
##### Version 0.5
13 Feb 2026 14:00: Logging has been applied to API Server. All four APIs functional.
##### Version 0.6
14 Feb 2026 15:47: When a new user is registered, automatically a stripe account for them is created. Product has been created and a start has been made for the flow for buying api. Finally, when a person logs in, now their unique email address is shown on the page. 
REFERENCES
1. Mafia Codes.(2021, Mar, 28). YouTube- Auth0 authentication in Reactjs using OAuth2. <url> 
