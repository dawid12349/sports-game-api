# Prerequisites

Make sure you have Docker and Docker Compose installed on your machine. If not, you can download and install them from [Docker's official website](https://www.docker.com/get-started).

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/your-project.git
   cd your-project
   ```

2. **Add Environment variables**

   Create a `.env` file in the root folder:

   ```env
      #env
      NODE_ENV=development

      #DB
      POSTGRES_HOST=db #database host
      POSTGRES_PORT=5432 #database port
      POSTGRES_PASSWORD=postgres #database password
      POSTGRES_USER=postgres #database user
      POSTGRES_DB=postgres #database name
   ```

3. **Build the Docker images:**

   ```bash
   docker-compose-f compose.yaml build
   ```

4. **Start the Docker containers:**

   ```bash
   docker-compose -f compose.yaml up
   ```

   This will start the NestJS API on `http://localhost:3000` and the GraphQL documention on `http://localhost:3000/graphql`. You can access both services in your web browser.

## Running database migrations 

In order to run database migrations run:

   ```bash
   npm run migration:run
   ```

## Stopping the Containers

To stop the Docker containers, press `Ctrl + C` in the terminal where `docker-compose up` is running.

## Cleaning Up

To stop and remove the containers, use the following command:

```bash
docker-compose down
```