const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const app = require("../server");

describe("GET /health", () => {
  it("returns 200 with healthy status", async () => {
    const res = await request(app).get("/health");
    assert.equal(res.status, 200);
    assert.equal(res.body.status, "healthy");
  });
});

describe("GET /api/menu", () => {
  it("returns an array of menu items", async () => {
    const res = await request(app).get("/api/menu");
    assert.equal(res.status, 200);
    assert.ok(Array.isArray(res.body));
    assert.ok(res.body.length > 0);
  });

  it("each item has id, name, and price", async () => {
    const res = await request(app).get("/api/menu");
    for (const item of res.body) {
      assert.ok(typeof item.id === "number");
      assert.ok(typeof item.name === "string");
      assert.ok(typeof item.price === "number");
    }
  });
});

describe("GET /version", () => {
  it("returns a version string", async () => {
    const res = await request(app).get("/version");
    assert.equal(res.status, 200);
    assert.ok(typeof res.body.version === "string");
    assert.ok(res.body.version.length > 0);
  });
});
