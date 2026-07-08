# Collier Midterm Answers

## Part 1 - Conceptual Foundations

### 1. Sockets vs. HTTP
Explain the difference between a raw TCP socket server and an HTTP server. Your answer should include:

- what a socket provides,
- what HTTP adds on top,
- why most web APIs do not directly expose raw socket protocols

**answer**


### 2. Request/Response
Describe a request/response pattern. Then explain how it appears in:

- a TCP command server,
- an HTTP API,
- an Express route handler

**answer**


### 3. Statelessness
Expplain what it means for an API to be stateless. Give one advantage and one disadvantage of a stateless design.

**answer**


### 4. HTTP Status Codes
For each situation, choose an appropriate HTTP status code and briefly justify it

| Situation    | Status Code |
| -------- | ------- |
| A new resource was successfully created  | answer    |
| The client requested an item that does not exist | answer     |
| The client sent JSON missing a required field    | answer    |
| The server had an unexpected error | answer|
| A successful request returns JSON data| answer |


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

**answer**

### 2. Method Semantics
For each route, identify the HTTP method and explain whether it is
- safe
- idempotent
- neither

**answer**

### 3. JSON Representation
Provide one valid JSON example for creating a new task

**answer**

<br>

## Part 7 - Reflection

## 1. Code vs. Contract
Explain the difference between an Express route implementation and an Open API specification

**answer**


### 2. Drift
Give two examples of how code and OpenAPI documentation can drift apart

**answer**

### 3. Client Impact
Explain why inaccurate API documentation can cause problems for client developers

**answer**

