<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Product Service API - A NestJS application for managing products, users, and transactions</p>

##  Getting Started

### Prerequisites
- Node.js (v16 or later)
- Docker and Docker Compose
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/anobie/Ellatech_takeHome
cd product-service
```

2. Install dependencies:
```bash
npm install
```

3. Copy the example environment file:
cp .env.example .env


### Running with Docker (Recommended)

1. Start the services:
```bash
docker-compose up --build
```

The API will be available at `http://localhost:3000`

### Running Locally

1. Start the database:
```bash
docker-compose up -d db
```

2. Run migrations:
```bash
npm run typeorm migration:run
```

3. Start the development server:
```bash
npm run start:dev
```

## 📚 API Documentation

### Users

#### Create User
```http
POST /users
```
**Request Body:**
```json
{
  "name": "John Doe",
  "username": "johndoe"
}
```
**Response:** `201 Created`
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "John Doe",
  "username": "johndoe"
}
```

### Products

#### Create Product
```http
POST /products
```
**Request Body:**
```json
{
  "name": "Premium Widget",
  "description": "A high-quality widget",
  "price": 99.99,
  "stockQuantity": 100
}
```

#### Get Product Status
```http
GET /products/status/:productId
```
**Response:** `200 OK`
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440001",
  "name": "Premium Widget",
  "stockQuantity": 100,
  "price": 99.99
}
```

#### Adjust Stock
```http
PUT /products/adjust
```
**Request Body:**
```json
{
  "productId": "550e8400-e29b-41d4-a716-446655440001",
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "quantityChange": -5
}
```

### Transactions

#### Create Transaction
```http
POST /transactions
```
**Request Body:**
```json
{
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "productId": "550e8400-e29b-41d4-a716-446655440001",
  "quantity": 2
}
```

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
npm run test:e2e
```

### Test Coverage
```bash
npm run test:cov
```

## 🛠️ Development

### Database Migrations

**Create a new migration:**
```bash
npm run typeorm migration:create src/migrations/YourMigrationName
```

**Run migrations:**
```bash
npm run typeorm migration:run
```

**Revert last migration:**
```bash
npm run typeorm migration:revert
```

## 🚀 Deployment

### Production Build
```bash
npm run build
npm run start:prod
```

### Environment Variables

Required environment variables (set in `.env`):
```
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=product_db
PORT=3000
```


---

<div align="center">
  <sub>Built by Anobie</sub>
</div>
