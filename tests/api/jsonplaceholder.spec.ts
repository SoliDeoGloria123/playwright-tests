import { expect, test } from "@playwright/test";

test.describe("JSONPlaceholder API", () => {
  test("GET /posts returns a list of posts", async ({ request }) => {
    const response = await request.get("/posts");

    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("application/json");

    const posts = await response.json();
    expect(Array.isArray(posts)).toBeTruthy();
    expect(posts.length).toBeGreaterThan(0);
    expect(posts[0]).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        userId: expect.any(Number),
        title: expect.any(String),
        body: expect.any(String),
      }),
    );
  });

  test("GET /posts/1 returns a single post", async ({ request }) => {
    const response = await request.get("/posts/1");

    expect(response.status()).toBe(200);
    const post = await response.json();
    expect(post.id).toBe(1);
    expect(post.title.length).toBeGreaterThan(0);
  });

  test("POST /posts creates a resource and returns 201", async ({ request }) => {
    const payload = {
      title: "Portfolio API test",
      body: "Created from the Playwright suite",
      userId: 1,
    };

    const response = await request.post("/posts", { data: payload });

    expect(response.status()).toBe(201);
    const created = await response.json();
    expect(created).toEqual(expect.objectContaining(payload));
    expect(created.id).toBeDefined();
  });
});
