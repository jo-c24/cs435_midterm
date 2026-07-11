# Collier Midterm Answers

## Part 1 - Conceptual Foundations

### 1. Sockets vs. HTTP
Explain the difference between a raw TCP socket server and an HTTP server. Your answer should include:

- what a socket provides,
- what HTTP adds on top,
- why most web APIs do not directly expose raw socket protocols

**A socket is an endpoint for network communication, it essentially sends and recieves bytes. What HTTP adds on top is more defined structure to network request and response messages. Most APIs utilize this because it makes it much easier for the user to understand what is going on.**


### 2. Request/Response
Describe a request/response pattern. Then explain how it appears in:

- a TCP command server,
- an HTTP API,
- an Express route handler

**In a request/response pattern, the client always initiates communication by sending a request to the server. The server listens until it recieves a communication from the client. The server then applies logic, accesses resources, and then sends the response back to the client. The client will then display or consume those results. This describes a TCP command server, in which a server is listening for a request from a client. An HTTP API uses this same structure, and simply structures it a bit more. An Express route handler expands this even more, in dictating how a server will respond to an HTTP request from a client.**


### 3. Statelessness
Explain what it means for an API to be stateless. Give one advantage and one disadvantage of a stateless design.

**A stateless system is one in which each request contains everything needed. A big advantage of these systems is that they are easy to scale horizontally and to recover after failure. One key disadvantage however is that the server does not remember prior requests, which leads to a lot more overhead.**


### 4. HTTP Status Codes
For each situation, choose an appropriate HTTP status code and briefly justify it

| Situation    | Status Code |
| -------- | ------- |
| A new resource was successfully created  | 201 - used when something is created successfully    |
| The client requested an item that does not exist | 404 - valid request, but not found     |
| The client sent JSON missing a required field    | 400 - bad request    |
| The server had an unexpected error | 500 - internal service error|
| A successful request returns JSON data| 200 - OK/successful |


<br>

## Part 2 - API Design

### 1. Resource URIs
List URIs for
- getting all tasks
- getting one task by id
- creating a task
- replacing a task
- partially updating a task
- deleting a task

<br>

- **GET /api/tasks** (get all tasks)
- **GET /api/tasks/1** (get one task by id)
- **POST /api/tasks** (create a task)
- **PUT /api/tasks/1** (replace a task)
- **PATCH /api/tasks/1** (partially update a task)
- **DELETE /api/tasks/1** (delete a task)

### 2. Method Semantics
For each route, identify the HTTP method and explain whether it is
- safe
- idempotent
- neither

<br>

- **Safe, Idempotent**
- **Safe, Idempotent**
- **Neither**
- **Idempotent**
- **Neither**
- **Idempotent** 

### 3. JSON Representation
Provide one valid JSON example for creating a new task

<code>{
  "title": "Watch Week 3 lecture",
  "course": "CS453",
  "completed": false
  }</code>

<br>

## Part 4 - Middleware

Briefly explain why these are middleware concerns instead of being repeated manually inside every route.

**These jobs are middleware because every route needs them, so it doesn't make sense to copy the same code into each handler. The logger has to run on every single request no matter what route it is, so putting it in one middleware means it just happens automatically instead of me writing the same logging lines over and over. The validation is the same idea, POST, PUT, and PATCH all need to check that the task body is valid, so I write that check once as middleware and attach it to those routes instead of repeating the exact same if-statements inside all three handlers. Doing it this way keeps the route handlers short and focused on their actual job, and if I ever need to change how logging or validation works I only have to fix it in one place instead of hunting through every route.**


<br>

## Part 7 - Reflection

## 1. Code vs. Contract
Explain the difference between an Express route implementation and an Open API specification

**The OpenAPI specification describes what should be done and how it should be done, and the Express route implementation is the actual executable code that does what the OpenAPI says to do.**


### 2. Drift
Give two examples of how code and OpenAPI documentation can drift apart

**One obvious way this can happen is when there is no OpenAPI. This can cause developers to have to guess a lot of things, such as the URLs, JSON shape, and status codes. Issues can also arise when developers fail to update the OpenAPI as they update the code, so they are no longer up to date with one another.**

### 3. Client Impact
Explain why inaccurate API documentation can cause problems for client developers

**When an OpenAPI is inaccurate, that can lead to far more work for the developer. If there just simply isn't an OpenAPI, that causes developers to have to do a lot of guessing. But when an OpenAPI is present, but incorrect, now you have developers potentially using incorrect URLs, using services that are not allowed, etc. This can cause the developer to have to go back and redo things when that information is finally updated and made correct. It also inconveniences the client because now they might not get the product on time because it is taking the developers longer to fix these errors. Overall, it is way more work and heartache for everyone involved.**

