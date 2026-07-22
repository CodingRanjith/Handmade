const express = require('express');
const authRoutes = require('./auth.routes');
const config = require('../../config');
const { healthCheck } = require('../../config/database');
const { getSupabaseAdmin, getSupabaseClient } = require('../../config/supabase');
const { pingJwks } = require('../../utils/supabaseJwt');
const asyncHandler = require('../../utils/asyncHandler');
const ApiResponse = require('../../utils/ApiResponse');

const router = express.Router();

/**
 * @openapi
 * /health:
 *   get:
 *     tags: [Health]
 *     summary: Health check (API, database, Supabase)
 *     responses:
 *       200:
 *         description: Service healthy
 */
router.get(
  '/health',
  asyncHandler(async (_req, res) => {
    let database = { ok: false };
    try {
      const db = await healthCheck();
      database = { ok: true, ...db };
    } catch (error) {
      database = { ok: false, error: error.message };
    }

    let jwks = { ok: false };
    try {
      jwks = await pingJwks();
    } catch (error) {
      jwks = { ok: false, reason: error.message };
    }

    const supabase = {
      url: config.supabase.url || null,
      publishableClient: Boolean(getSupabaseClient()),
      secretClient: Boolean(getSupabaseAdmin()),
      jwks,
      bucket: config.supabase.bucket,
    };

    const ok = database.ok && jwks.ok;
    return ApiResponse.ok(
      res,
      { status: ok ? 'ok' : 'degraded', database, supabase },
      ok ? 'Healthy' : 'Degraded — check database / Supabase config'
    );
  })
);

router.use('/auth', authRoutes);

module.exports = router;
