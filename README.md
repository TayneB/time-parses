# Time-parses
This repo is a side project aimed at helping players of the Online MMORPG World of Warcraft gain insight into their performance and areas they can improve on based on the kill time of the games raid boss fights, character class, talents, and ingame ability rotation with an emphasis on contextualising the players performance specifically with kill times of other top performing players.

## Start Up
After cloning and installing, `npm run dev` to start the server
<summary>Note</summary>
    cd time-parses
    npm i
    npm run dev
  </details>
Create a .env in accordance with the [.env.sample](https://github.com/TayneB/time-parses/blob/main/.env.sample)
Make sure to seed and migrate knex.

---------------------------------------------------------

## Current functionality 
Once running going the api endpoint at `http://localhost:3000/api/v1/getData` will return a json object with details pertaining to a wow character Marbin. This is currently Hardcoded. The server uses oauth2 to make calls to the warcraftlogs v2 api to retrieve character data and makes calls to the token uri to authenticate itself based on a client id and secret (held in the .env). The db is used to house a token which will automatically refresh itself when it expires or it doesnt exist.

Text below this line is vestigial from the template used -------------------------------------------------------------------

# Fullstack Collection App - Keeping Description for referencing

This repo is designed to provide space to code a fullstack app. It contains node modules and folders for databases, routes, API requests and React components that'll use React Query. Let's get going!

## Setup

### 0. Cloning and installation

- [ ] Clone this repo, navigate to it, install packages, and start the server with `npm run dev`
  <details style="padding-left: 2em">
    <summary>Tip</summary>

    You may also want to start a new branch
    ```sh
    cd my-fullstack-collection
    npm i
    git checkout -b <branchname>
    npm run dev
    ```
  </details>

<details>
  <summary>More about using <code>npm</code> vs <code>npx</code></summary>

  - When running knex, run `npm run knex <command>`, e.g. `npm run knex migrate:latest` rather than using `npx`
</details>

---

## Requirements

### 1. Choosing your data set

- [ ] First, decide what you would like to keep a collection of. This could be a repo for keeping track of movies, books, gifs, cars, rocks, anything you fancy, but keep it simple!
  <details style="padding-left: 2em">
    <summary>More about your collection</summary>

    **Note:** the aim is to have some simple data. If you think you might need more than one database table, or have lots of details you want to store, how could you simplify the information you're keeping track of? Leave more complex data until later in the project. For example, I want to keep track of books that I want to read, ones that I have read, and ones that I own. To start with though, let's keep track of the books themselves. My data might look like:

    |id|title|author|
    |---|---|---|
    | 1 | Ready Player One | Ernest Cline |
    | 2 | Throwing Rocks at the Google Bus | Douglas Rushkoff |

Our first job is getting something showing on the front end from our database. Here's a list of steps in case they are useful. You can build in any order you like though ;)

## Back end

### 2. Building the database

- [ ] Design a database to store a list of your things (e.g. books)
- [ ] Build the migrations and seed data

### 3. Building the API
- [ ] Build an API (back end route) to get the information from your database
- [ ] Test your API with Insomnia

## Front end

### 4. Setting the stage
- [ ] Build a React component with static html

### 5. Building the API client
- [ ] Build an API client in the front end to request the information from your routes

### 6. Querying Data 
- [ ] Write a query with the `useQuery` hook to fetch the collection data from the API
- [ ] Display the collection data you queried in a component (you may want to create a new component for this)

### 7. Create Data
- [ ] (Optional) Create a new component for your new collection item form
- [ ] Mutate data with the `useMutation` hook to create a new collection item via the API 

### 8. Delete Data
- [ ] Mutate data with the `useMutation` hook to delete an exisiting collection item via the API (you may want to add this to your collection display component)

### 9. Update Data
- [ ] (Optional) Create a new component for your update collection item form
- [ ] Mutate data with the `useMutation` hook to update an exisiting collection item via the API 

---

## Stretch

<details>
  <summary>More about stretch challenges</summary>
  
  - Forms can be tough to build accessibly. First ensure all parts of your form can be reached and used with keyboard-only navigation. Then test your form page with the WAVE browser extension, and fix any accessibility issues it detects
  - Is there any complex data you chose to not include earlier or any way you could expand this dataset?
    - You might have some other information (e.g. unread books vs. read books) that should be included in your database design, and this may require adjusting your database design
  - Could you add an external API (maybe an inspirational quote in the footer?)
  - If you haven't already, CSS!
</details>

---
[Provide feedback on this repo](https://docs.google.com/forms/d/e/1FAIpQLSfw4FGdWkLwMLlUaNQ8FtP2CTJdGDUv6Xoxrh19zIrJSkvT4Q/viewform?usp=pp_url&entry.1958421517=my-fullstack-collection-query)
