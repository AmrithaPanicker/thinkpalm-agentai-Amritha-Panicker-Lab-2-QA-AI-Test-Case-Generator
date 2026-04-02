import { test, expect } from '@playwright/test';

test.describe('SauceDemo - Product & Cart Tests', () => {

  test('Successful login', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('Login with invalid credentials', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'wrong');
    await page.fill('#password', 'wrong');
    await page.click('#login-button');

    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });

  test('Login with empty credentials', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.click('#login-button');

    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });

  test('View product list', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  test('Add single product to cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await page.click('text=Add to cart');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  test('Add multiple products to cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    const addButtons = page.locator('button:has-text("Add to cart")');
    const count = await addButtons.count();

    for (let i = 0; i < count; i++) {
      await addButtons.first().click(); // always click available button
    }

    await expect(page.locator('.shopping_cart_badge'))
      .toHaveText(String(count));
  });

  test('Remove product from cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await page.click('text=Add to cart');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    await page.click('text=Remove');
    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
  });

  test('View products in cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await page.click('text=Add to cart');
    await page.click('.shopping_cart_link');

    await expect(page.locator('.cart_item')).toBeVisible();
  });

  test('Cart persists after navigation', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await page.click('text=Add to cart');
    await page.click('.shopping_cart_link');
    await page.goBack();

    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  test('Cart persists after logout', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await page.click('text=Add to cart');

    await page.click('#react-burger-menu-btn');
    await page.click('#logout_sidebar_link');

    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // Cart still has item
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

});