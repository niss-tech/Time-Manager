import request from "supertest";
import { app } from "../../app.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("Auth Integration Flow", () => {
  const testUser = {
    firstname: "Integration",
    lastname: "User",
    email: "integration@test.com",
    password: "Password1!",
    phone: "0600000000",
    profile: "employee",
  };

  beforeAll(async () => {
    // Nettoyage : supprime le user s’il existe déjà
    await prisma.users.deleteMany({ where: { email: testUser.email } });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should register, login, and access profile successfully", async () => {
    // Register
    const registerRes = await request(app)
      .post("/v1/auth/register")
      .send(testUser);
    expect(registerRes.statusCode).toBe(201);
    expect(registerRes.body).toHaveProperty("user");

    // Login
    const loginRes = await request(app)
      .post("/v1/auth/login")
      .send({
        email: testUser.email,
        password: testUser.password,
      });
    expect(loginRes.statusCode).toBe(200);
    expect(loginRes.body).toHaveProperty("token");
    const token = loginRes.body.token;

    // Profile (avec le token JWT)
    const profileRes = await request(app)
      .get("/v1/auth/profile")
      .set("Authorization", `Bearer ${token}`);
    expect(profileRes.statusCode).toBe(200);
    expect(profileRes.body.email).toBe(testUser.email);
  });

it("should reject profile access without token", async () => {
  const res = await request(app).get("/v1/auth/profile");
  expect(res.statusCode).toBe(401);
  expect(res.body).toHaveProperty("error", "Token manquant.");
});

});
