# Learn Prisma by creating a CURD API

<hr/>

## Overview

<p>
Prisma is a server-side library that helps developers read and write data to the database in an intuitive, efficient and safe way.
<b>It's a next generation Node.js and Typescript ORM for Databases</b>
</p>

## Schemans

<p>
Every project that uses a tool from the Prisma toolkit starts with a Prisma schema file. The Prisma schema allows developers to define their application models in an intuitive data modeling language. It also contains the connection to a database and defines a generator:
</p>

### Register a user

#### example request

```javascript
//run on a async function
await fetch("http://localhost:9090/auth/register", {
  method: "POST",
  body: JSON.stringfy({
    name: "<your name>",
    email: "<your email>",
    password: "<your plain password>",
    address: "<your address>",
  }),
  headers: {
    "Content-Type": "application/json",
  },
})

//returns the user with the jwt token
```

#### example request for jwt protected routes

```javascript
//run inside an async function

await fetch("http://localhost:9090/api/v1/post/create", {
  method: "POST",
  body: JSON.stringfy({
    slug: "<unique something>",
    title: "<post title>",
    body: "<post content>",
  }),
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer <your token>",
  },
})

//returns the created post or the error message if fail
```

<hr/>

## Backend

### Insert an entry

```javascript
// Run inside `async` function
const user = await prisma.user.create({
  data: {
    name: "Alice",
    email: "alice@prisma.io",
    posts: {
      create: { title: "Join us for Prisma Day 2020" },
    },
  },
})
```

### query

```javascript
// Run inside `async` function
const allUsers = await prisma.user.findMany()

// Run inside `async` function
const allUsers = await prisma.user.findMany({
  include: { posts: true },
})
```
