import { type Locator, type Page } from "@playwright/test";

export const STANDARD_USER = "standard_user";
export const LOCKED_OUT_USER = "locked_out_user";
export const DEMO_PASSWORD = "secret_sauce";

export class LoginPage {
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly error: Locator;

  constructor(private readonly page: Page) {
    this.username = page.locator('[data-test="username"]');
    this.password = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.error = page.locator('[data-test="error"]');
  }

  async goto(): Promise<void> {
    await this.page.goto("/");
  }

  async login(username: string, password: string): Promise<void> {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  async loginAsStandardUser(): Promise<void> {
    await this.login(STANDARD_USER, DEMO_PASSWORD);
  }
}
