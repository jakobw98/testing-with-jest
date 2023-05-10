const { Builder, By, until } = require('selenium-webdriver');
require('geckodriver');

const fileUnderTest = 'file://' + __dirname.replace(/ /g, '%20') + '/../dist/index.html';
const defaultTimeout = 10000;
let driver;
jest.setTimeout(1000 * 60 * 5); // 5 minuter

// This runs before the tests to ensure Firefox is running
beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get(fileUnderTest);
});

// This runs after all the tests are done to close Firefox
afterAll(async() => {
    await driver.quit();
}, defaultTimeout);

test('The stack should be empty in the beginning', async () => {
    let stack = await driver.findElement(By.id('top_of_stack')).getText();
    expect(stack).toEqual("n/a");
});

describe('Clicking "Pusha till stacken"', () => {
    it('should add testa1 to the stack', async () => {
        let push = await driver.findElement(By.id('push'));
        await push.click();
        let alert = await driver.switchTo().alert();
        await alert.sendKeys("testa1");
        await alert.accept();
    });

    it('should add testa2 to the stack', async () => {
        let push = await driver.findElement(By.id('push'));
        await push.click();
        let alert = await driver.switchTo().alert();
        await alert.sendKeys("testa2");
        await alert.accept();
    });

    it('should show testa1 as the top item on the stack', async () => {
        let peek = await driver.findElement(By.id('peek'));
        await peek.click();
        let alert = await driver.switchTo().alert();
        let topItem = await alert.getText();
        await alert.accept();
        expect(topItem).toEqual('testa1');
    });
});