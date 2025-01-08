# Laravel Caddy with Local HTTPs and HTTP 3.0 / Quic integrations

## To Get Started

#### Starting Docker

CD into the application and enter the following commands to get started:

> docker-compose up

#### Enabling Local HTTPS

Now we need to install Caddy's root CA cert on our machines, so browsers and HTTP Clients we use will trust Caddy's 
TLS certificate.

To do this, you can follow the documentation as listed [here](https://caddyserver.com/docs/running#local-https-with-docker).

OR

Run the following commands for your OS:

#### Linux:
> docker compose cp \
caddy:/data/caddy/pki/authorities/local/root.crt \
/usr/local/share/ca-certificates/root.crt \
&& sudo update-ca-certificates

#### Mac:
> docker compose cp \
caddy:/data/caddy/pki/authorities/local/root.crt \
/tmp/root.crt \
&& sudo security add-trusted-cert -d -r trustRoot \
-k /Library/Keychains/System.keychain /tmp/root.crt

#### Windows:
> docker compose cp \
caddy:/data/caddy/pki/authorities/local/root.crt \
/tmp/root.crt \
&& sudo security add-trusted-cert -d -r trustRoot \
-k /Library/Keychains/System.keychain /tmp/root.crt

Since some browsers ignore your machine's trust store, you may also have to install the certificate on the browser:

#### Firefox

Go to Preferences > Privacy & Security > Certificates > View Certificates > Authorities > Import and select your **root.crt**.

#### Chrome

Go to Settings < Privacy and security > Security > Manage certificates > Authorities > Import and select your **root.crt**.

## Notes

- HTTP 3.0 / Quic may not always be used on requests since the browser chooses the best protocol to use in its requests.
- You can force your browser to only use Quic by removing the **- '443:443'** line in the **docker-compose.yml** file which
forces Caddy to use port 443 over UDP.
- You can check which protocol is being used by going to Dev Tools > Network > Right-click the table's header with the Name,
Status, etc. columns > Check **Protocol**. '**h3**' will indicate requests made with the HTTP 3.0 protocol.
