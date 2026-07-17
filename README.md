# CRUD API

A small task-management API built with Node.js and Express. Supports full CRUD (Create, Read, Update, Delete) on an in-memory list of tasks — no database yet, data resets on server restart.

## How to run

```bash
git clone https://github.com/erycpc/CRUD-API.git
cd CRUD-API
npm install
node server.js
```

The server starts on `http://localhost:3000`.

## Endpoints

| Method | Path          | Description                          |
|--------|---------------|---------------------------------------|
| GET    | `/`           | API info (name, version, endpoints)  |
| GET    | `/health`     | Health check                         |
| GET    | `/tasks`      | List all tasks                       |
| GET    | `/tasks/:id`  | Get a single task by ID              |
| POST   | `/tasks`      | Create a new task                    |
| PUT    | `/tasks/:id`  | Update a task's title and/or done status |
| DELETE | `/tasks/:id`  | Delete a task                        |

## Example request

```
curl -i -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d '{"title":"Buy milk"}'
```

```
HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8

{"id":4,"title":"Buy milk","done":false}
```

## Swagger UI

Interactive API docs are available at `http://localhost:3000/docs`, generated from `openapi.json`. Full CRUD cycle (create, list, update, delete) can be tested directly from the "Try it out" button on each endpoint.

![Swagger UI screenshot](./swagger-screenshot.png)

*(Screenshot: all 5 endpoints listed under `/tasks` and `/tasks/{id}`, grouped by method — GET, POST, PUT, DELETE.)*

## Notes

- Data is stored in memory only — restarting the server resets tasks back to the 3 seeded examples. This is intentional for this stage of the assignment; a database comes next.
- New task IDs are generated from the current max ID in the list (not array length), so IDs stay unique even after deletions.
