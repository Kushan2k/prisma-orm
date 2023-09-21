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
