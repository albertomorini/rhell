

# Rhell

Rhell wanna be a home directory of webservices and shell script executor via HTTPS.

## The idea

I want to have a remote dashbaord where I can put all the links to my utility web apps (like jellyfin or <a href="https://github.com/albertomorini/walletter">Walletter</a>...) but also, run some shell script (like <a href="https://github.com/albertomorini/nexter">Nexter</a> or <a href="https://github.com/albertomorini/glyrics">Glyrics</a>).

All of this, from my iPad or my phone.

And also, want to execute some immediate shell command like `cd Downloads; ls`.

## Architecture

Three tier 

- **Presentation**: React (w/ IonicFramework)
     - I'll use a tons of hooks (state,effect,ref) and context
- **Application**: NodeJS
- **Data**: MongoJS
     - To store user and relative widgets


## TODO

- IDEA: for web widgets => retrieve the favicon and/or title of the webpage
- auth
- UI
     - fix delete button also play
