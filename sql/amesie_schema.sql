/* ==========================================================
   Amesie E-Commerce Schema
   Database  : taskmind_db
   Schema    : amesie
   Owner     : zaidkhan
   Purpose   : Core tables for users, products, orders, and items
   ========================================================== */

BEGIN;

-- ----------  Schema  ----------
CREATE SCHEMA IF NOT EXISTS amesie AUTHORIZATION zaidkhan;

-- ----------  Users  ----------
CREATE TABLE IF NOT EXISTS amesie.users (
    id            BIGSERIAL PRIMARY KEY,
    email         TEXT UNIQUE NOT NULL,
    name          TEXT,
    password_hash TEXT NOT NULL,
    created_at    TIMESTAMP DEFAULT now()
);

-- ----------  Products  ----------
CREATE TABLE IF NOT EXISTS amesie.products (
    id         BIGSERIAL PRIMARY KEY,
    sku        TEXT UNIQUE NOT NULL,
    title      TEXT NOT NULL,
    price      NUMERIC(12,2) NOT NULL CHECK (price >= 0),
    stock      INT DEFAULT 0 CHECK (stock >= 0),
    created_at TIMESTAMP DEFAULT now()
);

-- ----------  Orders  ----------
CREATE TABLE IF NOT EXISTS amesie.orders (
    id         BIGSERIAL PRIMARY KEY,
    user_id    BIGINT NOT NULL REFERENCES amesie.users(id) ON DELETE CASCADE,
    status     TEXT NOT NULL DEFAULT 'pending',
    total      NUMERIC(12,2) DEFAULT 0 CHECK (total >= 0),
    created_at TIMESTAMP DEFAULT now()
);

-- ----------  Order Items  ----------
CREATE TABLE IF NOT EXISTS amesie.order_items (
    id          BIGSERIAL PRIMARY KEY,
    order_id    BIGINT NOT NULL REFERENCES amesie.orders(id) ON DELETE CASCADE,
    product_id  BIGINT NOT NULL REFERENCES amesie.products(id),
    qty         INT NOT NULL CHECK (qty > 0),
    price       NUMERIC(12,2) NOT NULL CHECK (price >= 0)
);

-- ----------  Indexes  ----------
CREATE INDEX IF NOT EXISTS idx_orders_user
    ON amesie.orders(user_id);

CREATE INDEX IF NOT EXISTS idx_items_order
    ON amesie.order_items(order_id);

CREATE INDEX IF NOT EXISTS idx_items_product
    ON amesie.order_items(product_id);

COMMIT;
