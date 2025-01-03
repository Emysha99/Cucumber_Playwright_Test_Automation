import { Given } from '@cucumber/cucumber';
import { login } from '../helpers/loginHelper';

Given('I am logged in', async function() {
  const page = this.page;
  await login(page);
});

Given('I am on the inventory page', async function() {
  await this.page.goto('https://www.saucedemo.com/inventory.html');
}); 