# Monazon – MVP

**Monazon** (Amazon + Monad): MVP para que vendedores en LATAM generen links de pago y reciban USDC en Monad.

## Flujo

1. **Vendedor** conecta wallet (Monad) y entra al dashboard.
2. Genera un **link de pago** con monto fijo en USDC.
3. **Cliente** abre el link y paga con USDC desde su wallet.
4. El vendedor ve su **balance actualizado** on-chain.

## Cómo correr

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). La base SQLite se crea en `data/payments.db` al primer uso.

## Stack

- Next.js 14 (App Router), Wagmi v2, Viem v2
- Monad mainnet (chain id 143), USDC
- SQLite + Drizzle (una tabla `payment_links`)

## Variables de entorno

- `NEXT_PUBLIC_APP_URL`: URL base de la app (opcional; en producción para que los links generados tengan la URL correcta).

## Deploy (Vercel)

SQLite con `better-sqlite3` no corre en serverless. Para producción puedes:

1. **Turso** (SQLite edge): cambiar `lib/db.ts` a usar `@libsql/client` y variable `TURSO_DATABASE_URL`.
2. O **Vercel KV**: sustituir la capa de persistencia por KV (key `link:{id}`, etc.) como en la arquitectura.

## Monad

- Mainnet: chain id **143**, RPC `https://rpc.monad.xyz`
- USDC: `0x754704Bc059F8C67012fEd69BC8A327a5aafb603`
